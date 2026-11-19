'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle, Bell, CheckCircle2, Clock, Info, MessageCircle, Package } from 'lucide-react';
import { useAuth } from '@/features/auth/ui/context/AuthContext';
import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';

interface NotificationRecord {
    id: string;
    title: string | null;
    subtitle: string | null;
    type: string | null;
    created_at: string;
    is_read: boolean | null;
    redirect_path: string | null;
}

function groupName(dateValue: string): string {
    const date = new Date(dateValue);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const sameDate = (left: Date, right: Date) => left.toDateString() === right.toDateString();
    if (sameDate(date, today)) return 'Today';
    if (sameDate(date, yesterday)) return 'Yesterday';
    return 'Earlier';
}

function iconFor(type: string | null) {
    const value = (type || '').toLowerCase();
    if (value.includes('success') || value.includes('complete')) return <CheckCircle2 size={18} />;
    if (value.includes('warning') || value.includes('pending')) return <Clock size={18} />;
    if (value.includes('order') || value.includes('booking') || value.includes('rental')) return <Package size={18} />;
    if (value.includes('message')) return <MessageCircle size={18} />;
    if (value.includes('alert') || value.includes('payment')) return <AlertCircle size={18} />;
    return <Info size={18} />;
}

export const MyNotifications: React.FC = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        const load = async () => {
            if (!user) {
                setError('Sign in to view your notifications.');
                setLoading(false);
                return;
            }
            try {
                const { data, error: queryError } = await getSupabaseClient().from('notifications')
                    .select('id,title,subtitle,type,created_at,is_read,redirect_path')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false })
                    .range(0, 49);
                if (queryError) throw queryError;
                if (active) setNotifications((data || []) as NotificationRecord[]);
            } catch {
                if (active) setError('Notifications could not be loaded. Please try again.');
            } finally {
                if (active) setLoading(false);
            }
        };
        void load();
        return () => { active = false; };
    }, [user]);

    const groups = notifications.reduce<Record<string, NotificationRecord[]>>((result, notification) => {
        const key = groupName(notification.created_at);
        (result[key] ||= []).push(notification);
        return result;
    }, {});

    return (
        <div className="settings-view">
            <div className="settings-section">
                <div className="notifications-header-group">
                    <h3 className="settings-section__title">Your notifications</h3>
                    <p className="settings-section__subtitle">Updates for your account and rentals.</p>
                </div>
                {loading ? <p role="status">Loading notifications…</p> : null}
                {error ? <p role="alert">{error}</p> : null}
                {!loading && !error && notifications.length === 0 ? (
                    <div className="messages-panel__empty">
                        <Bell size={28} />
                        <p>You’re all caught up.</p>
                    </div>
                ) : null}
                {!loading && !error && notifications.length > 0 ? (
                    <div className="notifications-container mt-6">
                        {Object.entries(groups).map(([title, items]) => (
                            <div key={title} className="notification-group">
                                <h4 className="notification-group__title">{title}</h4>
                                <div className="notification-group__list">
                                    {items.map((notification) => (
                                        <article key={notification.id} className={`notification-item ${notification.is_read ? '' : 'notification-item--unread'}`}>
                                            <div className={`notification-item__icon notification-item__icon--${(notification.type || 'info').toLowerCase()}`}>
                                                {iconFor(notification.type)}
                                            </div>
                                            <div className="notification-item__content">
                                                <h5 className="notification-item__title">{notification.title || 'Arentzo update'}</h5>
                                                <p className="notification-item__message">{notification.subtitle || ''}</p>
                                                <time dateTime={notification.created_at}>{new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(notification.created_at))}</time>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};
