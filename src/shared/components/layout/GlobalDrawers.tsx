import React from 'react';
import { useDrawer } from '../../context/DrawerContext';
import { ProfilePanel } from '../../../features/profile';
import { CheckoutPanel } from '../../../features/checkout';
import { MessagesPanel } from '../../../features/messages';
import { ProviderOnboardingPanel } from '../../../features/provider-onboarding';
import { NotificationsPanel } from './NotificationsPanel';
import { SelectDeliveryLocation, type AddressItem } from '../../../features/checkout/components/SelectDeliveryLocation';

export const GlobalDrawers: React.FC = () => {
    const {
        isProfileOpen, closeProfile,
        isCheckoutOpen, closeCheckout,
        isMessagesOpen, closeMessages,
        isNotificationsOpen, closeNotifications,
        isProviderOnboardingOpen, closeProviderOnboarding,
        isLocationModalOpen, closeLocation
    } = useDrawer();

    return (
        <>
            <ProfilePanel
                isOpen={isProfileOpen}
                onClose={closeProfile}
            />
            <CheckoutPanel isOpen={isCheckoutOpen} onClose={closeCheckout} />
            <MessagesPanel isOpen={isMessagesOpen} onClose={closeMessages} />
            <NotificationsPanel isOpen={isNotificationsOpen} onClose={closeNotifications} />
            <ProviderOnboardingPanel isOpen={isProviderOnboardingOpen} onClose={closeProviderOnboarding} />

            {/* Location Selection Overlay */}
            <div className={`checkout-overlay ${isLocationModalOpen ? 'checkout-overlay--open' : ''}`}>
                <div className="checkout-overlay__backdrop" onClick={closeLocation} />
                <div className="checkout-panel" style={{ width: '100%', maxWidth: '420px', right: 0 }}>
                    <div className="checkout-header">
                        <button className="checkout-header__back" onClick={closeLocation}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                        </button>
                        <h2 className="checkout-header__title">Select Location</h2>
                        <div style={{ width: 36 }} /> {/* Spacer */}
                    </div>
                    <div className="checkout-panel__content" style={{ padding: 0 }}>
                        <SelectDeliveryLocation
                            showActions={true}
                            onSelect={(addr: AddressItem) => {
                                console.log('Selected location:', addr);
                                closeLocation();
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
