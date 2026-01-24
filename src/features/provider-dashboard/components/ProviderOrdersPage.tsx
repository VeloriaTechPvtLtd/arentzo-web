import React from 'react';
import {
    Search,
    Filter,
    MoreVertical
} from 'lucide-react';
import { mockOrders } from '../data/ordersMockData';
import { useProviderFilters } from '../hooks/useProviderFilters';
import { ProviderFilterModal } from './ProviderFilterModal';
import './ProviderOrdersPage.css';

export const ProviderOrdersPage: React.FC = () => {
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

    const filterDefinitions: any[] = [
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

    const filteredOrders = mockOrders.filter(order => {
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'requested': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'approved': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'booked': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
            case 'active': return 'bg-green-100 text-green-700 border-green-200';
            case 'returned': return 'bg-purple-50 text-purple-700 border-purple-200';
            case 'overdue': return 'bg-red-100 text-red-700 border-red-200';
            case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

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

            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Rental Status</th>
                            <th>Return Due</th>
                            <th>Logistics</th>
                            <th>Financials</th>
                            <th>Customer</th>
                            <th className="actions-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="product-cell">
                                    <div className="product-info">
                                        <img src={order.image} alt={order.productName} />
                                        <div className="product-text">
                                            <span className="product-name">{order.productName}</span>
                                            <span className="product-id">{order.id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-pill ${getStatusColor(order.rentalStatus)}`}>
                                        {order.rentalStatus.charAt(0).toUpperCase() + order.rentalStatus.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <div className="date-box">{formatDate(order.returnDate)}</div>
                                </td>
                                <td>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-md border ${order.deliveryMethod === 'delivery'
                                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                                        : 'bg-orange-50 text-orange-700 border-orange-200'
                                        }`}>
                                        {order.deliveryMethod.toUpperCase()}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <div className="amount-box text-xs py-1">{formatCurrency(order.totalAmount)}</div>
                                        <div className="flex gap-1">
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.paymentStatus.toUpperCase()}
                                            </span>
                                            {order.depositStatus !== 'n/a' && (
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${order.depositStatus === 'held' ? 'bg-blue-100 text-blue-700' :
                                                    order.depositStatus === 'deducted' ? 'bg-red-100 text-red-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    DEP: {order.depositStatus.toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="customer-cell">
                                    <div className="customer-info">
                                        <span className="customer-name">{order.customerName}</span>
                                        <span className="customer-email">{order.customerEmail}</span>
                                    </div>
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

                {filteredOrders.length === 0 && (
                    <div className="no-results">
                        <p>No rentals found matching your criteria.</p>
                        <button onClick={resetFilters} className="text-primary hover:underline mt-2">
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            <ProviderFilterModal
                isOpen={isOpen}
                onClose={closeFilters}
                filters={filters}
                onUpdate={updateFilter as (key: string, value: any) => void}
                onReset={resetFilters}
                definitions={filterDefinitions}
            />
        </div>
    );
};
