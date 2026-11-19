'use client';

import { useSearchParams } from 'next/navigation';
import { SignupPage } from '@/features/auth/ui/pages/SignupPage';
import { getSafeReturnPath } from '@/features/auth/ui/utils/getSafeReturnPath';

export function SignupRoute() {
  const next = useSearchParams().get('next');
  return <SignupPage returnTo={getSafeReturnPath(next)} />;
}
