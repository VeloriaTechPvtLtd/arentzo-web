import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const FleetHealth: React.FC = () => {
    return (
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
    );
};
