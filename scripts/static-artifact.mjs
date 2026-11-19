import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PROVENANCE_FILE = 'build-provenance.txt';
export const ARTIFACT_SHA_FILE = 'artifact-sha256.txt';
export const ALLOWED_HIDDEN_FILES = [
  '.well-known/apple-app-site-association',
  '.well-known/assetlinks.json',
];

export async function listFiles(root) {
  const result = [];
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile()) result.push(path.relative(root, absolute).split(path.sep).join('/'));
      else assert.fail(`Unexpected non-file artifact entry: ${absolute}`);
    }
  }
  await visit(root);
  return result.sort();
}

export async function hashStaticArtifact(root) {
  const hash = createHash('sha256');
  for (const relative of await listFiles(root)) {
    if (relative === ARTIFACT_SHA_FILE) continue;
    const bytes = await readFile(path.join(root, relative));
    hash.update(relative);
    hash.update('\0');
    hash.update(String(bytes.byteLength));
    hash.update('\0');
    hash.update(bytes);
    hash.update('\0');
  }
  return hash.digest('hex');
}

export async function writeArtifactSha(root) {
  const digest = await hashStaticArtifact(root);
  await writeFile(path.join(root, ARTIFACT_SHA_FILE), `${digest}\n`, { flag: 'w' });
  return digest;
}

export async function verifyStaticArtifact({ root, expectedSha, expectedCommit, sourceRoot }) {
  const files = await listFiles(root);
  const hidden = files.filter((file) => file.split('/').some((part) => part.startsWith('.')));
  assert.deepEqual(hidden, ALLOWED_HIDDEN_FILES, 'Artifact must contain exactly the two approved .well-known files among hidden paths.');

  const sensitiveName = /(^|\/)(?:\.env(?:\.[^/]*)?|\.npmrc|\.netrc|credentials?(?:\.[^/]*)?|service[-_.]?account(?:\.[^/]*)?|id_(?:rsa|ed25519))(?:$|[._-])/i;
  const sensitiveExtension = /\.(?:pem|key|p12|pfx|jks|keystore)$/i;
  const sensitiveContents = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|sb_secret_[A-Za-z0-9_-]+|"private_key"\s*:/i;
  for (const file of files) {
    assert.ok(!sensitiveName.test(file), `Sensitive filename is forbidden: ${file}`);
    assert.ok(!sensitiveExtension.test(file), `Private key/certificate file is forbidden: ${file}`);
    const bytes = await readFile(path.join(root, file));
    assert.ok(!sensitiveContents.test(bytes.toString('utf8')), `Sensitive key material is forbidden: ${file}`);
  }

  const associationPaths = [
    '.well-known/assetlinks.json',
    '.well-known/apple-app-site-association',
  ];
  for (const relative of associationPaths) {
    const actual = await readFile(path.join(root, relative), 'utf8');
    const expected = await readFile(path.join(sourceRoot, 'public', relative), 'utf8');
    assert.ok(actual.trim().length > 0, `${relative} must not be empty.`);
    assert.equal(actual, expected, `${relative} must match the checked-in association body.`);
    JSON.parse(actual);
  }
  assert.match(await readFile(path.join(root, '.well-known/assetlinks.json'), 'utf8'), /delegate_permission\/common\.handle_all_urls/);
  assert.match(await readFile(path.join(root, '.well-known/apple-app-site-association'), 'utf8'), /"applinks"/);

  assert.match(expectedCommit, /^[0-9a-f]{40}$/i, 'Expected commit must be the exact Git SHA.');
  assert.equal((await readFile(path.join(root, PROVENANCE_FILE), 'utf8')).trim(), expectedCommit, 'Artifact provenance must contain the expected source SHA.');
  const recordedSha = (await readFile(path.join(root, ARTIFACT_SHA_FILE), 'utf8')).trim();
  assert.match(recordedSha, /^[0-9a-f]{64}$/i, 'Artifact SHA file must contain a SHA-256 digest.');
  const computedSha = await hashStaticArtifact(root);
  assert.equal(computedSha, recordedSha, 'Artifact contents do not match their recorded SHA-256.');
  if (expectedSha) assert.equal(computedSha, expectedSha, 'Downloaded artifact does not match the verified job output SHA-256.');
  return { sha256: computedSha, files };
}

async function main() {
  const [command, root = 'out', expectedSha, expectedCommit, sourceRoot = '.'] = process.argv.slice(2);
  if (command === 'write-sha') {
    process.stdout.write(`${await writeArtifactSha(root)}\n`);
    return;
  }
  if (command === 'verify') {
    assert.ok(expectedCommit, 'Expected source commit SHA argument required.');
    const result = await verifyStaticArtifact({ root, expectedSha, expectedCommit, sourceRoot });
    process.stdout.write(`Verified static artifact ${result.sha256} (${result.files.length} files).\n`);
    return;
  }
  throw new Error('Usage: node scripts/static-artifact.mjs write-sha [root] | verify [root] [expected-sha] [expected-commit] [source-root]');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
