import assert from 'node:assert/strict';
import { existsSync, mkdirSync } from 'node:fs';
import { after, test } from 'node:test';
import { chromium } from 'playwright';

const baseURL = process.env.RESPONSIVE_BASE_URL ?? 'http://127.0.0.1:3005';
const fixtureId = 'qa-fixture-product-0001';
const fixturePath = `/product/${fixtureId}`;
const evidenceDir = process.env.RESPONSIVE_ARTIFACT_DIR ?? '/tmp/arentzo-web-responsive-evidence';
const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];
const fixtureProduct = {
  id: fixtureId,
  title: 'Fixture commuter bicycle (mock only)',
  name: 'Fixture commuter bicycle (mock only)',
  daily_rate: 480,
  discounted_rate_per_day: 480,
  original_price_per_day: 600,
  currency: 'INR',
  rating: 0,
  average_rating: 0,
  review_count: 0,
  total_reviews: 0,
  images: [],
  media: null,
  image_url: null,
  thumbnail_url: null,
  brand: 'Local fixture only',
  description: 'Synthetic fixture for browser layout testing; not a real offer.',
  category_id: 'fixture-category',
  subcategory_id: 'fixture-subcategory',
  quantity_available: 1,
  is_active: true,
  deleted_at: null,
  specifications: { fuel_type: 'Petrol', included_km_per_day: 80 },
  pricing_rules: {
    additional_charges: { late_fee_per_hour: 50, overage_fee_per_km: 7, fuel_refill_fee_per_litre: 90 },
  },
  usage_limits: { additional_charges: { late_grace_minutes: 10, included_km_per_day: 80 } },
};

let browser;
after(async () => browser?.close());

