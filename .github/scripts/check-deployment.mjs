import assert from 'node:assert/strict';
const { SITE_URL: origin, GITHUB_SHA: commit, DEPLOY_ENVIRONMENT: environment } = process.env;
assert(origin && commit && environment, 'Missing deployment verification inputs');
let verified = false;
for (let attempt = 0; attempt < 12; attempt++) {
  try {
    const response = await fetch(`${origin}/deployment.json?commit=${commit}&attempt=${attempt}`, { cache: 'no-store', signal: AbortSignal.timeout(20000) });
    assert(response.ok, 'Deployment identity is unavailable');
    const identity = await response.json();
    assert.equal(identity.commit, commit);
    assert.equal(identity.environment, environment);
    verified = true;
    break;
  } catch (error) {
    if (attempt === 11) throw error;
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}
assert(verified);
for (const path of ['/', '/browse/', '/login/', '/signup/', '/product/?id=qa-smoke', '/my-rentals/?id=qa-smoke', '/robots.txt', '/sitemap.xml', '/.well-known/assetlinks.json', '/.well-known/apple-app-site-association']) {
  const response = await fetch(new URL(path, origin), { signal: AbortSignal.timeout(20000) });
  assert(response.ok, `${path} returned ${response.status}`);
  if (path.startsWith('/.well-known/')) await response.json();
  console.log(`PASS ${path}`);
}
console.log(`Verified ${environment} deployment at commit ${commit}`);
