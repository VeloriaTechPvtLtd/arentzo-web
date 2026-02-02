import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { TimeframeData } from '../../infrastructure/api/dashboardData';

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        color: string;
        name: string;
        value: number;
    }>;
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-chart-tooltip">
                <p className="tooltip-label">{label}</p>
                <div className="tooltip-items">
                    {payload.map((entry, index) => (
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

interface RevenueGrowthChartProps {
    timeframe: string;
    setTimeframe: (val: string) => void;
    currentData: TimeframeData;
}

export const RevenueGrowthChart: React.FC<RevenueGrowthChartProps> = ({
    timeframe,
    setTimeframe,
    currentData
}) => {
    return (
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
    );
};
