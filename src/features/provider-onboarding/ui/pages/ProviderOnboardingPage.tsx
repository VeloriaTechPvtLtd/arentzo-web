'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import '../styles/ProviderOnboarding.css';

export function ProviderOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  return <main className="provider-onboarding-page min-h-screen p-4 sm:p-8">
    <header className="provider-onboarding__header"><button onClick={() => router.back()} className="provider-onboarding__back-btn" aria-label="Go back"><ArrowLeft size={22} /></button><h1 className="provider-onboarding__title">Provider registration</h1><span className="provider-onboarding__header-spacer" /></header>
    <section className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground"><ShieldAlert size={24} /></div>
      <h2 className="mt-5 text-xl font-bold">Registration is temporarily unavailable</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">The provider registration service currently returns a database error. We can’t safely accept identity documents, bank details, or submit a provider profile until that service is repaired.</p>
      <p className="mt-3 text-sm text-muted-foreground">You are signed in as {user?.email}. Your account remains a customer account while registration is unavailable.</p>
      <div className="mt-6 flex flex-wrap gap-3"><Link href="/" className="rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground">Return home</Link><Link href="/contact-us" className="rounded-xl border border-border px-4 py-3 font-semibold">Contact support</Link></div>
    </section>
  </main>;
}
