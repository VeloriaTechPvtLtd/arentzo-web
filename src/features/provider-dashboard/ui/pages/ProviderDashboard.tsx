'use client';

import Link from 'next/link';
import { Package, ClipboardList, Tag } from 'lucide-react';
import { useProviderProducts, useProviderOrders, useProviderOffers } from '../hooks/useProviderRecords';
import '../styles/ProviderDashboard.css';

export function ProviderDashboard() {
  const products = useProviderProducts();
  const orders = useProviderOrders();
  const offers = useProviderOffers();
  const loading = products.loading || orders.loading || offers.loading;
  const error = products.error || orders.error || offers.error;
  const values = [
    { label: 'Listings', count: products.items.length, href: '/provider-dashboard/products', icon: Package },
    { label: 'Bookings', count: orders.items.length, href: '/provider-dashboard/orders', icon: ClipboardList },
    { label: 'Offers', count: offers.items.length, href: '/provider-dashboard/offers', icon: Tag },
  ];

  return <main className="provider-dashboard p-4 sm:p-6">
    <header className="mb-6"><h1 className="text-2xl font-bold text-foreground">Provider overview</h1><p className="mt-1 text-sm text-muted-foreground">Current records from your provider account.</p></header>
    {loading ? <p role="status">Loading provider records…</p> : null}
    {error ? <p role="alert">Some provider records could not be loaded. Refresh to retry.</p> : null}
    {!loading && !error ? <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Provider record counts">
        {values.map(({ label, count, href, icon: Icon }) => <Link key={label} href={href} className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition hover:border-primary"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">{label}</span><Icon className="size-5 text-primary" /></div><p className="mt-3 text-3xl font-bold">{count}</p></Link>)}
      </section>
      <section className="mt-6 rounded-2xl border border-border bg-card p-5"><div className="mb-3 flex items-center justify-between"><h2 className="font-bold">Recent bookings</h2><Link href="/provider-dashboard/orders" className="text-sm font-semibold text-primary">View bookings</Link></div>
        {orders.items.length ? <ul className="divide-y divide-border">{orders.items.slice(0, 5).map((order) => <li key={order.id} className="flex items-center justify-between gap-4 py-3"><div className="min-w-0"><p className="truncate font-medium">{order.productName}</p><p className="text-sm text-muted-foreground">{order.id}</p></div><span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-semibold capitalize text-secondary-foreground">{order.rentalStatus}</span></li>)}</ul> : <p className="text-sm text-muted-foreground">No bookings are visible for this provider.</p>}
      </section>
      <p role="status" className="mt-5 rounded-xl border border-border bg-muted p-4 text-sm text-muted-foreground">Booking approvals, handovers, payments, and earnings reports are unavailable until the matching server workflows are verified.</p>
    </> : null}
  </main>;
}
