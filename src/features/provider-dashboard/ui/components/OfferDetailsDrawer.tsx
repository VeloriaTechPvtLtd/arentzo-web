import React, { useState, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { type Offer } from '../../infrastructure/api/offersMockData';
import { mockCouponUsage } from '../../infrastructure/api/couponUsageMockData';
import '../styles/ProviderDrawer.css';

interface OfferDetailsDrawerProps {
    offer: Offer;
    onClose: () => void;
    onPause: (offerId: string) => void;
    onDelete: (offerId: string) => void;
}

export const OfferDetailsDrawer: React.FC<OfferDetailsDrawerProps> = ({ offer, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => setIsOpen(true), 10);

        return () => {
            document.body.style.overflow = originalStyle;
            clearTimeout(timer);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const filteredUsage = mockCouponUsage.filter(usage =>
        usage.memberName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`provider-drawer-overlay ${isOpen ? 'provider-drawer-overlay--open' : ''}`}>
            <div className="provider-drawer-overlay__backdrop" onClick={handleClose} />

            <div className="provider-drawer-panel">
                <header className="provider-drawer-panel__header">
                    <button
                        className="provider-drawer-panel__back"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                    <h2 className="provider-drawer-panel__title">Coupon Usage</h2>
                    <div style={{ width: 36 }} />
                </header>

                <div className="provider-drawer-panel__content">
                    <div className="px-6 py-6 space-y-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl shadow-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                                placeholder="Search by member name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <CouponSummaryCard offer={offer} />
                        <MembersListSection filteredUsage={filteredUsage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface CouponSummaryCardProps {
    offer: Offer;
}

const CouponSummaryCard: React.FC<CouponSummaryCardProps> = ({ offer }) => (
    <div className="p-8 rounded-3xl bg-card border border-border shadow-sm space-y-6">
        <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground">Total Members Used</h2>
            <p className="text-6xl font-bold text-primary">{offer.usageCount}</p>
        </div>
        <p className="text-lg font-medium text-muted-foreground">{offer.code} Coupon</p>
    </div>
);

interface MembersListSectionProps {
    filteredUsage: typeof mockCouponUsage;
}

const MembersListSection: React.FC<MembersListSectionProps> = ({ filteredUsage }) => (
    <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">Members List</h2>
        <div className="space-y-4">
            {filteredUsage.map((usage) => (
                <MemberUsageCard key={usage.id} usage={usage} />
            ))}

            {filteredUsage.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    No usage data found for this coupon.
                </div>
            )}
        </div>
    </div>
);

interface MemberUsageCardProps {
    usage: {
        id: string;
        memberName: string;
        memberAvatar: string;
        discountAmount: number;
    };
}

const MemberUsageCard: React.FC<MemberUsageCardProps> = ({ usage }) => (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl shadow-sm">
        <img
            src={usage.memberAvatar}
            alt={usage.memberName}
            className="w-12 h-12 rounded-full object-cover bg-muted"
        />
        <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground truncate">{usage.memberName}</h3>
        </div>
        <div className="text-right">
            <p className="text-sm font-bold text-emerald-600">₹{usage.discountAmount}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Discount</p>
        </div>
    </div>
);
