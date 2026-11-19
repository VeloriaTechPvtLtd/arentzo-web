import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import type { Rental } from '../../domain/entities';
import '../styles/RentalCard.css';

interface RentalCardProps {
    rental: Rental;
    onClick: (id: string) => void;
}

export const RentalCard: React.FC<RentalCardProps> = ({ rental, onClick }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
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
            currency: rental.currency || 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="rental-card" onClick={() => onClick(rental.id)}>
            <div className="rental-card__image-wrapper">
                <img src={rental.productImage} alt={rental.productName} className="rental-card__image" />
                <div className={`status-badge ${getStatusColor(rental.status)}`}>
                    {rental.status}
                </div>
            </div>

            <div className="rental-card__content">
                <div className="rental-card__header">
                    <h3 className="rental-card__title" title={rental.productName}>{rental.productName}</h3>
                    <div className="rental-card__price">
                        {formatCurrency(rental.totalAmount)}
                    </div>
                </div>

                <div className="rental-card__meta">
                    <div className="meta-item">
                        <Calendar size={14} />
                        <span>{formatDate(rental.startDate)} - {formatDate(rental.endDate)}</span>
                    </div>
                    <div className="meta-item">
                        <MapPin size={14} />
                        <span>{rental.location}</span>
                    </div>
                </div>

                <div className="rental-card__footer">
                    <div className="rental-card__provider">
                        <span className="provider-label">Provider</span>
                        <span className="provider-name">{rental.providerName}</span>
                    </div>
                    <button className="view-details-btn">
                        Details <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};
