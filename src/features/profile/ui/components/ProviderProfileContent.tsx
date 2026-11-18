import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDrawer } from '@/shared/hooks/useDrawer';
import {
    Boxes,
    Truck,
    History,
    CalendarClock,
    RotateCcw,
    Landmark,
    Bell,
    Package,
    Calendar,
    Globe,
    Lightbulb,
    MessageCircle
} from 'lucide-react';
import { ProfileUserInfo } from './ProfileUserInfo';
import { ProfileMenuSection } from './ProfileMenuSection';
import { ProfileLogout } from './ProfileLogout';
import type { UserProfile, UserRole, MenuSection, ProfileView } from '../../domain/entities';

interface ProviderProfileContentProps {
    user: UserProfile;
    onViewChange: (view: ProfileView) => void;
    onRoleSwitch: (role: UserRole) => void;
    onLogout: () => void;
    hideSwitcher?: boolean;
}

export const ProviderProfileContent: React.FC<ProviderProfileContentProps> = ({
    user,
    onViewChange,
    onRoleSwitch,
    onLogout,
    hideSwitcher = false
}) => {
    const router = useRouter();
    const { openMessages } = useDrawer();
    const [listingImgError, setListingImgError] = useState(false);
    const [bookingImgError, setBookingImgError] = useState(false);
    const [notifImgError, setNotifImgError] = useState(false);

    const rentalOverview: MenuSection = {
        title: 'Rental Overview',
        items: [
            { id: 'my-listings', icon: <Boxes size={20} />, label: 'My Listings', hasArrow: true, onClick: () => router.push('/provider-dashboard/products') },
            { id: 'active-rentals', icon: <Truck size={20} />, label: 'Active Rentals', hasArrow: true, onClick: () => router.push('/provider-dashboard/orders') },
            { id: 'extension-requests', icon: <History size={20} />, label: 'Extension Requests', hasArrow: false, disabled: true },
            { id: 'upcoming-bookings', icon: <CalendarClock size={20} />, label: 'Upcoming Bookings', hasArrow: true, onClick: () => router.push('/provider-dashboard/orders') },
            { id: 'rental-history', icon: <History size={20} />, label: 'Rental History', hasArrow: true, onClick: () => router.push('/provider-dashboard/orders') },
            { id: 'pending-returns', icon: <RotateCcw size={20} />, label: 'Pending Returns', hasArrow: false, disabled: true },
        ]
    };

    const paymentsOthers: MenuSection = {
        title: 'Payments & Others',
        items: [
            { id: 'manage-banks', icon: <Landmark size={20} />, label: 'Manage Bank Accounts', hasArrow: false, disabled: true },
        ]
    };

    const accountPreferences: MenuSection = {
        title: 'Account Preferences',
        items: [
            { id: 'language-theme', icon: <Globe size={20} />, label: 'Language & Theme', onClick: () => onViewChange('language-theme') },
            { id: 'notification-prefs', icon: <Bell size={20} />, label: 'Notification Preferences', onClick: () => onViewChange('notification-settings') },
        ]
    };

    const supportPolicies: MenuSection = {
        title: 'Support & Policies',
        items: [
            { id: 'bugs', icon: <Lightbulb size={20} />, label: 'Bugs & Suggestions', onClick: () => onViewChange('bugs') },
            { id: 'chat-support', icon: <MessageCircle size={20} />, label: 'Messages', onClick: openMessages },
        ]
    };

    return (
        <div className="provider-profile">
            {/* Top Role Switcher */}
            {!hideSwitcher && (
                <div className="provider-profile__top-switcher">
                    <ProfileUserInfo
                        user={user}
                        showRoleSwitcher={true}
                        onRoleSwitch={onRoleSwitch}
                    />
                </div>
            )}

            {/* Quick Actions / Stats Row (3 columns) */}
            <div className="profile-quick-actions-container">
                <div className="profile-quick-actions profile-quick-actions--three">
                    <button className="profile-quick-action" onClick={() => router.push('/provider-dashboard/products')}>
                        <div className="profile-quick-action__icon">
                            {!listingImgError ? (
                                <img
                                    src="https://img.icons8.com/3d-fluency/94/box.png"
                                    alt="Active Listing"
                                    onError={() => setListingImgError(true)}
                                />
                            ) : (
                                <div className="profile-quick-action__icon-placeholder">
                                    <Package size={32} />
                                </div>
                            )}
                        </div>
                        <span className="profile-quick-action__label">Active Listing</span>
                    </button>

                    <button className="profile-quick-action" onClick={() => router.push('/provider-dashboard/orders')}>
                        <div className="profile-quick-action__icon">
                            {!bookingImgError ? (
                                <img
                                    src="https://img.icons8.com/3d-fluency/94/calendar.png"
                                    alt="Active Bookings"
                                    onError={() => setBookingImgError(true)}
                                />
                            ) : (
                                <div className="profile-quick-action__icon-placeholder">
                                    <Calendar size={32} />
                                </div>
                            )}
                        </div>
                        <span className="profile-quick-action__label">Active Bookings</span>
                    </button>

                    <button className="profile-quick-action" onClick={() => onViewChange('notifications')}>
                        <div className="profile-quick-action__icon">
                            {!notifImgError ? (
                                <img
                                    src="https://img.icons8.com/3d-fluency/94/appointment-reminders.png"
                                    alt="Notifications"
                                    onError={() => setNotifImgError(true)}
                                />
                            ) : (
                                <div className="profile-quick-action__icon-placeholder">
                                    <Bell size={32} />
                                </div>
                            )}
                        </div>
                        <span className="profile-quick-action__label">Notifications</span>
                    </button>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="profile-menu-container">
                <ProfileMenuSection section={rentalOverview} />
                <ProfileMenuSection section={paymentsOthers} />
                <ProfileMenuSection section={accountPreferences} />
                <ProfileMenuSection section={supportPolicies} />
            </div>

            {/* Logout same like in customer */}
            <ProfileLogout onLogout={onLogout} />
        </div>
    );
};
