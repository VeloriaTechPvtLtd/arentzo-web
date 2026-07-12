import { Ban, Mail } from 'lucide-react';
import { landingAssets } from '../assets';
import { WaitlistForm } from './WaitlistForm';

export function EarlyAccessBanner() {
  return (
    <section className="bg-background px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="landing-surface relative mx-auto flex w-full max-w-7xl flex-col gap-5 overflow-hidden bg-foreground px-4 py-6 shadow-xl sm:gap-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-12">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-32 opacity-20 sm:w-48 sm:opacity-25"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(circle, color-mix(in oklch, var(--background) 40%, transparent) 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />

        <div className="relative z-[1] flex w-full min-w-0 flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left lg:flex-1">
          <img
            src={landingAssets.giftBox}
            alt=""
            className="h-16 w-16 shrink-0 object-contain drop-shadow-lg sm:h-20 sm:w-20 lg:h-28 lg:w-28"
          />
          <div className="min-w-0 w-full sm:w-auto sm:flex-1">
            <h2 className="text-xl font-bold tracking-tight text-background sm:text-2xl lg:text-3xl">
              Don&apos;t Miss Out!
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-background/65 sm:max-w-md sm:text-base">
              Join the waitlist for launch discounts, early access, and exclusive
              member perks.
            </p>
          </div>
        </div>

        <div className="relative z-[1] w-full min-w-0 lg:max-w-md lg:shrink-0">
          <WaitlistForm
            id="waitlist-banner-form"
            variant="dark"
            source="early-access-banner"
          />
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] text-background/45 sm:justify-start">
            <span className="inline-flex items-center gap-1.5">
              <Ban className="size-3 shrink-0" aria-hidden />
              No spam, ever
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-3 shrink-0" aria-hidden />
              Unsubscribe anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
