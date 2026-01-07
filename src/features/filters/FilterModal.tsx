import React from 'react';
import { X, Search } from 'lucide-react';
import { useFilters } from './hooks/useFilters';
import { FilterSidebar } from './components/FilterSidebar';
import { FilterContent } from './components/FilterContent';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
    const {
        activeCategory,
        setCategory,
        filters,
        updateFilter,
        resetFilters,
        searchQuery,
        setSearchQuery
    } = useFilters();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-background sm:bg-black/50 sm:items-center sm:justify-center animate-in fade-in duration-200">
            <div className="w-full h-full sm:h-[85vh] sm:w-[90vw] md:w-[800px] bg-background sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl">

                {/* Header */}
                <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0 bg-background z-20">
                    <h2 className="text-2xl font-bold">Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-secondary transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className="px-6 py-4 shrink-0">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search across filters..."
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-transparent outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-1/3 border-r border-border overflow-y-auto hidden sm:block">
                        <FilterSidebar
                            activeCategory={activeCategory}
                            onSelectCategory={setCategory}
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto bg-secondary/5 p-6">
                        <FilterContent
                            category={activeCategory}
                            filters={filters}
                            onUpdate={updateFilter}
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-border bg-background flex gap-4 shrink-0">
                    <button
                        onClick={resetFilters}
                        className="flex-1 py-3.5 rounded-xl border border-border font-semibold hover:bg-secondary transition-colors"
                    >
                        Clear Filter
                    </button>
                    <button
                        onClick={() => {
                            console.log('Applying filters:', filters);
                            onClose();
                        }}
                        className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 transition-all active:scale-[0.98]"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};
