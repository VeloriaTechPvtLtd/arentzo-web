import { createContext } from 'react';

export interface DrawerContextType {
    isProfileOpen: boolean;
    isCheckoutOpen: boolean;
    isMessagesOpen: boolean;
    isNotificationsOpen: boolean;
    isProviderOnboardingOpen: boolean;
    isLocationModalOpen: boolean;
    openProfile: () => void;
    closeProfile: () => void;
    openCheckout: () => void;
    closeCheckout: () => void;
    openMessages: () => void;
    closeMessages: () => void;
    openNotifications: () => void;
    closeNotifications: () => void;
    openProviderOnboarding: () => void;
    closeProviderOnboarding: () => void;
    openLocation: () => void;
    closeLocation: () => void;
    isAuthOpen: boolean;
    openAuth: () => void;
    closeAuth: () => void;
}

export const DrawerContext = createContext<DrawerContextType | undefined>(undefined);
