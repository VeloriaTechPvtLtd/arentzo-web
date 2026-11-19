import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { after, test } from 'node:test';
import { chromium } from 'playwright';

const baseURL = process.env.RESPONSIVE_BASE_URL ?? 'http://127.0.0.1:3005';
const productPath = '/product/0999d667-f53e-504e-bb7e-642a3787fa39';
const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

let browser;
after(async () => browser?.close());

test('launch local Chromium for responsive preview checks', async () => {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ?? (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  browser = await chromium.launch({ headless: true, executablePath });
});

for (const viewport of viewports) {
  test(`${viewport.name}: public landing and browse remain readable without page overflow`, async () => {
    const page = await browser.newPage({ viewport });
    try {
      await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' });
      await assertNoHorizontalOverflow(page, viewport);
      const landingText = await page.locator('body').innerText();
      assert.match(landingText, /Everything you need, on rent\./);
      assert.match(landingText, /Join Waitlist/);

      await page.goto(`${baseURL}/browse`, { waitUntil: 'domcontentloaded' });
      await page.getByRole('heading', { name: 'Browse rentals' }).waitFor();
      await assertNoHorizontalOverflow(page, viewport);
      const browseText = await page.locator('body').innerText();
      assert.match(browseText, /Browse rentals/);
      assert.match(browseText, /Login/);
      assert.match(browseText, /Sign Up/);
    } finally {
      await page.close();
    }
  });

  test(`${viewport.name}: product detail resolves to listing content or explicit recovery UI`, async () => {
    const page = await browser.newPage({ viewport });
    try {
      await page.goto(`${baseURL}${productPath}`, { waitUntil: 'domcontentloaded' });
      await page.getByRole('heading', { name: 'Product Details' }).waitFor();
      await page.getByText(/\[DEV TEST\] Electric city scooter|Listing unavailable/).waitFor();
      await assertNoHorizontalOverflow(page, viewport);
      const text = await page.locator('body').innerText();
      assert.match(text, /\[DEV TEST\] Electric city scooter|Listing unavailable/);
      if (text.includes('Listing unavailable')) {
        assert.match(text, /We could not load this listing right now\./);
        assert.match(text, /Try again/);
      }
    } finally {
      await page.close();
    }
  });

  test(`${viewport.name}: account rentals stay behind login when logged out`, async () => {
    const page = await browser.newPage({ viewport });
    try {
      await page.goto(`${baseURL}/my-rentals`, { waitUntil: 'domcontentloaded' });
      await page.waitForURL(/\/login\?next=/);
      await page.getByRole('heading', { name: 'Welcome back' }).waitFor();
      await assertNoHorizontalOverflow(page, viewport);
      assert.match(await page.locator('body').innerText(), /Sign in to continue to your rentals and account\./);
    } finally {
      await page.close();
    }
  });
}

async function assertNoHorizontalOverflow(page, viewport) {
  const dimensions = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
  }));
  assert.equal(dimensions.innerWidth, viewport.width);
  assert.ok(
    dimensions.documentWidth <= dimensions.innerWidth && dimensions.bodyWidth <= dimensions.innerWidth,
    `unexpected horizontal page overflow at ${viewport.name}: ${JSON.stringify(dimensions)}`,
  );
}
