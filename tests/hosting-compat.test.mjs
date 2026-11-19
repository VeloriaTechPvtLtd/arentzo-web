import assert from 'node:assert/strict';
import { mkdirSync, readFileSync } from 'node:fs';
import { after, test } from 'node:test';
import { chromium } from 'playwright';

const baseURL = process.env.RESPONSIVE_BASE_URL ?? 'http://127.0.0.1:5000';
const evidenceDir = process.env.RESPONSIVE_ARTIFACT_DIR ?? '/tmp/arentzo-dev-route-evidence';
const viewports = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];
let browser;

after(async () => browser?.close());

test('launch Chromium against the local Hosting emulator', async () => {
  browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ?? (!process.env.CI ? '/usr/bin/chromium' : undefined),
  });
  mkdirSync(evidenceDir, { recursive: true });
});

for (const viewport of viewports) {
  test(`${viewport.name}: legacy product deep link survives direct load and reload`, async () => {
    const page = await newFixturePage(viewport);
    const origin = new URL(baseURL).origin;
    const legacyPath = '/product/qa-fixture-product-0001?utm_source=legacy&next=https%3A%2F%2Fevil.example#specs';
    try {
      await page.goto(`${origin}${legacyPath}`, { waitUntil: 'domcontentloaded' });
      await waitForProductCanonicalRoute(page);
      assertProductRouteAndQuery(page, origin);

      await page.evaluate((path) => history.replaceState(null, '', path), legacyPath);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await waitForProductCanonicalRoute(page);
      assertProductRouteAndQuery(page, origin);
      await page.screenshot({ path: `${evidenceDir}/legacy-product-${viewport.name}.png`, fullPage: true });
    } finally {
      await page.close();
    }
  });

  test(`${viewport.name}: legacy rental deep link survives direct load and reload into safe auth landing`, async () => {
    const page = await newFixturePage(viewport);
    const origin = new URL(baseURL).origin;
    const legacyPath = '/my-rentals/booking_fixture_0001?utm_source=legacy&next=https%3A%2F%2Fevil.example';
    try {
      await page.goto(`${origin}${legacyPath}`, { waitUntil: 'domcontentloaded' });
      await waitForSafeLogin(page, origin);
      assertSafeRentalReturnPath(page, origin);

      await page.evaluate((path) => history.replaceState(null, '', path), legacyPath);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await waitForSafeLogin(page, origin);
      assertSafeRentalReturnPath(page, origin);
      await page.screenshot({ path: `${evidenceDir}/legacy-rental-login-${viewport.name}.png`, fullPage: true });
    } finally {
      await page.close();
    }
  });
}

test('invalid legacy IDs and nested detail paths are rejected without external redirects', async () => {
  const page = await newFixturePage(viewports[0]);
  const origin = new URL(baseURL).origin;
  try {
    await page.goto(`${origin}/product/bad!id?next=https%3A%2F%2Fevil.example`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('alert').getByText('This link is invalid or unavailable.').waitFor({ timeout: 8000 });
    assert.equal(new URL(page.url()).origin, origin);
    assert.equal(new URL(page.url()).pathname, '/product/bad!id');
    assert.equal(new URL(page.url()).searchParams.get('next'), 'https://evil.example');

    const response = await page.goto(`${origin}/product/qa-fixture-product-0001/nested`, { waitUntil: 'domcontentloaded' });
    assert.equal(new URL(page.url()).origin, origin);
    assert.equal(response?.status(), 404, 'only a single legacy ID segment should be rewritten');
    assert.equal(new URL(page.url()).searchParams.has('id'), false);
  } finally {
    await page.close();
  }
});

test('Dev provenance and artifact SHA are uncached and match the workflow commit when present', { skip: !process.env.EXPECTED_ARTIFACT_SHA || !process.env.GITHUB_SHA }, async () => {
  const expectedSha = process.env.EXPECTED_ARTIFACT_SHA;
  const expectedCommit = process.env.GITHUB_SHA;
  const checks = [
    { path: '/build-provenance.txt', expected: `${expectedCommit}\n` },
    { path: '/artifact-sha256.txt', expected: `${expectedSha}\n` },
  ];
  for (const check of checks) {
    const response = await fetch(`${baseURL}${check.path}`, { cache: 'no-store' });
    assert.equal(response.status, 200);
    assert.match(response.headers.get('cache-control') ?? '', /no-store/i);
    assert.equal(await response.text(), check.expected);
  }
});

test('Android and Apple association paths serve their original JSON rather than the app fallback', async () => {
  const page = await browser.newPage();
  const checks = [
    { path: '/.well-known/assetlinks.json', expected: 'delegate_permission/common.handle_all_urls', source: 'public/.well-known/assetlinks.json' },
    { path: '/.well-known/apple-app-site-association', expected: 'applinks', source: 'public/.well-known/apple-app-site-association' },
  ];
  try {
    for (const check of checks) {
      const response = await page.request.get(`${baseURL}${check.path}`);
      assert.equal(response.status(), 200, `${check.path} should return a successful static response`);
      assert.match(response.headers()['content-type'] ?? '', /application\/json/i);
      const body = await response.text();
      assert.match(body, new RegExp(check.expected));
      assert.equal(body, readFileSync(check.source, 'utf8'), `${check.path} must serve its complete checked-in JSON body.`);
      JSON.parse(body);
      assert.doesNotMatch(body, /<!doctype html|<html/i);
    }
  } finally {
    await page.close();
  }
});

async function newFixturePage(viewport) {
  const page = await browser.newPage({ viewport });
  page.setDefaultTimeout(8000);
  page.setDefaultNavigationTimeout(8000);
  await page.route('https://astiltnwyoxtcisedcyx.supabase.co/**', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
  });
  return page;
}

async function waitForProductCanonicalRoute(page) {
  await page.waitForFunction(() => {
    const url = new URL(window.location.href);
    return url.pathname.replace(/\/$/, '') === '/product' && url.searchParams.has('id');
  });
}

function assertProductRouteAndQuery(page, origin) {
  const url = new URL(page.url());
  assert.equal(url.origin, origin);
  assert.equal(url.pathname.replace(/\/$/, ''), '/product');
  assert.equal(url.searchParams.get('id'), 'qa-fixture-product-0001');
  assert.equal(url.searchParams.get('utm_source'), 'legacy');
  assert.equal(url.searchParams.has('next'), false, 'untrusted next parameters must not be propagated');
  assert.equal(url.hash, '#specs');
}

async function waitForSafeLogin(page, origin) {
  await page.waitForFunction((expectedOrigin) => {
    const url = new URL(window.location.href);
    const next = url.searchParams.get('next') ?? '';
    return url.origin === expectedOrigin
      && url.pathname.replace(/\/$/, '') === '/login'
      && next.startsWith('/my-rentals/?');
  }, origin);
  await page.getByRole('heading', { name: 'Welcome back' }).waitFor();
}

function assertSafeRentalReturnPath(page, origin) {
  const login = new URL(page.url());
  const next = login.searchParams.get('next') ?? '';
  assert.equal(login.origin, origin);
  assert.equal(login.pathname.replace(/\/$/, ''), '/login');
  assert.ok(next.startsWith('/my-rentals/?'));
  assert.match(next, /booking_fixture_0001/);
  assert.match(next, /utm_source=legacy/);
  assert.doesNotMatch(next, /evil\.example/);
}
