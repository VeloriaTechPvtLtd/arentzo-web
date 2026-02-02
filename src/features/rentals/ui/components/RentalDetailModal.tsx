import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Calendar, MapPin, Store, Clock, CreditCard, QrCode, RotateCcw, MessageCircle, Star } from 'lucide-react';
import type { Rental } from '../../domain/entities';
import { ReportIssueModal } from './ReportIssueModal';
import { ExtendRentalModal } from './ExtendRentalModal';
import { CancelRentalModal } from './CancelRentalModal';
import { PickupPassModal } from './PickupPassModal';
import { LeaveRatingModal } from './LeaveRatingModal';
import { ContactSupportModal } from './ContactSupportModal';
import { RentAgainModal } from './RentAgainModal';
import '../styles/RentalDetailModal.css';

type ActionModalType =
    | 'report-issue'
    | 'extend-rental'
    | 'cancel-rental'
    | 'pickup-pass'
    | 'leave-rating'
    | 'contact-support'
    | 'rent-again'
    | null;

interface RentalDetailModalProps {
    rental: Rental;
    isOpen: boolean;
    onClose: () => void;
}

export const RentalDetailModal: React.FC<RentalDetailModalProps> = ({ rental, isOpen, onClose }) => {
    const navigate = useNavigate();
    const [activeAction, setActiveAction] = useState<ActionModalType>(null);

    if (!isOpen) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
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

    const getStatusBadgeClass = (status: string) => {
        return `rental-detail-modal__status-badge rental-detail-modal__status-badge--${status}`;
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleCloseActionModal = () => {
        setActiveAction(null);
    };

    const handleBrowseSimilar = () => {
        onClose();
        navigate('/browse');
    };

    const renderFooterActions = () => {
        switch (rental.status) {
            case 'pending':
                return (
                    <>
                        <button
                            className="rental-detail-modal__btn rental-detail-modal__btn--destructive"
                            onClick={() => setActiveAction('cancel-rental')}
                        >
                            Cancel Rental
                        </button>
                        <button
                            className="rental-detail-modal__btn rental-detail-modal__btn--primary"
                            onClick={() => setActiveAction('contact-support')}
                        >
                            <MessageCircle size={16} />
                            Contact Support
                        </button>
                    </>
                );
            case 'ongoing':
                return (
                    <>
                        <button
                            className="rental-detail-modal__btn rental-detail-modal__btn--secondary"
                            onClick={() => setActiveAction('report-issue')}
                        >
                            <MessageCircle size={16} />
                            Report Issue
                        </button>
                        <button
                            className="rental-detail-modal__btn rental-detail-modal__btn--primary"
                            onClick={() => setActiveAction('extend-rental')}
                        >
                            <Clock size={16} />
                            Extend Rental
                        </button>
                    </>
                );
            case 'upcoming':
                return (
                    <>
                        <button
                            className="rental-detail-modal__btn rental-detail-modal__btn--destructive"
                            onClick={() => setActiveAction('cancel-rental')}
                        >
                            Cancel
                        </button>
                        <button
                            className="rental-detail-modal__btn rental-detail-modal__btn--primary"
                            onClick={() => setActiveAction('pickup-pass')}
                        >
                            <QrCode size={16} />
                            Pickup Pass
                        </button>
                    </>
                );
            case 'completed':
                return (
                    <>
                        <button
                            className="rental-detail-modal__btn rental-detail-modal__btn--secondary"
                            onClick={() => setActiveAction('leave-rating')}
                        >
                            <Star size={16} />
                            Leave Review
                        </button>
                        <button
                            className="rental-detail-modal__btn rental-detail-modal__btn--primary"
                            onClick={() => setActiveAction('rent-again')}
                        >
                            <RotateCcw size={16} />
                            Rent Again
                        </button>
                    </>
                );
            case 'cancelled':
                return (
                    <button
                        className="rental-detail-modal__btn rental-detail-modal__btn--primary"
                        style={{ flex: 1 }}
                        onClick={handleBrowseSimilar}
                    >
                        <RotateCcw size={16} />
                        Browse Similar Items
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="rental-detail-modal" onClick={handleBackdropClick}>
                <div className="rental-detail-modal__container">
                    {/* Header */}
                    <header className="rental-detail-modal__header">
                        <h2 className="rental-detail-modal__title">Rental Details</h2>
                        <button className="rental-detail-modal__close-btn" onClick={onClose}>
                            <X size={20} />
                        </button>
                    </header>

                    {/* Content */}
                    <div className="rental-detail-modal__content">
                        {/* Hero Image */}
                        <div className="rental-detail-modal__hero">
                            <img
                                src={rental.productImage}
                                alt={rental.productName}
                                className="rental-detail-modal__hero-image"
                            />
                            <span className={getStatusBadgeClass(rental.status)}>
                                {rental.status}
                            </span>
                        </div>

                        {/* Info Section */}
                        <div className="rental-detail-modal__info">
                            {/* Product Info */}
                            <div className="rental-detail-modal__product-info">
                                <h3 className="rental-detail-modal__product-name">{rental.productName}</h3>
                                <div className="rental-detail-modal__provider">
                                    <Store size={16} />
                                    <span>{rental.providerName}</span>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="rental-detail-modal__details-grid">
                                <div className="rental-detail-card">
                                    <div className="rental-detail-card__icon">
                                        <Calendar size={18} />
                                    </div>
                                    <div className="rental-detail-card__content">
                                        <span className="rental-detail-card__label">Rental Period</span>
                                        <span className="rental-detail-card__value">
                                            {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                                        </span>
                                    </div>
                                </div>

                                <div className="rental-detail-card">
                                    <div className="rental-detail-card__icon">
                                        <Clock size={18} />
                                    </div>
                                    <div className="rental-detail-card__content">
                                        <span className="rental-detail-card__label">Duration</span>
                                        <span className="rental-detail-card__value">{rental.rentalTerm}</span>
                                    </div>
                                </div>

                                <div className="rental-detail-card">
                                    <div className="rental-detail-card__icon">
                                        <MapPin size={18} />
                                    </div>
                                    <div className="rental-detail-card__content">
                                        <span className="rental-detail-card__label">Pickup Location</span>
                                        <span className="rental-detail-card__value">{rental.location}</span>
                                    </div>
                                </div>

                                <div className="rental-detail-card">
                                    <div className="rental-detail-card__icon">
                                        <CreditCard size={18} />
                                    </div>
                                    <div className="rental-detail-card__content">
                                        <span className="rental-detail-card__label">Total Amount</span>
                                        <span className="rental-detail-card__value rental-detail-card__value--highlight">
                                            {formatCurrency(rental.totalAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Info */}
                            <div className="rental-detail-modal__order-info">
                                <div className="rental-detail-modal__order-row">
                                    <span className="rental-detail-modal__order-label">Rental ID</span>
                                    <span className="rental-detail-modal__order-value rental-detail-modal__order-value--id">
                                        {rental.id}
                                    </span>
                                </div>
                                <div className="rental-detail-modal__order-row">
                                    <span className="rental-detail-modal__order-label">Ordered On</span>
                                    <span className="rental-detail-modal__order-value">
                                        {formatDate(rental.orderDate)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <footer className="rental-detail-modal__footer">
                        {renderFooterActions()}
                    </footer>
                </div>
            </div>

            {/* Action Modals */}
            <ReportIssueModal
                rental={rental}
                isOpen={activeAction === 'report-issue'}
                onClose={handleCloseActionModal}
            />
            <ExtendRentalModal
                rental={rental}
                isOpen={activeAction === 'extend-rental'}
                onClose={handleCloseActionModal}
            />
            <CancelRentalModal
                rental={rental}
                isOpen={activeAction === 'cancel-rental'}
                onClose={handleCloseActionModal}
            />
            <PickupPassModal
                rental={rental}
                isOpen={activeAction === 'pickup-pass'}
                onClose={handleCloseActionModal}
            />
            <LeaveRatingModal
                rental={rental}
                isOpen={activeAction === 'leave-rating'}
                onClose={handleCloseActionModal}
            />
            <ContactSupportModal
                rental={rental}
                isOpen={activeAction === 'contact-support'}
                onClose={handleCloseActionModal}
            />
            <RentAgainModal
                rental={rental}
                isOpen={activeAction === 'rent-again'}
                onClose={handleCloseActionModal}
            />
        </>
    );
};
