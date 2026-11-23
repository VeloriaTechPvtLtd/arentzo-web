import { CartError } from '../../cart/domain/cartValidation.mjs';

const reasons = {
  dates_unavailable: 'These dates are unavailable. Choose different dates.',
  product_inactive: 'This listing is no longer available.',
  insufficient_quantity: 'Reduce the quantity or choose another listing.',
  dates_required: 'Choose a start and end date.',
  subscription_unavailable: 'Subscriptions are unavailable for this listing.',
  subscription_plan_unavailable: 'This subscription plan is unavailable.',
};
/** Advisory only. Never authorizes a reservation, payment or removal from cart. */
export function parseCheckoutPreflight(data, selectedIds) {
  const invalid = () => { throw new CartError('backend', 'Availability could not be confirmed. Reload your cart and try again.'); };
  if (!data || typeof data !== 'object' || typeof data.available !== 'boolean' || !Array.isArray(data.conflicts)) return invalid();
  const selected = new Set(selectedIds);
  const conflicts = data.conflicts.map(conflict => {
    if (!conflict || !selected.has(conflict.cart_item_id) || typeof conflict.reason !== 'string') return invalid();
    return { cartItemId: conflict.cart_item_id, message: Object.hasOwn(reasons, conflict.reason) ? reasons[conflict.reason] : 'This item needs review. Reload your cart or contact support.' };
  });
  // Never turn contradictory or incomplete evidence into an all-clear.
  if (data.available !== (conflicts.length === 0)) return invalid();
  return { available: data.available, conflicts };
}
