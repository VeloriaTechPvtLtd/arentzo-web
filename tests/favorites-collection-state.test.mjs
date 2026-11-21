import assert from 'node:assert/strict';
import test from 'node:test';
import {
  beginFavoritesLoad,
  completeFavoriteRemoval,
  completeFavoritesLoad,
  failFavoriteMutation,
  failFavoritesLoad,
} from '../src/features/favorites/domain/favoriteCollectionState.mjs';

const saved = (id) => ({ id, name: `Item ${id}` });
const ready = { userId: 'user-a', items: [saved('one'), saved('two')], loading: false, loadError: false, mutationError: false };

test('reload preserves current-account items while account switches clear stale items', () => {
  assert.deepEqual(beginFavoritesLoad(ready, 'user-a').items, ready.items);
  const switched = beginFavoritesLoad(ready, 'user-b');
  assert.deepEqual(switched.items, []);
  assert.equal(switched.loading, true);
});

test('load failure keeps already rendered items and remains retryable', () => {
  const loading = beginFavoritesLoad(ready, 'user-a');
  const failed = failFavoritesLoad(loading, 'user-a');
  assert.deepEqual(failed.items, ready.items);
  assert.equal(failed.loading, false);
  assert.equal(failed.loadError, true);
  assert.deepEqual(completeFavoritesLoad('user-a', [saved('three')]).items, [saved('three')]);
});

test('confirmed removal updates only the matching account', () => {
  assert.deepEqual(completeFavoriteRemoval(ready, 'user-a', 'one').items, [saved('two')]);
  assert.strictEqual(completeFavoriteRemoval(ready, 'user-b', 'one'), ready);
});

test('failed removal preserves saved items and reports mutation uncertainty', () => {
  const failed = failFavoriteMutation(ready, 'user-a');
  assert.deepEqual(failed.items, ready.items);
  assert.equal(failed.mutationError, true);
  assert.strictEqual(failFavoriteMutation(ready, 'user-b'), ready);
});
