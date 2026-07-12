import { landingAssets } from '../assets';
import { WaitlistForm } from './WaitlistForm';

export function WaitlistHero() {
  return (
    <section className="landing-hero relative overflow-hidden">
      <div className="mx-auto grid min-h-[min(88vh,760px)] max-w-7xl lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)]">
        <div className="relative z-10 flex flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 lg:pr-12">
          <h1 className="landing-reveal max-w-lg text-[2.35rem] leading-[1.05] font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.02]">
            <span className="block text-primary">Arentzo</span>
            Everything you need, on rent.
          </h1>

          <p className="landing-reveal landing-reveal-delay-1 mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cars, bikes, electronics, furniture — from verified providers near you.
          </p>

          <div className="landing-reveal landing-reveal-delay-2 mt-8 max-w-md space-y-2">
            <WaitlistForm id="waitlist-hero-form" variant="light" source="hero" />
            <p className="text-sm text-muted-foreground">
              Be first when we launch. No spam.
            </p>
          </div>
        </div>

        <div className="landing-hero__media relative min-h-[280px] sm:min-h-[380px] lg:min-h-full">
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
