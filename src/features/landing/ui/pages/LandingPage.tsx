'use client';

import { useEffect, useState, type FC } from 'react';
import { useTheme } from '../../../../shared/context/useTheme';
import type { Theme } from '../../../../shared/types/theme';
import { CompareRentBuy } from '../components/CompareRentBuy';
import { EarlyAccessBanner } from '../components/EarlyAccessBanner';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { TrustFeaturesBar } from '../components/TrustFeaturesBar';
import { WaitlistFooter } from '../components/WaitlistFooter';
import { WaitlistHero } from '../components/WaitlistHero';
import { WaitlistNavbar } from '../components/WaitlistNavbar';
import { WhatYouCanRent } from '../components/WhatYouCanRent';
import '../landing.css';

export const LandingPage: FC = () => {
  const { setTheme } = useTheme();
  const [hash, setHash] = useState('');

  useEffect(() => {
    const previous =
      (typeof window !== 'undefined'
        ? (window.localStorage.getItem('theme') as Theme | null)
        : null) ?? 'system';
    setTheme('light');
    return () => setTheme(previous);
  }, [setTheme]);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace(/^#/, '');
    const frame = window.requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: 'smooth',
        block: id === 'waitlist-hero-form' ? 'center' : 'start',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <div className="landing-page min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
      <WaitlistNavbar />
      <main>
        <WaitlistHero />
        <TrustFeaturesBar />
        <WhatYouCanRent />
        <HowItWorksSection />
        <CompareRentBuy />
        <EarlyAccessBanner />
      </main>
      <WaitlistFooter />
    </div>
  );
};
