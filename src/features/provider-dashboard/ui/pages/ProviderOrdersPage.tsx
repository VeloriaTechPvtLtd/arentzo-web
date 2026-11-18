'use client';

import React from 'react';
import {
    Search,
    Filter
} from 'lucide-react';
import { useProviderFilters } from '../hooks/useProviderFilters';
import { ProviderFilterModal, type FilterDefinition } from '../components/ProviderFilterModal';
import { OrderDetailsDrawer } from '../components/OrderDetailsDrawer';
import { OrderCard } from '../components/OrderCard';
import '../styles/ProviderOrdersPage.css';
import { useProviderOrders } from '../hooks/useProviderRecords';

export const ProviderOrdersPage: React.FC = () => {
    const { items: orders, loading, error } = useProviderOrders();
    const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null);

    const {
        isOpen,
        openFilters,
        closeFilters,
        filters,
        updateFilter,
        resetFilters,
        searchQuery,
        setSearchQuery,
        activeFilterCount
    } = useProviderFilters({
        rentalStatus: [] as string[],
        paymentStatus: [] as string[],
        deliveryMethod: [] as string[],
        depositStatus: [] as string[],
        returnDateRange: { from: null, to: null } as { from: Date | null; to: Date | null },
        amountRange: { min: null, max: null } as { min: number | null; max: number | null }
    });

    const filterDefinitions: FilterDefinition[] = [
        {
            id: 'rentalStatus',
            label: 'Rental Status',
            type: 'checkbox',
            options: [
                { id: 'requested', label: 'Requested' },
                { id: 'approved', label: 'Approved' },
                { id: 'booked', label: 'Booked' },
                { id: 'active', label: 'Active (With Customer)' },
                { id: 'overdue', label: 'Overdue' },
                { id: 'returned', label: 'Returned' },
                { id: 'completed', label: 'Completed' },
                { id: 'cancelled', label: 'Cancelled' }
            ]
        },
        {
            id: 'paymentStatus',
            label: 'Payment Status',
            type: 'checkbox',
            options: [
                { id: 'paid', label: 'Paid' },
                { id: 'pending', label: 'Pending' },
                { id: 'refunded', label: 'Refunded' }
            ]
        },
        {
            id: 'deliveryMethod',
            label: 'Delivery Method',
            type: 'checkbox',
            options: [
                { id: 'pickup', label: 'Pickup' },
                { id: 'delivery', label: 'Delivery' }
            ]
        },
        {
            id: 'depositStatus',
            label: 'Security Deposit',
            type: 'checkbox',
            options: [
                { id: 'held', label: 'Held' },
                { id: 'refunded', label: 'Refunded' },
                { id: 'deducted', label: 'Deducted' },
                { id: 'n/a', label: 'Not Applicable' }
            ]
        },
        {
            id: 'returnDateRange',
            label: 'Return Due Date',
            type: 'date-range'
        },
        {
            id: 'amountRange',
            label: 'Rental Amount',
            type: 'range',
            minLabel: 'Min',
            maxLabel: 'Max'
        }
    ];

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.productName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesRentalStatus = filters.rentalStatus.length === 0 || filters.rentalStatus.includes(order.rentalStatus);
        const matchesPaymentStatus = filters.paymentStatus.length === 0 || filters.paymentStatus.includes(order.paymentStatus);
        const matchesDelivery = filters.deliveryMethod.length === 0 || filters.deliveryMethod.includes(order.deliveryMethod);
        const matchesDeposit = filters.depositStatus.length === 0 || filters.depositStatus.includes(order.depositStatus);

        const matchesAmount =
            (filters.amountRange.min === null || order.totalAmount >= filters.amountRange.min) &&
            (filters.amountRange.max === null || order.totalAmount <= filters.amountRange.max);

        let matchesReturnDate = true;
        if (filters.returnDateRange.from || filters.returnDateRange.to) {
            const returnDate = new Date(order.returnDate);
            returnDate.setHours(0, 0, 0, 0);

            if (filters.returnDateRange.from) {
                const fromDate = new Date(filters.returnDateRange.from);
                fromDate.setHours(0, 0, 0, 0);
                if (returnDate < fromDate) matchesReturnDate = false;
            }
            if (filters.returnDateRange.to) {
                const toDate = new Date(filters.returnDateRange.to);
                toDate.setHours(23, 59, 59, 999);
                if (returnDate > toDate) matchesReturnDate = false;
            }
        }

        return matchesSearch && matchesRentalStatus && matchesPaymentStatus && matchesAmount && matchesReturnDate && matchesDelivery && matchesDeposit;
    });

    const selectedOrder = orders.find(o => o.id === selectedOrderId);

    return (
        <div className="provider-orders-page">
            <div className="orders-toolbar">
                <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search rentals by ID, customer, or product..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filters-wrapper">
                    <button
                        className={`filter-btn ${activeFilterCount > 0 ? 'active' : ''}`}
                        onClick={openFilters}
                    >
                        <Filter size={18} />
                        <span>Filter</span>
                        {activeFilterCount > 0 && (
                            <span className="filter-badge">{activeFilterCount}</span>
                        )}
                    </button>
                </div>
            </div>

            {/* Order Grid View */}
            <div className="orders-grid">
                {loading ? <p role="status">Loading provider bookings…</p> : null}
                {error ? <p role="alert">We couldn’t load provider bookings. Refresh and try again.</p> : null}
                {!loading && !error ? filteredOrders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onClick={() => setSelectedOrderId(order.id)}
                    />
                )) : null}
            </div>

            {!loading && !error && filteredOrders.length === 0 && (
                <div className="no-results">
                    <p>No rentals found matching your criteria.</p>
                    <button onClick={resetFilters} className="text-primary hover:underline mt-2">
                        Clear all filters
                    </button>
                </div>
            )}

            <ProviderFilterModal
                isOpen={isOpen}
                onClose={closeFilters}
                filters={filters}
                onUpdate={updateFilter as (key: string, value: unknown) => void}
                onReset={resetFilters}
                definitions={filterDefinitions}
            />

            {selectedOrder && (
                <OrderDetailsDrawer
                    order={selectedOrder}
                    onClose={() => setSelectedOrderId(null)}
                />
            )}
        </div>
    );
};
