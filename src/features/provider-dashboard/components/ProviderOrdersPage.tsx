import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Eye,
    CheckCircle2,
    Clock,
    Truck,
    XCircle
} from 'lucide-react';
import { mockOrders } from '../data/ordersMockData';
import type { Order } from '../data/ordersMockData';
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

    const getStatusIcon = (status: Order['status']) => {
        switch (status) {
            case 'delivered': return <CheckCircle2 size={16} className="text-green-500" />;
            case 'processing': return <Clock size={16} className="text-blue-500" />;
            case 'shipped': return <Truck size={16} className="text-purple-500" />;
            case 'pending': return <Clock size={16} className="text-orange-500" />;
            case 'cancelled': return <XCircle size={16} className="text-red-500" />;
            default: return null;
        }
    };

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
            <header className="page-header">
                <div className="header-title">
                    <h1>Orders Management</h1>
                    <p>Track and manage your customer orders here.</p>
                </div>

                <div className="header-stats">
                    <div className="mini-stat">
                        <span className="stat-label">Total Orders</span>
                        <span className="stat-value">{mockOrders.length}</span>
                    </div>
                    <div className="mini-stat">
                        <span className="stat-label">Pending</span>
                        <span className="stat-value text-orange-500">
                            {mockOrders.filter(o => o.status === 'pending').length}
                        </span>
                    </div>
                </div>
            </header>

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
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="order-id">{order.id}</td>
                                <td className="product-cell">
                                    <div className="product-info">
                                        <img src={order.image} alt={order.productName} />
                                        <span>{order.productName}</span>
                                    </div>
                                </td>
                                <td className="customer-cell">
                                    <div className="customer-info">
                                        <span className="customer-name">{order.customerName}</span>
                                        <span className="customer-email">{order.customerEmail}</span>
                                    </div>
                                </td>
                                <td>{formatDate(order.date)}</td>
                                <td className="amount">{formatCurrency(order.totalAmount)}</td>
                                <td>
                                    <span className={`status-badge status--${order.status}`}>
                                        {getStatusIcon(order.status)}
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button className="icon-btn" title="View Details">
                                        <Eye size={18} />
                                    </button>
                                    <button className="icon-btn" title="More Actions">
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
