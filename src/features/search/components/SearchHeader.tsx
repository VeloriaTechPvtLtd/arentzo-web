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
        <div className="flex items-center gap-3 px-4 py-3 bg-white sticky top-0 z-10">
            <button
                onClick={() => navigate(-1)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Go back"
            >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search for sofa, table, and more"
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-sm"
                    autoFocus
                />
                {value && (
                    <button
                        onClick={onClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                    >
                        <X className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                )}
            </div>
        </div>
    );
};
