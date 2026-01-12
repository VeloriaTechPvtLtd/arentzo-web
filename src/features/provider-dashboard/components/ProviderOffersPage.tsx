import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Plus,
    CheckCircle2,
    Clock,
    Calendar,
    XCircle,
    Tag,
    Edit,
    Trash2
} from 'lucide-react';
import { mockOffers } from '../data/offersMockData';
import type { Offer } from '../data/offersMockData';
import './ProviderOffersPage.css';

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

    const getStatusIcon = (status: Offer['status']) => {
        switch (status) {
            case 'active': return <CheckCircle2 size={16} className="text-green-500" />;
            case 'scheduled': return <Clock size={16} className="text-blue-500" />;
            case 'expired': return <XCircle size={16} className="text-red-500" />;
            case 'draft': return <Edit size={16} className="text-gray-500" />;
            default: return null;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="provider-offers-page">
            <header className="page-header">
                <div className="header-title">
                    <h1>Offers & Promotions</h1>
                    <p>Drive more sales with targeted discounts and limited time deals.</p>
                </div>

                <div className="header-actions">
                    <div className="header-stats">
                        <div className="mini-stat">
                            <span className="stat-label">Active Offers</span>
                            <span className="stat-value text-green-500">
                                {mockOffers.filter(o => o.status === 'active').length}
                            </span>
                        </div>
                        <div className="mini-stat">
                            <span className="stat-label">Total Used</span>
                            <span className="stat-value">
                                {mockOffers.reduce((acc, curr) => acc + curr.usageCount, 0)}
                            </span>
                        </div>
                    </div>
                    <button className="create-offer-btn">
                        <Plus size={20} />
                        <span>Create Offer</span>
                    </button>
                </div>
            </header>

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
                </div>
            </div>

            <div className="offers-table-container">
                <table className="offers-table">
                    <thead>
                        <tr>
                            <th>Promotion</th>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Validity</th>
                            <th>Usage</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                                <td className="discount-cell">
                                    <span className="discount-value">
                                        {offer.discountValue}{offer.discountType === 'percentage' ? '%' : ' OFF'}
                                    </span>
                                    <span className="discount-type">{offer.discountType}</span>
                                </td>
                                <td className="validity-cell">
                                    <div className="date-info">
                                        <Calendar size={14} />
                                        <span>{formatDate(offer.startDate)} - {formatDate(offer.endDate)}</span>
                                    </div>
                                </td>
                                <td className="usage-count">{offer.usageCount}</td>
                                <td>
                                    <span className={`status-badge status--${offer.status}`}>
                                        {getStatusIcon(offer.status)}
                                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button className="icon-btn" title="Edit">
                                        <Edit size={18} />
                                    </button>
                                    <button className="icon-btn text-red-400" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                    <button className="icon-btn" title="More">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredOffers.length === 0 && (
                    <div className="no-results">
                        <p>No offers found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
