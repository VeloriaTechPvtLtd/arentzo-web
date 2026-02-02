import React from 'react';
import { Clock } from 'lucide-react';

export const TodayFlow: React.FC = () => {
    return (
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
    );
};
