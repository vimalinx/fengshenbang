import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const fixturePath = process.env.WIKI_E2E_FIXTURE;
const artifactDir = process.env.WIKI_E2E_ARTIFACTS || 'test-results';
let fixture;

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

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
}

test.beforeAll(() => {
  if (!fixturePath) {
    throw new Error('WIKI_E2E_FIXTURE must point to a mode-0600 browser fixture JSON file');
  }
  fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  fs.mkdirSync(artifactDir, { recursive: true });
});

test('login and account creation use the portal visual system', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await page.goto(wikiUrl('特殊:用户登录'), { waitUntil: 'networkidle' });

  await expect(page.locator('#firstHeading')).toBeVisible();
  await expect(page.locator('#wpName1')).toBeVisible();
  const styles = await page.evaluate(() => {
    const body = getComputedStyle(document.body);
    const content = getComputedStyle(document.querySelector('.mw-body'));
    const heading = getComputedStyle(document.querySelector('#firstHeading'));
    const username = document.querySelector('#wpName1').getBoundingClientRect();
    return {
      bodyBackground: body.backgroundColor,
      contentBorderTop: content.borderTopColor,
      headingFont: heading.fontFamily,
      usernameHeight: username.height,
    };
  });
  expect(styles.bodyBackground).toBe('rgb(250, 250, 250)');
  expect(styles.contentBorderTop).toBe('rgb(184, 134, 11)');
  expect(styles.headingFont).toContain('Inter');
  expect(styles.usernameHeight).toBeGreaterThanOrEqual(44);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(artifactDir, '06-login-unified.png'), fullPage: true });

  await page.goto(wikiUrl('特殊:创建账户'), { waitUntil: 'networkidle' });
  await expect(page.locator('#firstHeading')).toBeVisible();
  await expect(page.locator('body')).toContainText(/创建账户|注册/);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(artifactDir, '07-create-account-unified.png'), fullPage: true });
  await context.close();
});

test('JSON data editor is branded, usable and explicit about moderation', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await loginThroughUi(page, fixture.contributor, fixture.contributorPassword);
  await page.goto(wikiUrl('数据:模型:gpt-5', '?action=edit'), { waitUntil: 'networkidle' });

  await expect(page.locator('.fsb-edit-notice')).toContainText('正在编辑主站实时数据');
  await expect(page.locator('.fsb-edit-notice')).toContainText('审核队列');
  const editor = page.locator('.ace_editor:visible, #wpTextbox1:visible').first();
  await expect(editor).toBeVisible();
  await expect(page.locator('#wpSummary')).toBeVisible();
  await expect(page.locator('#wpSave')).toBeVisible();

  const editorMetrics = await editor.evaluate(element => {
    const editorStyle = getComputedStyle(element);
    return {
      editorHeight: element.getBoundingClientRect().height,
      editorFont: editorStyle.fontFamily,
    };
  });
  const controlMetrics = await page.evaluate(() => {
    const save = document.querySelector('#wpSave');
    const notice = document.querySelector('.fsb-edit-notice');
    const saveStyle = getComputedStyle(save);
    const noticeStyle = getComputedStyle(notice);
    return {
      saveHeight: save.getBoundingClientRect().height,
      saveBackground: saveStyle.backgroundColor,
      noticeBorder: noticeStyle.borderLeftColor,
    };
  });
  expect(editorMetrics.editorHeight).toBeGreaterThan(400);
  expect(editorMetrics.editorFont).toMatch(/JetBrains Mono|SFMono-Regular/);
  expect(controlMetrics.saveHeight).toBeGreaterThanOrEqual(44);
  expect(controlMetrics.saveBackground).toBe('rgb(9, 9, 11)');
  expect(controlMetrics.noticeBorder).toBe('rgb(184, 134, 11)');
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(artifactDir, '08-data-editor-unified.png'), fullPage: true });
  await context.close();
});

test('editor remains usable on a narrow mobile viewport', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await loginThroughUi(page, fixture.contributor, fixture.contributorPassword);
  await page.goto(wikiUrl('数据:模型:gpt-5', '?action=edit'), { waitUntil: 'networkidle' });
  await expect(page.locator('.fsb-edit-notice')).toBeVisible();
  await expect(page.locator('.ace_editor:visible, #wpTextbox1:visible').first()).toBeVisible();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(artifactDir, '09-data-editor-mobile.png'), fullPage: true });
  await context.close();

  const landscape = await browser.newContext({ viewport: { width: 844, height: 390 }, reducedMotion: 'reduce' });
  const landscapePage = await landscape.newPage();
  await loginThroughUi(landscapePage, fixture.contributor, fixture.contributorPassword);
  await landscapePage.goto(wikiUrl('数据:模型:gpt-5', '?action=edit'), { waitUntil: 'networkidle' });
  await expect(landscapePage.locator('.fsb-edit-notice')).toBeVisible();
  await expect(landscapePage.locator('.ace_editor:visible, #wpTextbox1:visible').first()).toBeVisible();
  await expectNoHorizontalOverflow(landscapePage);
  await landscapePage.screenshot({ path: path.join(artifactDir, '09b-data-editor-landscape.png'), fullPage: true });
  await landscape.close();
});

test('reviewer workflow uses the same visual hierarchy', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  await loginThroughUi(page, fixture.reviewer, fixture.reviewerPassword);
  await page.goto(wikiUrl('特殊:Moderation'), { waitUntil: 'networkidle' });
  await expect(page.locator('#firstHeading')).toBeVisible();
  const borderTop = await page.locator('.mw-body').evaluate(element => getComputedStyle(element).borderTopColor);
  expect(borderTop).toBe('rgb(184, 134, 11)');
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: path.join(artifactDir, '10-moderation-unified.png'), fullPage: true });
  await context.close();
});
