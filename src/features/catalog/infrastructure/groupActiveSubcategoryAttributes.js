/**
 * Group only enabled capability rows from the Supabase attribute DTO.
 * Unknown or disabled rows must not make a renter-facing policy appear eligible.
 *
 * @param {unknown[]} rows
 * @returns {Map<string, string[]>}
 */
export function groupActiveSubcategoryAttributes(rows) {
  const grouped = new Map();
  for (const row of rows) {
    if (!row || typeof row !== 'object') continue;
    const dto = /** @type {Record<string, unknown>} */ (row);
    if (dto.is_active !== true || typeof dto.subcategory_id !== 'string' || !dto.subcategory_id
      || typeof dto.attribute_key !== 'string' || !dto.attribute_key) continue;
    const keys = grouped.get(dto.subcategory_id) || [];
    if (!keys.includes(dto.attribute_key)) keys.push(dto.attribute_key);
    grouped.set(dto.subcategory_id, keys);
  }
  return grouped;
}
