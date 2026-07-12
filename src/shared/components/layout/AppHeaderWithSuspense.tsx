'use client';

import { Suspense } from 'react';
import { AppHeader } from '@/shared/components/layout/AppHeader';

function AppHeaderFallback() {
  return <header className="app-header" aria-hidden />;
}

export function AppHeaderWithSuspense() {
  return (
    <Suspense fallback={<AppHeaderFallback />}>
      <AppHeader />
    </Suspense>
  );
}
