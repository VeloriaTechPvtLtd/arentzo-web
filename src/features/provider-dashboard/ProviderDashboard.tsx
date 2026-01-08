import React, { useState } from 'react';
import {
    Wallet,
    Eye,
    ShoppingCart,
    Heart,
    Plus,
    Tag,
    ArrowUpRight
} from 'lucide-react';
import type { TimePeriod } from './types';
import { mockDashboardStats } from './mockData';
import { StatCard } from './components/StatCard';
import { AddProductForm } from './components/AddProductForm';
import { AddOfferForm } from './components/AddOfferForm';
import './ProviderDashboard.css';

export const ProviderDashboard: React.FC = () => {
    const [period, setPeriod] = useState<TimePeriod>('monthly');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddOffer, setShowAddOffer] = useState(false);

    return (
        <div className="provider-dashboard">
            <header className="dashboard-header">
                <div className="dashboard-title">
                    <h1>Overview</h1>
                    <p>Welcome back! Here's a summary of your performance.</p>
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

            <section className="stats-grid">
                <StatCard
                    label="Revenue"
                    value={`₹${mockDashboardStats.revenue.toLocaleString()}`}
                    change={mockDashboardStats.revenueChange}
                    icon={<Wallet size={26} />}
                />
                <StatCard
                    label="Analytics Views"
                    value={mockDashboardStats.views.toLocaleString()}
                    change={mockDashboardStats.viewsChange}
                    icon={<Eye size={26} />}
                />
                <StatCard
                    label="Conversions"
                    value={mockDashboardStats.cartAdds.toLocaleString()}
                    change={mockDashboardStats.cartAddsChange}
                    icon={<ShoppingCart size={26} />}
                />
                <StatCard
                    label="Wishlist"
                    value={mockDashboardStats.favorites.toLocaleString()}
                    change={mockDashboardStats.favoritesChange}
                    icon={<Heart size={26} />}
                />
            </section>

            <div className="dashboard-content-grid">
                <main className="main-analytics">
                    <section className="chart-section mb-6">
                        <div className="section-header">
                            <h2 className="section-title">Revenue Trends</h2>
                            <button className="text-primary flex items-center gap-1 text-sm font-bold hover:underline">
                                Detailed Report <ArrowUpRight size={16} />
                            </button>
                        </div>

                        <div className="bar-chart-container">
                            {[40, 65, 45, 80, 55, 90, 75, 85].map((val, i) => (
                                <div key={i} className="chart-bar-wrapper">
                                    <div
                                        className="chart-bar"
                                        style={{ height: `${val}%` }}
                                    >
                                        <div className="chart-bar-tooltip">
                                            ₹{(val * 1000).toLocaleString()}
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="quick-actions-sidebar">
                    <div className="quick-actions-card">
                        <h3>Grow Your Business</h3>
                        <p>Add new products or create limited time offers to boost your sales and visibility.</p>
                        <div className="space-y-3">
                            <button className="quick-btn-main" onClick={() => setShowAddProduct(true)}>
                                <Plus size={20} /> Add New Product
                            </button>
                            <button className="quick-btn-main !bg-transparent !border !border-white !color-white" onClick={() => setShowAddOffer(true)}>
                                <Tag size={20} /> Create an Offer
                            </button>
                        </div>
                    </div>

                    <div className="bg-card border border-border p-6 rounded-[24px]">
                        <h3 className="text-lg font-bold mb-4">Top Highlights</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                    <ArrowUpRight size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Revenue peak</p>
                                    <p className="text-xs text-muted-foreground">Your revenue reached an all-time high this month.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Heart size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">New Favorites</p>
                                    <p className="text-xs text-muted-foreground">50+ users added your camera to their wishlist.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
            {showAddProduct && (
                <AddProductForm
                    onClose={() => setShowAddProduct(false)}
                    onSuccess={() => {
                        setShowAddProduct(false);
                        // Trigger toast or update data
                    }}
                />
            )}

            {showAddOffer && (
                <AddOfferForm
                    onClose={() => setShowAddOffer(false)}
                    onSuccess={() => {
                        setShowAddOffer(false);
                        // Trigger toast or update data
                    }}
                />
            )}
        </div>
    );
};
