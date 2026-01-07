import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, Edit3, Wallet, CreditCard, Tag, MapPin, Shield, Globe, Bell, Lightbulb, MessageCircle } from 'lucide-react';
import { ProfileUserInfo } from './ProfileUserInfo';
import { ProfileQuickActions } from './ProfileQuickActions';
import { BecomeProviderCta } from './BecomeProviderCta';
import { ProfileMenuSection } from './ProfileMenuSection';
import { ProfileLogout } from './ProfileLogout';
import { LanguageThemeSettings } from './LanguageThemeSettings';
import { NotificationSettings } from './NotificationSettings';
import { BugsSuggestionsSettings } from './BugsSuggestionsSettings';
import { LogoutModal } from './LogoutModal';
import { SelectDeliveryLocation } from '../../checkout/components/SelectDeliveryLocation';
import { LoginForm } from '../../auth/components/LoginForm';
import { SignupForm } from '../../auth/components/SignupForm';
import { ForgotPasswordForm } from '../../auth/components/ForgotPasswordForm';
import { useAuth } from '../../auth/context/AuthContext';
import type { UserProfile, UserRole, MenuSection, ProfileView } from '../types';
import { mockUserProfile } from '../data/mockData';
import '../Profile.css';

interface ProfilePanelProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenProviderOnboarding?: () => void;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ isOpen, onClose, onOpenProviderOnboarding }) => {
    const navigate = useNavigate();
    const { user: authUser, signOut } = useAuth();
    const [view, setView] = useState<ProfileView>(authUser ? 'profile' : 'login');
    const [profileUser, setProfileUser] = useState<UserProfile>(mockUserProfile);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                if (view !== 'profile') {
                    setView('profile');
                } else {
                    onClose();
                }
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, view]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Reset view when panel closes
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setView(authUser ? 'profile' : 'login');
            }, 300);
            return () => clearTimeout(timer);
        } else {
            // If panel opens and auth state changed, sync view
            setView(authUser ? 'profile' : 'login');
        }
    }, [isOpen, !!authUser]);

    const handleRoleSwitch = useCallback((role: UserRole) => {
        setProfileUser((prev) => ({ ...prev, activeRole: role }));
    }, []);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const menuSections: MenuSection[] = [
        {
            title: 'Payments & Others',
            items: [
                {
                    id: 'edit-profile',
                    icon: <Edit3 size={20} />,
                    label: 'Edit Profile',
                    onClick: () => console.log('Edit Profile'),
                },
                {
                    id: 'wallet',
                    icon: <Wallet size={20} />,
                    label: 'My Wallet / Credits',
                    onClick: () => console.log('Wallet'),
                },
                {
                    id: 'payment-methods',
                    icon: <CreditCard size={20} />,
                    label: 'Payment Methods',
                    onClick: () => console.log('Payment Methods'),
                },
                {
                    id: 'coupons',
                    icon: <Tag size={20} />,
                    label: 'Coupons & Offers',
                    onClick: () => console.log('Coupons'),
                },
                {
                    id: 'addresses',
                    icon: <MapPin size={20} />,
                    label: 'Saved Addresses',
                    onClick: () => setView('saved-addresses'),
                },
                {
                    id: 'kyc',
                    icon: <Shield size={20} />,
                    label: 'KYC / Id Verification',
                    onClick: () => console.log('KYC'),
                },
            ],
        },
        {
            title: 'Account Preferences',
            items: [
                {
                    id: 'language-theme',
                    icon: <Globe size={20} />,
                    label: 'Language & Theme',
                    onClick: () => setView('language-theme'),
                },
                {
                    id: 'notification-prefs',
                    icon: <Bell size={20} />,
                    label: 'Notification Preferences',
                    onClick: () => setView('notifications'),
                },
            ],
        },
        {
            title: 'Support & Policies',
            items: [
                {
                    id: 'bugs',
                    icon: <Lightbulb size={20} />,
                    label: 'Bugs & Suggestions',
                    onClick: () => setView('bugs'),
                },
                {
                    id: 'chat-support',
                    icon: <MessageCircle size={20} />,
                    label: 'Chat with Support',
                    onClick: () => console.log('Chat'),
                },
            ],
        },
    ];

    const isProvider = profileUser.roles.includes('service_provider');

    const renderHeaderTitle = () => {
        switch (view) {
            case 'language-theme': return 'Language & Theme';
            case 'notifications': return 'Notification Preferences';
            case 'bugs': return 'Bugs & Suggestions';
            case 'saved-addresses': return 'Select Delivery Location';
            case 'login': return 'Log in';
            case 'signup': return 'Create an account';
            case 'forgot-password': return 'Forgot Password';
            default: return 'Profile';
        }
    };

    return (
        <div className={`profile-overlay ${isOpen ? 'profile-overlay--open' : ''}`}>
            <div className="profile-overlay__backdrop" onClick={handleBackdropClick} />

            <div className="profile-panel">
                <header className="profile-panel__header">
                    {view !== 'profile' && (
                        <button
                            className="profile-panel__back"
                            onClick={() => setView('profile')}
                            aria-label="Back"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <h2 className="profile-panel__title">{renderHeaderTitle()}</h2>
                    <button
                        className="profile-panel__close"
                        onClick={onClose}
                        aria-label="Close Profile"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className={`profile-panel__content ${view === 'saved-addresses' ? 'profile-panel__content--full' : ''}`} style={view === 'saved-addresses' ? { padding: 0 } : {}}>
                    {view === 'profile' && (
                        <>
                            <ProfileUserInfo
                                user={profileUser}
                                showRoleSwitcher={profileUser.roles.length > 1}
                                onRoleSwitch={handleRoleSwitch}
                            />

                            <ProfileQuickActions
                                onNotificationsClick={() => console.log('Notifications')}
                                onFavouritesClick={() => console.log('Favourites')}
                                onRentalsClick={() => console.log('My Rentals')}
                            />

                            <BecomeProviderCta
                                isAlreadyProvider={isProvider}
                                onClick={() => {
                                    onClose();
                                    if (onOpenProviderOnboarding) {
                                        onOpenProviderOnboarding();
                                    } else {
                                        navigate('/provider-onboarding');
                                    }
                                }}
                            />

                            {menuSections.map((section) => (
                                <ProfileMenuSection key={section.title} section={section} />
                            ))}

                            <ProfileLogout onLogout={() => setIsLogoutModalOpen(true)} />
                        </>
                    )}

                    {view === 'language-theme' && (
                        <LanguageThemeSettings onSave={() => setView('profile')} />
                    )}

                    {view === 'notifications' && (
                        <NotificationSettings onSave={() => setView('profile')} />
                    )}

                    {view === 'bugs' && (
                        <BugsSuggestionsSettings onSave={() => setView('profile')} />
                    )}

                    {view === 'saved-addresses' && (
                        <SelectDeliveryLocation
                            showActions={false}
                            onSelect={(addr) => {
                                console.log('Selected address in profile:', addr);
                                // Optional: navigate back or show success feedback
                            }}
                        />
                    )}

                    {view === 'login' && (
                        <LoginForm
                            onSwitchToSignup={() => setView('signup')}
                            onSwitchToForgotPassword={() => setView('forgot-password')}
                            onSuccess={() => {
                                setView('profile');
                                // onClose();
                            }}
                        />
                    )}

                    {view === 'signup' && (
                        <SignupForm
                            onSwitchToLogin={() => setView('login')}
                            onSuccess={() => {
                                setView('profile');
                                // onClose();
                            }}
                        />
                    )}

                    {view === 'forgot-password' && (
                        <ForgotPasswordForm
                            onSwitchToLogin={() => setView('login')}
                            onSuccess={(email) => {
                                console.log('OTP sent to', email);
                                // Stay on login or show OTP view (not implemented in drawer yet)
                                setView('login');
                            }}
                        />
                    )}
                </div>
            </div>

            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={() => {
                    signOut();
                    setIsLogoutModalOpen(false);
                    onClose();
                    navigate('/'); // Go back to landing page if on home
                }}
            />
        </div>
    );
};




