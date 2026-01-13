import React from 'react';
import { FilterBar } from './FilterBar';
import { ProductCard } from '../../../shared/components/ui/ProductCard';
import { Search } from 'lucide-react';

interface SearchResultItem {
    id: string;
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    isImported?: boolean;
    isWishlisted?: boolean;
}

interface SearchResultsProps {
    query: string;
    results: SearchResultItem[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query, results }) => {
    return (
        <div className="flex flex-col">
            <div className="px-4 py-3 bg-[var(--background)]">
                <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-widest">
                    Showing results for <span className="text-[var(--primary)] font-bold">"{query}"</span>
                </div>
            </div>

            <div className="sticky top-[72px] z-10 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] mb-4">
                <FilterBar />
            </div>

            {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 pb-20">
                    {results.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={{
                                ...product,
                                name: product.title,
                                price: product.price * 100, // assuming cents
                                isAvailable: true,
                                brand: product.isImported ? 'Imported' : 'Premium'
                            } as any}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 px-10 text-center animate-fade-in">
                    <div className="w-24 h-24 bg-gradient-to-br from-[var(--muted)] to-[var(--border)] rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <Search size={40} className="text-[var(--muted-foreground)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] tracking-tight">No results found</h3>
                    <p className="text-[var(--muted-foreground)] text-sm mt-3 max-w-[280px] leading-relaxed">
                        We couldn't find anything matching "<span className="font-semibold">{query}</span>".
                        Maybe try searching for something else?
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-2.5 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full text-sm font-bold shadow-lg active:scale-95 transition-transform"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};
