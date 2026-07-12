'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AppHeaderWithSuspense } from '@/shared/components/layout/AppHeaderWithSuspense';
import { GlobalDrawers } from '@/shared/components/layout/GlobalDrawers';
import { isWaitlistMarketingPath } from '@/features/landing/ui/components/WaitlistPageShell';
import { useAuth } from '@/features/auth/ui/context/AuthContext';

export default function MainGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const hideAppHeader =
    pathname === '/' ? !user : isWaitlistMarketingPath(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!hideAppHeader && <AppHeaderWithSuspense />}
      {children}
      <GlobalDrawers />
    </>
  );
}
