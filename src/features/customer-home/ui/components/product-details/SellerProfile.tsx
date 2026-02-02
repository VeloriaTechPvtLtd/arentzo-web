import { Star, CheckCircle, Phone, MessageSquare } from 'lucide-react';
import type { Seller } from '../../../domain/entities/types';

interface SellerProfileProps {
    seller: Seller;
}

export const SellerProfile: React.FC<SellerProfileProps> = ({ seller }) => {
    return (
        <div className="section-container seller-profile">
            <h3 className="section-title">Seller</h3>
            <div className="seller-card-v2">
                <div className="seller-info-content">
                    <div className="seller-avatar-wrapper">
                        <img src={seller.avatar} alt={seller.name} className="seller-avatar-img" />
                        {seller.isVerified && (
                            <div className="verification-badge">
                                <CheckCircle size={10} fill="currentColor" />
                            </div>
                        )}
                    </div>
                    <div className="seller-details">
                        <h4 className="seller-fullname">{seller.name}</h4>
                        <div className="seller-stat-row">
                            <Star size={12} fill="var(--home-primary)" color="var(--home-primary)" />
                            <span className="stat-value">{seller.rating}</span>
                            <span className="stat-count">({seller.reviewCount} reviews)</span>
                        </div>
                    </div>
                </div>
                <div className="seller-actions-v2">
                    <button className="icon-action-btn" aria-label="Call">
                        <Phone size={18} color="var(--home-primary)" />
                    </button>
                    <button className="icon-action-btn primary" aria-label="Message">
                        <MessageSquare size={18} color="var(--home-primary)" />
                    </button>
                </div>
            </div>
        </div>
    );
};
