import { useState, type FC } from 'react';
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  ListPlus,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UserPlus,
  Wallet,
  Package,
  IndianRupee,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { WaitlistPageShell } from '../../../landing/ui/components/WaitlistPageShell';
import { WaitlistForm } from '../../../landing/ui/components/WaitlistForm';
import '../../../landing/ui/landing.css';

const BENEFITS: { key: string; icon: LucideIcon; iconClass: string }[] = [
  {
    key: 'listing',
    icon: ListPlus,
    iconClass: 'bg-secondary text-primary',
  },
  {
    key: 'pricing',
    icon: TrendingUp,
    iconClass: 'bg-muted text-chart-5',
  },
  {
    key: 'dashboard',
    icon: LayoutDashboard,
    iconClass: 'bg-accent/40 text-accent-foreground',
  },
  {
    key: 'protection',
    icon: ShieldCheck,
    iconClass: 'bg-secondary text-chart-4',
  },
  {
    key: 'payments',
    icon: Wallet,
    iconClass: 'bg-muted text-primary',
  },
  {
    key: 'verification',
    icon: UserCheck,
    iconClass: 'bg-secondary text-chart-5',
  },
];

const STEPS: { key: string; step: string; icon: LucideIcon; iconClass: string }[] =
  [
    {
      key: 'register',
      step: '01',
      icon: UserPlus,
      iconClass: 'bg-secondary text-primary',
    },
    {
      key: 'list',
      step: '02',
      icon: Package,
      iconClass: 'bg-muted text-chart-5',
    },
    {
      key: 'earn',
      step: '03',
      icon: IndianRupee,
      iconClass: 'bg-accent/40 text-accent-foreground',
    },
  ];

const EARNING_KEYS = [
  'cameras',
  'vehicles',
  'electronics',
  'events',
  'tools',
  'fashion',
] as const;

const FAQ_KEYS = [
  'fees',
  'items',
  'damage',
  'cancellation',
  'tax',
] as const;

function scrollToProviderWaitlist() {
  document
    .getElementById('provider-waitlist')
    ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export const SellerPage: FC = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<string | null>('fees');

  return (
    <WaitlistPageShell>
      <main>
        {/* Hero */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
          style={{
            background:
              'linear-gradient(180deg, #fefefe 0%, color-mix(in oklch, var(--secondary) 35%, var(--background)) 100%)',
          }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              {t('seller.hero.eyebrow')}
            </p>
            <p className="mt-3 text-sm font-bold tracking-tight text-foreground sm:text-base">
              {t('seller.hero.brand')}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.08]">
              {t('seller.hero.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t('seller.hero.subtitle')}
            </p>
            <Button
              type="button"
              size="lg"
              className="mt-8 h-12 px-8 font-semibold"
              onClick={scrollToProviderWaitlist}
            >
              {t('seller.hero.cta')}
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                {t('seller.benefits.eyebrow')}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {t('seller.benefits.title')}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                {t('seller.benefits.subtitle')}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              {BENEFITS.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="text-left">
                    <span
                      className={cn(
                        'flex size-12 items-center justify-center rounded-full shadow-xs',
                        item.iconClass,
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                      {t(`seller.benefits.items.${item.key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`seller.benefits.items.${item.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="landing-section-muted px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
              <div className="max-w-sm shrink-0">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                  {t('seller.steps.eyebrow')}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                  {t('seller.steps.title')}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {t('seller.steps.subtitle')}
                </p>
                <Button
                  type="button"
                  variant="link"
                  className="mt-4 h-auto px-0 font-semibold text-primary"
                  onClick={scrollToProviderWaitlist}
                >
                  {t('seller.hero.cta')}
                </Button>
              </div>

              <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
                {STEPS.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      className="relative flex flex-col items-start"
                    >
                      {index < STEPS.length - 1 ? (
                        <div
                          className="pointer-events-none absolute top-8 left-[calc(50%+28px)] hidden h-px w-[calc(100%-28px)] border-t border-dashed border-border sm:block"
                          aria-hidden
                        />
                      ) : null}
                      <span
                        className={cn(
                          'flex size-14 items-center justify-center rounded-full shadow-xs',
                          item.iconClass,
                        )}
                      >
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <p className="mt-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Step {item.step}
                      </p>
                      <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground">
                        {t(`seller.steps.items.${item.key}.title`)}
                      </h3>
                      <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                        {t(`seller.steps.items.${item.key}.description`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="landing-section-compare px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                {t('seller.earnings.eyebrow')}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {t('seller.earnings.title')}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                {t('seller.earnings.subtitle')}
              </p>
            </div>

            <ul className="mx-auto mt-10 max-w-3xl divide-y divide-border/70 border-y border-border/70">
              {EARNING_KEYS.map((key) => (
                <li
                  key={key}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-sm font-semibold tracking-tight text-foreground sm:text-[15px]">
                    {t(`seller.earnings.items.${key}.category`)}
                  </span>
                  <span className="text-sm font-medium text-primary tabular-nums">
                    {t(`seller.earnings.items.${key}.range`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                {t('seller.faq.eyebrow')}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {t('seller.faq.title')}
              </h2>
            </div>

            <div className="mt-8 space-y-3">
              {FAQ_KEYS.map((key) => {
                const open = openFaq === key;
                return (
                  <div
                    key={key}
                    className="overflow-hidden rounded-[1.25rem] border border-border/80 bg-card shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : key)}
                      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/40"
                    >
                      <span className="text-sm font-semibold tracking-tight text-foreground sm:text-[15px]">
                        {t(`seller.faq.items.${key}.question`)}
                      </span>
                      {open ? (
                        <ChevronUp className="size-5 shrink-0 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="size-5 shrink-0 text-muted-foreground" />
                      )}
                    </button>
                    {open ? (
                      <div className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                        {t(`seller.faq.items.${key}.answer`)}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section
          id="provider-waitlist"
          className="bg-background px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14"
        >
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
            <div className="relative z-[1] min-w-0 w-full flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold tracking-tight text-background sm:text-2xl lg:text-3xl">
                {t('seller.cta.title')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-background/65 sm:max-w-md sm:text-base">
                {t('seller.cta.description')}
              </p>
            </div>
            <div className="relative z-[1] w-full min-w-0 lg:max-w-md lg:shrink-0">
              <WaitlistForm
                id="seller-waitlist-form"
                variant="dark"
                source="seller-page"
              />
            </div>
          </div>
        </section>
      </main>
    </WaitlistPageShell>
  );
};
