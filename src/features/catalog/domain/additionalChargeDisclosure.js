/** @typedef {{ key: string, label: string, value: number }} AdditionalChargeDisclosure */

const COMMON_FIELDS = [
  ['late_fee_per_hour', 'Late return rate', (value) => `₹${value} per hour`],
  ['cleaning_fee', 'Cleaning amount', (value) => `₹${value} per dirty return`],
  ['damage_fee', 'Damage policy amount', (value) => `₹${value} per incident`],
  ['late_grace_minutes', 'Late return grace period', (value) => `${value} minutes`],
];

const FUEL_FIELDS = [
  ['fuel_refill_fee_per_litre', 'Fuel refill rate', (value) => `₹${value} per missing litre`],
  ['required_fuel_percent', 'Required fuel at return', (value) => `${value}%`],
];

const DISTANCE_FIELDS = [
  ['included_km_per_day', 'Included distance', (value) => `${value} km per day`],
  ['overage_fee_per_km', 'Excess distance rate', (value) => `₹${value} per km`],
];

const INSTALLATION_FIELDS = [
  ['installation_fee', 'Installation / assembly amount', (value) => `₹${value} per rental`],
];

const ELECTRIC_FUEL_TYPES = new Set(['electric', 'electricity', 'ev', 'battery', 'none']);

function asObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(value);
}

/**
 * Map stored provider policy values into disclosure rows. This never computes
 * checkout totals and intentionally omits absent, non-numeric, and ineligible fields.
 *
 * @param {{ attributes?: string[], specifications?: unknown, pricingRules?: unknown, usageLimits?: unknown }} input
 * @returns {Array<AdditionalChargeDisclosure & { displayValue: string }>}
 */
export function mapAdditionalChargeDisclosure(input) {
  const attributes = new Set(Array.isArray(input.attributes) ? input.attributes : []);
  const specifications = asObject(input.specifications);
  const fuelType = typeof specifications.fuel_type === 'string'
    ? specifications.fuel_type.trim().toLowerCase()
    : '';
  const isFuelEligible = attributes.has('fuel_type') && fuelType !== '' && !ELECTRIC_FUEL_TYPES.has(fuelType);
  const isDistanceEligible = attributes.has('included_km_per_day');
  const isInstallationEligible = attributes.has('assembly_included') || attributes.has('setup_included');

  const pricing = asObject(input.pricingRules);
  const usage = asObject(input.usageLimits);
  const pricingCharges = asObject(pricing.additional_charges);
  const usageCharges = asObject(usage.additional_charges);
  const saved = {
    ...(isDistanceEligible && typeof specifications.included_km_per_day === 'number'
      ? { included_km_per_day: specifications.included_km_per_day }
      : {}),
    ...pricingCharges,
    ...usageCharges,
  };

  const fields = [
    ...COMMON_FIELDS,
    ...(isInstallationEligible ? INSTALLATION_FIELDS : []),
    ...(isDistanceEligible ? DISTANCE_FIELDS : []),
    ...(isFuelEligible ? FUEL_FIELDS : []),
  ];

  return fields.flatMap(([key, label, format]) => {
    const value = saved[key];
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return [];
    const displayNumber = formatNumber(value);
    return [{ key, label, value, displayValue: format(displayNumber) }];
  });
}
