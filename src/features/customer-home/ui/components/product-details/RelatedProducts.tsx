import React from 'react';
import { ProductsGrid } from '../ProductsGrid';
import type { Product } from '../../../domain/entities/types';

interface RelatedProductsProps {
    products: Product[];
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
    return (
        <div className="related-products-section">
            <ProductsGrid
                title="Similar Products"
                products={products}
                onAddToCart={() => { }}
                onFavoriteToggle={() => { }}
            />
        </div>
    );
};
