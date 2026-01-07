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
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Recent Searches</h3>
                <button
                    onClick={onClear}
                    className="text-sm font-medium text-[var(--primary)] hover:opacity-80"
                >
                    Clear
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {searches.map((search) => (
                    <button
                        key={search.id}
                        onClick={() => onSelect(search)}
                        className="flex items-center gap-2 px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm text-[var(--foreground)] hover:border-[var(--muted-foreground)] active:bg-[var(--muted)] transition-colors"
                    >
                        {search.icon && <span className="text-[var(--muted-foreground)]">{search.icon}</span>}
                        <span>{search.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
