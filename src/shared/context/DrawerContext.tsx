import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface DrawerContextType {
    isProfileOpen: boolean;
    isCheckoutOpen: boolean;
    isMessagesOpen: boolean;
    isNotificationsOpen: boolean;
    isLocationModalOpen: boolean;
    isProviderOnboardingOpen: boolean;
    openProfile: () => void;
    closeProfile: () => void;
    openCheckout: () => void;
    closeCheckout: () => void;
    openMessages: () => void;
    closeMessages: () => void;
    openNotifications: () => void;
    closeNotifications: () => void;
    openLocation: () => void;
    closeLocation: () => void;
    openProviderOnboarding: () => void;
    closeProviderOnboarding: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isProviderOnboardingOpen, setIsProviderOnboardingOpen] = useState(false);

    const openProfile = useCallback(() => setIsProfileOpen(true), []);
    const closeProfile = useCallback(() => setIsProfileOpen(false), []);

    const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
    const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

    const openMessages = useCallback(() => setIsMessagesOpen(true), []);
    const closeMessages = useCallback(() => setIsMessagesOpen(false), []);
    const openNotifications = useCallback(() => setIsNotificationsOpen(true), []);
    const closeNotifications = useCallback(() => setIsNotificationsOpen(false), []);

    const openLocation = useCallback(() => setIsLocationModalOpen(true), []);
    const closeLocation = useCallback(() => setIsLocationModalOpen(false), []);

    const openProviderOnboarding = useCallback(() => setIsProviderOnboardingOpen(true), []);
    const closeProviderOnboarding = useCallback(() => setIsProviderOnboardingOpen(false), []);

    // Global event listener for opening drawers
    useEffect(() => {
        const handleOpenProfile = () => openProfile();
        document.addEventListener('open-profile-drawer', handleOpenProfile);
        return () => document.removeEventListener('open-profile-drawer', handleOpenProfile);
    }, [openProfile]);

    return (
        <DrawerContext.Provider value={{
            isProfileOpen, isCheckoutOpen, isMessagesOpen, isNotificationsOpen, isLocationModalOpen, isProviderOnboardingOpen,
            openProfile, closeProfile,
            openCheckout, closeCheckout,
            openMessages, closeMessages,
            openNotifications, closeNotifications,
            openLocation, closeLocation,
            openProviderOnboarding, closeProviderOnboarding
        }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => {
    const context = useContext(DrawerContext);
    if (context === undefined) {
        throw new Error('useDrawer must be used within a DrawerProvider');
    }
    return context;
};
