'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GlobalDrawers } from '@/shared/components/layout/GlobalDrawers';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import { CustomerBottomNav } from '@/shared/components/layout/CustomerBottomNav';

export default function DetailGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const requiresAccount = pathname === '/my-rentals' || pathname.startsWith('/my-rentals/');
  useEffect(() => {
    if (!loading && requiresAccount && !user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [loading, pathname, requiresAccount, router, user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {requiresAccount && (loading || !user) ? <main className="min-h-screen" aria-busy="true" /> : children}
      {!loading && user?.role !== 'service_provider' && (pathname.startsWith('/my-rentals/') || pathname === '/search') ? <CustomerBottomNav /> : null}
      <GlobalDrawers />
    </>
  );
}
