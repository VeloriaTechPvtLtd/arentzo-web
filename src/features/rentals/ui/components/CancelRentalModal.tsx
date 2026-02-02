import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Rental } from '../../domain/entities';
import '../styles/RentalActionModals.css';

interface CancelRentalModalProps {
    rental: Rental;
    isOpen: boolean;
    onClose: () => void;
}

const CANCEL_REASONS = [
    'Change of plans',
    'Found alternative',
    'Price too high',
    'No longer needed',
    'Other reason'
];

export const CancelRentalModal: React.FC<CancelRentalModalProps> = ({ rental, isOpen, onClose }) => {
    const [selectedReason, setSelectedReason] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const isPending = rental.status === 'pending';
    const refundPercentage = isPending ? 100 : 75;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const refundAmount = Math.round(rental.totalAmount * (refundPercentage / 100));

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        setSelectedReason('');
        setIsSubmitted(false);
        onClose();
    };

    const handleCancel = () => {
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="rental-action-modal" onClick={handleBackdropClick}>
                <div className="rental-action-modal__container">
                    <header className="rental-action-modal__header">
                        <h2 className="rental-action-modal__title">Cancel Rental</h2>
                        <button className="rental-action-modal__close-btn" onClick={handleClose}>
                            <X size={20} />
                        </button>
                    </header>
                    <div className="rental-action-modal__content">
                        <div className="rental-action-modal__success">
                            <div className="rental-action-modal__success-icon">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="rental-action-modal__success-title">Rental Cancelled</h3>
                            <p className="rental-action-modal__success-text">
                                Your refund of {formatCurrency(refundAmount)} will be processed within 5-7 business days.
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
                    <h2 className="rental-action-modal__title">Cancel Rental</h2>
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

                    <div className="rental-action-modal__info-card rental-action-modal__info-card--warning">
                        <div className="rental-action-modal__info-icon rental-action-modal__info-icon--warning">
                            <AlertTriangle size={18} />
                        </div>
                        <div className="rental-action-modal__info-content">
                            <span className="rental-action-modal__info-label">Refund Policy</span>
                            <span className="rental-action-modal__info-value">
                                {isPending
                                    ? 'Full refund for pending orders'
                                    : '75% refund for upcoming orders (25% cancellation fee)'}
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__cost-display">
                        <span className="rental-action-modal__cost-label">Refund Amount</span>
                        <span className="rental-action-modal__cost-value">{formatCurrency(refundAmount)}</span>
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">Reason for cancellation (optional)</label>
                        <div className="rental-action-modal__reason-grid">
                            {CANCEL_REASONS.map(reason => (
                                <button
                                    key={reason}
                                    className={`rental-action-modal__tag ${selectedReason === reason ? 'rental-action-modal__tag--selected' : ''
                                        }`}
                                    onClick={() => setSelectedReason(reason === selectedReason ? '' : reason)}
                                >
                                    {reason}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="rental-action-modal__footer">
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--secondary"
                        onClick={handleClose}
                    >
                        Keep Rental
                    </button>
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--destructive"
                        onClick={handleCancel}
                    >
                        Cancel Rental
                    </button>
                </footer>
            </div>
        </div>
    );
};
