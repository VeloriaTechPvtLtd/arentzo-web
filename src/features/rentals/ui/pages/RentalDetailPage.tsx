'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Store, Clock, CreditCard } from 'lucide-react';
import { BackHeader } from '../../../../shared/components/layout/BackHeader';
import { useCustomerRentals } from '../hooks/useCustomerRentals';
import '../styles/RentalDetailPage.css';

export const RentalDetailPage: React.FC<{ rentalId: string }> = ({ rentalId }) => {
    const router = useRouter();
    const { rentals, loading, error } = useCustomerRentals(rentalId);
    const rental = useMemo(() => rentals[0], [rentals]);

    if (loading) return <div className="rental-detail-page"><BackHeader title="Rental Details" /><p role="status">Loading rental…</p></div>;
    if (error) return <div className="rental-detail-page"><BackHeader title="Rental Details" /><p role="alert">We couldn’t load this rental. Refresh and try again.</p></div>;

    if (!rental) {
        return (
            <div className="rental-detail-page">
                <BackHeader title="Rental Details" />
                <div className="rental-detail-page__not-found">
                    <h2>Rental not found</h2>
                    <p>The rental you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => router.push('/my-rentals')}>
                        Back to My Rentals
                    </button>
                </div>
            </div>
        );
    }

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
            currency: rental.currency || 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusBadgeClass = (status: string) => {
        return `rental-detail-page__status-badge rental-detail-page__status-badge--${status}`;
    };

    const handleBrowseSimilar = () => {
        router.push('/browse');
    };

    const renderFooterActions = () => {
        return rental.status === 'cancelled' ? <button className="rental-detail-page__btn rental-detail-page__btn--primary" onClick={handleBrowseSimilar}>Browse Similar Items</button> : <p role="status" className="text-sm text-muted-foreground">Rental changes and handover actions are unavailable while their backend workflows are being verified.</p>;
    };

    return (
        <>
            <div className="rental-detail-page">
                <BackHeader title="Rental Details" />

                <main className="rental-detail-page__content">
                    {/* Hero Image */}
                    <div className="rental-detail-page__hero">
                        <img
                            src={rental.productImage}
                            alt={rental.productName}
                            className="rental-detail-page__hero-image"
                        />
                        <span className={getStatusBadgeClass(rental.status)}>
                            {rental.status}
                        </span>
                    </div>

                    {/* Info Section */}
                    <div className="rental-detail-page__info">
                        {/* Product Info */}
                        <div className="rental-detail-page__product-info">
                            <h1 className="rental-detail-page__product-name">{rental.productName}</h1>
                            <div className="rental-detail-page__provider">
                                <Store size={16} />
                                <span>{rental.providerName}</span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="rental-detail-page__details-grid">
                            <DetailCard
                                icon={<Calendar size={18} />}
                                label="Rental Period"
                                value={`${formatDate(rental.startDate)} - ${formatDate(rental.endDate)}`}
                            />
                            <DetailCard
                                icon={<Clock size={18} />}
                                label="Duration"
                                value={rental.rentalTerm}
                            />
                            <DetailCard
                                icon={<MapPin size={18} />}
                                label="Pickup Location"
                                value={rental.location}
                            />
                            <DetailCard
                                icon={<CreditCard size={18} />}
                                label="Total Amount"
                                value={formatCurrency(rental.totalAmount)}
                                highlight
                            />
                        </div>

                        {/* Order Info */}
                        <div className="rental-detail-page__order-info">
                            <div className="rental-detail-page__order-row">
                                <span className="rental-detail-page__order-label">Rental ID</span>
                                <span className="rental-detail-page__order-value rental-detail-page__order-value--id">
                                    {rental.id}
                                </span>
                            </div>
                            <div className="rental-detail-page__order-row">
                                <span className="rental-detail-page__order-label">Ordered On</span>
                                <span className="rental-detail-page__order-value">
                                    {formatDate(rental.orderDate)}
                                </span>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer Actions */}
                <footer className="rental-detail-page__footer">
                    {renderFooterActions()}
                </footer>
            </div>

        </>
    );
};

interface DetailCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    highlight?: boolean;
}

const DetailCard: React.FC<DetailCardProps> = ({ icon, label, value, highlight }) => (
    <div className="rental-detail-card">
        <div className="rental-detail-card__icon">{icon}</div>
        <div className="rental-detail-card__content">
            <span className="rental-detail-card__label">{label}</span>
            <span className={`rental-detail-card__value ${highlight ? 'rental-detail-card__value--highlight' : ''}`}>
                {value}
            </span>
        </div>
    </div>
);
