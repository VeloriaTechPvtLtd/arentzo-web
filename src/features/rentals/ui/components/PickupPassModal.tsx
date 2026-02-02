import React from 'react';
import { X, MapPin, Calendar, Clock, Store, Share2, Download } from 'lucide-react';
import type { Rental } from '../../domain/entities';
import '../styles/RentalActionModals.css';

interface PickupPassModalProps {
    rental: Rental;
    isOpen: boolean;
    onClose: () => void;
}

export const PickupPassModal: React.FC<PickupPassModalProps> = ({ rental, isOpen, onClose }) => {
    if (!isOpen) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const generateQRPattern = () => {
        const rows = [];
        for (let i = 0; i < 15; i++) {
            const row = [];
            for (let j = 0; j < 15; j++) {
                const isBorder = i === 0 || i === 14 || j === 0 || j === 14;
                const isCorner = (i < 5 && j < 5) || (i < 5 && j > 9) || (i > 9 && j < 5);
                const isRandom = Math.random() > 0.5;
                const shouldFill = isBorder || isCorner || isRandom;
                row.push(
                    <rect
                        key={`${i}-${j}`}
                        x={j * 12 + 10}
                        y={i * 12 + 10}
                        width={10}
                        height={10}
                        fill={shouldFill ? 'currentColor' : 'transparent'}
                    />
                );
            }
            rows.push(...row);
        }
        return rows;
    };

    return (
        <div className="rental-action-modal" onClick={handleBackdropClick}>
            <div className="rental-action-modal__container">
                <header className="rental-action-modal__header">
                    <h2 className="rental-action-modal__title">Pickup Pass</h2>
                    <button className="rental-action-modal__close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </header>

                <div className="rental-action-modal__content">
                    <div className="rental-action-modal__qr-container">
                        <div className="rental-action-modal__qr-code">
                            <svg width="200" height="200" viewBox="0 0 200 200" style={{ color: '#1a1a1a' }}>
                                {generateQRPattern()}
                            </svg>
                        </div>
                        <span className="rental-action-modal__qr-id">{rental.id}</span>
                    </div>

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
                        </div>
                    </div>

                    <div className="rental-action-modal__info-card">
                        <div className="rental-action-modal__info-icon">
                            <Calendar size={18} />
                        </div>
                        <div className="rental-action-modal__info-content">
                            <span className="rental-action-modal__info-label">Pickup Date</span>
                            <span className="rental-action-modal__info-value">
                                {formatDate(rental.startDate)}
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__info-card">
                        <div className="rental-action-modal__info-icon">
                            <Clock size={18} />
                        </div>
                        <div className="rental-action-modal__info-content">
                            <span className="rental-action-modal__info-label">Pickup Time</span>
                            <span className="rental-action-modal__info-value">
                                10:00 AM - 6:00 PM
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__info-card">
                        <div className="rental-action-modal__info-icon">
                            <MapPin size={18} />
                        </div>
                        <div className="rental-action-modal__info-content">
                            <span className="rental-action-modal__info-label">Pickup Location</span>
                            <span className="rental-action-modal__info-value">
                                {rental.location}
                            </span>
                        </div>
                    </div>
                </div>

                <footer className="rental-action-modal__footer">
                    <button className="rental-action-modal__btn rental-action-modal__btn--secondary">
                        <Download size={16} />
                        Save
                    </button>
                    <button className="rental-action-modal__btn rental-action-modal__btn--primary">
                        <Share2 size={16} />
                        Share Pass
                    </button>
                </footer>
            </div>
        </div>
    );
};
