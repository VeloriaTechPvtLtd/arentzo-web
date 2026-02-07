import React, { useState } from 'react';
import {
    ArrowLeft,
    ChevronDown,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Lightbulb,
    Calendar,
    ChevronLeft,
    ChevronRight,
    CalendarDays
} from 'lucide-react';
import { type Product } from '../../infrastructure/api/productsMockData';
import { type Order, mockOrders } from '../../infrastructure/api/ordersMockData';
import { OrderDetailsDrawer } from './OrderDetailsDrawer';
import '../styles/ProductDetailsDrawer.css';

interface ProductDetailsDrawerProps {
    product: Product;
    onClose: () => void;
}

type TabType = 'analytics' | 'bookings';
type BookingFilter = 'all' | 'today' | 'this_week' | 'this_month';

interface Booking {
    id: string;
    customerName: string;
    customerImage?: string;
    productName: string;
    dateRange: string;
    amount: number;
    status: 'action_required' | 'ongoing' | 'completed' | 'cancelled';
    orderId?: string;
}

interface PerformanceKPI {
    label: string;
    value: number | string;
    trend: number;
    isPositive: boolean;
}

export const ProductDetailsDrawer: React.FC<ProductDetailsDrawerProps> = ({
    product,
    onClose
}) => {
    const [activeTab, setActiveTab] = useState<TabType>('analytics');
    const [bookingFilter, setBookingFilter] = useState<BookingFilter>('all');
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1));
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const hasBookings = product.revenue > 0;
    const mockBookings: Booking[] = hasBookings ? [
        {
            id: 'BK-5432',
            customerName: 'Sarah Chen',
            productName: product.name,
            dateRange: 'Jan 20 - 23',
            amount: 256.50,
            status: 'action_required',
            orderId: 'RNT-941'
        },
        {
            id: 'BK-5431',
            customerName: 'Mike Wilson',
            productName: product.name,
            dateRange: 'Jan 22 - 24',
            amount: 162.00,
            status: 'ongoing',
            orderId: 'RNT-001'
        },
        {
            id: 'BK-5430',
            customerName: 'Sarah Chen',
            productName: product.name,
            dateRange: 'Jan 20 - 23',
            amount: 256.50,
            status: 'ongoing',
            orderId: 'RNT-002'
        },
        {
            id: 'BK-5429',
            customerName: 'Michael',
            productName: product.name,
            dateRange: 'Aug 20-22',
            amount: 0,
            status: 'completed',
            orderId: 'RNT-004'
        },
        {
            id: 'BK-5428',
            customerName: 'Jack',
            productName: product.name,
            dateRange: 'Aug 18-21',
            amount: 0,
            status: 'cancelled',
            orderId: 'RNT-005'
        }
    ] : [];

    const performanceKPIs: PerformanceKPI[] = [
        { label: 'Total Revenue', value: product.revenue, trend: 15, isPositive: true },
        { label: 'Added to Cart', value: 89, trend: 5, isPositive: true },
        { label: 'Page Views', value: formatViewCount(product.views), trend: 18, isPositive: true },
        { label: 'Wishlisted', value: 230, trend: 12, isPositive: true }
    ];

    function formatViewCount(count: number): string {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count.toString();
    }

    function formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
            minimumFractionDigits: 0
        }).format(amount).replace('₹', '₹');
    }

    function getStatusLabel(status: string): string {
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    function getBookingStatusClass(status: Booking['status']): string {
        switch (status) {
            case 'action_required': return 'action-required';
            case 'ongoing': return 'ongoing';
            case 'completed': return 'completed';
            case 'cancelled': return 'cancelled';
            default: return '';
        }
    }

    function getBookingStatusLabel(status: Booking['status']): string {
        switch (status) {
            case 'action_required': return 'ACTION REQ';
            case 'ongoing': return 'Ongoing';
            case 'completed': return 'COMPLETED';
            case 'cancelled': return 'CANCELLED';
            default: return status;
        }
    }

    function getMonthName(date: Date): string {
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
    }

    function generateCalendarDays(): (number | null)[] {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days: (number | null)[] = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }
        return days;
    }

    const bookedDates = [14, 15, 28, 29, 30, 31];
    const blockedDates = [16, 17, 18];

    function handleBookingClick(booking: Booking) {
        if (booking.orderId) {
            const order = mockOrders.find(o => o.id === booking.orderId);
            if (order) {
                setSelectedOrder(order);
            }
        }
    }

    function handleOrderStatusChange(orderId: string, status: Order['rentalStatus']) {
        console.log('Order status changed:', orderId, status);
        setSelectedOrder(null);
    }

    function renderAnalyticsTab() {
        return (
            <div className="pdd-analytics">
                <div className="pdd-section">
                    <div className="pdd-section-header">
                        <h3 className="pdd-section-title">Performance Overview</h3>
                        <button className="pdd-dropdown-btn">
                            <span>Last 30 Days</span>
                            <ChevronDown size={14} />
                        </button>
                    </div>

                    <div className="pdd-stats-row">
                        <div className="pdd-stat-card">
                            <div className="pdd-stat-icon revenue">
                                <TrendingUp size={16} />
                            </div>
                            <span className="pdd-stat-trend positive">
                                <TrendingUp size={10} />
                                {product.revenue > 0 ? '10.5%' : '0%'}
                            </span>
                            <div className="pdd-stat-content">
                                <span className="pdd-stat-label">Total Revenue</span>
                                <span className="pdd-stat-value">
                                    {product.revenue > 0 ? formatCurrency(product.revenue) : '0'}
                                </span>
                            </div>
                        </div>
                        <div className="pdd-stat-card">
                            <div className="pdd-stat-icon days">
                                <Calendar size={16} />
                            </div>
                            <span className="pdd-stat-trend positive">
                                <TrendingUp size={10} />
                                {product.revenue > 0 ? '122' : '0d'}
                            </span>
                            <div className="pdd-stat-content">
                                <span className="pdd-stat-label">Days Rented</span>
                                <span className="pdd-stat-value">
                                    {product.revenue > 0 ? '35 Days' : '0'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {hasBookings && (
                    <>
                        <div className="pdd-alert-card warning">
                            <div className="pdd-alert-icon">
                                <AlertTriangle size={18} />
                            </div>
                            <div className="pdd-alert-content">
                                <h4>Action Required</h4>
                                <p>You have pending bookings that need your approval.</p>
                                <button className="pdd-alert-link">Review Bookings</button>
                            </div>
                        </div>

                        <div className="pdd-alert-card insight">
                            <div className="pdd-alert-icon">
                                <Lightbulb size={18} />
                            </div>
                            <div className="pdd-alert-content">
                                <h4>Performance Insight</h4>
                                <p>Customers are adding items to cart, but fewer are completing bookings.</p>
                            </div>
                        </div>
                    </>
                )}

                <div className="pdd-section">
                    <h3 className="pdd-section-title">Performance KPIs</h3>
                    <div className="pdd-kpis-grid">
                        {performanceKPIs.map((kpi, index) => (
                            <div key={index} className="pdd-kpi-card">
                                <span className="pdd-kpi-label">{kpi.label}</span>
                                <div className="pdd-kpi-value-row">
                                    <span className="pdd-kpi-value">
                                        {typeof kpi.value === 'number' && kpi.label.includes('Revenue')
                                            ? (kpi.value > 0 ? Math.floor(kpi.value / 1000) : 0)
                                            : (product.revenue > 0 ? kpi.value : 0)}
                                    </span>
                                    <span className={`pdd-kpi-trend ${kpi.isPositive ? 'positive' : 'negative'}`}>
                                        {kpi.isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                        {product.revenue > 0 ? `${kpi.trend}%` : '0%'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pdd-section">
                    <div className="pdd-section-header">
                        <div>
                            <h3 className="pdd-section-title">Orders Trend</h3>
                            <span className="pdd-section-subtitle">Daily ordervolume</span>
                        </div>
                        <div className="pdd-chart-legend">
                            <span className="pdd-legend-item">
                                <span className="pdd-legend-dot orders"></span>
                                Orders
                            </span>
                        </div>
                    </div>
                    <div className="pdd-chart-container">
                        {hasBookings ? (
                            <div className="pdd-chart-placeholder">
                                <svg viewBox="0 0 300 100" className="pdd-line-chart">
                                    <path
                                        d="M0,80 Q30,75 60,70 T120,50 T180,40 T240,25 T300,15"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="2"
                                    />
                                    <circle cx="240" cy="25" r="12" fill="#fed7aa" />
                                    <text x="240" y="29" textAnchor="middle" fontSize="8" fill="#c2410c">
                                        20 Orders
                                    </text>
                                </svg>
                                <div className="pdd-chart-labels">
                                    <span>June</span>
                                    <span>July</span>
                                    <span>Aug</span>
                                    <span>Sept</span>
                                    <span>Oct</span>
                                    <span>Nov</span>
                                </div>
                            </div>
                        ) : (
                            <div className="pdd-empty-chart">
                                <p>Insights will appear here once you starts receiving bookings.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pdd-section pdd-availability-section">
                    <div className="pdd-section-header">
                        <h3 className="pdd-section-title">Availability</h3>
                        <div className="pdd-calendar-legend">
                            <span className="pdd-legend-item">
                                <span className="pdd-legend-dot booked"></span>
                                Booked
                            </span>
                            <span className="pdd-legend-item">
                                <span className="pdd-legend-dot blocked"></span>
                                Blocked
                            </span>
                        </div>
                    </div>

                    <div className="pdd-calendar">
                        <div className="pdd-calendar-nav">
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="pdd-calendar-nav-btn"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="pdd-calendar-month">{getMonthName(currentMonth)}</span>
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="pdd-calendar-nav-btn"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="pdd-calendar-grid">
                            <div className="pdd-calendar-weekdays">
                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                    <span key={day} className="pdd-weekday">{day}</span>
                                ))}
                            </div>
                            <div className="pdd-calendar-days">
                                {generateCalendarDays().map((day, index) => (
                                    <span
                                        key={index}
                                        className={`pdd-day ${day === null ? 'empty' : ''
                                            } ${day && bookedDates.includes(day) ? 'booked' : ''
                                            } ${day && blockedDates.includes(day) ? 'blocked' : ''
                                            }`}
                                    >
                                        {day}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function renderBookingsTab() {
        const filters: { key: BookingFilter; label: string }[] = [
            { key: 'all', label: 'All Bookings' },
            { key: 'today', label: 'Today' },
            { key: 'this_week', label: 'This Week' },
            { key: 'this_month', label: 'This Month' }
        ];

        return (
            <div className="pdd-bookings">
                <div className="pdd-booking-filters">
                    {filters.map(filter => (
                        <button
                            key={filter.key}
                            className={`pdd-filter-pill ${bookingFilter === filter.key ? 'active' : ''}`}
                            onClick={() => setBookingFilter(filter.key)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {mockBookings.length > 0 ? (
                    <div className="pdd-booking-list">
                        {mockBookings.map(booking => (
                            <div
                                key={booking.id}
                                className="pdd-booking-card"
                                onClick={() => handleBookingClick(booking)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="pdd-booking-avatar">
                                    {booking.customerImage ? (
                                        <img src={booking.customerImage} alt={booking.customerName} />
                                    ) : (
                                        <img src={product.image} alt={product.name} className="pdd-booking-product-img" />
                                    )}
                                </div>
                                <div className="pdd-booking-info">
                                    <h4 className="pdd-booking-customer">{booking.customerName}</h4>
                                    <p className="pdd-booking-details">
                                        {product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name}
                                    </p>
                                    <p className="pdd-booking-date">#{booking.id} · {booking.dateRange}</p>
                                </div>
                                <div className="pdd-booking-right">
                                    {booking.amount > 0 && (
                                        <span className="pdd-booking-amount">{formatCurrency(booking.amount)}</span>
                                    )}
                                    <span className={`pdd-booking-status ${getBookingStatusClass(booking.status)}`}>
                                        {booking.status === 'action_required' && <span className="pdd-status-dot"></span>}
                                        {getBookingStatusLabel(booking.status)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {mockBookings.some(b => b.status === 'cancelled') && (
                            <div className="pdd-cancellation-note">
                                <em>"Product is unavailable. Item is damaged and not ready."</em>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="pdd-empty-bookings">
                        <div className="pdd-empty-icon">
                            <CalendarDays size={40} />
                        </div>
                        <p>No Bookings Available Yet</p>
                    </div>
                )}
            </div>
        );
    }

    const actionCount = mockBookings.filter(b => b.status === 'action_required').length;

    return (
        <div className={`provider-drawer-overlay provider-drawer-overlay--open`}>
            <div className="provider-drawer-overlay__backdrop" onClick={onClose} />
            <div className="provider-drawer-panel">
                <div className="pdd-header">
                    <button className="pdd-back-btn" onClick={onClose}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="pdd-header-content">
                        <h2 className="pdd-product-name">{product.name}</h2>
                        <div className="pdd-header-badges">
                            <span className="pdd-category-badge">{product.category}</span>
                            <span className={`pdd-status-badge ${product.status}`}>
                                <span className="pdd-status-dot"></span>
                                {getStatusLabel(product.status)} Listing
                            </span>
                        </div>
                    </div>
                    <div className="pdd-header-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>

                <div className="pdd-tabs">
                    <button
                        className={`pdd-tab ${activeTab === 'analytics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('analytics')}
                    >
                        Product Analytics
                    </button>
                    <button
                        className={`pdd-tab ${activeTab === 'bookings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        Bookings & Action
                        {actionCount > 0 && (
                            <span className="pdd-tab-badge">{actionCount}</span>
                        )}
                    </button>
                </div>

                <div className={`provider-drawer-panel__content ${selectedOrder ? 'no-scroll' : ''}`}>
                    {activeTab === 'analytics' ? renderAnalyticsTab() : renderBookingsTab()}
                </div>

                <div className="provider-drawer-panel__footer">
                    <button className="pdd-manage-btn">
                        <Calendar size={18} />
                        Manage Availability
                    </button>
                </div>
            </div>

            {selectedOrder && (
                <OrderDetailsDrawer
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onStatusChange={handleOrderStatusChange}
                />
            )}
        </div>
    );
};
