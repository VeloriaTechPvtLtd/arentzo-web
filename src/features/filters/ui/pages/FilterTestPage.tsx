'use client';

import React, { useState } from 'react';
import { FilterModal } from '../components/FilterModal';
import { Filter } from 'lucide-react';

export const FilterTestPage: React.FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    return (
        <div className="min-h-screen bg-secondary/20 p-8 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-8">Filter UI Demo</h1>

            <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all"
            >
                <Filter className="w-5 h-5" />
                Open Filters
            </button>

            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            />
        </div>
    );
};
