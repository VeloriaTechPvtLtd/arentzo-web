import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../../../../shared/components/ui/ProductCard';
import type { Product } from '../../domain/entities/types';

interface ProductsGridProps {
    title: string;
    products: Product[];
    onFavoriteToggle?: (productId: string) => void;
    onAddToCart?: (productId: string) => void;
    onQuantityChange?: (productId: string, quantity: number) => void;
    onSeeAll?: () => void;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({
    title,
    products,
    onFavoriteToggle,
    onAddToCart,
    onQuantityChange,
    onSeeAll,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    if (products.length === 0) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="px-4 py-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] tracking-tight">{title}</h2>
                {onSeeAll && (
                    <button
                        className="text-sm font-semibold text-[var(--primary)] hover:underline underline-offset-4 transition-all"
                        onClick={onSeeAll}
                    >
                        See all
                    </button>
                )}
            </div>

            <div className="relative group/row">
                <button
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[var(--card)] border border-[var(--border)] rounded-full shadow-lg opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:flex items-center justify-center hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={20} />
                </button>

                <div
                    className="flex gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
                    ref={scrollRef}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="w-[180px] md:w-[220px] flex-shrink-0 snap-start">
                            <ProductCard
                                product={product}
                                onFavoriteToggle={onFavoriteToggle}
                                onAddToCart={onAddToCart}
                                onQuantityChange={onQuantityChange}
                            />
                        </div>
                    ))}
                </div>

                <button
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[var(--card)] border border-[var(--border)] rounded-full shadow-lg opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:flex items-center justify-center hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
};
