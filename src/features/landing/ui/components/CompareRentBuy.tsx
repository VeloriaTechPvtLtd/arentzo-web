import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const rows = [
  {
    feature: 'Upfront cost',
    renting: 'Pay only for what you use',
    buying: 'Large cash outlay upfront',
  },
  {
    feature: 'Maintenance',
    renting: 'Handled by the provider',
    buying: 'Your time and your money',
  },
  {
    feature: 'Flexibility',
    renting: 'Change or upgrade anytime',
    buying: 'Stuck with what you own',
  },
  {
    feature: 'Storage',
    renting: 'No long-term storage needed',
    buying: 'Needs space at home',
  },
  {
    feature: 'Depreciation',
    renting: 'Not your problem',
    buying: 'Value drops every year',
  },
  {
    feature: 'Variety',
    renting: 'Try many products easily',
    buying: 'Limited to one purchase',
  },
] as const;

export function CompareRentBuy() {
  return (
    <section className="landing-section-compare px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            Comparison
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Compare{' '}
            <span className="text-primary">Renting</span>
            {' '}vs{' '}
            <span className="text-destructive">Buying</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            One clear look at why renting wins for most people.
          </p>
        </div>

        {/* Mobile scorecard — one surface, two columns, scan in seconds */}
        <div className="mt-8 md:hidden">
          <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-card shadow-sm">
            {/* Column headers */}
            <div className="grid grid-cols-2 border-b border-border/70">
              <div className="bg-secondary/70 px-3 py-4 text-center">
                <p className="text-sm font-bold text-primary">Renting</p>
                <p className="mt-0.5 text-[10px] font-semibold tracking-wide text-primary/80 uppercase">
                  Recommended
                </p>
              </div>
              <div className="flex items-center justify-center bg-muted/40 px-3 py-4 text-center">
                <p className="text-sm font-semibold text-muted-foreground">
                  Buying
                </p>
              </div>
            </div>

            {/* Rows */}
            <ul className="divide-y divide-border/60">
              {rows.map((row) => (
                <li key={row.feature}>
                  <p className="bg-muted/25 px-3 py-1.5 text-center text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
                    {row.feature}
                  </p>
                  <div className="grid grid-cols-2">
                    <div className="flex gap-2 border-r border-border/50 bg-secondary/20 px-3 py-3.5">
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-primary"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <p className="text-[13px] leading-snug font-medium text-foreground">
                        {row.renting}
                      </p>
                    </div>
                    <div className="flex gap-2 px-3 py-3.5">
                      <X
                        className="mt-0.5 size-3.5 shrink-0 text-destructive/70"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <p className="text-[13px] leading-snug text-muted-foreground">
                        {row.buying}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Verdict */}
            <div className="border-t border-border/70 bg-secondary/40 px-4 py-3.5 text-center">
              <p className="text-sm font-semibold text-foreground">
                Renting fits most everyday needs better.
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Same access. Far less lock-in.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop / tablet: table */}
        <div className="landing-surface mt-10 hidden overflow-x-auto border border-border/80 shadow-md md:!block">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="bg-muted px-4 py-4 font-semibold text-foreground sm:px-5">
                  Feature
                </th>
                <th className="bg-secondary px-4 py-4 font-semibold text-primary sm:px-5">
                  Renting with Arentzo
                </th>
                <th className="bg-destructive/10 px-4 py-4 font-semibold text-destructive sm:px-5">
                  Buying
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(i % 2 === 0 ? 'bg-card' : 'bg-muted/40')}
                >
                  <td className="px-5 py-4 font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <span className="inline-flex items-start gap-2">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden
                      />
                      {row.renting}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <span className="inline-flex items-start gap-2">
                      <X
                        className="mt-0.5 size-4 shrink-0 text-destructive"
                        aria-hidden
                      />
                      {row.buying}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
