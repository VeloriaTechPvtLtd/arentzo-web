import React from 'react';
import {
    Calendar,
    User,
    IndianRupee,
    Truck,
    CreditCard,
    ChevronRight
} from 'lucide-react';
import type { Order } from '../../infrastructure/api/ordersMockData';
import '../styles/OrderCard.css';

interface OrderCardProps {
    order: Order;
    onClick: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return 'Not provided';
        const date = new Date(dateString);
        if (Number.isNaN(date.valueOf())) return 'Not provided';
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short'
        });
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'requested': return 'requested';
            case 'approved': return 'approved';
            case 'booked': return 'booked';
            case 'active': return 'active';
            case 'returned': return 'returned';
            case 'overdue': return 'overdue';
            case 'completed': return 'completed';
            case 'cancelled': return 'cancelled';
            default: return '';
        }
    };

    return (
        <div className="modern-order-card" onClick={onClick}>
            <div className="order-top-section">
                <div className="order-product-info">
                    <img src={order.image} alt={order.productName} className="order-thumb" />
                    <div className="order-main-details">
                        <h3 className="order-product-name">{order.productName}</h3>
                        <span className="order-id-tag">{order.id}</span>
                    </div>
                </div>
                <div className={`order-status-pill ${getStatusStyles(order.rentalStatus)}`}>
                    {order.rentalStatus}
                </div>
            </div>

            <div className="order-middle-section">
                <div className="order-meta-item">
                    <User size={14} className="order-meta-icon" />
                    <div className="order-meta-content">
                        <span className="order-meta-label">Customer</span>
                        <span className="order-meta-value">{order.customerName}</span>
                    </div>
                </div>
                <div className="order-meta-item">
                    <Calendar size={14} className="order-meta-icon" />
                    <div className="order-meta-content">
                        <span className="order-meta-label">Return Due</span>
                        <span className="order-meta-value">{formatDate(order.returnDate)}</span>
                    </div>
                </div>
            </div>

            <div className="order-bottom-section">
                <div className="order-price-info">
                    <span className="order-amount-label">Total Amount</span>
                    <div className="order-amount-value">
                        <IndianRupee size={16} />
                        <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: order.currency || 'INR' }).format(order.totalAmount)}</span>
                    </div>
                </div>
                <div className="order-badges">
                    <span className={`method-badge ${order.deliveryMethod}`}>
                        <Truck size={12} />
                        {order.deliveryMethod}
                    </span>
                    <span className={`payment-badge ${order.paymentStatus}`}>
                        <CreditCard size={12} />
                        {order.paymentStatus}
                    </span>
                </div>
            </div>

            <div className="order-card-action">
                <span>View Order Details</span>
                <ChevronRight size={16} />
            </div>
        </div>
    );
};
