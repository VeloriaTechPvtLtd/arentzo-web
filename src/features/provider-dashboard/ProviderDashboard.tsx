import { useState } from 'react';
import type { FC } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    TrendingUp,
    Star,
    ArrowUpRight,
    Clock,
    Package,
    ShieldCheck,
    Truck,
    CheckCircle2,
    LayoutDashboard,
    FileText
} from 'lucide-react';
import './ProviderDashboard.css';

// Map of data for different timeframes
const timeframeDataMap: Record<string, { label: string; data: any[] }> = {
    '7d': {
        label: 'for the last 7 days',
        data: [
            { date: 'Mon', direct: 120, referral: 80 },
            { date: 'Tue', direct: 150, referral: 95 },
            { date: 'Wed', direct: 110, referral: 70 },
            { date: 'Thu', direct: 180, referral: 110 },
            { date: 'Fri', direct: 210, referral: 130 },
            { date: 'Sat', direct: 240, referral: 150 },
            { date: 'Sun', direct: 190, referral: 120 },
        ]
    },
    '30d': {
        label: 'for the last 30 days',
        data: [
            { date: 'Jun 1', direct: 320, referral: 210 },
            { date: 'Jun 5', direct: 350, referral: 220 },
            { date: 'Jun 9', direct: 490, referral: 340 },
            { date: 'Jun 13', direct: 520, referral: 390 },
            { date: 'Jun 17', direct: 580, referral: 420 },
            { date: 'Jun 21', direct: 540, referral: 380 },
            { date: 'Jun 25', direct: 610, referral: 450 },
            { date: 'Jun 30', direct: 590, referral: 410 },
        ]
    },
    '90d': {
        label: 'for the last 3 months',
        data: [
            { date: 'Apr 1', direct: 1200, referral: 800 },
            { date: 'Apr 15', direct: 1450, referral: 920 },
            { date: 'May 1', direct: 1380, referral: 890 },
            { date: 'May 15', direct: 1620, referral: 1050 },
            { date: 'Jun 1', direct: 1750, referral: 1180 },
            { date: 'Jun 15', direct: 1980, referral: 1320 },
            { date: 'Jul 1', direct: 2200, referral: 1450 },
        ]
    }
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-chart-tooltip">
                <p className="tooltip-label">{label}</p>
                <div className="tooltip-items">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="tooltip-item">
                            <span className="dot" style={{ backgroundColor: entry.color }}></span>
                            <span className="item-name">{entry.name}:</span>
                            <span className="item-value">{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export const ProviderDashboard: FC = () => {
    const [timeframe, setTimeframe] = useState('30d');
    const currentData = timeframeDataMap[timeframe];

    return (
        <div className="provider-dashboard">
            {/* Stats Overview */}
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

            <div className="dashboard-main-grid">
                {/* Main Content Area */}
                <div className="dashboard-column-main">
                    {/* Analytics Section */}
                    <section className="dashboard-card analytics-section">
                        <div className="card-header">
                            <div className="card-header-title">
                                <div className="title-group">
                                    <h2>Revenue Growth</h2>
                                    <span className="subtitle">Total growth {currentData.label}</span>
                                </div>
                            </div>
                            <div className="timeframe-pills">
                                <button
                                    className={`pill-btn ${timeframe === '90d' ? 'active' : ''}`}
                                    onClick={() => setTimeframe('90d')}
                                >
                                    Last 3 months
                                </button>
                                <button
                                    className={`pill-btn ${timeframe === '30d' ? 'active' : ''}`}
                                    onClick={() => setTimeframe('30d')}
                                >
                                    Last 30 days
                                </button>
                                <button
                                    className={`pill-btn ${timeframe === '7d' ? 'active' : ''}`}
                                    onClick={() => setTimeframe('7d')}
                                >
                                    Last 7 days
                                </button>
                            </div>
                        </div>

                        <div className="chart-container-premium">
                            <ResponsiveContainer width="100%" height={320}>
                                <AreaChart data={currentData.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorDirect" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.01} />
                                        </linearGradient>
                                        <linearGradient id="colorReferral" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.01} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                                    <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 500 }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        name="Direct Revenue"
                                        type="monotone"
                                        dataKey="direct"
                                        stroke="var(--primary)"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorDirect)"
                                        activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--primary)' }}
                                    />
                                    <Area
                                        name="Referral Revenue"
                                        type="monotone"
                                        dataKey="referral"
                                        stroke="var(--accent)"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorReferral)"
                                        activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--accent)' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </section>

                    {/* Schedule Section */}
                    <section className="dashboard-card schedule-section">
                        <div className="card-header">
                            <div className="card-header-title">
                                <Clock size={18} className="text-primary" />
                                <h2>Today's Flow</h2>
                            </div>
                            <button className="text-btn">View Full Calendar</button>
                        </div>
                        <div className="agenda-list">
                            <div className="agenda-item">
                                <div className="agenda-time">09:00 AM</div>
                                <div className="agenda-marker pickup"></div>
                                <div className="agenda-content">
                                    <div className="agenda-title">Asset Dispatch</div>
                                    <div className="agenda-subtitle">Sony A7 IV Kit • Order #8821</div>
                                </div>
                                <div className="agenda-status-badge">Upcoming</div>
                            </div>
                            <div className="agenda-item">
                                <div className="agenda-time">11:30 AM</div>
                                <div className="agenda-marker return"></div>
                                <div className="agenda-content">
                                    <div className="agenda-title">Rental Return</div>
                                    <div className="agenda-subtitle">MacBook Pro 16" • Order #8790</div>
                                </div>
                                <div className="agenda-status-badge success">Received</div>
                            </div>
                            <div className="agenda-item">
                                <div className="agenda-time">02:00 PM</div>
                                <div className="agenda-marker maintenance"></div>
                                <div className="agenda-content">
                                    <div className="agenda-title">Fleet Checkup</div>
                                    <div className="agenda-subtitle">Quarterly Maintenance • 12 Units</div>
                                </div>
                                <div className="agenda-status-badge warning">Pending</div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar area */}
                <div className="dashboard-column-side">
                    {/* Booking Status Section */}
                    <section className="dashboard-card mini-analytics">
                        <div className="card-header">
                            <div className="card-header-title">
                                <LayoutDashboard size={18} className="text-primary" />
                                <h2>Utilization</h2>
                            </div>
                        </div>
                        <div className="donut-box-premium">
                            <div className="donut-viz">
                                <svg viewBox="0 0 36 36" className="donut-svg">
                                    <circle className="donut-ring" cx="18" cy="18" r="15.915" fill="transparent" stroke="var(--muted)" strokeWidth="3"></circle>
                                    <circle className="donut-segment" cx="18" cy="18" r="15.915" fill="transparent" stroke="var(--primary)" strokeWidth="3" strokeDasharray="75 25" strokeDashoffset="25"></circle>
                                </svg>
                                <div className="donut-text">
                                    <span className="donut-val">75%</span>
                                    <span className="donut-lbl">In Use</span>
                                </div>
                            </div>
                            <div className="viz-legend">
                                <div className="viz-legend-item">
                                    <span className="indicator in-use"></span>
                                    <span>Rented Out</span>
                                </div>
                                <div className="viz-legend-item">
                                    <span className="indicator available"></span>
                                    <span>Available</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Fleet Health Section */}
                    <section className="dashboard-card health-section">
                        <div className="card-header">
                            <div className="card-header-title">
                                <ShieldCheck size={18} className="text-green-500" />
                                <h2>Fleet Condition</h2>
                            </div>
                        </div>
                        <div className="health-metrics">
                            <div className="metric-item">
                                <div className="metric-header">
                                    <span>Perfect Condition</span>
                                    <span>88%</span>
                                </div>
                                <div className="metric-bar-bg">
                                    <div className="metric-bar-fill success" style={{ width: '88%' }}></div>
                                </div>
                            </div>
                            <div className="metric-item">
                                <div className="metric-header">
                                    <span>Minor Issues</span>
                                    <span>10%</span>
                                </div>
                                <div className="metric-bar-bg">
                                    <div className="metric-bar-fill warning" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                            <div className="metric-item">
                                <div className="metric-header">
                                    <span>Major Repairs</span>
                                    <span>2%</span>
                                </div>
                                <div className="metric-bar-bg">
                                    <div className="metric-bar-fill danger" style={{ width: '2%' }}></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Quick Access Section */}
                    <section className="dashboard-card quick-access">
                        <div className="card-header">
                            <div className="card-header-title">
                                <Truck size={18} className="text-primary" />
                                <h2>Recent Logistics</h2>
                            </div>
                        </div>
                        <div className="quick-list">
                            <button className="quick-btn">
                                <Package size={16} />
                                <span>Bulk Add Inventory</span>
                            </button>
                            <button className="quick-btn">
                                <FileText size={16} />
                                <span>Export Tax Invoice</span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

