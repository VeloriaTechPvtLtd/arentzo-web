'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../context/useAuth';
import { getSafeReturnPath } from '../utils/getSafeReturnPath';

export function AuthCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { completeAuthCallback } = useAuth();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const code = params.get('code');
    if (!code) return;
    void completeAuthCallback(code).then(() => router.replace(getSafeReturnPath(params.get('next')))).catch(() => setFailed(true));
  }, [completeAuthCallback, params, router]);
  return <main className="flex min-h-screen items-center justify-center p-6 text-center">
    {failed || !params.get('code') ? <p role="alert">This sign-in link could not be verified. Return to <a className="text-primary underline" href="/login">sign in</a>.</p> : <p role="status">Finishing sign-in…</p>}
  </main>;
}
