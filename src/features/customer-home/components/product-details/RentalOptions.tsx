import React from 'react';
import { Calendar } from 'lucide-react';

export const RentalOptions: React.FC = () => {
    const [mode, setMode] = React.useState<'day' | 'subscription'>('day');
    const [months, setMonths] = React.useState(12);

    return (
        <div className="section-container rental-options">
            <div className="rental-tabs">
                <button
                    className={`rental-tab ${mode === 'day' ? 'active' : ''}`}
                    onClick={() => setMode('day')}
                >
                    Rent by Day
                </button>
                <button
                    className={`rental-tab ${mode === 'subscription' ? 'active' : ''}`}
                    onClick={() => setMode('subscription')}
                >
                    Subscription
                    <span className="tab-badge">- Free Trial</span>
                </button>
            </div>

            {mode === 'day' ? (
                <div className="day-rental-content">
                    <h3 className="options-subtitle">Select Rental Dates</h3>
                    <div className="date-pickers">
                        <div className="date-box">
                            <span className="date-label">Start Date</span>
                            <div className="date-value">
                                <span>Dec 10, 2025</span>
                                <Calendar size={18} />
                            </div>
                        </div>
                        <div className="date-box">
                            <span className="date-label">End Date</span>
                            <div className="date-value">
                                <span>Dec 20, 2025</span>
                                <Calendar size={18} />
                            </div>
                        </div>
                    </div>
                    <div className="discount-banner">
                        <div className="check-icon">✓</div>
                        <span className="discount-text">20% Discount applied for longer duration</span>
                    </div>
                </div>
            ) : (
                <div className="subscription-content">
                    <div className="trial-notice">
                        <span className="trial-icon">⏱</span>
                        <span className="trial-text">Free Trial Available for <span className="highlight">4 Days</span></span>
                    </div>

                    <div className="period-selector">
                        <div className="selector-header">
                            <h4>Select Subscription Period</h4>
                        </div>

                        <div className="slider-container">
                            <div
                                className="slider-label"
                                style={{ left: `${((months - 1) / (36 - 1)) * 100}%` }}
                            >
                                {months}
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="36"
                                value={months}
                                onChange={(e) => setMonths(parseInt(e.target.value))}
                                className="range-slider"
                                style={{ backgroundSize: `${((months - 1) / (36 - 1)) * 100}% 100%` }}
                            />
                            <div className="slider-range">
                                <span>1 month</span>
                                <span>36 months</span>
                            </div>
                        </div>

                        <div className="date-pickers">
                            <div className="date-box">
                                <span className="date-label">Start Date</span>
                                <div className="date-value">
                                    <span>Dec 10, 2025</span>
                                    <Calendar size={18} />
                                </div>
                            </div>
                            <div className="date-box">
                                <span className="date-label">End Date</span>
                                <div className="date-value">
                                    <span>Dec 10, 2026</span>
                                    <Calendar size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
