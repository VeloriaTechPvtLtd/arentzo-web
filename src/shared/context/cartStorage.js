/** @typedef {import('../types/product').CartItem} CartItem */

export const CART_STORAGE_KEY = 'arentzo:guest-cart:v1';

/** @param {unknown} value @returns {value is CartItem} */
function isCartItem(value) {
    if (!value || typeof value !== 'object') return false;

    const item = /** @type {Record<string, unknown>} */ (value);
    if (typeof item.id !== 'string' || !item.id || !Number.isInteger(item.quantity) || item.quantity < 1) {
        return false;
    }

    if (!item.product || typeof item.product !== 'object') return false;
    const product = /** @type {Record<string, unknown>} */ (item.product);
    return product.id === item.id
        && typeof product.name === 'string'
        && typeof product.image === 'string'
        && typeof product.price === 'number'
        && Number.isFinite(product.price)
        && product.price >= 0;
}

/** @param {Pick<Storage, 'getItem'>} storage @returns {CartItem[]} */
export function loadCart(storage) {
    try {
        const serialized = storage.getItem(CART_STORAGE_KEY);
        if (!serialized) return [];

        const parsed = JSON.parse(serialized);
        return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
    } catch {
        return [];
    }
}

/** @param {Pick<Storage, 'setItem'>} storage @param {CartItem[]} items */
export function saveCart(storage, items) {
    try {
        storage.setItem(CART_STORAGE_KEY, JSON.stringify(items.filter(isCartItem)));
    } catch {
        // Storage can be disabled or full; the in-memory cart remains usable.
    }
}
