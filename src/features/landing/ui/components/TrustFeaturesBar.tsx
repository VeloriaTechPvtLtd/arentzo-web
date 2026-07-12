import {
  CalendarCheck,
  ShieldCheck,
  Tag,
} from 'lucide-react';

const features = [
  { title: 'Verified providers', icon: ShieldCheck },
  { title: 'Flexible pricing', icon: Tag },
  { title: 'Book in minutes', icon: CalendarCheck },
] as const;

/** Duplicate so the marquee never shows a gap on wide screens */
const loop = [...features, ...features, ...features, ...features];

export function TrustFeaturesBar() {
  return (
    <section
      className="landing-trust-marquee border-y border-border/50 bg-card/30 py-4"
      aria-label="Why Arentzo"
    >
      <div className="landing-trust-marquee__track">
        <ul className="landing-trust-marquee__group" aria-hidden={false}>
          {loop.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <li
                key={`${feature.title}-${i}`}
                className="landing-trust-marquee__item"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="whitespace-nowrap text-sm font-medium text-foreground">
                  {feature.title}
                </span>
              </li>
            );
          })}
        </ul>
        <ul className="landing-trust-marquee__group" aria-hidden="true">
          {loop.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <li
                key={`${feature.title}-dup-${i}`}
                className="landing-trust-marquee__item"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="whitespace-nowrap text-sm font-medium text-foreground">
                  {feature.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
