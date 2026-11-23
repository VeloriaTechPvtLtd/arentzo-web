/** @template T @param {T[]} rows @param {number} offset */
export function rentalPage(rows, offset) {
  if (!Number.isSafeInteger(offset) || offset < 0) throw new Error('Invalid rental offset');
  return { items: rows.slice(0, 20), nextOffset: rows.length > 20 ? offset + 20 : null };
}
/** @template {{id:string}} T @param {T[]} previous @param {T[]} incoming @returns {T[]} */
export function mergeRentals(previous, incoming) {
  const records = new Map(previous.map(item => [item.id, item]));
  for (const item of incoming) records.set(item.id, item);
  return [...records.values()];
}
