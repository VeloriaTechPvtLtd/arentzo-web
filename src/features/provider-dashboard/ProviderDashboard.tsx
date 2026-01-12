import React, { useState } from 'react';
import {
    Wallet,
    Eye,
    ShoppingCart,
    Heart,
    Plus,
    Tag,
    ArrowUpRight,
    Bell,
    CheckCircle2,
    Clock,
    TrendingUp,
    MoreHorizontal
} from 'lucide-react';
import type { TimePeriod } from './types';
import { mockDashboardStats } from './mockData';
import { AddProductForm } from './components/AddProductForm';
import { AddOfferForm } from './components/AddOfferForm';
import './ProviderDashboard.css';

export const ProviderDashboard: React.FC = () => {
    const [period, setPeriod] = useState<TimePeriod>('monthly');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddOffer, setShowAddOffer] = useState(false);

    const stats = [
        { label: 'Total Revenue', value: `₹${mockDashboardStats.revenue.toLocaleString()}`, change: mockDashboardStats.revenueChange, icon: Wallet, color: '#ff7e5f' },
        { label: 'Profile Views', value: mockDashboardStats.views.toLocaleString(), change: mockDashboardStats.viewsChange, icon: Eye, color: '#3b82f6' },
        { label: 'New Orders', value: mockDashboardStats.cartAdds.toLocaleString(), change: mockDashboardStats.cartAddsChange, icon: ShoppingCart, color: '#10b981' },
        { label: 'Total Likes', value: mockDashboardStats.favorites.toLocaleString(), change: mockDashboardStats.favoritesChange, icon: Heart, color: '#ef4444' },
    ];

    return (
        <div className="provider-dashboard">
            <header className="dashboard-header">
                <div className="dashboard-title">
                    <div className="welcome-tag">Manage your business</div>
                    <h1>Merchant Console</h1>
                    <p>Track your sales, stock, and customer engagement metrics.</p>
                </div>

                <div className="period-selector">
                    {(['daily', 'weekly', 'monthly', 'yearly'] as TimePeriod[]).map((p) => (
                        <button
                            key={p}
                            className={`period-btn ${period === p ? 'period-btn--active' : ''}`}
                            onClick={() => setPeriod(p)}
                        >
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            {/* Stats Row */}
            <section className="stats-row">
                {stats.map((stat) => (
                    <div key={stat.label} className="overview-card">
                        <div className="overview-card__header">
                            <div className="overview-card__icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                                <stat.icon size={22} />
                            </div>
                            <div className={`overview-card__change ${stat.change >= 0 ? 'up' : 'down'}`}>
                                <TrendingUp size={14} className={stat.change < 0 ? 'rotate-180' : ''} />
                                {Math.abs(stat.change)}%
                            </div>
                        </div>
                        <div className="overview-card__footer">
                            <span className="overview-card__value">{stat.value}</span>
                            <span className="overview-card__label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </section>

            <div className="dashboard-grid">
                {/* Main Analytics: Chart */}
                <div className="dashboard-grid__main">
                    <section className="dashboard-section chart-container">
                        <div className="section-header">
                            <div>
                                <h2 className="section-title">Revenue Growth</h2>
                                <p className="section-subtitle">Performance over the current period</p>
                            </div>
                            <button className="icon-btn-bordered">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>

                        <div className="modern-chart">
                            {[40, 65, 45, 80, 55, 90, 75, 85, 60, 95, 80, 100].map((val, i) => (
                                <div key={i} className="modern-chart__column">
                                    <div className="modern-chart__bar-wrapper">
                                        <div
                                            className="modern-chart__bar"
                                            style={{ height: `${val}%` }}
                                        >
                                            <div className="modern-chart__tooltip">
                                                ₹{(val * 1000).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="modern-chart__label">
                                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar: Actions & Feed */}
                <div className="dashboard-grid__side">
                    {/* Quick Tools */}
                    <section className="dashboard-section tools-card">
                        <h3 className="section-title text-white">Quick Tools</h3>
                        <p className="text-white/70 text-sm mb-6">Instantly expand your store's visibility.</p>
                        <div className="tools-grid">
                            <button className="tool-btn" onClick={() => setShowAddProduct(true)}>
                                <Plus size={20} />
                                <span>Add Item</span>
                            </button>
                            <button className="tool-btn secondary" onClick={() => setShowAddOffer(true)}>
                                <Tag size={20} />
                                <span>Add Offer</span>
                            </button>
                        </div>
                    </section>

                    {/* Recent Notifications */}
                    <section className="dashboard-section news-feed">
                        <div className="section-header">
                            <h3 className="section-title">Activity Feed</h3>
                            <Bell size={18} className="text-muted-foreground" />
                        </div>
                        <div className="feed-list">
                            <div className="feed-item">
                                <div className="feed-icon success"><CheckCircle2 size={16} /></div>
                                <div className="feed-content">
                                    <p className="feed-text">Order <strong>#ORD-102</strong> delivered</p>
                                    <span className="feed-time">2 hours ago</span>
                                </div>
                            </div>
                            <div className="feed-item">
                                <div className="feed-icon warning"><Clock size={16} /></div>
                                <div className="feed-content">
                                    <p className="feed-text"><strong>3 items</strong> low in stock</p>
                                    <span className="feed-time">5 hours ago</span>
                                </div>
                            </div>
                            <div className="feed-item">
                                <div className="feed-icon info"><Heart size={16} /></div>
                                <div className="feed-content">
                                    <p className="feed-text"><strong>Weekend Sale</strong> expiring soon</p>
                                    <span className="feed-time">Yesterday</span>
                                </div>
                            </div>
                        </div>
                        <button className="view-all-btn">View All History</button>
                    </section>
                </div>
            </div>

            {showAddProduct && (
                <AddProductForm
                    onClose={() => setShowAddProduct(false)}
                    onSuccess={() => setShowAddProduct(false)}
                />
            )}

            {showAddOffer && (
                <AddOfferForm
                    onClose={() => setShowAddOffer(false)}
                    onSuccess={() => setShowAddOffer(false)}
                />
            )}
        </div>
    );
};
