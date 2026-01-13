import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, History, Clock, CheckCircle2, Box, AlertCircle, LayoutGrid } from 'lucide-react';
import { RentalCard } from './components/RentalCard';
import { mockRentals } from './data/mockRentals';
import type { RentalStatus } from './types';
import './MyRentalsPage.css';

export const MyRentalsPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<RentalStatus | 'all'>('all');
    const tabsContainerRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);

    const filteredRentals = mockRentals.filter(rental => {
        return activeTab === 'all' || rental.status === activeTab;
    });

    useEffect(() => {
        if (activeTabRef.current && tabsContainerRef.current) {
            const container = tabsContainerRef.current;
            const tab = activeTabRef.current;
            const scrollLeft = tab.offsetLeft - (container.offsetWidth / 2) + (tab.offsetWidth / 2);
            container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
        }
    }, [activeTab]);

    const tabs: { id: RentalStatus | 'all'; label: string; icon: React.ReactNode }[] = [
        { id: 'all', label: 'All', icon: <LayoutGrid size={16} /> },
        { id: 'pending', label: 'Pending', icon: <AlertCircle size={16} /> },
        { id: 'ongoing', label: 'Ongoing', icon: <Clock size={16} /> },
        { id: 'upcoming', label: 'Upcoming', icon: <Calendar size={16} /> },
        { id: 'completed', label: 'Completed', icon: <CheckCircle2 size={16} /> },
        { id: 'cancelled', label: 'Cancelled', icon: <History size={16} /> },
    ];

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="my-rentals-page">
            <header className="my-rentals-header">
                <div className="header-top">
                    <button className="back-btn" onClick={handleBack} aria-label="Go back">
                        <ArrowLeft size={20} />
                    </button>
                    <h1>My Rentals</h1>
                </div>

                <div className="tabs-container" ref={tabsContainerRef}>
                    <div className="tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                ref={activeTab === tab.id ? activeTabRef : null}
                                className={`tab-item ${activeTab === tab.id ? 'tab-item--active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="rentals-content">
                {filteredRentals.length > 0 ? (
                    <div className="rentals-grid">
                        {filteredRentals.map((rental) => (
                            <RentalCard
                                key={rental.id}
                                rental={rental}
                                onClick={(id) => console.log('Rental clicked:', id)}
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
