import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical
} from 'lucide-react';
import { mockOrders } from '../data/ordersMockData';
import './ProviderOrdersPage.css';

export const ProviderOrdersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredOrders = mockOrders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.productName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
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

    return (
        <div className="provider-orders-page">
            <div className="orders-toolbar">
                <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by Order ID, customer, or product..."
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
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th>Amount</th>
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
                                    <span className={`status-pill ${order.status}`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <div className="date-box">{formatDate(order.date)}</div>
                                </td>
                                <td>
                                    <div className="amount-box">{formatCurrency(order.totalAmount)}</div>
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
                        <p>No orders found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
