import React, { useState, useMemo } from 'react';
import { X, Calendar, Store, ShoppingCart } from 'lucide-react';
import type { Rental } from '../../domain/entities';
import '../styles/RentalActionModals.css';

interface RentAgainModalProps {
    rental: Rental;
    isOpen: boolean;
    onClose: () => void;
}

export const RentAgainModal: React.FC<RentAgainModalProps> = ({ rental, isOpen, onClose }) => {
    const today = new Date();
    const defaultStartDate = today.toISOString().split('T')[0];
    const defaultEndDate = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    const dailyRate = Math.round(rental.totalAmount / 5);

    const rentalDays = useMemo(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays || 1;
    }, [startDate, endDate]);

    const totalCost = useMemo(() => {
        return dailyRate * rentalDays;
    }, [dailyRate, rentalDays]);

    if (!isOpen) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleProceed = () => {
        console.log('Proceeding to checkout with:', { startDate, endDate, totalCost });
        onClose();
    };

    const isDateValid = startDate && endDate && new Date(endDate) > new Date(startDate);

    return (
        <div className="rental-action-modal" onClick={handleBackdropClick}>
            <div className="rental-action-modal__container">
                <header className="rental-action-modal__header">
                    <h2 className="rental-action-modal__title">Rent Again</h2>
                    <button className="rental-action-modal__close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </header>

                <div className="rental-action-modal__content">
                    <div className="rental-action-modal__product-preview">
                        <img
                            src={rental.productImage}
                            alt={rental.productName}
                            className="rental-action-modal__product-image"
                        />
                        <div className="rental-action-modal__product-details">
                            <h4 className="rental-action-modal__product-name">{rental.productName}</h4>
                            <span className="rental-action-modal__product-provider">
                                <Store size={14} />
                                {rental.providerName}
                            </span>
                            <span className="rental-action-modal__product-provider" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                                {formatCurrency(dailyRate)}/day
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">
                            <Calendar size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Select Rental Dates
                        </label>
                        <div className="rental-action-modal__date-picker">
                            <div className="rental-action-modal__date-field">
                                <label className="rental-action-modal__info-label">Start Date</label>
                                <input
                                    type="date"
                                    className="rental-action-modal__date-input"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={defaultStartDate}
                                />
                            </div>
                            <div className="rental-action-modal__date-field">
                                <label className="rental-action-modal__info-label">End Date</label>
                                <input
                                    type="date"
                                    className="rental-action-modal__date-input"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="rental-action-modal__info-card">
                        <div className="rental-action-modal__info-icon">
                            <Calendar size={18} />
                        </div>
                        <div className="rental-action-modal__info-content">
                            <span className="rental-action-modal__info-label">Rental Duration</span>
                            <span className="rental-action-modal__info-value">
                                {rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__cost-display">
                        <span className="rental-action-modal__cost-label">Estimated Total</span>
                        <span className="rental-action-modal__cost-value">{formatCurrency(totalCost)}</span>
                    </div>
                </div>

                <footer className="rental-action-modal__footer">
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--primary"
                        onClick={handleProceed}
                        disabled={!isDateValid}
                    >
                        <ShoppingCart size={16} />
                        Proceed to Checkout
                    </button>
                </footer>
            </div>
        </div>
    );
};
