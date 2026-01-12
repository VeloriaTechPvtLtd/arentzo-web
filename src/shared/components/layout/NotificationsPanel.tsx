import React from 'react';
import { X, Bell, CheckCircle2, Clock, Info } from 'lucide-react';
import './NotificationsPanel.css';

interface NotificationsPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        title: 'Order Delivered',
        message: 'Your order #ORD-102 has been successfully delivered.',
        time: '2 hours ago',
        type: 'success',
        icon: CheckCircle2
    },
    {
        id: '2',
        title: 'Low Stock Alert',
        message: '3 items in your inventory are running low on stock.',
        time: '5 hours ago',
        type: 'warning',
        icon: Clock
    },
    {
        id: '3',
        title: 'New Feature Available',
        message: 'Check out the new analytics dashboard for deeper insights.',
        time: 'Yesterday',
        type: 'info',
        icon: Info
    }
];

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
    return (
        <>
            <div className={`notifications-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
            <div className={`notifications-panel ${isOpen ? 'open' : ''}`}>
                <div className="notifications-header">
                    <div className="notifications-header__title">
                        <Bell size={20} />
                        <h2>Notifications</h2>
                    </div>
                    <button className="notifications-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="notifications-list">
                    {MOCK_NOTIFICATIONS.map((notif) => (
                        <div key={notif.id} className={`notification-item notification-item--${notif.type}`}>
                            <div className="notification-icon">
                                <notif.icon size={18} />
                            </div>
                            <div className="notification-content">
                                <h3 className="notification-title">{notif.title}</h3>
                                <p className="notification-message">{notif.message}</p>
                                <span className="notification-time">{notif.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="notifications-footer">
                    <button className="view-all-btn">Mark all as read</button>
                </div>
            </div>
        </>
    );
};
