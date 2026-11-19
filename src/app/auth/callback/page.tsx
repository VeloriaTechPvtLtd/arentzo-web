import { Suspense } from 'react';
import { AuthCallbackPage } from '@/features/auth/ui/pages/AuthCallbackPage';
export default function Page() { return <Suspense fallback={<main className="min-h-screen" aria-busy="true" />}><AuthCallbackPage /></Suspense>; }
