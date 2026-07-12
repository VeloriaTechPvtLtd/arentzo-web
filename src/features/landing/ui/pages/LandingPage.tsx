import { useEffect, type FC } from 'react';
import { useLocation } from 'react-router-dom';
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
  const { hash } = useLocation();

  useEffect(() => {
    const previous = (localStorage.getItem('theme') as Theme | null) ?? 'system';
    setTheme('light');
    return () => setTheme(previous);
  }, [setTheme]);

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
