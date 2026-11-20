import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const source = readFileSync(join(root, 'src/shared/components/layout/Footer.tsx'), 'utf8');

function pageRoutes(directory) {
  const routes = new Set();
  const walk = (folder) => {
    for (const name of readdirSync(folder)) {
      const path = join(folder, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (name === 'page.tsx') {
        const segments = relative(directory, path).split('/').slice(0, -1).filter((part) => !part.startsWith('('));
        if (!segments.some((part) => part.startsWith('['))) routes.add(`/${segments.join('/')}`.replace(/\/$/, '') || '/');
      }
    }
  };
  walk(directory);
  return routes;
}

const routes = pageRoutes(join(root, 'src/app'));
const declaredHrefs = [...source.matchAll(/href: '([^']+)'/g)].map((match) => match[1]);
const categoryBlock = source.match(/const categories = \[([\s\S]*?)\];/)?.[1] ?? '';
const categories = [...categoryBlock.matchAll(/'([^']+)'/g)].map((match) => match[1]);

test('every static footer destination is a real application page', () => {
  assert.ok(declaredHrefs.length > 10);
  for (const href of declaredHrefs) assert.ok(routes.has(href), `${href} must have a page.tsx`);
});

test('category navigation uses the real searchable route and preserves category names', () => {
  assert.deepEqual(categories, ['Cars', 'Furniture', 'Bikes', 'Electronics']);
  assert.ok(routes.has('/search'));
  assert.match(source, /href={`\/search\?q=\$\{encodeURIComponent\(category\)\}`}/);
  for (const category of categories) assert.equal(decodeURIComponent(encodeURIComponent(category)), category);
  assert.doesNotMatch(source, /\/categor(?:y|ies)/);
});

test('footer contains no placeholder, guessed store, social, or remote image destinations', () => {
  assert.doesNotMatch(source, /href=["']#["']/);
  assert.doesNotMatch(source, /App Store|Google Play|Facebook|Twitter|Instagram|Linkedin|Github/);
  assert.doesNotMatch(source, /<img|https?:\/\//);
});
