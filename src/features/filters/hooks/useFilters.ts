import { useState, useCallback } from 'react';

export type FilterCategory = 'Type' | 'Properties' | 'Radius' | 'Ratings' | 'Condition' | 'Availability' | 'Delivery';

export interface FilterState {
    // Type
    listingType: string[];
    // Properties
    properties: string[];
    // Radius (km)
    radius: number;
    customRadius: boolean;
    // Ratings
    minRating: number | null;
    // Condition
    condition: string[];
    // Availability
    availabilityPeriod: string | null; // 'Now', 'Today', 'Week', 'Month'
    dateRange: { from: Date | null; to: Date | null };
    // Delivery
    deliveryOptions: string[];
}

const initialState: FilterState = {
    listingType: [],
    properties: [],
    radius: 5, // Default 5km
    customRadius: false,
    minRating: null,
    condition: [],
    availabilityPeriod: null,
    dateRange: { from: null, to: null },
    deliveryOptions: [],
};

export const useFilters = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<FilterCategory>('Type');
    const [filters, setFilters] = useState<FilterState>(initialState);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);
    
    const setCategory = useCallback((category: FilterCategory) => {
        setActiveCategory(category);
    }, []);

    const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(initialState);
    }, []);

    const activeFilterCount = Object.entries(filters).reduce((acc, [key, value]) => {
         if (Array.isArray(value)) return acc + value.length;
         if (key === 'radius' && value !== initialState.radius) return acc + 1; // Only count if changed
         if (key === 'minRating' && value !== null) return acc + 1;
         if (key === 'availabilityPeriod' && value !== null) return acc + 1;
         if (key === 'dateRange' && (value.from || value.to)) return acc + 1;
         return acc;
    }, 0);

    return {
        isOpen,
        toggleOpen,
        activeCategory,
        setCategory,
        filters,
        updateFilter,
        resetFilters,
        searchQuery,
        setSearchQuery,
        activeFilterCount
    };
};
