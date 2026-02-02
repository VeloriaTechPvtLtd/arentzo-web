import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ChevronLeft, X } from 'lucide-react';
import '../styles/Search.css';

interface SearchHeaderProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ value, onChange, onClear }) => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`search-header-container ${isScrolled ? 'scrolled' : ''}`}>
            <div className="search-bar-wrapper">
                <button
                    onClick={() => navigate(-1)}
                    className="icon-button"
                    aria-label="Go back"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex-1 flex items-center gap-3">
                    {!value && <SearchIcon className="w-4 h-4 text-[var(--muted-foreground)] opacity-70" />}
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder="Search for furniture, mattresses..."
                        className="search-input"
                        autoFocus
                    />
                </div>

                {value && (
                    <button
                        onClick={onClear}
                        className="icon-button text-[var(--muted-foreground)] hover:text-[var(--destructive)]"
                        aria-label="Clear search"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>
        </header>
    );
};

