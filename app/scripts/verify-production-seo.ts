import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { comparisons } from '../src/data/comparisons.ts';
import { harnesses } from '../src/data/harnesses.ts';
import { buildSeoRoutes, type SeoData } from '../src/lib/seoCatalog.ts';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = (process.env.SEO_PRODUCTION_ORIGIN ?? 'https://fengshenbang.wiki').replace(/\/$/, '');
const data: SeoData = {
  models: JSON.parse(readFileSync(resolve(appRoot, 'src/data/generated/models.json'), 'utf8')),
  benchmarks: JSON.parse(readFileSync(resolve(appRoot, 'src/data/generated/benchmarks.json'), 'utf8')),
  comparisons,
  harnesses,
};
const expectedRoutes = buildSeoRoutes(data);

async function response(path: string, init?: RequestInit): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    try {
      const headers = new Headers(init?.headers);
      headers.set('user-agent', 'OAI-SearchBot');
      const result = await fetch(`${origin}${path}`, {
        ...init,
        headers,
      });
      if (result.status < 500) return result;
      lastError = new Error(`${path} returned ${result.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 5_000));
  }
  throw lastError;
}

const model = await response('/models/gpt-5');
assert.equal(model.status, 200);
const modelHtml = await model.text();
assert.match(modelHtml, /<title>GPT-5：能力、价格、测试与使用建议｜封神榜 Wiki<\/title>/);
assert.match(modelHtml, /<link rel="canonical" href="https:\/\/fengshenbang\.wiki\/models\/gpt-5"/);
assert.match(modelHtml, /<script type="application\/ld\+json" data-seo-jsonld>/);
assert.match(modelHtml, /<main data-seo-fallback/);

const benchmark = await response('/benchmarks/aider-polyglot');
assert.equal(benchmark.status, 200);
assert.match(await benchmark.text(), /<title>Aider Polyglot 是什么、怎么测、分数怎么看｜封神榜 Wiki<\/title>/);

const methodology = await response('/methodology');
assert.equal(methodology.status, 200);
assert.match(await methodology.text(), /数据方法、信源与编审规范/);

const robots = await response('/robots.txt');
assert.equal(robots.status, 200);
assert.match(await robots.text(), /User-agent: OAI-SearchBot\nAllow: \//);

const sitemap = await response('/sitemap.xml');
assert.equal(sitemap.status, 200);
const sitemapText = await sitemap.text();
assert.equal([...sitemapText.matchAll(/<loc>/g)].length, expectedRoutes.length);

const llms = await response('/llms.txt');
assert.equal(llms.status, 200);
assert.match(await llms.text(), /内容与引用约定/);

const trailingSlash = await response('/models/gpt-5/', { redirect: 'manual' });
assert.equal(trailingSlash.status, 301);
const redirectLocation = trailingSlash.headers.get('location');
assert.ok(redirectLocation);
assert.equal(new URL(redirectLocation, origin).pathname, '/models/gpt-5');

const missing = await response('/seo-verification-route-that-does-not-exist');
assert.equal(missing.status, 404);

console.log(`Production SEO verification passed at ${origin}: ${expectedRoutes.length} routes discoverable, crawler allowed, canonical route source served, redirects and 404 correct.`);
