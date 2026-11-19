import test from 'node:test';
import assert from 'node:assert/strict';
import { CART_STORAGE_KEY, loadCart, saveCart } from '../src/shared/context/cartStorage.js';

function createStorage(initial = {}) {
    const values = new Map(Object.entries(initial));
    return {
        getItem: (key) => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, value),
        values,
    };
}

const validItem = {
    id: 'camera-1',
    quantity: 2,
    product: { id: 'camera-1', name: 'Camera', image: '/camera.jpg', price: 1200 },
};

test('saves a guest cart and restores it from local storage', () => {
    const storage = createStorage();

    saveCart(storage, [validItem]);

    assert.deepEqual(loadCart(storage), [validItem]);
    assert.equal(storage.values.has(CART_STORAGE_KEY), true);
});

test('recovers from malformed data and discards invalid cart rows', () => {
    const malformedStorage = createStorage({ [CART_STORAGE_KEY]: '{bad json' });
    assert.deepEqual(loadCart(malformedStorage), []);

    const mixedStorage = createStorage({
        [CART_STORAGE_KEY]: JSON.stringify([validItem, { ...validItem, quantity: 0 }, { ...validItem, id: 'other' }]),
    });
    assert.deepEqual(loadCart(mixedStorage), [validItem]);
});

test('storage failures do not break the in-memory cart path', () => {
    const unavailableStorage = {
        getItem() { throw new Error('storage disabled'); },
        setItem() { throw new Error('storage full'); },
    };

    assert.deepEqual(loadCart(unavailableStorage), []);
    assert.doesNotThrow(() => saveCart(unavailableStorage, [validItem]));
});

test('does not persist malformed entries', () => {
    const storage = createStorage();

    saveCart(storage, [validItem, { ...validItem, product: { ...validItem.product, price: Number.NaN } }]);

    assert.deepEqual(loadCart(storage), [validItem]);
});
