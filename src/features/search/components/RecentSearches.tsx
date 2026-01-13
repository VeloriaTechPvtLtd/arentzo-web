import React from 'react';
import { History } from 'lucide-react';

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
        <section className="search-section">
            <div className="search-section-header">
                <h3 className="search-section-title">Recent Searches</h3>
                <button
                    onClick={onClear}
                    className="search-section-action"
                >
                    Clear History
                </button>
            </div>

            <div className="recent-searches-grid">
                {searches.map((search) => (
                    <button
                        key={search.id}
                        onClick={() => onSelect(search)}
                        className="recent-search-pill"
                    >
                        {search.icon ? (
                            <span className="text-base">{search.icon}</span>
                        ) : (
                            <History size={14} className="text-[var(--muted-foreground)]" />
                        )}
                        <span>{search.label}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

