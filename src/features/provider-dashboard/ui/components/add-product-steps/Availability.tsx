import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Ban } from 'lucide-react';

interface AvailabilityProps {
    onNext: () => void;
}

export const Availability: React.FC<AvailabilityProps> = ({ onNext }) => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const currentMonth = 'OCT 2025';

    // Mock data for the calendar
    const dates = Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        status: i === 13 || i === 14 ? 'blocked' : (i >= 27 && i <= 30 ? 'booked' : 'available'),
        inMonth: true
    }));

    // Add empty slots for the start of the month (Wednesday start)
    const calendarDays = [
        ...Array(3).fill({ day: '', status: '', inMonth: false }),
        ...dates
    ];

    const [selectionType, setSelectionType] = useState<'available' | 'blocked'>('available');
    const [recurringBlock, setRecurringBlock] = useState(false);

    return (
        <div className="step-content">
            <div className="calendar-card">
                <div className="calendar-header">
                    <button className="nav-btn"><ChevronLeft size={20} /></button>
                    <span className="month-label">{currentMonth}</span>
                    <button className="nav-btn"><ChevronRight size={20} /></button>
                </div>

                <div className="calendar-grid">
                    {days.map(d => <div key={d} className="weekday">{d}</div>)}
                    {calendarDays.map((d, i) => (
                        <div
                            key={i}
                            className={`day-cell ${d.status} ${!d.inMonth ? 'empty' : ''}`}
                        >
                            {d.day}
                        </div>
                    ))}
                </div>

                <div className="calendar-legend">
                    <div className="legend-item">
                        <span className="dot available"></span>
                        <span>Available</span>
                    </div>
                    <div className="legend-item">
                        <span className="dot booked"></span>
                        <span>Booked</span>
                    </div>
                    <div className="legend-item">
                        <span className="dot blocked"></span>
                        <span>Blocked</span>
                    </div>
                </div>
            </div>

            <div className="settings-card mt-6">
                <div className="settings-header">
                    <div className="settings-title-group">
                        <span className="settings-title">Setting for Oct 16-17</span>
                        <span className="selection-badge">2 Days Selected</span>
                    </div>
                </div>

                <div className="action-grid mt-4">
                    <button
                        className={`action-btn ${selectionType === 'available' ? 'active' : ''}`}
                        onClick={() => setSelectionType('available')}
                    >
                        <CalendarIcon size={24} />
                        <span>Available</span>
                    </button>
                    <button
                        className={`action-btn ${selectionType === 'blocked' ? 'active' : ''}`}
                        onClick={() => setSelectionType('blocked')}
                    >
                        <Ban size={24} />
                        <span>Blocked</span>
                    </button>
                </div>

                <div className="recurring-block-info mt-6">
                    <div className="toggle-header no-border">
                        <div className="toggle-info">
                            <div className="icon-badge small rotate">🔄</div>
                            <div>
                                <span className="toggle-title small">Recurring Block</span>
                                <p className="toggle-subtitle tiny">This action applies for 90 days</p>
                            </div>
                        </div>
                        <label className="switch small">
                            <input
                                type="checkbox"
                                checked={recurringBlock}
                                onChange={(e) => setRecurringBlock(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="step-footer">
                <button className="next-btn primary-solid" onClick={onNext}>Continue</button>
            </div>
        </div>
    );
};
