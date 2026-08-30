import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const portalUrl = process.env.PORTAL_URL;
const artifactDir = process.env.PORTAL_E2E_ARTIFACTS || 'test-results/portal-wiki-backend';

test.describe('React portal backed by approved Wiki data', () => {
  test.skip(!portalUrl, 'PORTAL_URL is required for the portal integration acceptance test');

  test('loads Wiki data and exposes per-entry edit routes', async ({ browser }) => {
    fs.mkdirSync(artifactDir, { recursive: true });
    const errors = [];
    const apiRequests = [];
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      if (request.url().includes('/w/api.php')) apiRequests.push(request.url());
    });

    await page.goto(portalUrl, { waitUntil: 'networkidle' });
    await expect(page.getByRole('status')).toContainText('Wiki 实时数据');
    expect(apiRequests.length).toBeGreaterThanOrEqual(3);
    await page.screenshot({ path: path.join(artifactDir, '01-home-wiki-live.png'), fullPage: true });

    await page.goto(new URL('/models/gpt-5', portalUrl).toString(), { waitUntil: 'networkidle' });
    const modelEdit = page.getByRole('link', { name: '编辑数据' });
    await expect(modelEdit).toBeVisible();
    await expect(modelEdit).toHaveAttribute('href', /\/wiki\/(?:数据:模型:gpt-5|%E6%95%B0%E6%8D%AE%3A%E6%A8%A1%E5%9E%8B%3Agpt-5)\?action=edit$/i);
    await page.screenshot({ path: path.join(artifactDir, '02-model-edit-route.png'), fullPage: true });

    await page.goto(new URL('/benchmarks/aider-polyglot', portalUrl).toString(), { waitUntil: 'networkidle' });
    const benchmarkEdit = page.getByRole('link', { name: '编辑数据' });
    await expect(benchmarkEdit).toBeVisible();
    await expect(benchmarkEdit).toHaveAttribute('href', /\/wiki\/(?:数据:测试集:aider-polyglot|%E6%95%B0%E6%8D%AE%3A%E6%B5%8B%E8%AF%95%E9%9B%86%3Aaider-polyglot)\?action=edit$/i);

    expect(errors, `uncaught browser errors: ${errors.join('; ')}`).toEqual([]);
    await context.close();
  });

  test('remains usable on narrow mobile and landscape viewports', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      isMobile: true,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto(portalUrl, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: '打开导航' }).click();
    await expect(page.getByRole('paragraph').filter({ hasText: /^Wiki 实时数据$/ })).toBeVisible();
    await expect(page.getByRole('link', { name: '参与 Wiki 编辑' })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(2);
    await page.screenshot({ path: path.join(artifactDir, '03-mobile-menu.png'), fullPage: true });
    await context.close();

    const landscape = await browser.newContext({ viewport: { width: 844, height: 390 } });
    const landscapePage = await landscape.newPage();
    await landscapePage.goto(portalUrl, { waitUntil: 'networkidle' });
    expect(await landscapePage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(2);
    await expect(landscapePage.getByRole('button', { name: '打开导航' })).toBeVisible();
    await landscape.close();
  });

  test('falls back to the shipped snapshot when Wiki is unavailable', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.route('**/w/api.php**', route => route.abort('failed'));
    const page = await context.newPage();
    await page.goto(portalUrl, { waitUntil: 'networkidle' });
    await expect(page.getByRole('status')).toContainText('发布快照');
    await page.goto(new URL('/models/gpt-5', portalUrl).toString(), { waitUntil: 'networkidle' });
    await expect(page.getByRole('heading', { name: 'GPT-5', level: 1 })).toBeVisible();
    await context.close();
  });
});
