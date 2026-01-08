import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
    label: string;
    value: string;
    change: number;
    icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, change, icon }) => {
    const isUp = change >= 0;

    return (
        <div className="stat-card">
            <div className="stat-icon">{icon}</div>
            <span className="stat-label">{label}</span>
            <div className="stat-value-container">
                <span className="stat-value">{value}</span>
                <span className={`stat-change ${isUp ? 'stat-change--up' : 'stat-change--down'}`}>
                    {isUp ? <TrendingUp size={12} style={{ marginRight: 4 }} /> : <TrendingDown size={12} style={{ marginRight: 4 }} />}
                    {Math.abs(change)}%
                </span>
            </div>
        </div>
    );
};
