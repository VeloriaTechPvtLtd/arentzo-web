'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppHeaderWithSuspense } from '@/shared/components/layout/AppHeaderWithSuspense';
import { GlobalDrawers } from '@/shared/components/layout/GlobalDrawers';
import { isWaitlistMarketingPath } from '@/features/landing/ui/components/WaitlistPageShell';
import { useAuth } from '@/features/auth/ui/context/AuthContext';
import { CustomerBottomNav } from '@/shared/components/layout/CustomerBottomNav';

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPath = usePathname();
  const pathname = currentPath.replace(/\/+$/, '') || '/';
  const router = useRouter();
  const { user, loading } = useAuth();
  const requiresAccount = pathname === '/favorites' || pathname === '/my-rentals' || pathname.startsWith('/my-rentals/') || pathname === '/provider-onboarding';
  useEffect(() => {
    if (!loading && requiresAccount && !user) {
      const next = `${currentPath}${window.location.search}`;
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [currentPath, loading, pathname, requiresAccount, router, user]);
  const hideAppHeader =
    pathname === '/' ? !user : isWaitlistMarketingPath(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!hideAppHeader && <AppHeaderWithSuspense />}
      {requiresAccount && (loading || !user) ? <main className="min-h-screen" aria-busy="true" /> : children}
      {!loading && user?.role !== 'service_provider' && (pathname === '/favorites' || pathname === '/my-rentals') ? <CustomerBottomNav /> : null}
      <GlobalDrawers />
    </>
  );
}
