import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

export async function verifyLiveDev({ origin, commit, artifactSha, sourceRoot = '.', fetchImpl = fetch, maxAttempts = 8, delayMs = 5000 }) {
  assert.match(commit, /^[0-9a-f]{40}$/i, 'Expected release must be a full Git SHA.');
  assert.match(artifactSha, /^[0-9a-f]{64}$/i, 'Expected artifact must be a SHA-256 digest.');

  const checks = [
    { path: '/build-provenance.txt', expected: `${commit}\n`, contentType: /text\/plain/i, uncached: true },
    { path: '/artifact-sha256.txt', expected: `${artifactSha}\n`, contentType: /text\/plain/i, uncached: true },
    { path: '/.well-known/assetlinks.json', expected: await readFile(`${sourceRoot}/public/.well-known/assetlinks.json`, 'utf8'), contentType: /application\/json/i },
    { path: '/.well-known/apple-app-site-association', expected: await readFile(`${sourceRoot}/public/.well-known/apple-app-site-association`, 'utf8'), contentType: /application\/json/i },
  ];

  async function check() {
    for (const { path, expected, contentType, uncached } of checks) {
      const response = await fetchImpl(`${origin}${path}`, { cache: 'no-store', headers: { 'cache-control': 'no-cache' } });
      assert.equal(response.status, 200, `${path} returned HTTP ${response.status}.`);
      assert.match(response.headers.get('content-type') ?? '', contentType, `${path} has an unexpected Content-Type.`);
      assert.equal(await response.text(), expected, `${path} body does not match the deployed build.`);
      if (uncached) assert.match(response.headers.get('cache-control') ?? '', /no-store/i, `${path} must be served without cache.`);
    }
  }

  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await check();
      return;
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error(`Live Dev release did not converge to expected SHA ${commit} after ${maxAttempts} attempts. Last error: ${lastError?.message}`);
}

async function main() {
  const commit = process.env.GITHUB_SHA ?? '';
  const artifactSha = process.env.EXPECTED_ARTIFACT_SHA ?? '';
  await verifyLiveDev({ origin: 'https://dev.arentzo.com', commit, artifactSha });
  process.stdout.write(`Live Dev release verified for ${commit} (artifact ${artifactSha}).\n`);
}

if (process.argv[1] && process.argv[1].endsWith('/verify-live-dev.mjs')) await main();
