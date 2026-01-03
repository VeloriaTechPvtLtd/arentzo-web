import React from 'react';
import { FilterCategory } from '../hooks/useFilters';


interface FilterSidebarProps {
    activeCategory: FilterCategory;
    onSelectCategory: (category: FilterCategory) => void;
}

const CATEGORIES: FilterCategory[] = [
    'Type',
    'Properties',
    'Radius',
    'Ratings',
    'Condition',
    'Availability',
    'Delivery'
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ activeCategory, onSelectCategory }) => {
    return (
        <div className="py-2">
            {CATEGORIES.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`w-full text-left px-6 py-4 font-medium transition-all relative flex items-center justify-between
                        ${activeCategory === category
                            ? 'bg-primary/5 text-primary'
                            : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                        }`}
                >
                    {category}
                    {activeCategory === category && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                    )}
                </button>
            ))}
        </div>
    );
};
