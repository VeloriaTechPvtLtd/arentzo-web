import { useState, useCallback } from 'react';

export const useProviderFilters = <T>(initialState: T) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<T>(initialState);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);
    
    const openFilters = useCallback(() => setIsOpen(true), []);
    const closeFilters = useCallback(() => setIsOpen(false), []);

    const updateFilter = useCallback((key: keyof T, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(initialState);
    }, [initialState]);

    // specific for counting active filters
    const activeFilterCount = Object.values(filters as any).reduce((acc: number, value: any) => {
        if (Array.isArray(value) && value.length > 0) return acc + 1;
        if (typeof value === 'object' && value !== null) {
            if ('min' in value && (value.min !== null || value.max !== null)) return acc + 1;
            if ('from' in value && (value.from !== null || value.to !== null)) return acc + 1;
        }
        return acc;
    }, 0);

    return {
        isOpen,
        toggleOpen,
        openFilters,
        closeFilters,
        filters,
        updateFilter,
        resetFilters,
        searchQuery,
        setSearchQuery,
        activeFilterCount
    };
};
