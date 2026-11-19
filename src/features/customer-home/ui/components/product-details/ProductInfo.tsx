import { Minus, Plus, Share2, Heart, Star } from 'lucide-react';
import { ProductSpecs } from './ProductSpecs';
import { SellerProfile } from './SellerProfile';
import { RentalTerms } from './RentalTerms';
import { CustomerReviews } from './CustomerReviews';
import type { Product } from '../../../domain/entities/types';

interface ProductInfoProps {
    product: Product;
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    onAddToCart: () => void;
    onFavoriteToggle: () => void;
    isAvailable: boolean;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, quantity, onQuantityChange, onAddToCart, onFavoriteToggle, isAvailable }) => {

    return (
        <div className="product-info-column">
            <div className="product-header">
                <div className="title-section">
                    {product.reviewCount > 0 ? <div className="product-rating-small">
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
                    </div> : null}
                    <h1 className="product-title">{product.name}</h1>
                </div>
                <div className="product-actions-top">
                    <button className="action-btn" aria-label="Share">
                        <Share2 size={20} />
                    </button>
                    <button className="action-btn" aria-label={product.isFavorite ? 'Remove from favorites' : 'Add to favorites'} onClick={onFavoriteToggle}>
                        <Heart size={20} fill={product.isFavorite ? 'var(--home-primary)' : 'none'} color={product.isFavorite ? 'var(--home-primary)' : 'currentColor'} />
                    </button>
                </div>
            </div>

            {product.overview || product.specifications?.length ? <ProductSpecs overview={product.overview || ''} specifications={product.specifications || []} /> : null}

            <button className="product-detail-add-button" onClick={onAddToCart} disabled={!isAvailable}>
                {isAvailable ? 'Add to cart' : 'Unavailable'}
            </button>

            {product.seller && <SellerProfile seller={product.seller} />}

            {product.terms && <RentalTerms terms={product.terms} />}

            {product.additionalChargeDisclosures?.length ? (
                <section className="section-container additional-charge-disclosures" aria-labelledby="additional-charge-disclosures-title">
                    <h3 id="additional-charge-disclosures-title" className="section-title">Usage & return policy details</h3>
                    <p className="additional-charge-disclosures__note">Provider-configured rates and limits are shown for reference only. They are not calculated, charged, or collected here.</p>
                    <dl className="additional-charge-disclosures__list">
                        {product.additionalChargeDisclosures.map((item) => (
                            <div className="additional-charge-disclosures__row" key={item.key}>
                                <dt>{item.label}</dt>
                                <dd>{item.displayValue}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            ) : null}

            {product.reviews && <CustomerReviews reviews={product.reviews} />}

            {/* Sticky Bottom Actions */}
            <div className="purchase-actions-container">
                <div className="purchase-actions-content">
                    <div className="price-info">
                        <span className="duration-label">Daily rental rate</span>
                        <div className="price-value">
                            <span className="amount">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: product.currency || 'INR' }).format(product.price)}</span>
                            <span className="tax-label">per day</span>
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
                    </div>
                </div>
            </div>
        </div>
    );
};
