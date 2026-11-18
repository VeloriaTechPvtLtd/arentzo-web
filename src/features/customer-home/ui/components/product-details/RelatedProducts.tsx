import React from 'react';
import { ProductsGrid } from '../ProductsGrid';
import type { Product } from '../../../domain/entities/types';

interface RelatedProductsProps {
    products: Product[];
    onAddToCart: (productId: string) => void;
    onFavoriteToggle: (productId: string) => void;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, onAddToCart, onFavoriteToggle }) => {
    return (
        <div className="related-products-section">
            <ProductsGrid
                title="Similar Products"
                products={products}
                onAddToCart={onAddToCart}
                onFavoriteToggle={onFavoriteToggle}
            />
        </div>
    );
};