test('launch local Chromium for responsive preview checks', async () => {
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    ?? (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  browser = await chromium.launch({ headless: true, executablePath });
  mkdirSync(evidenceDir, { recursive: true });
});

for (const viewport of viewports) {
  test(`${viewport.name}: landing and browse expose readable key content without page overflow`, async () => {
    const page = await browser.newPage({ viewport });
    try {
      await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' });
      const hero = page.getByRole('heading', { name: 'Everything you need, on rent.' });
      await hero.waitFor();
      assert.ok(await hero.isVisible());
      assert.ok(await textMeetsMinimum(hero, 24, 1));
      const subtitle = page.getByText('Cars, bikes, electronics, furniture — from verified providers near you.');
      assert.ok(await subtitle.isVisible());
      assert.ok(await textMeetsMinimum(subtitle, 14));
      assert.match(await page.locator('body').innerText(), /Join Waitlist/);
      await assertNoHorizontalOverflow(page, viewport);
      await page.screenshot({ path: `${evidenceDir}/landing-${viewport.name}.png`, fullPage: true });

      await page.goto(`${baseURL}/browse`, { waitUntil: 'domcontentloaded' });
      const heading = page.getByRole('heading', { name: 'Browse rentals' });
      await heading.waitFor();
      assert.ok(await heading.isVisible());
      assert.ok(await textMeetsMinimum(heading, 20, 1));
      const browseText = await page.locator('body').innerText();
      assert.match(browseText, /Login/);
      assert.match(browseText, /Sign Up/);
      await assertNoHorizontalOverflow(page, viewport);
    } finally {
      await page.close();
    }
  });

  test(`${viewport.name}: product detail renders a complete synthetic QA fixture`, async () => {
    const page = await browser.newPage({ viewport });
    await installProductFixture(page);
    try {
      await page.goto(`${baseURL}${fixturePath}`, { waitUntil: 'domcontentloaded' });
      const title = page.getByRole('heading', { name: fixtureProduct.title });
      await title.waitFor();
      assert.ok(await title.isVisible());
      assert.ok(await textMeetsMinimum(title, 20));
      await page.getByText('₹480.00', { exact: true }).waitFor();
      await page.getByText('Late return rate', { exact: true }).waitFor();
      await page.getByText('₹50 per hour', { exact: true }).waitFor();
      await page.getByText('80 km per day', { exact: true }).waitFor();
      await page.getByText('₹7 per km', { exact: true }).waitFor();

      const policyText = await page.locator('.additional-charge-disclosures__list').innerText();
      assert.ok(policyText.indexOf('Late return rate') < policyText.indexOf('Late return grace period'));
      assert.ok(policyText.indexOf('Late return grace period') < policyText.indexOf('Included distance'));
      assert.ok(policyText.indexOf('Included distance') < policyText.indexOf('Excess distance rate'));
      assert.doesNotMatch(policyText, /Fuel refill rate|Required fuel at return/);
      assert.ok(await textMeetsMinimum(page.locator('.price-value'), 14));
      assert.match(await page.locator('body').innerText(), /Local fixture only|not a real offer/i);
      await assertNoHorizontalOverflow(page, viewport);
      await page.screenshot({ path: `${evidenceDir}/product-${viewport.name}.png` });
      await page.locator('.additional-charge-disclosures').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${evidenceDir}/policy-${viewport.name}.png` });
    } finally {
      await page.close();
    }
  });

  test(`${viewport.name}: account rentals redirect to login when logged out`, async () => {
    const page = await browser.newPage({ viewport });
    try {
      await page.goto(`${baseURL}/my-rentals`, { waitUntil: 'domcontentloaded' });
      await page.waitForURL(/\/login\?next=/);
      const heading = page.getByRole('heading', { name: 'Welcome back' });
      await heading.waitFor();
      assert.ok(await heading.isVisible());
      assert.ok(await textMeetsMinimum(heading, 20, 1));
      assert.match(await page.locator('body').innerText(), /Sign in to continue to your rentals and account\./);
      await assertNoHorizontalOverflow(page, viewport);
    } finally {
      await page.close();
    }
  });
}

test('product failure shows retry and a subsequent successful fixture load clears the fault', async () => {
  const viewport = viewports[0];
  const page = await browser.newPage({ viewport });
  const fixture = await installProductFixture(page, { failFirstDetailRequest: true });
  try {
    await page.goto(`${baseURL}${fixturePath}`, { waitUntil: 'domcontentloaded' });
    await page.getByText('We could not load this listing right now.').waitFor();
    assert.ok(await page.getByRole('button', { name: 'Try again' }).isVisible());
    await page.getByRole('button', { name: 'Try again' }).click();
    await page.getByRole('heading', { name: fixtureProduct.title }).waitFor();
    assert.equal(fixture.detailRequests, 2);
    assert.equal(await page.getByText('Listing unavailable').count(), 0);
  } finally {
    await page.close();
  }
});

async function installProductFixture(page, { failFirstDetailRequest = false } = {}) {
  const requests = { detailRequests: 0 };
  await page.route('**/rest/v1/**', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const headers = {
      'access-control-allow-origin': baseURL,
      'access-control-allow-headers': 'apikey, authorization, x-client-info, content-type, prefer, accept-profile, content-profile',
      'access-control-allow-methods': 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
      'access-control-expose-headers': 'content-range, x-supabase-api-version',
    };
    if (request.method() === 'OPTIONS') {
      await route.fulfill({ status: 204, headers });
      return;
    }
    const table = url.pathname.split('/').at(-1);
    let body = [];
    if (table === 'products' && url.searchParams.has('id')) {
      requests.detailRequests += 1;
      if (failFirstDetailRequest && requests.detailRequests === 1) {
        await route.fulfill({ status: 503, headers, contentType: 'application/json', body: JSON.stringify({ message: 'Synthetic fixture outage' }) });
        return;
      }
      body = [fixtureProduct];
    } else if (table === 'subcategory_attributes') {
      body = [
        { subcategory_id: 'fixture-subcategory', attribute_key: 'included_km_per_day', is_active: true },
        { subcategory_id: 'fixture-subcategory', attribute_key: 'fuel_type', is_active: false },
      ];
    }
    await route.fulfill({ status: 200, headers, contentType: 'application/json', body: JSON.stringify(body) });
  });
  return requests;
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

async function textMeetsMinimum(locator, minimumFontSize, minimumLineHeightRatio = 1.15) {
  const result = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    return { fontSize: Number.parseFloat(style.fontSize), lineHeight: Number.parseFloat(style.lineHeight) };
  });
  return result.fontSize >= minimumFontSize
    && Number.isFinite(result.lineHeight)
    && result.lineHeight / result.fontSize >= minimumLineHeightRatio;
}
