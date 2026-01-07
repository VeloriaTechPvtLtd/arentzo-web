import React from 'react';
import { Heart, Star, Plus, Minus } from 'lucide-react';
import type { Product } from '../types';

import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    onFavoriteToggle?: (productId: string) => void;
    onAddToCart?: (productId: string) => void;
    onQuantityChange?: (productId: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onFavoriteToggle,
    onAddToCart,
    onQuantityChange,
}) => {
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price / 100);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star
                key={index}
                size={12}
                className={`product-card__star ${index < rating ? 'product-card__star--filled' : ''}`}
                fill={index < rating ? '#ff7e5f' : 'none'}
            />
        ));
    };

    const quantity = product.quantity || 0;

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onFavoriteToggle?.(product.id);
    };

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToCart?.(product.id);
    };

    const handleQuantityChangeClick = (e: React.MouseEvent, newQuantity: number) => {
        e.stopPropagation();
        onQuantityChange?.(product.id, newQuantity);
    };

    return (
        <article className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="product-card__image-container">
                {product.isImported && (
                    <span className="product-card__badge product-card__badge--imported">
                        Imported
                    </span>
                )}
                {!product.isAvailable && (
                    <span className="product-card__badge product-card__badge--unavailable">
                        Not Available
                    </span>
                )}
                <button
                    className={`product-card__favorite ${product.isFavorite ? 'product-card__favorite--active' : ''}`}
                    onClick={handleFavoriteClick}
                    aria-label={product.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart
                        size={18}
                        fill={product.isFavorite ? '#ff7e5f' : 'none'}
                    />
                </button>
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                    loading="lazy"
                />
            </div>

            <div className="product-card__action-row">
                {quantity > 0 ? (
                    <div className="product-card__quantity">
                        <button
                            className="product-card__qty-btn"
                            onClick={(e) => handleQuantityChangeClick(e, quantity - 1)}
                            aria-label="Decrease quantity"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="product-card__qty-value">{quantity}</span>
                        <button
                            className="product-card__qty-btn"
                            onClick={(e) => handleQuantityChangeClick(e, quantity + 1)}
                            aria-label="Increase quantity"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                ) : (
                    <button
                        className="product-card__add-btn"
                        onClick={handleAddToCartClick}
                    >
                        ADD
                    </button>
                )}
            </div>

            <div className="product-card__info">
                <h3 className="product-card__name">{product.name}</h3>
                <div className="product-card__rating">
                    {renderStars(product.rating)}
                    <span className="product-card__review-count">
                        ({product.reviewCount})
                    </span>
                </div>
                <div className="product-card__pricing">
                    <span className="product-card__price">
                        {formatPrice(product.price)}
                    </span>
                    {product.discount && (
                        <span className="product-card__discount">
                            +{product.discount}%
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};
