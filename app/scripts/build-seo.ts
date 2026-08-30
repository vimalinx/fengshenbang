import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { comparisons } from '../src/data/comparisons.ts';
import { harnesses } from '../src/data/harnesses.ts';
import {
  buildJsonLd,
  buildSeoRoutes,
  DEFAULT_SOCIAL_IMAGE,
  SITE_ORIGIN,
  type SeoData,
  type SeoPage,
} from '../src/lib/seoCatalog.ts';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(appRoot, 'public');
const distDir = resolve(appRoot, 'dist');
const mode = process.argv[2] ?? 'all';

function loadData(): SeoData {
  return {
    models: JSON.parse(readFileSync(resolve(appRoot, 'src/data/generated/models.json'), 'utf8')),
    benchmarks: JSON.parse(readFileSync(resolve(appRoot, 'src/data/generated/benchmarks.json'), 'utf8')),
    comparisons,
    harnesses,
  };
}

function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function escapeHtml(value: string): string {
  return escapeXml(value).replaceAll("'", '&#39;');
}

function canonical(page: SeoPage): string {
  return `${SITE_ORIGIN}${page.path === '/' ? '/' : page.path}`;
}

function writePublicFiles(routes: SeoPage[]) {
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((page) => `  <url><loc>${escapeXml(canonical(page))}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');

  const robots = [
    '# Search and answer-engine crawlers may index and quote public pages.',
    'User-agent: OAI-SearchBot',
    'Allow: /',
    '',
    'User-agent: ChatGPT-User',
    'Allow: /',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    '',
  ].join('\n');

  const llms = [
    '# 封神榜 Wiki',
    '',
    '> 面向中文开发者、由公开 Wiki 审核维护的大模型、AI 编程 Harness 与 Benchmark 知识库。事实、整理性说明和站点主观评价分层展示。',
    '',
    '## 主要入口',
    '',
    `- [首页](${SITE_ORIGIN}/): 站点定位与榜单速览`,
    `- [模型图鉴](${SITE_ORIGIN}/models): 模型能力、价格、上下文、公开成绩与使用建议`,
    `- [Harness 库](${SITE_ORIGIN}/harnesses): AI 编程工具、IDE、CLI 与自治 Agent`,
    `- [测试集百科](${SITE_ORIGIN}/benchmarks): Benchmark 的方法、分数解读与局限`,
    `- [模型和工具对比](${SITE_ORIGIN}/compare): 维度、场景和取舍对比`,
    `- [数据方法与编审规范](${SITE_ORIGIN}/methodology): 信源层级、审核、纠错与引用方式`,
    '',
    '## 内容与引用约定',
    '',
    '- 价格、发布日期、上下文与公开榜单成绩属于可核实事实，应以页面列出的原始信源和访问日期为准。',
    '- 梯队、综合战力、能力维度、配队与对决结论属于站点主观评估，不是独立实验结果。',
    '- 站点内容由公众在 Wiki 提交，管理员审核后进入主站；页面上的“编辑数据”链接指向对应词条。',
    '- 引用时优先链接到具体条目，并保留条目名称与访问日期。',
    '',
    '## 数据源',
    '',
    `- [公开编辑后端](https://wiki-staging.fengshenbang.wiki/wiki/%E9%A6%96%E9%A1%B5): MediaWiki 编辑、版本历史与审核入口`,
    `- [XML Sitemap](${SITE_ORIGIN}/sitemap.xml): 所有可索引规范 URL`,
    '',
  ].join('\n');

  writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap);
  writeFileSync(resolve(publicDir, 'robots.txt'), robots);
  writeFileSync(resolve(publicDir, 'llms.txt'), llms);
  writeFileSync(
    resolve(publicDir, '_redirects'),
    `${routes
      .filter((page) => page.path !== '/')
      .map((page) => `${page.path}/ ${page.path} 301`)
      .join('\n')}\n`,
  );
  console.log(`SEO discovery files generated for ${routes.length} canonical routes.`);
}

