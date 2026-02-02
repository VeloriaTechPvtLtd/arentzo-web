import React from 'react';
import { Home, ChevronRight, ChevronUp } from 'lucide-react';

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
            <div className="footer-delivery-row">
                <div className="footer-delivery-left">
                    <div className="footer-delivery-icon">
                        <Home size={20} />
                    </div>
                    <div className="footer-delivery-text">
                        <div className="footer-delivering-label">
                            Delivering to <span className="footer-address-type">Home</span>
                        </div>
                        <div className="footer-full-address">{address}</div>
                    </div>
                </div>
                <button className="footer-change-btn" onClick={onAddressChange}>Change</button>
            </div>

            <div className="footer-payment-action-row">
                <div className="footer-payment-left">
                    <div className="footer-pay-label">
                        <img
                            src="https://www.gstatic.com/images/branding/googlepay/googlepay_logo_color_rect_32dp.png"
                            alt="GPay"
                            className="gpay-mini-icon"
                        />
                        <span>PAY USING</span>
                        <ChevronUp size={14} strokeWidth={3} />
                    </div>
                    <div className="footer-payment-method">Google Pay UPI</div>
                </div>

                <button className="footer-place-order-btn" onClick={onPlaceOrder}>
                    <div className="place-order-price-group">
                        <span className="place-order-total">₹{totalAmount.toLocaleString()}</span>
                        <span className="place-order-label">Total</span>
                    </div>
                    <div className="place-order-text-group">
                        <span>Place Order</span>
                        <ChevronRight size={18} strokeWidth={3} />
                    </div>
                </button>
            </div>
        </footer>
    );
};
