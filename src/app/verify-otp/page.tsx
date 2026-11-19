'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/features/auth/ui/layouts/AuthLayout';
import { VerifyOtpForm } from '@/features/auth/ui/components/VerifyOtpForm';

export default function Page() {
  const [email] = useState(() => typeof window === 'undefined' ? '' : sessionStorage.getItem('arentzo_pending_verification_email') ?? '');
  const router = useRouter();
  return <AuthLayout title="Verify your email" subtitle="Enter the six-digit code sent to your email address.">
    {email ? <VerifyOtpForm email={email} onSuccess={() => { sessionStorage.removeItem('arentzo_pending_verification_email'); router.replace('/'); }} /> : <p role="status" className="text-sm text-muted-foreground">Start by creating an account to request a verification code. <a className="text-primary underline" href="/signup">Create account</a></p>}
  </AuthLayout>;
}
