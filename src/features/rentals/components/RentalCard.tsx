import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import type { Rental } from '../types';
import './RentalCard.css';

interface RentalCardProps {
    rental: Rental;
    onClick: (id: string) => void;
}

export const RentalCard: React.FC<RentalCardProps> = ({ rental, onClick }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'status--pending';
            case 'ongoing': return 'status--ongoing';
            case 'upcoming': return 'status--upcoming';
            case 'completed': return 'status--completed';
            case 'cancelled': return 'status--cancelled';
            default: return '';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="rental-card" onClick={() => onClick(rental.id)}>
            <div className="rental-card__image-wrapper">
                <img src={rental.productImage} alt={rental.productName} className="rental-card__image" />
                <div className={`status-badge ${getStatusColor(rental.status)}`}>
                    <span className="status-badge__dot" />
                    {rental.status}
                </div>
            </div>

            <div className="rental-card__info">
                <div className="rental-card__main">
                    <div className="rental-card__header">
                        <h3 className="rental-card__title" title={rental.productName}>{rental.productName}</h3>
                        <p className="rental-card__id">{rental.id}</p>
                    </div>

                    <div className="rental-card__provider">
                        <span className="label">Provider</span>
                        <span className="value">{rental.providerName}</span>
                    </div>

                    <div className="rental-card__stats">
                        <div className="stat-item">
                            <Calendar size={14} className="stat-item__icon" />
                            <div className="stat-item__content">
                                <span className="stat-item__label">Duration</span>
                                <span className="stat-item__value">{formatDate(rental.startDate)} - {formatDate(rental.endDate)}</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <MapPin size={14} className="stat-item__icon" />
                            <div className="stat-item__content">
                                <span className="stat-item__label">Location</span>
                                <span className="stat-item__value">{rental.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rental-card__footer">
                    <div className="rental-card__price-section">
                        <span className="price-label">Total Amount</span>
                        <span className="price-value">{formatCurrency(rental.totalAmount)}</span>
                    </div>
                    <button className="rental-card__btn">
                        View Details
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};
