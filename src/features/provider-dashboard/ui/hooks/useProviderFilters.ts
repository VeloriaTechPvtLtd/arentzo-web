import { useState, useCallback } from 'react';

export const useProviderFilters = <T>(initialState: T) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<T>(initialState);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

    const openFilters = useCallback(() => setIsOpen(true), []);
    const closeFilters = useCallback(() => setIsOpen(false), []);

    const updateFilter = useCallback((key: keyof T, value: unknown) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(initialState);
    }, [initialState]);

    // specific for counting active filters
    const activeFilterCount = Object.values(filters as Record<string, unknown>).reduce((acc: number, value: unknown) => {
        if (Array.isArray(value) && value.length > 0) return acc + 1;
        if (typeof value === 'object' && value !== null) {
            const valObj = value as Record<string, unknown>;
            if ('min' in valObj && (valObj.min !== null || valObj.max !== null)) return acc + 1;
            if ('from' in valObj && (valObj.from !== null || valObj.to !== null)) return acc + 1;
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
