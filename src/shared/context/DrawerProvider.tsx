'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { DrawerContext } from './DrawerContext';

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isProviderOnboardingOpen, setIsProviderOnboardingOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    const [isAuthOpen, setIsAuthOpen] = useState(false);

    const openProfile = useCallback(() => setIsProfileOpen(true), []);
    const closeProfile = useCallback(() => setIsProfileOpen(false), []);

    const openAuth = useCallback(() => setIsAuthOpen(true), []);
    const closeAuth = useCallback(() => setIsAuthOpen(false), []);

    const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
    const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

    const openMessages = useCallback(() => setIsMessagesOpen(true), []);
    const closeMessages = useCallback(() => setIsMessagesOpen(false), []);

    const openNotifications = useCallback(() => setIsNotificationsOpen(true), []);
    const closeNotifications = useCallback(() => setIsNotificationsOpen(false), []);

    const openProviderOnboarding = useCallback(() => setIsProviderOnboardingOpen(true), []);
    const closeProviderOnboarding = useCallback(() => setIsProviderOnboardingOpen(false), []);

    const openLocation = useCallback(() => setIsLocationModalOpen(true), []);
    const closeLocation = useCallback(() => setIsLocationModalOpen(false), []);

    // Close all drawers on route change (simplified here)
    useEffect(() => {
        const handlePopState = () => {
            closeProfile();
            closeCheckout();
            closeMessages();
            closeNotifications();
            closeProviderOnboarding();
            closeLocation();
            closeAuth();
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [closeProfile, closeCheckout, closeMessages, closeNotifications, closeProviderOnboarding, closeLocation, closeAuth]);

    return (
        <DrawerContext.Provider
            value={{
                isProfileOpen,
                isCheckoutOpen,
                isMessagesOpen,
                isNotificationsOpen,
                isProviderOnboardingOpen,
                isLocationModalOpen,
                openProfile,
                closeProfile,
                openCheckout,
                closeCheckout,
                openMessages,
                closeMessages,
                openNotifications,
                closeNotifications,
                openProviderOnboarding,
                closeProviderOnboarding,
                openLocation,
                closeLocation,
                isAuthOpen,
                openAuth,
                closeAuth,
            }}
        >
            {children}
        </DrawerContext.Provider>
    );
};
