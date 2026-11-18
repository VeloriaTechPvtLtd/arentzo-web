'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/ui/context/useAuth';
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
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    else if (!loading && user?.role !== 'service_provider') router.replace('/provider-onboarding');
  }, [loading, pathname, router, user]);
  if (loading || !user || user.role !== 'service_provider') return <main className="min-h-screen" aria-busy="true" />;
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
