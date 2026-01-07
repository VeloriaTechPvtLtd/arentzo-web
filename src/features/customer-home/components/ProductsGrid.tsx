import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

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
        <section className="products-grid">
            <div className="products-grid__header">
                <h2 className="products-grid__title">{title}</h2>
                {onSeeAll && (
                    <button className="products-grid__see-all" onClick={onSeeAll}>
                        See all
                    </button>
                )}
            </div>

            <div className="products-grid__wrapper">
                <button
                    className="products-grid__nav products-grid__nav--left"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="products-grid__container" ref={scrollRef}>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onFavoriteToggle={onFavoriteToggle}
                            onAddToCart={onAddToCart}
                            onQuantityChange={onQuantityChange}
                        />
                    ))}
                </div>

                <button
                    className="products-grid__nav products-grid__nav--right"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
};
