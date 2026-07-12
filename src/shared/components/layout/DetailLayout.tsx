'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GlobalDrawers } from './GlobalDrawers';

export const DetailLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {children}
      <GlobalDrawers />
    </>
  );
};
