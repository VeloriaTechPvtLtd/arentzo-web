'use client';

import Link from 'next/link';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';

const earningsData = [
  { month: 'Jan', earnings: 35000 },
  { month: 'Feb', earnings: 48000 },
  { month: 'Mar', earnings: 42000 },
  { month: 'Apr', earnings: 61000 },
  { month: 'May', earnings: 57000 },
  { month: 'Jun', earnings: 76000 },
  { month: 'Jul', earnings: 73000 },
  { month: 'Aug', earnings: 91000 },
  { month: 'Sep', earnings: 81000 },
  { month: 'Oct', earnings: 106000 },
  { month: 'Nov', earnings: 98000 },
  { month: 'Dec', earnings: 118000 },
];

function formatInr(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function formatInrCompact(value: number) {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(value % 100000 === 0 ? 0 : 1)}L`;
  }
  if (value >= 1000) {
    return `₹${Math.round(value / 1000)}k`;
  }
  return formatInr(value);
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-full border border-border bg-background px-3 py-1.5 text-xs shadow-xs">
      <span className="font-medium text-muted-foreground">{label}</span>
      <span className="ml-2 font-semibold text-foreground">
        {formatInr(payload[0].value)}
      </span>
    </div>
  );
}

export function ProviderCTA() {
  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">
            For Providers
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            List once. Get booked. Get paid.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Turn idle cars, bikes, gadgets, or furniture into income. You control
            availability — Arentzo brings verified renters to you.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-foreground">
            {[
              'List in minutes with photos and pricing',
              'Approve bookings on your schedule',
              'Payouts land in your account securely',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="w-full rounded-full font-semibold shadow-sm sm:w-auto">
              <Link href="/seller">Become a Provider</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-border bg-card font-semibold shadow-xs sm:w-auto"
            >
              <Link href="/resources">See how it works</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full min-w-0 max-w-lg">
          <div className="landing-surface border border-border bg-card/80 p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">
                  Provider earnings
                </p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  ₹10,48,000
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  <TrendingUp className="size-3.5 shrink-0" aria-hidden />
                  +24% vs last year
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-primary">
                12 months
              </span>
            </div>

            <div className="mt-4 h-44 w-full min-w-0 sm:mt-6 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={earningsData}
                  margin={{ top: 8, right: 4, left: -28, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="providerEarningsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="var(--primary)"
                        stopOpacity={0.22}
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="var(--border)"
                    strokeDasharray="4 4"
                    vertical={false}
                    strokeOpacity={0.7}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    interval="preserveStartEnd"
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                    dy={6}
                  />
                  <YAxis
                    width={42}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                    tickFormatter={(v) => formatInrCompact(v)}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--border)' }} />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    name="Earnings"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    fill="url(#providerEarningsFill)"
                    activeDot={{
                      r: 5,
                      fill: 'var(--primary)',
                      stroke: 'var(--card)',
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
