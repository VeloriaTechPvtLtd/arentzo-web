import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, X } from 'lucide-react';

interface SearchHeaderProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ value, onChange, onClear }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center gap-3 px-4 py-3 bg-[var(--card)] sticky top-0 z-10 transition-colors duration-200">
            <button
                onClick={() => navigate(-1)}
                className="p-1 hover:bg-[var(--muted)] rounded-full transition-colors"
                aria-label="Go back"
            >
                <ChevronLeft className="w-6 h-6 text-[var(--foreground)]" />
            </button>

            <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search for sofa, table, and more"
                    className="w-full pl-10 pr-10 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder-[var(--muted-foreground)] outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all shadow-sm"
                    autoFocus
                />
                {value && (
                    <button
                        onClick={onClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 bg-[var(--muted)] rounded-full hover:bg-[var(--border)] transition-colors"
                    >
                        <X className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
                    </button>
                )}
            </div>
        </div>
    );
};
