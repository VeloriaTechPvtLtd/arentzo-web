import React from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';

interface CheckoutHeaderProps {
    onBack: () => void;
    title?: string;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({ onBack, title = 'Checkout' }) => {
    return (
        <header className="checkout-header">
            <button className="checkout-header__back" onClick={onBack} aria-label="Back">
                <ChevronLeft size={24} />
            </button>
            <h1 className="checkout-header__title">{title}</h1>
            <button className="checkout-header__share">
                <Share2 size={16} />
                <span>Share</span>
            </button>
        </header>
    );
};
