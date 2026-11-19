'use client';

import { useSearchParams } from 'next/navigation';
import { LoginPage } from '@/features/auth/ui/pages/LoginPage';
import { getSafeReturnPath } from '@/features/auth/ui/utils/getSafeReturnPath';

export function LoginRoute() {
  const next = useSearchParams().get('next');
  return <LoginPage returnTo={getSafeReturnPath(next)} />;
}