function replaceMeta(html: string, attribute: 'name' | 'property', key: string, value: string): string {
  const pattern = new RegExp(`<meta\\s+${attribute}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  if (!pattern.test(html)) throw new Error(`Missing ${attribute} meta tag: ${key}`);
  return html.replace(pattern, tag);
}

function fallbackMarkup(page: SeoPage): string {
  const entities = page.entityNames?.length
    ? `<ul>${page.entityNames.slice(0, 12).map((name) => `<li>${escapeHtml(name)}</li>`).join('')}</ul>`
    : '';
  return [
    '<main data-seo-fallback style="max-width:960px;margin:0 auto;padding:48px 24px;font-family:system-ui,sans-serif;line-height:1.75;color:#191919">',
    `  <h1>${escapeHtml(page.heading)}</h1>`,
    `  <p>${escapeHtml(page.description)}</p>`,
    `  ${entities}`,
    '  <nav aria-label="主要入口"><a href="/models">模型图鉴</a> · <a href="/harnesses">Harness 库</a> · <a href="/benchmarks">测试集</a> · <a href="/compare">对决</a> · <a href="/methodology">方法与规范</a></nav>',
    '</main>',
  ].join('\n');
}

function renderPage(baseHtml: string, page: SeoPage): string {
  const url = canonical(page);
  let html = baseHtml
    .replace(/<html\s+lang="[^"]*"/i, '<html lang="zh-CN"')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(url)}" />`)
    .replace(
      /<script\s+type="application\/ld\+json"\s+data-seo-jsonld>[\s\S]*?<\/script>/i,
      `<script type="application/ld+json" data-seo-jsonld>${JSON.stringify(buildJsonLd(page)).replaceAll('<', '\\u003c')}</script>`,
    )
    .replace('<div id="root"></div>', `<div id="root">${fallbackMarkup(page)}</div>`);

  html = replaceMeta(html, 'name', 'description', page.description);
  html = replaceMeta(html, 'name', 'robots', page.robots ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
  html = replaceMeta(html, 'property', 'og:type', 'website');
  html = replaceMeta(html, 'property', 'og:locale', 'zh_CN');
  html = replaceMeta(html, 'property', 'og:site_name', '封神榜 Wiki');
  html = replaceMeta(html, 'property', 'og:title', page.title);
  html = replaceMeta(html, 'property', 'og:description', page.description);
  html = replaceMeta(html, 'property', 'og:url', url);
  html = replaceMeta(html, 'property', 'og:image', DEFAULT_SOCIAL_IMAGE);
  html = replaceMeta(html, 'name', 'twitter:card', 'summary_large_image');
  html = replaceMeta(html, 'name', 'twitter:title', page.title);
  html = replaceMeta(html, 'name', 'twitter:description', page.description);
  html = replaceMeta(html, 'name', 'twitter:image', DEFAULT_SOCIAL_IMAGE);
  return html;
}

function outputPath(pathname: string): string {
  if (pathname === '/') return resolve(distDir, 'index.html');
  return resolve(distDir, `${pathname.slice(1)}.html`);
}

function writeRoutePages(routes: SeoPage[]) {
  const baseHtml = readFileSync(resolve(distDir, 'index.html'), 'utf8');
  for (const page of routes) {
    const target = outputPath(page.path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, renderPage(baseHtml, page));
  }
  const notFound: SeoPage = {
    path: '/404',
    title: '页面未找到｜封神榜 Wiki',
    description: '该页面不存在或已迁移，请返回封神榜 Wiki 首页。',
    heading: '页面未找到',
    kind: 'not-found',
    robots: 'noindex,follow',
  };
  writeFileSync(resolve(distDir, '404.html'), renderPage(baseHtml, notFound));
  console.log(`Static metadata shells generated for ${routes.length} routes plus 404.`);
}

const routes = buildSeoRoutes(loadData());
if (mode === 'public' || mode === 'all') writePublicFiles(routes);
if (mode === 'pages' || mode === 'all') writeRoutePages(routes);
