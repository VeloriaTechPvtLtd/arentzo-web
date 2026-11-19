import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { hashStaticArtifact, verifyStaticArtifact, writeArtifactSha } from '../scripts/static-artifact.mjs';

const commit = 'a'.repeat(40);
const sourceBodies = {
  'assetlinks.json': '[{"relation":["delegate_permission/common.handle_all_urls"]}]\n',
  'apple-app-site-association': '{"applinks":{"details":[]}}\n',
};

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), 'arentzo-static-artifact-'));
  const sourceRoot = path.join(root, 'source');
  const out = path.join(root, 'out');
  await mkdir(path.join(sourceRoot, 'public/.well-known'), { recursive: true });
  await mkdir(path.join(out, '.well-known'), { recursive: true });
  await writeFile(path.join(out, 'index.html'), '<main>static</main>');
  await writeFile(path.join(out, 'build-provenance.txt'), `${commit}\n`);
  for (const [name, body] of Object.entries(sourceBodies)) {
    await writeFile(path.join(sourceRoot, 'public/.well-known', name), body);
    await writeFile(path.join(out, '.well-known', name), body);
  }
  return { root, sourceRoot, out };
}

test('artifact hash survives hidden-file package roundtrip and validates association bodies/provenance', async () => {
  const f = await fixture();
  try {
    const sha = await writeArtifactSha(f.out);
    const packed = path.join(f.root, 'packed');
    await cp(f.out, packed, { recursive: true, preserveTimestamps: true });
    const verified = await verifyStaticArtifact({ root: packed, expectedSha: sha, expectedCommit: commit, sourceRoot: f.sourceRoot });
    assert.equal(verified.sha256, sha);
    assert.equal(await readFile(path.join(packed, '.well-known/assetlinks.json'), 'utf8'), sourceBodies['assetlinks.json']);
  } finally {
    await rm(f.root, { recursive: true, force: true });
  }
});

test('artifact verifier rejects missing hidden association files and stale/modified payloads', async () => {
  const f = await fixture();
  try {
    const sha = await writeArtifactSha(f.out);
    await rm(path.join(f.out, '.well-known/assetlinks.json'));
    await assert.rejects(verifyStaticArtifact({ root: f.out, expectedSha: sha, expectedCommit: commit, sourceRoot: f.sourceRoot }));
  } finally {
    await rm(f.root, { recursive: true, force: true });
  }
});

test('artifact verifier rejects stale build provenance and tampered artifact SHA', async () => {
  const f = await fixture();
  try {
    const sha = await writeArtifactSha(f.out);
    await writeFile(path.join(f.out, 'build-provenance.txt'), `${'b'.repeat(40)}\n`);
    await assert.rejects(verifyStaticArtifact({ root: f.out, expectedSha: sha, expectedCommit: commit, sourceRoot: f.sourceRoot }), /provenance/);
  } finally {
    await rm(f.root, { recursive: true, force: true });
  }
});

test('artifact verifier rejects a payload changed after its SHA was written', async () => {
  const f = await fixture();
  try {
    const sha = await writeArtifactSha(f.out);
    await writeFile(path.join(f.out, 'index.html'), '<main>modified</main>');
    await assert.rejects(verifyStaticArtifact({ root: f.out, expectedSha: sha, expectedCommit: commit, sourceRoot: f.sourceRoot }), /recorded SHA-256/);
  } finally {
    await rm(f.root, { recursive: true, force: true });
  }
});
