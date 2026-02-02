import React from 'react';
import { LayoutDashboard } from 'lucide-react';

export const UtilizationDonut: React.FC = () => {
    return (
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
    );
};
