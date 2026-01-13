import React from 'react';
import { ProductsGrid } from '../ProductsGrid';

interface RelatedProductsProps {
    products: any[];
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
