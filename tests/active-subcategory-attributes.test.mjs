import test from 'node:test';
import assert from 'node:assert/strict';
import { groupActiveSubcategoryAttributes } from '../src/features/catalog/infrastructure/groupActiveSubcategoryAttributes.js';

test('groups only active attribute capabilities and ignores duplicate or malformed DTO rows', () => {
  const grouped = groupActiveSubcategoryAttributes([
    { subcategory_id: 'electric', attribute_key: 'included_km_per_day', is_active: true },
    { subcategory_id: 'electric', attribute_key: 'fuel_type', is_active: false },
    { subcategory_id: 'electric', attribute_key: 'included_km_per_day', is_active: true },
    { subcategory_id: 'petrol', attribute_key: 'fuel_type', is_active: true },
    { subcategory_id: 'petrol', attribute_key: 'ignored_by_legacy_row' },
    { subcategory_id: '', attribute_key: 'fuel_type', is_active: true },
    null,
  ]);

  assert.deepEqual([...grouped.entries()], [
    ['electric', ['included_km_per_day']],
    ['petrol', ['fuel_type']],
  ]);
});
