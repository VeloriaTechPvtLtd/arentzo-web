import React from 'react';
import {
    Tag,
    Calendar,
    Copy,
    TrendingUp,
    MoreHorizontal
} from 'lucide-react';
import { Offer } from '../../infrastructure/api/offersMockData';
import '../styles/OfferCard.css';

interface OfferCardProps {
    offer: Offer;
    onClick: () => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onClick }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short'
        });
    };

    const getStatusLabel = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <div className="modern-offer-card" onClick={onClick}>
            <div className="offer-header-section">
                <div className="offer-badge-wrapper">
                    <div className="promo-symbol">
                        <Tag size={20} />
                    </div>
                </div>
                <div className="offer-main-info">
                    <h3 className="offer-title">{offer.title}</h3>
                    <div className="offer-sub-header">
                        <span className="offer-id-text">{offer.id}</span>
                        <span className={`offer-status-badge ${offer.status}`}>
                            {getStatusLabel(offer.status)}
                        </span>
                    </div>
                </div>
                <button className="offer-actions-btn" onClick={(e) => {
                    e.stopPropagation();
                    // Actions could be triggered here
                }}>
                    <MoreHorizontal size={18} />
                </button>
            </div>

            <div className="offer-content-section">
                <div className="discount-display">
                    <div className="discount-value">
                        <span className="value-number">{offer.discountValue}</span>
                        <span className="value-type">{offer.discountType === 'percentage' ? '%' : ' OFF'}</span>
                    </div>
                    <span className="discount-label">Discount Value</span>
                </div>

                <div className="code-display">
                    <div className="code-box">
                        <span className="code-text">{offer.code}</span>
                        <Copy size={14} className="copy-icon" />
                    </div>
                    <span className="code-label">Promo Code</span>
                </div>
            </div>

            <div className="offer-footer-section">
                <div className="footer-stat">
                    <Calendar size={14} className="footer-icon" />
                    <span>{formatDate(offer.startDate)} - {formatDate(offer.endDate)}</span>
                </div>
                <div className="footer-stat usage">
                    <TrendingUp size={14} className="footer-icon" />
                    <span>{offer.usageCount || 0} Uses</span>
                </div>
            </div>

            <div className="card-click-overlay">
                <span>View Insights</span>
            </div>
        </div>
    );
};
