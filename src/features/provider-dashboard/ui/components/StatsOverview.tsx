import React from 'react';
import { TrendingUp, Clock, Package, Star, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const StatsOverview: React.FC = () => {
    return (
        <section className="stats-container">
            <div className="stat-card reveal">
                <div className="stat-icon revenue">
                    <TrendingUp size={24} />
                </div>
                <div className="stat-details">
                    <span className="stat-label">Monthly Revenue</span>
                    <div className="stat-value-row">
                        <span className="stat-value">₹84,500</span>
                        <span className="stat-trend positive">
                            <ArrowUpRight size={14} />
                            12.5%
                        </span>
                    </div>
                </div>
            </div>

            <div className="stat-card reveal" style={{ animationDelay: '0.1s' }}>
                <div className="stat-icon rentals">
                    <Clock size={24} />
                </div>
                <div className="stat-details">
                    <span className="stat-label">Active Rentals</span>
                    <div className="stat-value-row">
                        <span className="stat-value">42</span>
                        <span className="stat-badge">8 today</span>
                    </div>
                </div>
            </div>

            <div className="stat-card reveal" style={{ animationDelay: '0.2s' }}>
                <div className="stat-icon fleet">
                    <Package size={24} />
                </div>
                <div className="stat-details">
                    <span className="stat-label">Total Fleet</span>
                    <div className="stat-value-row">
                        <span className="stat-value">156</span>
                        <span className="stat-desc">92% utilized</span>
                    </div>
                </div>
            </div>

            <div className="stat-card reveal" style={{ animationDelay: '0.3s' }}>
                <div className="stat-icon rating">
                    <Star size={24} />
                </div>
                <div className="stat-details">
                    <span className="stat-label">Performance</span>
                    <div className="stat-value-row">
                        <span className="stat-value">4.9</span>
                        <span className="stat-trend positive">
                            <CheckCircle2 size={14} />
                            Top Tier
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};
