'use client';

import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  CreditCard,
  Gift,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    step: '01',
    title: 'Discover',
    description: 'Search and find the perfect item you need.',
    icon: Search,
    iconClass: 'bg-secondary text-primary',
  },
  {
    step: '02',
    title: 'Book',
    description: 'Choose your dates and book instantly.',
    icon: CalendarDays,
    iconClass: 'bg-muted text-chart-5',
  },
  {
    step: '03',
    title: 'Pay Securely',
    description: 'Make secure payments with multiple options.',
    icon: CreditCard,
    iconClass: 'bg-accent/40 text-accent-foreground',
  },
  {
    step: '04',
    title: 'Enjoy',
    description: 'Use the item and return when your rental ends.',
    icon: Gift,
    iconClass: 'bg-secondary text-chart-4',
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="landing-section-muted px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
          <div className="max-w-sm shrink-0">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              Simple flow
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              How It Works
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Renting on Arentzo is simple, fast, and secure — from discovery to
              return.
            </p>
            <Link
              href="/about-us"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Learn More
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-5">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative flex flex-col items-start">
                  {index < steps.length - 1 ? (
                    <div
                      className="pointer-events-none absolute top-8 left-[calc(50%+28px)] hidden h-px w-[calc(100%-28px)] border-t border-dashed border-border lg:block"
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
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
