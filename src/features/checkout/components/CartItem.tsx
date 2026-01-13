import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface CartItemProps {
    id: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
    originalPrice?: number;
    dates?: string;
    isWishlistMode?: boolean;
    onQuantityChange: (id: string, delta: number) => void;
    onMoveToWishlist?: () => void;
    onChangeDates?: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    image,
    quantity,
    price,
    originalPrice,
    dates,
    isWishlistMode,
    onQuantityChange,
    onMoveToWishlist,
    onChangeDates
}) => {
    return (
        <div className="cart-item">
            <img src={image} alt={name} className="cart-item__image" />
            <div className="cart-item__details">
                <div className="cart-item__header-row">
                    <h3 className="cart-item__name">{name}</h3>
                    <div className="quantity-control">
                        <button onClick={() => onQuantityChange(id, -1)} tabIndex={-1}>
                            <Minus size={14} />
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => onQuantityChange(id, 1)} tabIndex={-1}>
                            <Plus size={14} />
                        </button>
                    </div>
                </div>

                <div className="cart-item__meta-row">
                    <span className="cart-item__unit">1 Unit</span>
                    <div className="cart-item__price-group">
                        {originalPrice && (
                            <span className="price-original">₹{originalPrice}</span>
                        )}
                        <span className="price-current">₹{price}</span>
                    </div>
                </div>

                {dates && (
                    <div className="cart-item__dates-row">
                        <span className="cart-item__dates-text">{dates}</span>
                        {onChangeDates && (
                            <button className="cart-item__change-date-btn" onClick={onChangeDates}>
                                Change
                            </button>
                        )}
                    </div>
                )}

                {isWishlistMode && (
                    <button className="move-to-wishlist" onClick={onMoveToWishlist}>
                        Move to wishlist
                    </button>
                )}
            </div>
        </div>
    );
};
