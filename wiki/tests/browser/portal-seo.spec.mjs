import { expect, test } from '@playwright/test';

const portalUrl = process.env.PORTAL_URL;

test.describe('portal SEO and answer-engine discoverability', () => {
  test.skip(!portalUrl, 'PORTAL_URL is required');

  test('serves route-specific source metadata without JavaScript', async ({ request }) => {
    const response = await request.get(new URL('/models/gpt-5', portalUrl).toString());
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('<title>GPT-5：能力、价格、测试与使用建议｜封神榜 Wiki</title>');
    expect(html).toContain('<link rel="canonical" href="https://fengshenbang.wiki/models/gpt-5"');
    expect(html).toContain('data-seo-jsonld');
    expect(html).toContain('data-seo-fallback');
    expect(html).toContain('<h1>GPT-5 模型档案</h1>');
  });

  test('updates metadata across client-side navigation', async ({ page }) => {
    await page.goto(new URL('/models', portalUrl).toString(), { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle('大模型图鉴与能力榜｜封神榜 Wiki');
    await page.locator('a[href="/models/gpt-5"]').first().click();
    await expect(page).toHaveTitle('GPT-5：能力、价格、测试与使用建议｜封神榜 Wiki');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://fengshenbang.wiki/models/gpt-5');
    const graph = JSON.parse(await page.locator('script[data-seo-jsonld]').textContent());
    expect(graph['@context']).toBe('https://schema.org');
    expect(graph['@graph'].some((item) => item['@type'] === 'TechArticle')).toBeTruthy();
  });

  test('publishes crawler discovery files and methodology', async ({ request, page }) => {
    const [robots, sitemap, llms] = await Promise.all([
      request.get(new URL('/robots.txt', portalUrl).toString()),
      request.get(new URL('/sitemap.xml', portalUrl).toString()),
      request.get(new URL('/llms.txt', portalUrl).toString()),
    ]);
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain('User-agent: OAI-SearchBot');
    expect(sitemap.status()).toBe(200);
    expect((await sitemap.text()).match(/<loc>/g)?.length).toBeGreaterThan(100);
    expect(llms.status()).toBe(200);
    expect(await llms.text()).toContain('数据方法与编审规范');

    await page.goto(new URL('/methodology', portalUrl).toString(), { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: '数据方法、信源与编审规范', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: '从投稿到主站' })).toBeVisible();
  });
});
