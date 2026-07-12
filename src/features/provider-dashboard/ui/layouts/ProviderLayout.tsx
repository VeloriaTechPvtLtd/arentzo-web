'use client';

import React from 'react';
import { AppHeaderWithSuspense } from '../../../../shared/components/layout/AppHeaderWithSuspense';
import { Footer } from '../../../../shared/components/layout/Footer';
import { GlobalDrawers } from '../../../../shared/components/layout/GlobalDrawers';
import { ProviderBottomNav } from '../components/ProviderBottomNav';
import '../styles/ProviderLayout.css';

export const ProviderLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="provider-layout">
      <AppHeaderWithSuspense />
      <main className="provider-layout__content">
        <div className="provider-layout__container">{children}</div>
      </main>
      <Footer />
      <ProviderBottomNav />
      <GlobalDrawers />
    </div>
  );
};
