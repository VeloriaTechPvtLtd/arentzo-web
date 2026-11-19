'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Mail, Tag, CreditCard, Calendar, BellOff } from 'lucide-react';
import { useAuth } from '@/features/auth/ui/context/AuthContext';
import { SupabaseNotificationPreferencesRepository } from '../../infrastructure/SupabaseNotificationPreferencesRepository';
import type { NotificationPreferences } from '../../application/ports/NotificationPreferencesRepository';

interface NotificationSettingsProps {
    onSave: () => void;
}

interface NotificationItem {
    id: keyof NotificationPreferences;
    label: string;
    icon: React.ReactNode;
    color?: string;
}

const repository = new SupabaseNotificationPreferencesRepository();
const defaultPreferences: NotificationPreferences = {
    push: true, email: true, app: true, offers: true, payments: true, rentals: true,
};

const notificationItems: NotificationItem[] = [
    { id: 'push', label: 'Push notifications', icon: <BellOff size={20} />, color: '#ff7e5f' },
    { id: 'email', label: 'Email notifications', icon: <Mail size={20} />, color: '#ff7e5f' },
    { id: 'app', label: 'App updates', icon: <Bell size={20} /> },
    { id: 'offers', label: 'Offers and discounts', icon: <Tag size={20} /> },
    { id: 'payments', label: 'Payment updates', icon: <CreditCard size={20} /> },
    { id: 'rentals', label: 'Rental reminders', icon: <Calendar size={20} /> },
];

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onSave }) => {
    const { user } = useAuth();
    const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [notice, setNotice] = useState('');

    useEffect(() => {
        let active = true;
        if (!user) {
            setLoading(false);
            setError('Sign in to view notification settings.');
            return () => { active = false; };
        }
        void repository.getForUser(user.id).then((stored) => {
            if (active) setPreferences(stored || { ...defaultPreferences });
        }).catch(() => {
            if (active) setError('Notification settings could not be loaded. Please try again.');
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, [user]);

    const togglePreference = (id: keyof NotificationPreferences) => {
        setPreferences((current) => current ? { ...current, [id]: !current[id] } : current);
        setNotice('');
    };

    const savePreferences = async () => {
        if (!user || !preferences) return;
        setSaving(true);
        setError('');
        setNotice('');
        try {
            await repository.updateForUser(user.id, preferences);
            setNotice('Notification settings saved.');
            onSave();
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Notification settings could not be saved.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="settings-view">
            <div className="settings-section">
                <h3 className="settings-section__title">Control your notifications</h3>
                <p className="settings-section__subtitle">Choose which updates you receive.</p>
                {loading ? <p role="status">Loading notification settings…</p> : null}
                {error ? <p role="alert">{error}</p> : null}
                {notice ? <p role="status">{notice}</p> : null}
                {preferences ? (
                    <div className="settings-list">
                        {notificationItems.map((item) => (
                            <div key={item.id} className="settings-item">
                                <div className="settings-item__content">
                                    <span className="settings-item__icon-wrapper" style={{ backgroundColor: item.color ? `${item.color}15` : 'var(--muted)' }}>
                                        <span style={{ color: item.color || 'var(--foreground)' }}>{item.icon}</span>
                                    </span>
                                    <span className="settings-item__label">{item.label}</span>
                                </div>
                                <button
                                    type="button"
                                    aria-label={item.label}
                                    aria-pressed={preferences[item.id]}
                                    disabled={!user || loading || saving}
                                    className={`settings-toggle ${preferences[item.id] ? 'settings-toggle--active' : ''}`}
                                    onClick={() => togglePreference(item.id)}
                                >
                                    <span className="settings-toggle__handle" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            <div className="settings-footer">
                <button className="settings-save-btn" onClick={() => void savePreferences()} disabled={!user || !preferences || loading || saving}>
                    {saving ? 'Saving…' : 'Save settings'}
                </button>
            </div>
        </div>
    );
};
