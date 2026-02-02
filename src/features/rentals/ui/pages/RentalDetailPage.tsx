import React, { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, MapPin, Store, Clock, CreditCard, QrCode, RotateCcw, MessageCircle, Star } from 'lucide-react';
import { BackHeader } from '../../../../shared/components/layout/BackHeader';
import { ReportIssueModal } from '../components/ReportIssueModal';
import { ExtendRentalModal } from '../components/ExtendRentalModal';
import { CancelRentalModal } from '../components/CancelRentalModal';
import { PickupPassModal } from '../components/PickupPassModal';
import { LeaveRatingModal } from '../components/LeaveRatingModal';
import { ContactSupportModal } from '../components/ContactSupportModal';
import { RentAgainModal } from '../components/RentAgainModal';
import { mockRentals } from '../../infrastructure/api/mockRentals';
import '../styles/RentalDetailPage.css';

type ActionModalType =
    | 'report-issue'
    | 'extend-rental'
    | 'cancel-rental'
    | 'pickup-pass'
    | 'leave-rating'
    | 'contact-support'
    | 'rent-again'
    | null;

export const RentalDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [activeAction, setActiveAction] = useState<ActionModalType>(null);

    const rental = useMemo(() => {
        return mockRentals.find(r => r.id === id);
    }, [id]);

    if (!rental) {
        return (
            <div className="rental-detail-page">
                <BackHeader title="Rental Details" />
                <div className="rental-detail-page__not-found">
                    <h2>Rental not found</h2>
                    <p>The rental you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => navigate('/my-rentals')}>
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
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusBadgeClass = (status: string) => {
        return `rental-detail-page__status-badge rental-detail-page__status-badge--${status}`;
    };

    const handleCloseActionModal = () => {
        setActiveAction(null);
    };

    const handleBrowseSimilar = () => {
        navigate('/browse');
    };

    const renderFooterActions = () => {
        switch (rental.status) {
            case 'pending':
                return (
                    <>
                        <button
                            className="rental-detail-page__btn rental-detail-page__btn--destructive"
                            onClick={() => setActiveAction('cancel-rental')}
                        >
                            Cancel Rental
                        </button>
                        <button
                            className="rental-detail-page__btn rental-detail-page__btn--primary"
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
                            className="rental-detail-page__btn rental-detail-page__btn--secondary"
                            onClick={() => setActiveAction('report-issue')}
                        >
                            <MessageCircle size={16} />
                            Report Issue
                        </button>
                        <button
                            className="rental-detail-page__btn rental-detail-page__btn--primary"
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
                            className="rental-detail-page__btn rental-detail-page__btn--destructive"
                            onClick={() => setActiveAction('cancel-rental')}
                        >
                            Cancel
                        </button>
                        <button
                            className="rental-detail-page__btn rental-detail-page__btn--primary"
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
                            className="rental-detail-page__btn rental-detail-page__btn--secondary"
                            onClick={() => setActiveAction('leave-rating')}
                        >
                            <Star size={16} />
                            Leave Review
                        </button>
                        <button
                            className="rental-detail-page__btn rental-detail-page__btn--primary"
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
                        className="rental-detail-page__btn rental-detail-page__btn--primary"
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
