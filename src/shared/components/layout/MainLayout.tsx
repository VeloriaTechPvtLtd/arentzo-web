'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../../features/auth/ui/context/AuthContext';
import { isWaitlistMarketingPath } from '../../../features/landing/ui/components/WaitlistPageShell';
import { AppHeaderWithSuspense } from './AppHeaderWithSuspense';
import { GlobalDrawers } from './GlobalDrawers';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
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
};
