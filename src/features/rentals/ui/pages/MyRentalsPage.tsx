import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, History, Clock, CheckCircle2, Box, AlertCircle, LayoutGrid } from 'lucide-react';
import { RentalCard } from '../components/RentalCard';
import { RentalTabs } from '../components/RentalTabs';
import { RentalDetailModal } from '../components/RentalDetailModal';
import { mockRentals } from '../../infrastructure/api/mockRentals';
import type { Rental, RentalStatus } from '../../domain/entities';
import '../styles/MyRentalsPage.css';

export const MyRentalsPage: React.FC = () => {
    const navigate = useNavigate();
    const { id: rentalIdFromUrl } = useParams<{ id?: string }>();
    const [activeTab, setActiveTab] = useState<RentalStatus | 'all'>('all');
    const [selectedRental, setSelectedRental] = useState<Rental | null>(null);

    useEffect(() => {
        if (rentalIdFromUrl) {
            const rental = mockRentals.find(r => r.id === rentalIdFromUrl);
            if (rental) {
                setSelectedRental(rental);
            }
        } else {
            setSelectedRental(null);
        }
    }, [rentalIdFromUrl]);

    const filteredRentals = mockRentals.filter(rental => {
        return activeTab === 'all' || rental.status === activeTab;
    });

    const tabs: { id: RentalStatus | 'all'; label: string; icon: React.ElementType }[] = [
        { id: 'all', label: 'All', icon: LayoutGrid },
        { id: 'pending', label: 'Pending', icon: AlertCircle },
        { id: 'ongoing', label: 'Ongoing', icon: Clock },
        { id: 'upcoming', label: 'Upcoming', icon: Calendar },
        { id: 'completed', label: 'Completed', icon: CheckCircle2 },
        { id: 'cancelled', label: 'Cancelled', icon: History },
    ];

    const handleBack = () => {
        navigate(-1);
    };

    const handleRentalClick = (rentalId: string) => {
        navigate(`/my-rentals/${rentalId}`);
    };

    const handleCloseModal = () => {
        navigate('/my-rentals');
    };

    return (
        <div className="my-rentals-page">
            <header className="my-rentals-header">
                <div className="my-rentals-header__tabs">
                    <RentalTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        onBack={handleBack}
                    />
                </div>
            </header>

            <main className="rentals-content">
                {filteredRentals.length > 0 ? (
                    <div className="rentals-grid">
                        {filteredRentals.map((rental) => (
                            <RentalCard
                                key={rental.id}
                                rental={rental}
                                onClick={handleRentalClick}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state__icon">
                            <Box size={40} />
                        </div>
                        <h3>No rentals found</h3>
                        <p>You haven't made any rentals in this category yet.</p>
                        <button className="browse-btn" onClick={() => navigate('/browse')}>
                            Browse Items
                        </button>
                    </div>
                )}
            </main>

            {selectedRental && (
                <RentalDetailModal
                    rental={selectedRental}
                    isOpen={true}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};
