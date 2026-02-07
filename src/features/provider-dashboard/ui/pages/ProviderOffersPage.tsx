import React, { useState } from 'react';
import {
    Search,
    Filter,
    Plus
} from 'lucide-react';
import { mockOffers, type Offer } from '../../infrastructure/api/offersMockData';
import { AddOfferForm } from '../components/AddOfferForm';
import { OfferDetailsDrawer } from '../components/OfferDetailsDrawer';
import { OfferCard } from '../components/OfferCard';
import '../styles/ProviderOffersPage.css';

export const ProviderOffersPage: React.FC = () => {
    const [offers, setOffers] = useState<Offer[]>(mockOffers);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

    const handleCreateOffer = (newOffer: Offer) => {
        setOffers([newOffer, ...offers]);
        setShowCreateModal(false);
    };

    const handleOfferClick = (offer: Offer) => {
        setSelectedOffer(offer);
    };

    const handlePauseOffer = (offerId: string) => {
        setOffers(offers.map(offer => {
            if (offer.id === offerId) {
                const newStatus = offer.status === 'active' ? 'paused' : 'active';
                return { ...offer, status: newStatus };
            }
            return offer;
        }));

        if (selectedOffer && selectedOffer.id === offerId) {
            setSelectedOffer(prev => prev ? { ...prev, status: prev.status === 'active' ? 'paused' : 'active' } : null);
        }
    };

    const handleDeleteOffer = (offerId: string) => {
        setOffers(offers.filter(offer => offer.id !== offerId));
        setSelectedOffer(null);
    };

    const filteredOffers = offers.filter(offer => {
        const matchesSearch =
            offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="provider-offers-page">
            <div className="offers-toolbar">
                <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by title, code, or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filters-wrapper">
                    <div className="filter-select">
                        <Filter size={18} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="expired">Expired</option>
                            <option value="draft">Draft</option>
                            <option value="paused">Paused</option>
                        </select>
                    </div>

                    <button className="create-offer-btn" onClick={() => setShowCreateModal(true)}>
                        <Plus size={20} />
                        <span>Create Offer</span>
                    </button>
                </div>
            </div>

            {/* Offer Grid View */}
            <div className="offers-grid">
                {filteredOffers.map((offer) => (
                    <OfferCard
                        key={offer.id}
                        offer={offer}
                        onClick={() => handleOfferClick(offer)}
                    />
                ))}
            </div>

            {filteredOffers.length === 0 && (
                <div className="no-results">
                    <p>No offers found matching your criteria.</p>
                </div>
            )}

            {showCreateModal && (
                <AddOfferForm
                    onClose={() => setShowCreateModal(false)}
                    onSuccess={handleCreateOffer}
                />
            )}

            {selectedOffer && (
                <OfferDetailsDrawer
                    offer={selectedOffer}
                    onClose={() => setSelectedOffer(null)}
                    onPause={handlePauseOffer}
                    onDelete={handleDeleteOffer}
                />
            )}
        </div>
    );
};
