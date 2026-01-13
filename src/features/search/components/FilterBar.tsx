import React from 'react';
import { SlidersHorizontal, ArrowUpDown, ChevronDown, Zap, Sparkles } from 'lucide-react';
import '../Search.css';

const FILTERS = [
    { id: 'filter', label: 'Filters', icon: SlidersHorizontal, hasDropdown: true, active: true },
    { id: 'sort', label: 'Sort', icon: ArrowUpDown, hasDropdown: true },
    { id: 'fast_delivery', label: 'Fast Delivery', icon: Zap },
    { id: 'new_arrivals', label: 'New Arrivals', icon: Sparkles },
    { id: 'price_low_high', label: 'Price: Low to High' },
];

export const FilterBar: React.FC = () => {
    return (
        <nav className="filter-bar scroll-smooth">
            {FILTERS.map((filter) => (
                <button
                    key={filter.id}
                    className={`filter-pill ${filter.active ? 'active' : ''}`}
                >
                    {filter.icon && <filter.icon size={14} className={filter.active ? 'text-[var(--primary-foreground)]' : 'text-[var(--primary)]'} />}
                    <span>{filter.label}</span>
                    {filter.hasDropdown && <ChevronDown size={14} className="ml-0.5 opacity-60" />}
                </button>
            ))}
        </nav>
    );
};

