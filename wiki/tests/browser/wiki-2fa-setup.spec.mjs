import crypto from 'node:crypto';
import fs from 'node:fs';
import { expect, test } from '@playwright/test';

const fixturePath = process.env.WIKI_2FA_FIXTURE;
const outputPath = process.env.WIKI_2FA_OUTPUT;
test.skip(!fixturePath || !outputPath, 'operational 2FA setup fixture is not enabled');

function base32Decode(value) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const clean = value.replace(/\s+/g, '').replace(/=+$/g, '').toUpperCase();
  let bits = '';
  for (const char of clean) bits += alphabet.indexOf(char).toString(2).padStart(5, '0');
  const bytes = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(Number.parseInt(bits.slice(i, i + 8), 2));
  return Buffer.from(bytes);
}

function totp(secret, at = Date.now()) {
  const counter = BigInt(Math.floor(at / 1000 / 30));
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64BE(counter);
  const digest = crypto.createHmac('sha1', base32Decode(secret)).update(buffer).digest();
  const offset = digest[digest.length - 1] & 0x0f;
  const code = (digest.readUInt32BE(offset) & 0x7fffffff) % 1_000_000;
  return code.toString().padStart(6, '0');
}

async function passwordLogin(page, base, account) {
  await page.goto(`${base}/wiki/特殊:用户登录`);
  await page.locator('#wpName1').fill(account.username);
  await page.locator('#wpPassword1').fill(account.password);
  await Promise.all([page.waitForLoadState('networkidle'), page.locator('#wpLoginAttempt').click()]);
}

test('all operational roles enroll TOTP and can log in with it', async ({ browser }) => {
  test.setTimeout(300_000);
  const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  const base = fixture.baseUrl.replace(/\/$/, '');
  const enrolled = [];

  for (const account of fixture.accounts) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await passwordLogin(page, base, account);
    await expect(page.locator('body')).toContainText(account.username);
    await page.goto(`${base}/wiki/Special:OATHManage?action=enable&module=totp`);
    const values = (await page.locator('kbd').allTextContents()).map(value => value.replace(/\s+/g, ''));
    expect(values.length).toBeGreaterThan(2);
    const secret = values[0];
    const recoveryCodes = values.slice(1);
    await page.locator('input[name="token"]').fill(totp(secret));
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.locator('.mw-htmlform-submit').click(),
    ]);
    await expect(page.locator('body')).toContainText(/已验证双重(?:身份验证|认证)凭据/);
    await context.close();

    const waitMs = (31 - (Math.floor(Date.now() / 1000) % 30)) * 1000;
    await new Promise(resolve => setTimeout(resolve, waitMs));
    const verifyContext = await browser.newContext();
    const verifyPage = await verifyContext.newPage();
    await passwordLogin(verifyPage, base, account);
    await expect(verifyPage.locator('#wpOATHToken')).toBeVisible();
    await verifyPage.locator('#wpOATHToken').fill(totp(secret));
    await Promise.all([
      verifyPage.waitForLoadState('networkidle'),
      verifyPage.locator('#wpLoginAttempt').click(),
    ]);
    await expect(verifyPage.locator('body')).toContainText(account.username);
    await verifyContext.close();
    enrolled.push({ username: account.username, role: account.role, secret, recoveryCodes });
  }

  fs.writeFileSync(outputPath, `${JSON.stringify({ accounts: enrolled })}\n`, { mode: 0o600 });
});
