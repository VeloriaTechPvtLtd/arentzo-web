import React from 'react';

interface RecentSearch {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface RecentSearchesProps {
    searches: RecentSearch[];
    onSelect: (search: RecentSearch) => void;
    onClear: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({ searches, onSelect, onClear }) => {
    if (searches.length === 0) return null;

    return (
        <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Recent Searches</h3>
                <button
                    onClick={onClear}
                    className="text-sm font-medium text-orange-500 hover:text-orange-600"
                >
                    Clear
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {searches.map((search) => (
                    <button
                        key={search.id}
                        onClick={() => onSelect(search)}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 active:bg-gray-50 transition-colors"
                    >
                        {search.icon && <span className="text-gray-400">{search.icon}</span>}
                        <span>{search.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
