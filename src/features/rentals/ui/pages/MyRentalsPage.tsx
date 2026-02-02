import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, History, Clock, CheckCircle2, Box, AlertCircle, LayoutGrid } from 'lucide-react';
import { RentalCard } from '../components/RentalCard';
import { RentalTabs } from '../components/RentalTabs';
import { mockRentals } from '../../infrastructure/api/mockRentals';
import type { RentalStatus } from '../../domain/entities';
import '../styles/MyRentalsPage.css';

export const MyRentalsPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<RentalStatus | 'all'>('all');

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

    const handleRentalClick = (rentalId: string) => {
        navigate(`/my-rentals/${rentalId}`);
    };

    return (
        <div className="my-rentals-page">
            <header className="my-rentals-header">
                <div className="my-rentals-header__tabs">
                    <RentalTabs
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
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
        </div>
    );
};
