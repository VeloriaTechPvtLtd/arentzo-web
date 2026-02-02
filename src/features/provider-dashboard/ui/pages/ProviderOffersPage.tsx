import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Plus,
    Tag
} from 'lucide-react';
import { mockOffers } from '../../infrastructure/api/offersMockData';
import '../styles/ProviderOffersPage.css';

export const ProviderOffersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredOffers = mockOffers.filter(offer => {
        const matchesSearch =
            offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

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
                        </select>
                    </div>

                    <button className="create-offer-btn">
                        <Plus size={20} />
                        <span>Create Offer</span>
                    </button>
                </div>
            </div>

            <div className="offers-table-container">
                <table className="offers-table">
                    <thead>
                        <tr>
                            <th>Promotion</th>
                            <th>Code</th>
                            <th>Value</th>
                            <th>Validity</th>
                            <th>Status</th>
                            <th className="actions-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOffers.map((offer) => (
                            <tr key={offer.id}>
                                <td className="promotion-cell">
                                    <div className="promotion-info">
                                        <div className="promo-icon">
                                            <Tag size={18} />
                                        </div>
                                        <div className="promo-text">
                                            <span className="promo-title">{offer.title}</span>
                                            <span className="promo-id">{offer.id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <code className="promo-code">{offer.code}</code>
                                </td>
                                <td>
                                    <div className="value-box">
                                        {offer.discountValue}{offer.discountType === 'percentage' ? '%' : ' OFF'}
                                    </div>
                                </td>
                                <td className="validity-cell">
                                    <div className="date-badge">
                                        {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-pill ${offer.status}`}>
                                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button className="icon-btn" title="More">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="offers-mobile-cards">
                {filteredOffers.map((offer) => (
                    <div key={offer.id} className="offer-mobile-card">
                        <div className="offer-mobile-card__header">
                            <div className="offer-mobile-card__info">
                                <div className="promo-icon">
                                    <Tag size={18} />
                                </div>
                                <div className="promo-text">
                                    <span className="promo-title text-sm font-bold">{offer.title}</span>
                                    <span className="promo-id text-xs text-muted-foreground">{offer.id}</span>
                                </div>
                            </div>
                            <button className="icon-btn">
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <div className="offer-mobile-card__body">
                            <div className="offer-mobile-card__grid">
                                <div className="offer-mobile-card__field">
                                    <span className="field-label">Promo Code</span>
                                    <code className="promo-code">{offer.code}</code>
                                </div>
                                <div className="offer-mobile-card__field">
                                    <span className="field-label">Value</span>
                                    <span className="text-sm font-bold text-primary">
                                        {offer.discountValue}{offer.discountType === 'percentage' ? '%' : ' OFF'}
                                    </span>
                                </div>
                                <div className="offer-mobile-card__field">
                                    <span className="field-label">Validity</span>
                                    <span className="text-xs font-medium text-foreground">
                                        {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                                    </span>
                                </div>
                                <div className="offer-mobile-card__field">
                                    <span className="field-label">Status</span>
                                    <span className={`status-pill ${offer.status}`}>
                                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredOffers.length === 0 && (
                <div className="no-results">
                    <p>No offers found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};
