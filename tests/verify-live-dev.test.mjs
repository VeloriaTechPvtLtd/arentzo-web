import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { verifyLiveDev } from '../scripts/verify-live-dev.mjs';

const origin = 'https://dev.arentzo.com';
const commit = 'c'.repeat(40);
const sha = 'd'.repeat(64);
const sourceRoot = process.cwd();

function reply(body, contentType, cacheControl = '') {
  return new Response(body, { status: 200, headers: { 'content-type': contentType, 'cache-control': cacheControl } });
}

test('live verifier retries an old release, then checks exact provenance, SHA, and both JSON payloads', async () => {
  let attempts = 0;
  const calls = [];
  const fetchImpl = async (url, options) => {
    calls.push({ url, options });
    const path = new URL(url).pathname;
    if (path === '/build-provenance.txt') {
      attempts += 1;
      return reply(`${attempts === 1 ? 'b'.repeat(40) : commit}\n`, 'text/plain', 'no-store, max-age=0');
    }
    if (path === '/artifact-sha256.txt') return reply(`${sha}\n`, 'text/plain', 'no-store');
    if (path === '/.well-known/assetlinks.json') return reply(await readFile(pathname('assetlinks.json'), 'utf8'), 'application/json');
    if (path === '/.well-known/apple-app-site-association') return reply(await readFile(pathname('apple-app-site-association'), 'utf8'), 'application/json');
    throw new Error(`Unexpected URL ${url}`);
  };
  await verifyLiveDev({ origin, commit, artifactSha: sha, sourceRoot, fetchImpl, maxAttempts: 3, delayMs: 0 });
  assert.equal(attempts, 2);
  assert.ok(calls.every(({ options }) => options.cache === 'no-store'));
  assert.ok(calls.some(({ url }) => url.endsWith('/.well-known/assetlinks.json')));
  assert.ok(calls.some(({ url }) => url.endsWith('/.well-known/apple-app-site-association')));
});

test('live verifier rejects an old release after its bounded retry count', async () => {
  let attempts = 0;
  const fetchImpl = async (url) => {
    attempts += 1;
    return reply(`${'b'.repeat(40)}\n`, 'text/plain', 'no-store');
  };
  await assert.rejects(verifyLiveDev({ origin, commit, artifactSha: sha, sourceRoot, fetchImpl, maxAttempts: 2, delayMs: 0 }), /did not converge to expected SHA/);
  assert.equal(attempts, 2);
});

function pathname(filename) {
  return path.join(sourceRoot, 'public/.well-known', filename);
}
