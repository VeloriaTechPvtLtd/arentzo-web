import { useTranslation } from 'react-i18next';
import React from 'react';
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
    const { t } = useTranslation();
    if (products.length === 0) return null;
    return (
        <section className="catalog-results" aria-label={title}>
            <div className="catalog-results__heading">
                <h2>{title}</h2>
                <span>{t('mobileRental.listingCount', { count: products.length })}</span>
                {onSeeAll && <button onClick={onSeeAll}>See all</button>}
            </div>
            <div className="catalog-results__grid">
                {products.map((product) => <ProductCard key={product.id} product={product}
                    onFavoriteToggle={onFavoriteToggle} onAddToCart={onAddToCart}
                    onQuantityChange={onQuantityChange} />)}
            </div>
        </section>
    );
};
