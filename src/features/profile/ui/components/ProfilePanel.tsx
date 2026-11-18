'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowLeft, Edit3, Wallet, CreditCard, Tag, MapPin, Shield, Globe, Bell, Lightbulb, MessageCircle } from 'lucide-react';
import { ProfileUserInfo } from './ProfileUserInfo';
import { EditProfileForm } from './EditProfileForm';
import { ProfileQuickActions } from './ProfileQuickActions';
import { BecomeProviderCta } from './BecomeProviderCta';
import { ProfileMenuSection } from './ProfileMenuSection';
import { ProfileLogout } from './ProfileLogout';
import { LanguageThemeSettings } from './LanguageThemeSettings';
import { NotificationSettings } from './NotificationSettings';
import { BugsSuggestionsSettings } from './BugsSuggestionsSettings';
import { LogoutModal } from './LogoutModal';
import { MyNotifications } from './MyNotifications';
import { ProviderProfileContent } from './ProviderProfileContent';
import { SelectDeliveryLocation } from '../../../checkout/ui/components/SelectDeliveryLocation';
import { LoginForm } from '../../../auth/ui/components/LoginForm';
import { SignupForm } from '../../../auth/ui/components/SignupForm';
import { ForgotPasswordForm } from '../../../auth/ui/components/ForgotPasswordForm';
import { useAuth } from '../../../auth/ui/context/AuthContext';
import { OnboardingStepper, ProviderOnboardingProvider, useProviderOnboarding } from '../../../provider-onboarding';
import type { UserRole, MenuSection, ProfileView } from '../../domain/entities';
import '../styles/Profile.css';

interface ProfilePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const OnboardingHeader: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { currentStep, prevStep } = useProviderOnboarding();

    const handleBack = () => {
        if (currentStep === 1) {
            onBack();
        } else {
            prevStep();
        }
    };

    return (
        <button
            className="profile-panel__back"
            onClick={handleBack}
            aria-label="Back"
        >
            <ArrowLeft size={20} />
        </button>
    );
};

