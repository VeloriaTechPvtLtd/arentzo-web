import React, { useState } from 'react';
import { Bell, Mail, Tag, CreditCard, Calendar, BellOff } from 'lucide-react';

interface NotificationSettingsProps {
    onSave: () => void;
}

interface NotificationItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    color?: string;
}

const notificationItems: NotificationItem[] = [
    { id: 'push', label: 'Mute Push Notifications', icon: <BellOff size={20} />, color: '#ff7e5f' },
    { id: 'email', label: 'Mute Email Notifications', icon: <Mail size={20} />, color: '#ff7e5f' },
    { id: 'app', label: 'App Notifications', icon: <Bell size={20} /> },
    { id: 'offers', label: 'Offers & Discount', icon: <Tag size={20} /> },
    { id: 'payments', label: 'Payment Updates', icon: <CreditCard size={20} /> },
    { id: 'rentals', label: 'Rental Reminders', icon: <Calendar size={20} /> },
];

export const NotificationSettings: React.FC<NotificationSettingsProps> = () => {
    const [preferences, setPreferences] = useState({
        push: false,
        email: false,
        app: true,
        offers: true,
        payments: false,
        rentals: true,
    });

    const togglePreference = (id: keyof typeof preferences) => {
        setPreferences(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="settings-view">
            <div className="settings-section">
                <h3 className="settings-section__title">Control Your Notifications</h3>
                <p className="settings-section__subtitle">Manage what kind of updates you like to receive</p>

                <div className="settings-list" style={{ marginBottom: '16px' }}>
                    {[notificationItems[0]].map((item) => (
                        <div key={item.id} className="settings-item">
                            <div className="settings-item__content">
                                <span
                                    className="settings-item__icon-wrapper"
                                    style={{ backgroundColor: item.color ? `${item.color}15` : 'var(--muted)' }}
                                >
                                    <span style={{ color: item.color || 'var(--foreground)' }}>
                                        {item.icon}
                                    </span>
                                </span>
                                <span className="settings-item__label">{item.label}</span>
                            </div>
                            <button
                                className={`settings-toggle ${preferences[item.id as keyof typeof preferences] ? 'settings-toggle--active' : ''}`}
                                onClick={() => togglePreference(item.id as keyof typeof preferences)}
                            >
                                <span className="settings-toggle__handle" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="settings-list" style={{ marginBottom: '16px' }}>
                    {[notificationItems[1]].map((item) => (
                        <div key={item.id} className="settings-item">
                            <div className="settings-item__content">
                                <span
                                    className="settings-item__icon-wrapper"
                                    style={{ backgroundColor: item.color ? `${item.color}15` : 'var(--muted)' }}
                                >
                                    <span style={{ color: item.color || 'var(--foreground)' }}>
                                        {item.icon}
                                    </span>
                                </span>
                                <span className="settings-item__label">{item.label}</span>
                            </div>
                            <button
                                className={`settings-toggle ${preferences[item.id as keyof typeof preferences] ? 'settings-toggle--active' : ''}`}
                                onClick={() => togglePreference(item.id as keyof typeof preferences)}
                            >
                                <span className="settings-toggle__handle" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="settings-list">
                    {notificationItems.slice(2).map((item) => (
                        <div key={item.id} className="settings-item">
                            <div className="settings-item__content">
                                <span
                                    className="settings-item__icon-wrapper"
                                    style={{ backgroundColor: item.color ? `${item.color}15` : 'var(--muted)' }}
                                >
                                    <span style={{ color: item.color || 'var(--foreground)' }}>
                                        {item.icon}
                                    </span>
                                </span>
                                <span className="settings-item__label">{item.label}</span>
                            </div>
                            <button
                                className={`settings-toggle ${preferences[item.id as keyof typeof preferences] ? 'settings-toggle--active' : ''}`}
                                onClick={() => togglePreference(item.id as keyof typeof preferences)}
                            >
                                <span className="settings-toggle__handle" />
                            </button>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
};
