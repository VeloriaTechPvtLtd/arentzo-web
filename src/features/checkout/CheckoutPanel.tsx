import React, { useState, useEffect, useCallback } from 'react';
import { Truck, Store, MapPin, Package, Percent, ChevronRight, Info } from 'lucide-react';
import { CheckoutHeader } from './components/CheckoutHeader';
import { CartItem } from './components/CartItem';
import { BillDetails } from './components/BillDetails';
import { CheckoutFooter } from './components/CheckoutFooter';
import './Checkout.css';

interface CheckoutPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CheckoutPanel: React.FC<CheckoutPanelProps> = ({ isOpen, onClose }) => {
    const [quantity, setQuantity] = useState<Record<string, number>>({
        '1': 1,
        '2': 1,
        '3': 1,
        '4': 1,
        '5': 1,
        '6': 1,
    });

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const handleQuantityChange = (id: string, delta: number) => {
        setQuantity(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta)
        }));
    };

    return (
        <div className={`checkout-overlay ${isOpen ? 'checkout-overlay--open' : ''}`}>
            <div className="checkout-overlay__backdrop" onClick={handleBackdropClick} />

            <div className="checkout-panel">
                <CheckoutHeader onBack={onClose} />

                <div className="checkout-panel__content">
                    <div className="delivery-alert">
                        <div className="delivery-alert__icon">
                            <Percent size={20} color="#ff4d4f" />
                        </div>
                        <div className="delivery-alert__content">
                            <h4 className="delivery-alert__title">Partial delivery or collection alert</h4>
                            <p className="delivery-alert__text">Include multiple pickup or delivery methods.</p>
                        </div>
                    </div>

                    {/* Providers Delivery */}
                    <section className="checkout-section">
                        <div className="section-header">
                            <div className="section-header__title">
                                <Package size={18} />
                                <span>Providers Delivery</span>
                            </div>
                            <button className="section-header__change">Change</button>
                        </div>
                        <CartItem
                            id="1"
                            name="Range Rover Sports Special Edition.."
                            image="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=200"
                            quantity={quantity['1']}
                            price={9999}
                            originalPrice={13636}
                            dates="Oct 12 - 14 (3 days)"
                            onQuantityChange={handleQuantityChange}
                        />
                        <button className="change-dates">Change Dates</button>
                    </section>

                    {/* Courier Delivery */}
                    <section className="checkout-section">
                        <div className="section-header">
                            <div className="section-header__title">
                                <Truck size={18} />
                                <span>Courier Delivery</span>
                            </div>
                            <button className="section-header__change">Change</button>
                        </div>
                        <CartItem
                            id="2"
                            name="Toyota Land Cruiser 4WD.."
                            image="https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=200"
                            quantity={quantity['2']}
                            price={9000}
                            originalPrice={13636}
                            dates="Oct 12 - 14 (3 days)"
                            onQuantityChange={handleQuantityChange}
                        />
                        <button className="change-dates">Change Dates</button>
                    </section>

                    {/* Self-pickup */}
                    <section className="checkout-section">
                        <div className="section-header">
                            <div className="section-header__title">
                                <Store size={18} />
                                <span>self-pickup</span>
                            </div>
                            <button className="section-header__change">Change</button>
                        </div>
                        <CartItem
                            id="3"
                            name="Fancy Chair for parties and.."
                            image="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=200"
                            quantity={quantity['3']}
                            price={999}
                            originalPrice={13636}
                            dates="Oct 12 - 14 (3 days)"
                            onQuantityChange={handleQuantityChange}
                        />
                        <button className="change-dates">Change Dates</button>

                        <div className="pickup-location">
                            <div className="pickup-location__header">
                                <span className="pickup-location__title">Pickup Location</span>
                                <div className="pickup-pin-container">
                                    <MapPin size={18} />
                                </div>
                            </div>
                            <h5 className="pickup-location__name">AutoParts Store - Main Branch</h5>
                            <p className="pickup-location__address">
                                123 industrial road, sector 5 Mumbai,<br />
                                Maharashtra 400001
                            </p>
                        </div>
                    </section>

                    {/* Wishlist Section */}
                    <section className="checkout-section">
                        <CartItem
                            id="4"
                            name="Range Rover Sports Special Edition.."
                            image="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=200"
                            quantity={quantity['4']}
                            price={9999}
                            originalPrice={13636}
                            isWishlistMode
                            onQuantityChange={handleQuantityChange}
                        />
                        <CartItem
                            id="5"
                            name="Toyota Land Cruiser 4WD.."
                            image="https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=200"
                            quantity={quantity['5']}
                            price={9000}
                            originalPrice={13636}
                            isWishlistMode
                            onQuantityChange={handleQuantityChange}
                        />
                    </section>

                    {/* Self-pickup only alert section */}
                    <section className="checkout-section">
                        <div className="pickup-only-badge">
                            <Info size={16} />
                            <span>This product is available for self-pickup only</span>
                        </div>
                        <CartItem
                            id="6"
                            name="Fancy Chair for parties and.."
                            image="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=200"
                            quantity={quantity['6']}
                            price={9999}
                            originalPrice={13636}
                            dates="Oct 12 - 14 (3 days)"
                            onQuantityChange={handleQuantityChange}
                        />
                        <button className="change-dates">Change Dates</button>
                        <div className="pickup-location">
                            <div className="pickup-location__header">
                                <span className="pickup-location__title">Pickup Location</span>
                                <div className="pickup-pin-container">
                                    <MapPin size={18} />
                                </div>
                            </div>
                            <h5 className="pickup-location__name">AutoParts Store - Main Branch</h5>
                            <p className="pickup-location__address">
                                123 industrial road, sector 5 Mumbai,<br />
                                Maharashtra 400001
                            </p>
                        </div>
                    </section>

                    {/* Coupon */}
                    <div className="coupon-section">
                        <div className="coupon-info">
                            <div className="coupon-icon">
                                <Percent size={20} />
                            </div>
                            <div className="coupon-text">
                                <h4 className="coupon-text__title">Yay! You saved ₹300</h4>
                                <p className="coupon-text__subtitle">Coupon Applied!</p>
                            </div>
                        </div>
                        <button className="coupon-remove">Remove</button>
                    </div>
                    <button className="see-all-coupons">
                        See all coupons <ChevronRight size={16} style={{ verticalAlign: 'middle', marginLeft: 4 }} />
                    </button>

                    <BillDetails
                        itemsTotal={112345}
                        deliveryCharge={112}
                        handlingCharge={12345}
                        totalSavings={9999}
                    />

                    <section className="cancellation-policy">
                        <h3 className="cancellation-policy__title">Cancellation Policy</h3>
                        <p className="cancellation-policy__text">
                            You can cancel your booking anytime before 24 hrs of pickup or delivery for a full refund. After that, a fee may apply. If we cancel due to an issue on our side, you'll get your money back in full.
                        </p>
                    </section>
                </div>

                <CheckoutFooter
                    address="Kalyani Business Centre, 3rd Floor, Office..."
                    totalAmount={99999}
                    onPlaceOrder={() => console.log('Place order clicked')}
                />
            </div>
        </div>
    );
};