const ProfilePanelInner: React.FC<ProfilePanelProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { user: authUser, signOut, activeRole, switchRole } = useAuth();
    const { currentStep, providerType } = useProviderOnboarding();
    const [view, setView] = useState<ProfileView>(authUser ? 'profile' : 'login');
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [profileName, setProfileName] = useState<string | null>(null);

    // Build the profile from the authenticated account, never placeholder data.
    const effectiveProfileUser = React.useMemo(() => ({
        id: authUser?.id || '',
        name: profileName || authUser?.name?.trim() || authUser?.email?.split('@')[0] || 'Account',
        email: authUser?.email || '',
        avatarUrl: authUser?.avatarUrl,
        isVerified: authUser?.isVerified === true,
        roles: authUser?.role === 'service_provider'
            ? ['customer', 'service_provider'] as UserRole[]
            : ['customer'] as UserRole[],
        activeRole: authUser?.role === 'service_provider' && activeRole === 'service_provider'
            ? 'service_provider' as UserRole
            : 'customer' as UserRole,
    }), [authUser, activeRole, profileName]);

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

    const isAuthAvailable = !!authUser;

    // Reset view when panel closes
    useEffect(() => {
        const targetView = isAuthAvailable ? 'profile' : 'login';
        if (!isOpen) {
            const timer = setTimeout(() => {
                setView(targetView);
            }, 300);
            return () => clearTimeout(timer);
        } else if (view !== targetView && (view === 'login' || view === 'profile')) {
            // Push to next tick to avoid "setState in effect" warning and cascading renders
            const timer = setTimeout(() => {
                setView(targetView);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isAuthAvailable, view]);

    const handleRoleSwitch = useCallback((role: UserRole) => {
        if (role === activeRole) return;

        switchRole(role);

        // Brief delay so user sees the checkmark change before navigating/closing
        setTimeout(() => {
            if (role === 'service_provider') {
                router.push('/provider-dashboard');
            } else {
                router.push('/');
            }
            onClose();
        }, 400);
    }, [activeRole, router, onClose, switchRole]);

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
                    onClick: () => setView('edit-profile'),
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
                    onClick: () => setView('notification-settings'),
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

    const isProvider = effectiveProfileUser.roles.includes('service_provider');

    const renderHeaderTitle = () => {
        switch (view) {
            case 'language-theme': return 'Appearance';
            case 'edit-profile': return 'Edit Profile';
            case 'notification-settings': return 'Appearance';
            case 'notifications': return 'Notifications';
            case 'bugs': return 'Feedback';
            case 'saved-addresses': return 'My Addresses';
            case 'login': return 'Welcome Back';
            case 'signup': return 'Join Arentzo';
            case 'forgot-password': return 'Reset Password';
            case 'provider-onboarding': {
                if (providerType === 'business') {
                    switch (currentStep) {
                        case 1: return 'Provider Type';
                        case 2: return 'Business Account';
                        case 3: return 'Business Identity';
                        case 4: return 'Business Location';
                        case 5: return 'Summary';
                        case 6: return 'Complete';
                        default: return 'Join as Provider';
                    }
                }
                switch (currentStep) {
                    case 1: return 'Provider Type';
                    case 2: return 'Basic Information';
                    case 3: return 'Identity Check';
                    case 4: return 'Financial Details';
                    default: return 'Join as Provider';
                }
            }
            default: return authUser ? 'My Account' : 'Account';
        }
    };

    return (
        <div className={`profile-overlay ${isOpen ? 'profile-overlay--open' : ''}`}>
            <div className="profile-overlay__backdrop" onClick={handleBackdropClick} />

            <div className="profile-panel">
                <header className="profile-panel__header">
                    {(view !== 'profile' && view !== 'provider-onboarding') && (
                        <button
                            className="profile-panel__back"
                            onClick={() => setView('profile')}
                            aria-label="Back"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    {view === 'provider-onboarding' && (
                        <OnboardingHeader onBack={() => setView('profile')} />
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
                        <div className="profile-panel__scroll-content">
                            <div className="profile-panel__switcher-section">
                                {effectiveProfileUser.activeRole === 'service_provider' ? (
                                    <ProfileUserInfo
                                        user={effectiveProfileUser}
                                        showRoleSwitcher={true}
                                        onRoleSwitch={handleRoleSwitch}
                                    />
                                ) : (
                                    <ProfileUserInfo
                                        user={effectiveProfileUser}
                                        showRoleSwitcher={isProvider}
                                        onRoleSwitch={handleRoleSwitch}
                                    />
                                )}
                            </div>

                            <div className="profile-panel__main-section">
                                {effectiveProfileUser.activeRole === 'service_provider' ? (
                                    <ProviderProfileContent
                                        user={effectiveProfileUser}
                                        onViewChange={(v: ProfileView) => setView(v)}
                                        onRoleSwitch={handleRoleSwitch}
                                        onLogout={() => setIsLogoutModalOpen(true)}
                                        hideSwitcher={true}
                                    />
                                ) : (
                                    <>
                                        <div className="profile-quick-actions-container">
                                            <ProfileQuickActions
                                                onNotificationsClick={() => setView('notifications')}
                                                onFavouritesClick={() => {
                                                    router.push('/favorites');
                                                    onClose();
                                                }}
                                                onRentalsClick={() => {
                                                    router.push('/my-rentals');
                                                    onClose();
                                                }}
                                            />
                                        </div>

                                        {!isProvider && (
                                            <BecomeProviderCta
                                                isAlreadyProvider={isProvider}
                                                onClick={() => setView('provider-onboarding')}
                                            />
                                        )}

                                        <div className="profile-menu-container">
                                            {menuSections.map((section) => (
                                                <ProfileMenuSection key={section.title} section={section} />
                                            ))}
                                        </div>

                                        <ProfileLogout onLogout={() => setIsLogoutModalOpen(true)} />
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {view === 'language-theme' && (
                        <LanguageThemeSettings onSave={() => setView('profile')} />
                    )}

                    {view === 'edit-profile' && (
                        <EditProfileForm onSaved={(profile) => {
                            setProfileName(profile.fullName);
                            setView('profile');
                        }} />
                    )}

                    {view === 'notification-settings' && (
                        <NotificationSettings onSave={() => setView('profile')} />
                    )}

                    {view === 'notifications' && (
                        <MyNotifications />
                    )}

                    {view === 'bugs' && (
                        <BugsSuggestionsSettings onSave={() => setView('profile')} />
                    )}

                    {view === 'saved-addresses' && (
                        <SelectDeliveryLocation
                            showActions={false}
                            onSelect={(addr) => {
                                console.log('Selected address in profile:', addr);
                            }}
                        />
                    )}

                    {view === 'login' && (
                        <LoginForm
                            onSignupClick={() => setView('signup')}
                            onForgotPasswordClick={() => setView('forgot-password')}
                            onSuccess={() => setView('profile')}
                        />
                    )}

                    {view === 'signup' && (
                        <SignupForm
                            onLoginClick={() => setView('login')}
                            onSuccess={() => setView('profile')}
                        />
                    )}

                    {view === 'forgot-password' && (
                        <ForgotPasswordForm
                            onBack={() => setView('login')}
                            onEmailSet={(email) => console.log('Reset link sent to', email)}
                            onSuccess={() => setView('login')}
                        />
                    )}

                    {view === 'provider-onboarding' && (
                        <OnboardingStepper />
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
                    router.push('/');
                }}
            />
        </div>
    );
};

export const ProfilePanel: React.FC<ProfilePanelProps> = (props) => (
    <ProviderOnboardingProvider>
        <ProfilePanelInner {...props} />
    </ProviderOnboardingProvider>
);
