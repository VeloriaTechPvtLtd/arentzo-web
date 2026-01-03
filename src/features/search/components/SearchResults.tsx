import React from 'react';
import { Settings2, ArrowUpDown } from 'lucide-react';
import { PriceDrop } from './PriceDrop'; // Reusing card design for now or we could make a specific one.

interface SearchResultItem {
    id: string;
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    tags?: string[];
}

interface SearchResultsProps {
    query: string;
    results: SearchResultItem[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, results }) => {
    // For this implementation I will reuse the grid/card layout similar to PriceDrop but adapted
    return (
        <div className="pb-20">
            <div className="sticky top-[73px] z-10 bg-gray-50/95 backdrop-blur-sm border-b border-gray-100 px-4 py-2 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                    Results for "<span className="font-semibold text-gray-900">{query}</span>"
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Settings2 className="w-4 h-4" />
                        Filters
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <ArrowUpDown className="w-4 h-4" />
                        Sort
                    </button>
                </div>
            </div>

            <PriceDrop items={results} />
        </div>
    );
};
