'use client';
import Link from 'next/link';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import { CheckoutRecovery } from './CheckoutRecovery';

/** Return URL data is intentionally never read. This page performs no settlement. */
export function CheckoutReturnPage() {
  const { user, loading } = useAuth();
  return <main className="min-h-dvh bg-background px-4 py-10 text-foreground sm:px-6 sm:py-16">
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8" aria-labelledby="checkout-return-title">
      <Link href="/" className="text-xl font-bold text-primary">Arentzo</Link>
      <p className="mt-8 text-sm font-medium text-muted-foreground">Checkout return</p>
      <h1 id="checkout-return-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Check your booking status</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">Returning from payment does not confirm a booking. Do not pay again until your previous attempt has been checked.</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">This page does not charge you or change your cart.</p>
      {loading ? <p role="status" className="mt-6 text-sm">Checking your sign-in…</p> : user ? <>
        <CheckoutRecovery />
        <Link href="/my-rentals/" className="mt-6 flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 py-3 text-center font-medium text-primary-foreground">View my rentals</Link>
      </> : <>
        <p className="mt-6 text-sm leading-relaxed">Sign in to the same account to check an existing transaction or view your rentals.</p>
        <Link href="/login?next=%2Fcheckout%2Freturn%2F" className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 py-3 text-center font-medium text-primary-foreground">Sign in to check status</Link>
      </>}
      <Link href="/browse/" className="mt-3 flex min-h-12 items-center justify-center rounded-xl border border-border px-4 py-3 text-center font-medium">Back to browse</Link>
    </section>
  </main>;
}
