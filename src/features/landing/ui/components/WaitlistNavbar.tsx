'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import './WaitlistNavbar.css';

const navLinks = [
  { label: 'How It Works', to: '/#how-it-works', match: 'hash' as const },
  { label: 'Categories', to: '/#what-you-can-rent', match: 'hash' as const },
];

function scrollToWaitlist() {
  const el = document.getElementById('waitlist-hero-form');
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function scrollToHash(hashPath: string) {
  const id = hashPath.split('#')[1];
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function WaitlistNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [hash, setHash] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [pathname]);

  const goToWaitlist = () => {
    if (pathname === '/') {
      scrollToWaitlist();
      return;
    }
    router.push('/#waitlist-hero-form');
  };

  const isActive = (link: (typeof navLinks)[number]) => {
    if (link.match === 'hash') {
      return pathname === '/' && hash === `#${link.to.split('#')[1]}`;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 shadow-2xs backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-6 lg:h-[72px] lg:px-8">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2 sm:gap-2.5">
          <img src="/logo.svg" alt="" className="size-8 shrink-0 rounded-full object-cover shadow-xs sm:size-9" />
          <div className="min-w-0 leading-tight">
            <span className="block truncate text-base font-bold tracking-tight text-foreground sm:text-lg">
              Arentzo
            </span>
            <span className="waitlist-nav__tagline text-[10px] font-medium tracking-wide text-muted-foreground">
              Rent Everything. Live Better.
            </span>
          </div>
        </Link>

        <nav className="waitlist-nav__links" aria-label="Primary">
          {navLinks.map((link) => {
            const active = isActive(link);
            return (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault();
                    scrollToHash(link.to);
                  }
                }}
                className={cn(
                  'relative flex items-center gap-0.5 text-[12px] font-medium whitespace-nowrap transition-colors xl:text-[13px]',
                  active
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-primary',
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/login" className="hidden rounded-full px-3 py-2 text-sm font-semibold text-foreground hover:text-primary sm:inline-flex">Sign in</Link>
          <Link href="/signup" className="hidden rounded-full border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted sm:inline-flex">Create account</Link>
          <Button
            type="button"
            onClick={goToWaitlist}
            className="waitlist-nav__cta px-3 text-xs font-semibold sm:px-4 sm:text-sm"
          >
            Join Waitlist
          </Button>

          <button
            type="button"
            className="waitlist-nav__menu-btn size-10 items-center justify-center rounded-full border border-border bg-card"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="waitlist-nav__mobile border-t border-border bg-background px-4 py-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => {
                  setMobileOpen(false);
                  if (pathname === '/') {
                    e.preventDefault();
                    scrollToHash(link.to);
                  }
                }}
                className={cn(
                  'rounded-full px-3 py-2.5 text-sm font-medium',
                  isActive(link)
                    ? 'bg-secondary text-primary'
                    : 'text-foreground hover:bg-muted',
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 border-t border-border pt-3">
            <div className="mb-3 grid grid-cols-2 gap-2">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="rounded-xl border border-border px-3 py-3 text-center text-sm font-semibold">Sign in</Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)} className="rounded-xl bg-secondary px-3 py-3 text-center text-sm font-semibold text-primary">Create account</Link>
            </div>
            <Button
              type="button"
              className="w-full font-semibold"
              onClick={() => {
                setMobileOpen(false);
                goToWaitlist();
              }}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
