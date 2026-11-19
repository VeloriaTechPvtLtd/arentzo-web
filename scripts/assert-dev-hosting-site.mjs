import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const expectedProject = 'rental-2c497';
const input = process.argv[2];
assert.ok(input, 'Pass the saved `firebase hosting:sites:list --json` response path.');
const response = JSON.parse(await readFile(input, 'utf8'));
const sites = response.result?.sites ?? response.sites ?? response.result ?? response;
assert.ok(Array.isArray(sites), 'Firebase did not return a Hosting site list.');
const siteIds = sites.map((site) => site.siteId ?? site.name?.split('/').at(-1)).filter(Boolean);
assert.ok(siteIds.includes(expectedProject), 'The expected Firebase Hosting site rental-2c497 was not returned.');
process.stdout.write('Verified Firebase Hosting site rental-2c497.\n');
