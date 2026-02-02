import React from 'react';
import { ShieldCheck, Zap, Truck, CreditCard, UserCheck, Headset } from 'lucide-react';
import type { RentalTerm } from '../../../domain/entities/types';

interface RentalTermsProps {
    terms: RentalTerm[];
}

export const RentalTerms: React.FC<RentalTermsProps> = ({ terms }) => {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'id': return <UserCheck size={24} />;
            case 'shield': return <ShieldCheck size={24} />;
            case 'zap': return <Zap size={24} />;
            case 'truck': return <Truck size={24} />;
            case 'payment': return <CreditCard size={24} />;
            case 'headset': return <Headset size={24} />;
            default: return <ShieldCheck size={24} />;
        }
    };

    return (
        <div className="section-container rental-terms">
            <h3 className="section-title">Rental Terms & Policies</h3>
            <div className="terms-grid">
                {terms.map((term) => (
                    <div key={term.id} className="term-card">
                        <div className="term-icon-wrapper">
                            {getIcon(term.icon)}
                        </div>
                        <div className="term-info">
                            <h4 className="term-title">{term.title}</h4>
                            <p className="term-desc">{term.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="trust-badges">
                <div className="trust-item">
                    <div className="trust-icon-circle">
                        <UserCheck size={20} />
                    </div>
                    <span>Verified Owners</span>
                </div>
                <div className="trust-item">
                    <div className="trust-icon-circle">
                        <CreditCard size={20} />
                    </div>
                    <span>Secure Payment</span>
                </div>
                <div className="trust-item">
                    <div className="trust-icon-circle">
                        <Headset size={20} />
                    </div>
                    <span>24/7 Support</span>
                </div>
            </div>
        </div>
    );
};
