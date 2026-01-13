import React from 'react';
import { Bell, CheckCircle2, Clock, Info, Package, MessageCircle, AlertCircle } from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'success' | 'warning' | 'info' | 'order' | 'message' | 'alert';
    isRead: boolean;
}

interface NotificationGroup {
    title: string;
    notifications: Notification[];
}

const MOCK_GROUPS: NotificationGroup[] = [
    {
        title: 'Today',
        notifications: [
            {
                id: '1',
                title: 'Order Delivered',
                message: 'Your order #ORD-102 has been successfully delivered and is ready for use.',
                time: '2 hours ago',
                type: 'success',
                isRead: false
            },
            {
                id: '2',
                title: 'New Message from Alex',
                message: 'Hey, is the camera kit available for an extension next week?',
                time: '5 hours ago',
                type: 'message',
                isRead: false
            }
        ]
    },
    {
        title: 'Yesterday',
        notifications: [
            {
                id: '3',
                title: 'Rental Request',
                message: 'You have a new inquiry for your "Professional DSLR Kit".',
                time: '1 day ago',
                type: 'order',
                isRead: true
            },
            {
                id: '4',
                title: 'Identity Verification',
                message: 'Your KYC documents have been successfully verified.',
                time: '1 day ago',
                type: 'success',
                isRead: true
            }
        ]
    },
    {
        title: 'Earlier',
        notifications: [
            {
                id: '5',
                title: 'System Maintenance',
                message: 'Arentzo will be undergoing maintenance tomorrow at 2 AM.',
                time: '3 days ago',
                type: 'info',
                isRead: true
            },
            {
                id: '6',
                title: 'Payment Failed',
                message: 'We couldn\'t process your last rental payment. Please update your card.',
                time: '5 days ago',
                type: 'alert',
                isRead: true
            }
        ]
    }
];

export const MyNotifications: React.FC = () => {
    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success': return <CheckCircle2 size={18} />;
            case 'warning': return <Clock size={18} />;
            case 'order': return <Package size={18} />;
            case 'message': return <MessageCircle size={18} />;
            case 'alert': return <AlertCircle size={18} />;
            default: return <Info size={18} />;
        }
    };

    return (
        <div className="settings-view">
            <div className="settings-section">
                <div className="notifications-header-group">
                    <h3 className="settings-section__title">Your Notifications</h3>
                    <p className="settings-section__subtitle">Stay updated with your latest activities</p>
                </div>

                <div className="notifications-container mt-6">
                    {MOCK_GROUPS.length > 0 ? (
                        MOCK_GROUPS.map((group) => (
                            <div key={group.title} className="notification-group">
                                <h4 className="notification-group__title">{group.title}</h4>
                                <div className="notification-group__list">
                                    {group.notifications.map((notif) => (
                                        <div key={notif.id} className={`notification-item ${!notif.isRead ? 'notification-item--unread' : ''}`}>
                                            <div className={`notification-item__icon notification-item__icon--${notif.type}`}>
                                                {getIcon(notif.type)}
                                            </div>
                                            <div className="notification-item__content">
                                                <div className="notification-item__header">
                                                    <h5 className="notification-item__title">{notif.title}</h5>
                                                    <span className="notification-item__time">{notif.time}</span>
                                                </div>
                                                <p className="notification-item__message">{notif.message}</p>
                                            </div>
                                            {!notif.isRead && <div className="notification-item__unread-dot" />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="notification-empty-state">
                            <div className="notification-empty-icon">
                                <Bell size={40} />
                            </div>
                            <p className="notification-empty-text">No notifications yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
