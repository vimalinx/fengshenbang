import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const fixturePath = process.env.WIKI_E2E_FIXTURE;
let fixture;
const artifactDir = process.env.WIKI_E2E_ARTIFACTS || 'test-results';
fs.mkdirSync(artifactDir, { recursive: true });

function wikiUrl(title, query = '') {
  return `${fixture.baseUrl.replace(/\/$/, '')}/wiki/${encodeURIComponent(title).replace(/%3A/gi, ':')}${query}`;
}

async function loginThroughUi(page, username, password) {
  await page.goto(wikiUrl('特殊:用户登录'));
  await page.locator('#wpName1').fill(username);
  await page.locator('#wpPassword1').fill(password);
  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.locator('#wpLoginAttempt').click(),
  ]);
  await expect(page.locator('body')).toContainText(username);
}

test('public rendering and moderated publication work in a real browser', async ({ browser }) => {
  if (!fixturePath) {
    throw new Error('WIKI_E2E_FIXTURE must point to a mode-0600 browser fixture JSON file');
  }
  fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  const pageErrors = [];
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const publicPage = await desktop.newPage();
  publicPage.on('pageerror', error => pageErrors.push(error.message));

  await publicPage.goto(wikiUrl('首页'));
  await expect(publicPage).toHaveTitle(/封神榜 Wiki/);
  await expect(publicPage.getByRole('heading', { level: 1 })).toContainText('首页');
  await expect(publicPage.locator('body')).toContainText('面向公众协作的大模型知识库');
  await expect(publicPage.getByRole('link', { name: /创建账户|加入封神榜 Wiki/ }).first()).toBeVisible();
  await publicPage.screenshot({ path: path.join(artifactDir, '01-home-desktop.png'), fullPage: true });

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(wikiUrl('首页'));
  await expect(mobilePage.getByRole('heading', { level: 1 })).toBeVisible();
  const overflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
  await mobilePage.screenshot({ path: path.join(artifactDir, '02-home-mobile.png'), fullPage: true });
  await mobile.close();

  const contributorContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const contributor = await contributorContext.newPage();
  contributor.on('pageerror', error => pageErrors.push(error.message));
  await loginThroughUi(contributor, fixture.contributor, fixture.contributorPassword);
  await contributor.goto(wikiUrl(fixture.title, '?action=edit&veswitched=1'));
  await expect(contributor.locator('#wpTextbox1')).toBeVisible();
  await contributor.locator('#wpTextbox1').fill(`== 浏览器审批验收 ==\n${fixture.marker}`);
  await contributor.locator('#wpSummary').fill('浏览器端发布审批验收');
  await Promise.all([
    contributor.waitForLoadState('networkidle'),
    contributor.locator('#wpSave').click(),
  ]);
  await expect(contributor.locator('body')).toContainText('您的编辑已送交版主');
  await contributor.screenshot({ path: path.join(artifactDir, '03-contribution-queued.png'), fullPage: true });

  await publicPage.goto(wikiUrl(fixture.title));
  await expect(publicPage.locator('body')).not.toContainText(fixture.marker);

  const reviewerContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const reviewer = await reviewerContext.newPage();
  reviewer.on('pageerror', error => pageErrors.push(error.message));
  await loginThroughUi(reviewer, fixture.reviewer, fixture.reviewerPassword);
  await reviewer.goto(wikiUrl('特殊:Moderation'));
  const entry = reviewer.locator('.modline').filter({ hasText: fixture.title });
  await expect(entry).toBeVisible();
  await reviewer.screenshot({ path: path.join(artifactDir, '04-moderation-pending.png'), fullPage: true });
  await Promise.all([
    reviewer.waitForLoadState('networkidle'),
    entry.locator('a[href*="modaction=approve"][href*="modid="]').first().click(),
  ]);
  await expect(reviewer.locator('body')).toContainText(/已核准1次编辑|已核准 1 次编辑/);

  await publicPage.goto(wikiUrl(fixture.title));
  await expect(publicPage.locator('body')).toContainText(fixture.marker);
  await publicPage.screenshot({ path: path.join(artifactDir, '05-public-approved.png'), fullPage: true });

  await reviewerContext.close();
  await contributorContext.close();
  await desktop.close();
  expect(pageErrors, `uncaught browser errors: ${pageErrors.join('; ')}`).toEqual([]);
});
