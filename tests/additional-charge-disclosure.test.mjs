import test from 'node:test';
import assert from 'node:assert/strict';
import { mapAdditionalChargeDisclosure } from '../src/features/catalog/domain/additionalChargeDisclosure.js';

const row = (disclosures, key) => disclosures.find((item) => item.key === key);

test('discloses configured petrol motorcycle rates and limits only when eligible', () => {
    const disclosures = mapAdditionalChargeDisclosure({
        attributes: ['fuel_type', 'included_km_per_day'],
        specifications: { fuel_type: 'Petrol', included_km_per_day: 90 },
        pricingRules: { additional_charges: { late_fee_per_hour: 125, fuel_refill_fee_per_litre: 110 } },
        usageLimits: { additional_charges: { late_grace_minutes: 15, included_km_per_day: 90, overage_fee_per_km: 8, required_fuel_percent: 80 } },
    });

    assert.equal(row(disclosures, 'late_fee_per_hour').displayValue, '₹125 per hour');
    assert.equal(row(disclosures, 'included_km_per_day').displayValue, '90 km per day');
    assert.equal(row(disclosures, 'fuel_refill_fee_per_litre').displayValue, '₹110 per missing litre');
    assert.equal(row(disclosures, 'required_fuel_percent').displayValue, '80%');
    assert.equal(row(disclosures, 'cleaning_fee'), undefined);
    assert.deepEqual(disclosures.map(({ key }) => key), [
        'late_fee_per_hour',
        'late_grace_minutes',
        'included_km_per_day',
        'overage_fee_per_km',
        'fuel_refill_fee_per_litre',
        'required_fuel_percent',
    ]);
});

test('does not disclose fuel fields for an electric scooter, even if stale fuel values exist', () => {
    const disclosures = mapAdditionalChargeDisclosure({
        attributes: ['fuel_type', 'included_km_per_day'],
        specifications: { fuel_type: 'Electric', included_km_per_day: 45 },
        pricingRules: { additional_charges: { fuel_refill_fee_per_litre: 99, overage_fee_per_km: 5 } },
        usageLimits: { additional_charges: { required_fuel_percent: 100 } },
    });

    assert.equal(row(disclosures, 'included_km_per_day').displayValue, '45 km per day');
    assert.equal(row(disclosures, 'overage_fee_per_km').displayValue, '₹5 per km');
    assert.equal(row(disclosures, 'fuel_refill_fee_per_litre'), undefined);
    assert.equal(row(disclosures, 'required_fuel_percent'), undefined);
});

test('discloses furniture assembly policy without vehicle-only fuel or distance fields', () => {
    const disclosures = mapAdditionalChargeDisclosure({
        attributes: ['assembly_included'],
        specifications: {},
        pricingRules: { additional_charges: { installation_fee: 250, damage_fee: 0 } },
        usageLimits: { additional_charges: { late_grace_minutes: 0, included_km_per_day: 10 } },
    });

    assert.equal(row(disclosures, 'installation_fee').displayValue, '₹250 per rental');
    assert.equal(row(disclosures, 'damage_fee').displayValue, '₹0 per incident');
    assert.equal(row(disclosures, 'late_grace_minutes').displayValue, '0 minutes');
    assert.equal(row(disclosures, 'included_km_per_day'), undefined);
    assert.equal(row(disclosures, 'fuel_refill_fee_per_litre'), undefined);
});

test('leaves missing, invalid, and ineligible values unconfigured instead of defaulting them to zero', () => {
    const disclosures = mapAdditionalChargeDisclosure({
        attributes: [],
        pricingRules: { additional_charges: { cleaning_fee: '', damage_fee: null, late_fee_per_hour: -2 } },
        usageLimits: { additional_charges: { late_grace_minutes: Number.NaN } },
    });

    assert.deepEqual(disclosures, []);
});
