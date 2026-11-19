import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const projectId = 'rental-2c497';
const supabaseUrl = 'https://astiltnwyoxtcisedcyx.supabase.co';
const siteUrl = 'https://dev.arentzo.com';
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
assert.ok(!publishableKey || !anonKey || publishableKey === anonKey, 'Configure only one active browser key, or the same key under both supported names.');
const supabaseKey = publishableKey || anonKey;

assert.equal(process.env.GITHUB_REF, 'refs/heads/dev', 'Deployment verification is limited to the dev branch.');
assert.equal(process.env.NEXT_PUBLIC_SUPABASE_URL, supabaseUrl, 'Only Rental Dev Supabase may be used.');
assert.equal(process.env.NEXT_PUBLIC_SITE_URL, siteUrl, 'Only the verified Development site origin may be used.');

if (supabaseKey.startsWith('sb_publishable_')) {
  assert.match(supabaseKey, /^sb_publishable_[A-Za-z0-9_-]{16,80}$/, 'Use a valid Supabase publishable key.');
  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, { headers: { apikey: supabaseKey } });
    assert.ok(response.ok, 'The publishable key must be accepted by the configured Rental Dev project.');
  } catch {
    assert.fail('Could not verify the publishable key against the configured Rental Dev project.');
  }
} else {
  const parts = supabaseKey.split('.');
  assert.equal(parts.length, 3, 'The Dev browser key must be a Supabase publishable key or legacy anon JWT.');
  let claims;
  try {
    claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  } catch {
    assert.fail('The Dev browser key is not a valid JWT.');
  }
  assert.equal(claims.role, 'anon', 'The browser key must have the anon role.');
  assert.equal(claims.ref, 'astiltnwyoxtcisedcyx', 'The browser key must belong to Rental Dev.');
}

const firebaserc = JSON.parse(await readFile('.firebaserc', 'utf8'));
const firebase = JSON.parse(await readFile('firebase.json', 'utf8'));
assert.equal(firebaserc.projects?.dev, projectId, 'Firebase dev alias must remain rental-2c497.');
assert.deepEqual(firebaserc.targets?.[projectId]?.hosting?.dev, [projectId], 'The dev hosting target must map only to the verified site ID.');
assert.equal(firebase.hosting?.public, 'out', 'Firebase Hosting must serve only the static export directory.');
assert.ok(
  !firebase.hosting?.ignore?.includes('**/.*'),
  'Do not exclude hidden association files: publish the two required .well-known JSON assets from the static export.',
);
assert.ok(firebase.hosting?.ignore?.includes('**/.git/**'), 'Git metadata must remain excluded from Hosting.');
assert.deepEqual(firebase.hosting?.rewrites, [
  { regex: '^/product/[^/]+$', destination: '/legacy-product-route.html' },
  { regex: '^/my-rentals/[^/]+$', destination: '/legacy-rental-route.html' },
], 'Only the two static legacy-route compatibility pages may be rewritten.');
for (const file of ['legacy-product-route.html', 'legacy-rental-route.html', 'legacy-route-compat.js']) {
  assert.ok(await readFile(`public/${file}`, 'utf8'), `Required static compatibility asset is missing: ${file}`);
}

if (process.argv.includes('--check-export')) {
  const fragments = [];
  const relativeFiles = [];
  const sensitivePath = /(^|\/)(?:\.env(?:\.[^/]*)?|\.npmrc|\.netrc|credentials?(?:\.[^/]*)?|service[-_.]?account(?:\.[^/]*)?|id_(?:rsa|ed25519))(?:$|[._-])/i;
  const sensitiveExtension = /\.(?:pem|key|p12|pfx|jks|keystore)$/i;
  const sensitiveContents = /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|sb_secret_[A-Za-z0-9_-]+|"private_key"\s*:/i;
  const allowedHiddenFiles = [
    '.well-known/apple-app-site-association',
    '.well-known/assetlinks.json',
  ];
  async function collect(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) await collect(fullPath);
      else {
        const relativePath = path.relative('out', fullPath).split(path.sep).join('/');
        relativeFiles.push(relativePath);
        assert.ok(!sensitivePath.test(relativePath), `Sensitive filename is forbidden in the static export: ${relativePath}`);
        assert.ok(!sensitiveExtension.test(relativePath), `Private-key or certificate file is forbidden in the static export: ${relativePath}`);
        const file = await readFile(fullPath);
        if (sensitiveContents.test(file.toString('utf8'))) {
          assert.fail(`Sensitive key material is forbidden in the static export: ${relativePath}`);
        }
        if (/\.(?:html|js|json|css|xml|txt|svg)$/.test(entry.name)) {
          fragments.push(file.toString('utf8'));
        }
      }
    }
  }
  await collect('out');
  const hiddenFiles = relativeFiles.filter((file) => file.split('/').some((segment) => segment.startsWith('.'))).sort();
  assert.deepEqual(hiddenFiles, allowedHiddenFiles, 'The static export may contain only the two approved .well-known association files among hidden paths.');
  const output = fragments.join('\n');
  assert.ok(output.includes(supabaseUrl), 'The static bundle must point at Rental Dev.');
  assert.ok(output.includes(siteUrl), 'The static bundle must use dev.arentzo.com metadata.');
  assert.ok(output.includes(supabaseKey), 'The static bundle must contain the configured public browser key.');
  const embeddedSupabaseHosts = [...new Set(Array.from(output.matchAll(/https:\/\/([a-z0-9-]+\.supabase\.co)/g), (match) => match[1]))];
  assert.deepEqual(embeddedSupabaseHosts, [new URL(supabaseUrl).host], 'The bundle must contain only the configured Supabase project host.');
  assert.ok(!output.includes('ci.invalid'), 'CI placeholders must not leak into the Development bundle.');
}

process.stdout.write('Development static config validation passed.\n');
