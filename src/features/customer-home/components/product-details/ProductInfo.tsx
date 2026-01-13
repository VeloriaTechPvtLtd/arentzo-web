import React from 'react';
import { Minus, Plus, ShoppingCart, Share2, Heart, Star } from 'lucide-react';

interface ProductInfoProps {
    product: any;
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    onAddToCart: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, quantity, onQuantityChange, onAddToCart }) => {

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price / 100);
    };

    return (
        <div className="product-info-column">
            <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-actions-top">
                    <button className="action-btn" aria-label="Share">
                        <Share2 size={20} />
                    </button>
                    <button className="action-btn" aria-label="Add to favorites">
                        <Heart size={20} fill={product.isFavorite ? '#ff7e5f' : 'none'} color={product.isFavorite ? '#ff7e5f' : 'currentColor'} />
                    </button>
                </div>
            </div>

            <div className="product-rating">
                <div className="stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            fill={i < product.rating ? '#ff7e5f' : 'none'}
                            color={i < product.rating ? '#ff7e5f' : '#cbd5e1'}
                        />
                    ))}
                </div>
                <span className="review-count">({product.reviewCount} reviews)</span>
            </div>

            <div className="product-pricing">
                <div className="current-price">{formatPrice(product.price)}</div>
                {product.originalPrice && (
                    <div className="original-price">{formatPrice(product.originalPrice)}</div>
                )}
                {product.discount && (
                    <div className="discount-tag">Save {product.discount}%</div>
                )}
            </div>

            <div className="product-description">
                <h3>Description</h3>
                <p>
                    Experience premium quality with this {product.name}. Perfect for your needs, this product features high-end materials and exceptional durability.
                    {product.isImported ? ' This is an imported item known for its superior craftsmanship.' : ''}
                </p>
            </div>

            {product.features && product.features.length > 0 && (
                <div className="product-features">
                    <h3>Key Features</h3>
                    <ul className="features-list">
                        {product.features.map((feature: string, index: number) => (
                            <li key={index} className="feature-item">
                                <span className="feature-check">✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="product-availability">
                <span className={`status-dot ${product.isAvailable ? 'available' : 'unavailable'}`}></span>
                {product.isAvailable ? 'In Stock & Ready to Ship' : 'Currently Unavailable'}
            </div>

            <div className="purchase-actions">
                {quantity > 0 ? (
                    <div className="quantity-stepper">
                        <button
                            className="qty-btn"
                            onClick={() => onQuantityChange(quantity - 1)}
                        >
                            <Minus size={20} />
                        </button>
                        <span className="qty-value">{quantity}</span>
                        <button
                            className="qty-btn"
                            onClick={() => onQuantityChange(quantity + 1)}
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                ) : (
                    <button className="add-to-cart-btn" onClick={onAddToCart}>
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>
                )}
                <button className="buy-now-btn">
                    Buy Now
                </button>
            </div>
        </div>
    );
};
