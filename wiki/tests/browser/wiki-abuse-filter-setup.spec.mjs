import crypto from 'node:crypto';
import fs from 'node:fs';
import { expect, test } from '@playwright/test';

const fixturePath = process.env.WIKI_ABUSE_FILTER_FIXTURE;
test.skip(!fixturePath, 'AbuseFilter administration fixture is not enabled');

function base32Decode(value) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const clean = value.replace(/\s+/g, '').replace(/=+$/g, '').toUpperCase();
  let bits = '';
  for (const char of clean) bits += alphabet.indexOf(char).toString(2).padStart(5, '0');
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(Number.parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(bytes);
}

function totp(secret) {
  const counter = BigInt(Math.floor(Date.now() / 1000 / 30));
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64BE(counter);
  const digest = crypto.createHmac('sha1', base32Decode(secret)).update(buffer).digest();
  const offset = digest[digest.length - 1] & 0x0f;
  return ((digest.readUInt32BE(offset) & 0x7fffffff) % 1_000_000).toString().padStart(6, '0');
}

test('administrator imports the conservative new-user bulk-link filter', async ({ page }) => {
  const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  const base = fixture.baseUrl.replace(/\/$/, '');
  await page.goto(`${base}/wiki/特殊:用户登录`);
  await page.locator('#wpName1').fill(fixture.username);
  await page.locator('#wpPassword1').fill(fixture.password);
  await Promise.all([page.waitForLoadState('networkidle'), page.locator('#wpLoginAttempt').click()]);
  await page.locator('#wpOATHToken').fill(totp(fixture.totpSecret));
  await Promise.all([page.waitForLoadState('networkidle'), page.locator('#wpLoginAttempt').click()]);
  await expect(page.locator('body')).toContainText(fixture.username);

  const filter = {
    data: {
      rules: 'user_editcount < 10 & added_links >= 4',
      name: '阻止新用户一次加入大量外链',
      comments: '公开试运行保守规则：编辑少于10次且一次新增至少4个外链时阻止保存。',
      group: 'default',
      actions: ['disallow'],
      enabled: true,
      deleted: false,
      privacylevel: 0,
      global: false,
    },
    actions: { disallow: [] },
  };
  await page.goto(`${base}/wiki/Special:AbuseFilter/import`);
  await page.locator('textarea[name="wpImportText"]').fill(JSON.stringify(filter));
  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.locator('.mw-htmlform-submit').click(),
  ]);
  await expect(page.locator('input[name="wpFilterDescription"]')).toHaveValue(filter.data.name);
  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.locator('#mw-abusefilter-editing-form input[type="submit"]').click(),
  ]);
  await expect(page.locator('body')).toContainText(filter.data.name);
});
