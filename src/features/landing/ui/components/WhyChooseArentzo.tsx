import {
  CalendarDays,
  Headphones,
  ShieldCheck,
  Tag,
} from 'lucide-react';

const benefits = [
  {
    title: 'Verified & Trusted',
    description:
      'Every provider and product is checked so you can rent with confidence.',
    icon: ShieldCheck,
  },
  {
    title: 'Best Prices',
    description:
      'Flexible day, week, or month plans — transparent pricing, no surprises.',
    icon: Tag,
  },
  {
    title: 'Flexible Rentals',
    description:
      'Need it for a weekend or a month? Change or upgrade whenever you want.',
    icon: CalendarDays,
  },
  {
    title: 'Always Supported',
    description:
      'Secure payments and 24/7 help whenever something comes up.',
    icon: Headphones,
  },
] as const;

export function WhyChooseArentzo() {
  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Benefits
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Why choose <span className="text-primary">Arentzo</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Renting made simple, safe, and smart.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="text-center sm:text-left">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-primary sm:mx-0">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
