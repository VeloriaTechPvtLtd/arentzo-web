import React, { useState, useMemo } from 'react';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import type { Rental } from '../../domain/entities';
import '../styles/RentalActionModals.css';

interface ExtendRentalModalProps {
    rental: Rental;
    isOpen: boolean;
    onClose: () => void;
}

const EXTENSION_OPTIONS = [
    { days: 1, label: '1 Day' },
    { days: 2, label: '2 Days' },
    { days: 3, label: '3 Days' },
    { days: 5, label: '5 Days' },
    { days: 7, label: '1 Week' },
    { days: 14, label: '2 Weeks' },
];

export const ExtendRentalModal: React.FC<ExtendRentalModalProps> = ({ rental, isOpen, onClose }) => {
    const [selectedDays, setSelectedDays] = useState(3);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dailyRate = Math.round(rental.totalAmount / 5);

    const extendedCost = useMemo(() => {
        return dailyRate * selectedDays;
    }, [selectedDays, dailyRate]);

    const newEndDate = useMemo(() => {
        const endDate = new Date(rental.endDate);
        endDate.setDate(endDate.getDate() + selectedDays);
        return endDate;
    }, [rental.endDate, selectedDays]);

    if (!isOpen) return null;

    const formatDate = (date: Date | string) => {
        const d = typeof date === 'string' ? new Date(date) : date;
        return d.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedDays(3);
        setIsSubmitted(false);
        onClose();
    };

    const handleConfirm = () => {
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="rental-action-modal" onClick={handleBackdropClick}>
                <div className="rental-action-modal__container">
                    <header className="rental-action-modal__header">
                        <h2 className="rental-action-modal__title">Extend Rental</h2>
                        <button className="rental-action-modal__close-btn" onClick={handleClose}>
                            <X size={20} />
                        </button>
                    </header>
                    <div className="rental-action-modal__content">
                        <div className="rental-action-modal__success">
                            <div className="rental-action-modal__success-icon">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="rental-action-modal__success-title">Rental Extended!</h3>
                            <p className="rental-action-modal__success-text">
                                Your rental has been extended until {formatDate(newEndDate)}
                            </p>
                        </div>
                    </div>
                    <footer className="rental-action-modal__footer">
                        <button
                            className="rental-action-modal__btn rental-action-modal__btn--primary"
                            onClick={handleClose}
                            style={{ flex: 1 }}
                        >
                            Done
                        </button>
                    </footer>
                </div>
            </div>
        );
    }

    return (
        <div className="rental-action-modal" onClick={handleBackdropClick}>
            <div className="rental-action-modal__container">
                <header className="rental-action-modal__header">
                    <h2 className="rental-action-modal__title">Extend Rental</h2>
                    <button className="rental-action-modal__close-btn" onClick={handleClose}>
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
                                {rental.providerName}
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__info-card">
                        <div className="rental-action-modal__info-icon">
                            <Calendar size={18} />
                        </div>
                        <div className="rental-action-modal__info-content">
                            <span className="rental-action-modal__info-label">Current End Date</span>
                            <span className="rental-action-modal__info-value">
                                {formatDate(rental.endDate)}
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">
                            <Clock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                            Extend By
                        </label>
                        <div className="rental-action-modal__duration-grid">
                            {EXTENSION_OPTIONS.map(option => (
                                <button
                                    key={option.days}
                                    className={`rental-action-modal__duration-option ${selectedDays === option.days ? 'rental-action-modal__duration-option--selected' : ''
                                        }`}
                                    onClick={() => setSelectedDays(option.days)}
                                >
                                    <span className="rental-action-modal__duration-value">{option.days}</span>
                                    <span className="rental-action-modal__duration-label">
                                        {option.days === 1 ? 'Day' : option.days >= 7 ? 'Week' : 'Days'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rental-action-modal__info-card">
                        <div className="rental-action-modal__info-icon">
                            <Calendar size={18} />
                        </div>
                        <div className="rental-action-modal__info-content">
                            <span className="rental-action-modal__info-label">New End Date</span>
                            <span className="rental-action-modal__info-value" style={{ color: 'var(--primary)' }}>
                                {formatDate(newEndDate)}
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__cost-display">
                        <span className="rental-action-modal__cost-label">Additional Cost</span>
                        <span className="rental-action-modal__cost-value">{formatCurrency(extendedCost)}</span>
                    </div>
                </div>

                <footer className="rental-action-modal__footer">
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--primary"
                        onClick={handleConfirm}
                    >
                        Confirm Extension
                    </button>
                </footer>
            </div>
        </div>
    );
};
