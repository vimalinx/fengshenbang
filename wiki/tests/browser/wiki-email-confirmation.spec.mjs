import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const fixturePath = process.env.WIKI_EMAIL_E2E_FIXTURE;
test.skip(!fixturePath, 'real mailbox fixture is not enabled');

test('public registration requires a real mailbox confirmation before editing', async ({ page }) => {
  test.setTimeout(240_000);
  const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  const base = fixture.baseUrl.replace(/\/$/, '');
  const wikiUrl = (title, query = '') => `${base}/wiki/${encodeURIComponent(title).replace(/%3A/gi, ':')}${query}`;

  await page.goto(wikiUrl('特殊:创建账户'));
  await page.locator('#wpName2').fill(fixture.username);
  await page.locator('#wpPassword2').fill(fixture.password);
  await page.locator('#wpRetype').fill(fixture.password);
  await page.locator('#wpEmail').fill(fixture.email);
  await page.locator('#wpCaptchaWord').fill(fixture.captchaAnswer);
  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.locator('#wpCreateaccount').click(),
  ]);
  await expect(page.locator('body')).toContainText(fixture.username);

  await page.goto(wikiUrl(fixture.title, '?action=edit&veswitched=1'));
  await expect(page.locator('body')).toContainText(/确认.*电子邮件|电子邮件.*确认/);

  execFileSync('python3', [
    fixture.waitScript,
    '--username', fixture.username,
    '--baseline', fixture.baseline,
    '--output', fixture.confirmationUrl,
    '--timeout', '180',
  ], { stdio: ['ignore', 'inherit', 'inherit'] });
  const confirmationUrl = fs.readFileSync(fixture.confirmationUrl, 'utf8').trim();
  await page.goto(confirmationUrl);
  await expect(page.locator('body')).toContainText(/已确认|确认.*成功|电子邮件地址.*认证/);

  await page.goto(wikiUrl(fixture.title, '?action=edit&veswitched=1'));
  await expect(page.locator('#wpTextbox1')).toBeVisible();
  await page.locator('#wpTextbox1').fill(`== 邮件确认验收 ==\n${fixture.marker}`);
  await page.locator('#wpSummary').fill('真实邮箱确认验收');
  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.locator('#wpSave').click(),
  ]);
  await expect(page.locator('body')).toContainText('您的编辑已送交版主');
  await page.screenshot({
    path: path.join(fixture.artifactDir, 'email-confirmed-edit-queued.png'),
    fullPage: true,
  });
});
