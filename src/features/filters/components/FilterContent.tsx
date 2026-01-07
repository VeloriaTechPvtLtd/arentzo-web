import React from 'react';
import type { FilterCategory, FilterState } from '../hooks/useFilters';
import { TypeFilter } from './sections/TypeFilter';
import { RadiusFilter } from './sections/RadiusFilter';
import { RatingsFilter } from './sections/RatingsFilter';
import { AvailabilityFilter } from './sections/AvailabilityFilter';
import { GenericCheckboxFilter } from './sections/GenericCheckboxFilter';

interface FilterContentProps {
    category: FilterCategory;
    filters: FilterState;
    onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
}

export const FilterContent: React.FC<FilterContentProps> = ({ category, filters, onUpdate }) => {
    switch (category) {
        case 'Type':
            return <TypeFilter selected={filters.listingType} onChange={(val: string[]) => onUpdate('listingType', val)} />;
        case 'Radius':
            return <RadiusFilter
                radius={filters.radius}
                customRadius={filters.customRadius}
                onChangeRadius={(val: number) => onUpdate('radius', val)}
                onToggleCustom={(val: boolean) => onUpdate('customRadius', val)}
            />;
        case 'Ratings':
            return <RatingsFilter minRating={filters.minRating} onChange={(val: number | null) => onUpdate('minRating', val)} />;
        case 'Availability':
            return <AvailabilityFilter
                period={filters.availabilityPeriod}
                dateRange={filters.dateRange}
                onChangePeriod={(val: string | null) => onUpdate('availabilityPeriod', val)}
                onChangeDateRange={(val: { from: Date | null; to: Date | null }) => onUpdate('dateRange', val)}
            />;
        case 'Properties':
            return <GenericCheckboxFilter
                options={[
                    { id: 'instant_book', label: 'Instant Book' },
                    { id: 'verified', label: 'Verified Listing' },
                    { id: 'superhost', label: 'Superhost' },
                    { id: 'business_ready', label: 'Business Ready' }
                ]}
                selected={filters.properties}
                onChange={(val: string[]) => onUpdate('properties', val)}
            />;
        case 'Condition':
            return <GenericCheckboxFilter
                options={[
                    { id: 'new', label: 'New' },
                    { id: 'like_new', label: 'Like New' },
                    { id: 'good', label: 'Good' },
                    { id: 'fair', label: 'Fair' }
                ]}
                selected={filters.condition}
                onChange={(val: string[]) => onUpdate('condition', val)}
            />;
        case 'Delivery':
            return <GenericCheckboxFilter
                options={[
                    { id: 'pickup', label: 'Pickup' },
                    { id: 'delivery', label: 'Delivery Available' },
                    { id: 'shipping', label: 'Shipping' }
                ]}
                selected={filters.deliveryOptions}
                onChange={(val: string[]) => onUpdate('deliveryOptions', val)}
            />;
        default:
            return <div>Select a category</div>;
    }
};
