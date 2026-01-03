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
    onMoveToWishlist
}) => {
    return (
        <div className="cart-item">
            <img src={image} alt={name} className="cart-item__image" />
            <div className="cart-item__details">
                <h3 className="cart-item__name">{name}</h3>
                <div className="cart-item__unit">1 Unit</div>
                {dates && <div className="cart-item__dates">{dates}</div>}
                {isWishlistMode && (
                    <button className="move-to-wishlist" onClick={onMoveToWishlist}>
                        Move to wishlist
                    </button>
                )}
            </div>
            <div className="cart-item__sidebar">
                <div className="quantity-control">
                    <button onClick={() => onQuantityChange(id, -1)} tabIndex={-1}>
                        <Minus size={14} />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => onQuantityChange(id, 1)} tabIndex={-1}>
                        <Plus size={14} />
                    </button>
                </div>
                <div className="cart-item__price">
                    {originalPrice && (
                        <span className="price-original">₹{originalPrice}</span>
                    )}
                    <span className="price-current">₹{price}</span>
                </div>
            </div>
        </div>
    );
};
