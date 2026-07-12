const partners = [
  'Stripe',
  'PayPal',
  'Google Maps',
  'Visa',
  'Mastercard',
  'McAfee',
] as const;

export function TrustLogosBar() {
  return (
    <section className="border-y border-border/50 bg-card/30 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-sm font-medium text-muted-foreground sm:text-base">
          Trusted by Thousands.{' '}
          <span className="font-semibold text-foreground">Backed by the Best.</span>
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-45 grayscale">
          {partners.map((name) => (
            <span
              key={name}
              className="text-sm font-bold tracking-wider text-foreground uppercase sm:text-base"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
