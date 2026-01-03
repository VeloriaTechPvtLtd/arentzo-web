import React from 'react';
import { ChevronRight, ShoppingCart } from 'lucide-react';

interface CartItem {
    id: string;
    image: string;
}

interface FloatingCartProps {
    items: CartItem[];
    totalItems: number;
    onViewCart?: () => void;
}

export const FloatingCart: React.FC<FloatingCartProps> = ({
    items,
    totalItems,
    onViewCart,
}) => {
    if (totalItems === 0) return null;

    // Show max 3 item images
    const displayItems = items.slice(0, 3);

    return (
        <button className="floating-cart" onClick={onViewCart}>
            <div className="floating-cart__items">
                {displayItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="floating-cart__item"
                        style={{
                            zIndex: displayItems.length - index,
                            transform: `translateX(${index * -12}px)`,
                        }}
                    >
                        <img
                            src={item.image}
                            alt=""
                            className="floating-cart__image"
                        />
                    </div>
                ))}
                {totalItems > 3 && (
                    <div
                        className="floating-cart__more"
                        style={{
                            transform: `translateX(${displayItems.length * -12}px)`,
                        }}
                    >
                        +{totalItems - 3}
                    </div>
                )}
            </div>

            <div className="floating-cart__info">
                <span className="floating-cart__label">View Cart</span>
                <span className="floating-cart__count">{totalItems} Items</span>
            </div>

            <div className="floating-cart__arrow">
                <ChevronRight size={20} />
            </div>
        </button>
    );
};
