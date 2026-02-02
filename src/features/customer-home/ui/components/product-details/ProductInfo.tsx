import { Minus, Plus, Share2, Heart, Star } from 'lucide-react';
import { ProductSpecs } from './ProductSpecs';
import { RentalOptions } from './RentalOptions';
import { SellerProfile } from './SellerProfile';
import { RentalTerms } from './RentalTerms';
import { CustomerReviews } from './CustomerReviews';
import { SimilarProducts } from './SimilarProducts';
import { mockProducts } from '../../../infrastructure/api/mockData';
import type { Product } from '../../../domain/entities/types';

interface ProductInfoProps {
    product: Product;
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    onAddToCart: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, quantity, onQuantityChange }) => {

    return (
        <div className="product-info-column">
            <div className="product-header">
                <div className="title-section">
                    <div className="product-rating-small">
                        <div className="stars">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    fill={i < Math.floor(product.rating) ? "var(--home-primary)" : "none"}
                                    color={i < Math.floor(product.rating) ? "var(--home-primary)" : "var(--home-border)"}
                                />
                            ))}
                        </div>
                        <span className="review-count">({product.reviewCount} reviews)</span>
                    </div>
                    <h1 className="product-title">{product.name}</h1>
                </div>
                <div className="product-actions-top">
                    <button className="action-btn" aria-label="Share">
                        <Share2 size={20} />
                    </button>
                    <button className="action-btn" aria-label="Add to favorites">
                        <Heart size={20} fill={product.isFavorite ? 'var(--home-primary)' : 'none'} color={product.isFavorite ? 'var(--home-primary)' : 'currentColor'} />
                    </button>
                </div>
            </div>

            <ProductSpecs
                overview={product.overview || 'Experience premium quality with this product.'}
                specifications={product.specifications || []}
            />

            <RentalOptions />

            {product.seller && <SellerProfile seller={product.seller} />}

            {product.terms && <RentalTerms terms={product.terms} />}

            <SimilarProducts products={mockProducts.filter(p => p.id !== product.id)} />

            {product.reviews && <CustomerReviews reviews={product.reviews} />}

            {/* Sticky Bottom Actions */}
            <div className="purchase-actions-container">
                <div className="purchase-actions-content">
                    <div className="price-info">
                        <span className="duration-label">For 3 Days</span>
                        <div className="price-value">
                            <span className="amount">₹{product.price.toLocaleString()}</span>
                            <span className="tax-label">Total Incl. all taxes</span>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <div className="quantity-stepper-alt">
                            <button className="qty-btn" onClick={() => onQuantityChange(Math.max(0, quantity - 1))}>
                                <Minus size={18} />
                            </button>
                            <span className="qty-val">{quantity || 1}</span>
                            <button className="qty-btn" onClick={() => onQuantityChange(quantity + 1)}>
                                <Plus size={18} />
                            </button>
                        </div>
                        <button className="buy-now-btn-alt">
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
