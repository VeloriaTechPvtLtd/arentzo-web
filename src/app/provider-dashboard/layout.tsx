'use client';

import { AppHeaderWithSuspense } from '@/shared/components/layout/AppHeaderWithSuspense';
import { Footer } from '@/shared/components/layout/Footer';
import { GlobalDrawers } from '@/shared/components/layout/GlobalDrawers';
import { ProviderBottomNav } from '@/features/provider-dashboard/ui/components/ProviderBottomNav';
import '@/features/provider-dashboard/ui/styles/ProviderLayout.css';

export default function ProviderDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
}
