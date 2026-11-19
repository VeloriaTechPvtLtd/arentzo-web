import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const commit = process.env.GITHUB_SHA ?? '';
assert.match(commit, /^[0-9a-f]{40}$/i, 'GITHUB_SHA must be a full commit SHA.');
await writeFile('out/build-provenance.txt', `${commit}\n`, { flag: 'w' });
process.stdout.write(`Wrote non-secret build provenance for ${commit}.\n`);
