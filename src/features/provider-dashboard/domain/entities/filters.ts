
export type FilterType = 'text' | 'select' | 'multi-select' | 'range' | 'date-range' | 'number-range';

export interface FilterConfig {
    id: string;
    label: string;
    type: FilterType;
    options?: { label: string; value: string }[]; // For select/multi-select
    min?: number;
    max?: number;
}

// Product Filters
export interface ProductFilterState {
    categories: string[];
    priceRange: { min: number | null; max: number | null };
    stockRange: { min: number | null; max: number | null };
    status: string[];
}

// Order Filters
export interface OrderFilterState {
    status: string[];
    dateRange: { from: Date | null; to: Date | null };
    amountRange: { min: number | null; max: number | null };
}

export type ProviderFilterState = ProductFilterState | OrderFilterState;
