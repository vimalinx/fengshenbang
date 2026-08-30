import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { comparisons } from '../src/data/comparisons.ts';
import { harnesses } from '../src/data/harnesses.ts';
import { buildSeoRoutes, SITE_ORIGIN, type SeoData, type SeoPage } from '../src/lib/seoCatalog.ts';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(appRoot, 'dist');

const data: SeoData = {
  models: JSON.parse(readFileSync(resolve(appRoot, 'src/data/generated/models.json'), 'utf8')),
  benchmarks: JSON.parse(readFileSync(resolve(appRoot, 'src/data/generated/benchmarks.json'), 'utf8')),
  comparisons,
  harnesses,
};
const routes = buildSeoRoutes(data);

function pathFor(page: SeoPage): string {
  return page.path === '/' ? resolve(distDir, 'index.html') : resolve(distDir, `${page.path.slice(1)}.html`);
}

function decodeHtml(value: string | undefined): string | undefined {
  return value
    ?.replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&gt;', '>')
    .replaceAll('&lt;', '<')
    .replaceAll('&amp;', '&');
}

function attribute(html: string, selector: string, attributeName: string): string | undefined {
  const tag = html.match(new RegExp(`<${selector}[^>]*>`, 'i'))?.[0];
  return decodeHtml(tag?.match(new RegExp(`${attributeName}="([^"]*)"`, 'i'))?.[1]);
}

const titles = new Set<string>();
const canonicals = new Set<string>();
for (const page of routes) {
  const file = pathFor(page);
  assert.ok(existsSync(file), `missing route HTML: ${page.path}`);
  const html = readFileSync(file, 'utf8');
  const expectedCanonical = `${SITE_ORIGIN}${page.path === '/' ? '/' : page.path}`;
  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]);
  assert.equal(title, page.title, `title mismatch: ${page.path}`);
  assert.equal(attribute(html, 'link\\s+rel="canonical"', 'href'), expectedCanonical, `canonical mismatch: ${page.path}`);
  assert.equal(attribute(html, 'meta\\s+name="description"', 'content'), page.description, `description mismatch: ${page.path}`);
  assert.equal(attribute(html, 'meta\\s+property="og:url"', 'content'), expectedCanonical, `og:url mismatch: ${page.path}`);
  assert.match(html, /<div id="root"><\/div>\s*<noscript data-seo-fallback>[\s\S]*?<h1>[^<]+<\/h1>/, `missing no-JavaScript fallback: ${page.path}`);
  const jsonLdText = html.match(/<script type="application\/ld\+json" data-seo-jsonld>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(jsonLdText, `missing JSON-LD: ${page.path}`);
  const jsonLd = JSON.parse(jsonLdText);
  assert.equal(jsonLd['@context'], 'https://schema.org', `invalid JSON-LD context: ${page.path}`);
  assert.ok(!titles.has(page.title), `duplicate title: ${page.title}`);
  assert.ok(!canonicals.has(expectedCanonical), `duplicate canonical: ${expectedCanonical}`);
  titles.add(page.title);
  canonicals.add(expectedCanonical);
}

const sitemap = readFileSync(resolve(distDir, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(sitemapUrls.length, routes.length, 'sitemap route count mismatch');
assert.deepEqual(new Set(sitemapUrls), canonicals, 'sitemap canonical inventory mismatch');

const robots = readFileSync(resolve(distDir, 'robots.txt'), 'utf8');
assert.match(robots, /User-agent: OAI-SearchBot\nAllow: \//);
assert.match(robots, new RegExp(`Sitemap: ${SITE_ORIGIN.replaceAll('.', '\\.')}/sitemap\\.xml`));
assert.doesNotMatch(robots, /Disallow:\s*\//);

const llms = readFileSync(resolve(distDir, 'llms.txt'), 'utf8');
assert.match(llms, /数据方法与编审规范/);
assert.match(llms, /站点主观评估/);

const notFound = readFileSync(resolve(distDir, '404.html'), 'utf8');
assert.equal(attribute(notFound, 'meta\\s+name="robots"', 'content'), 'noindex,follow');
const redirects = readFileSync(resolve(distDir, '_redirects'), 'utf8');
assert.doesNotMatch(redirects, /^\/\*\s/m, 'catch-all redirect would override route-specific HTML');
assert.equal(redirects.trim().split('\n').length, routes.length - 1, 'trailing-slash redirect inventory mismatch');

console.log(`SEO verification passed: ${routes.length} canonical pages, unique metadata, valid JSON-LD, sitemap, robots and llms.txt.`);
