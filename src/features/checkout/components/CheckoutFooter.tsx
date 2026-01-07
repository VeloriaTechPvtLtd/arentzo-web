import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

interface CheckoutFooterProps {
    address: string;
    totalAmount: number;
    onPlaceOrder: () => void;
    onAddressChange?: () => void;
}

export const CheckoutFooter: React.FC<CheckoutFooterProps> = ({
    address,
    totalAmount,
    onPlaceOrder,
    onAddressChange,
}) => {
    return (
        <footer className="checkout-footer">
            <div className="delivery-to">
                <div className="delivery-to__info">
                    <Home size={18} color="#ff4d4f" />
                    <span className="delivery-to__label">Delivering to</span>
                    <span className="delivery-to__address-type">Home</span>
                </div>
                <button className="delivery-to__change" onClick={onAddressChange}>Change</button>
            </div>
            <p className="delivery-to__full-address">{address}</p>

            <div className="payment-bar" onClick={onPlaceOrder}>
                <div className="payment-bar__left">
                    <div className="payment-methods">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo.svg" alt="GPay" />
                    </div>
                    <div className="total-box">
                        <span className="total-amount">₹{totalAmount}</span>
                        <span className="total-label">Total</span>
                    </div>
                </div>
                <div className="payment-bar__right">
                    <span>Place Order</span>
                    <ChevronRight size={20} />
                </div>
            </div>
        </footer>
    );
};
