'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, History, Clock, CheckCircle2, Box, AlertCircle, LayoutGrid } from 'lucide-react';
import { RentalCard } from '../components/RentalCard';
import { RentalTabs } from '../components/RentalTabs';
import { useCustomerRentals } from '../hooks/useCustomerRentals';
import type { RentalStatus } from '../../domain/entities';
import '../styles/MyRentalsPage.css';

export const MyRentalsPage: React.FC = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<RentalStatus | 'all'>('all');
    const { rentals, loading, error, hasMore, retry, loadMore } = useCustomerRentals();

    const filteredRentals = rentals.filter(rental => {
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
        router.push(`/my-rentals/?id=${encodeURIComponent(rentalId)}`);
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
                {loading ? <p role="status">Loading your rentals…</p> : null}
                {error ? <div role="alert">We couldn’t load your rentals. <button onClick={retry}>Try again</button></div> : null}
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
                ) : null}
                {!loading && !error && filteredRentals.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state__icon">
                            <Box size={40} />
                        </div>
                        <h3>No rentals found</h3>
                        <p>No matching rentals in the loaded history. Use Load more to check older rentals when available.</p>
                        <button className="browse-btn" onClick={() => router.push('/browse')}>
                            Browse Items
                        </button>
                    </div>
                ) : null}
                {hasMore ? <button className="browse-btn" disabled={loading} onClick={loadMore}>{loading ? 'Loading…' : 'Load more rentals'}</button> : null}
            </main>
        </div>
    );
};
