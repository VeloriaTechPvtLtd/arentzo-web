import test from 'node:test';
import assert from 'node:assert/strict';
import { RequestTimeoutError, requestWithTimeout } from '../src/features/catalog/domain/requestWithTimeout.js';

test('resolves a request that completes within its deadline', async () => {
    assert.equal(await requestWithTimeout(() => Promise.resolve('ok'), 100), 'ok');
});

test('rejects a stalled request with a typed timeout error', async () => {
    await assert.rejects(
        requestWithTimeout(() => new Promise(() => {}), 5),
        (error) => error instanceof RequestTimeoutError && error.code === 'REQUEST_TIMEOUT',
    );
});

test('captures synchronous failures from a request factory', async () => {
    await assert.rejects(requestWithTimeout(() => { throw new Error('setup failed'); }, 100), /setup failed/);
});
