import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../../../../shared/components/layout/AppHeader';
import { Footer } from '../../../../shared/components/layout/Footer';
import { GlobalDrawers } from '../../../../shared/components/layout/GlobalDrawers';
import { ProviderBottomNav } from '../components/ProviderBottomNav';
import '../styles/ProviderLayout.css';

export const ProviderLayout: React.FC = () => {
    return (
        <div className="provider-layout">
            <AppHeader />
            <main className="provider-layout__content">
                <div className="provider-layout__container">
                    <Outlet />
                </div>
            </main>
            <Footer />
            <ProviderBottomNav />
            <GlobalDrawers />
        </div>
    );
};
