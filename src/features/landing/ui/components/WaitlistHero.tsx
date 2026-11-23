import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { landingAssets } from '../assets';
import { WaitlistForm } from './WaitlistForm';

export function WaitlistHero() {
  const { t } = useTranslation();
  return (
    <section className="landing-hero relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl lg:min-h-[min(80vh,700px)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)]">
        <div className="relative z-10 flex flex-col justify-center px-4 pt-8 pb-4 sm:px-6 sm:pt-10 sm:pb-6 lg:px-8 lg:py-20 lg:pr-12">
          <h1 className="landing-reveal max-w-lg text-[clamp(2rem,8.5vw,2.65rem)] leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.02]">
            <span className="block text-primary">Arentzo</span>
            Everything you need, on rent.
          </h1>

          <p className="landing-reveal landing-reveal-delay-1 mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cars, bikes, electronics, furniture — from verified providers near you.
          </p>

          <div className="landing-reveal landing-reveal-delay-2 mt-6 flex flex-wrap gap-3">
            <Link href="/browse" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
              {t('mobileRental.browse')} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted">{t('mobileRental.how')}</Link>
          </div>

          <div className="landing-reveal landing-reveal-delay-2 mt-6 max-w-md space-y-2 border-t border-border/60 pt-4">
            <WaitlistForm id="waitlist-hero-form" variant="light" source="hero" />
            <p className="text-sm text-muted-foreground">
              Be first when we launch. No spam.
            </p>
          </div>
        </div>

        <div className="landing-hero__media relative h-[230px] sm:h-[320px] lg:h-auto lg:min-h-full">
          <img
            src={landingAssets.heroImgBg}
            alt="Rent cars, bikes, electronics, and furniture on Arentzo"
            className="landing-hero__image absolute inset-0 size-full object-contain object-center lg:object-right"
          />
        </div>
      </div>
    </section>
  );
}
