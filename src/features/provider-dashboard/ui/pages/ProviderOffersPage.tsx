'use client';

import React, { useMemo, useState } from 'react';
import { Filter, Plus, Search } from 'lucide-react';
import { useProviderOffers } from '../hooks/useProviderRecords';
import '../styles/ProviderOffersPage.css';

function dateLabel(value: string): string {
  if (!value) return 'Not set';
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? 'Not set' : date.toLocaleDateString('en-IN', { dateStyle: 'medium' });
}

export const ProviderOffersPage: React.FC = () => {
  const { items: offers, loading, error } = useProviderOffers();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const filtered = useMemo(() => offers.filter((offer) => {
    const query = search.toLowerCase();
    return (!query || offer.title.toLowerCase().includes(query) || offer.code.toLowerCase().includes(query)) && (status === 'all' || offer.status === status);
  }), [offers, search, status]);

  return (
    <section className="provider-offers-page">
      <div className="offers-toolbar">
        <label className="search-wrapper"><Search size={18} /><span className="sr-only">Search offers</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by title or code" /></label>
        <div className="filters-wrapper">
          <label className="filter-select"><Filter size={18} /><span className="sr-only">Filter offer status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All status</option><option value="active">Active</option><option value="scheduled">Scheduled</option><option value="expired">Expired</option><option value="draft">Draft</option><option value="paused">Paused</option></select></label>
          <button className="create-offer-btn" disabled title="Provider offer writes are awaiting backend verification"><Plus size={18} /><span>Create offer unavailable</span></button>
        </div>
      </div>
      <p role="status" className="mb-4 text-sm text-muted-foreground">Offer usage and status are read from provider listings. Creating, pausing, and deleting offers are disabled until their server workflows are verified.</p>
      {loading ? <p role="status">Loading your offers…</p> : null}
      {error ? <p role="alert">We couldn’t load your offers. Refresh and try again.</p> : null}
      {!loading && !error && filtered.length ? <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((offer) => (
        <article key={offer.id} className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
          <div className="flex items-start justify-between gap-3"><div><h2 className="font-bold">{offer.title}</h2><p className="mt-1 text-sm text-muted-foreground">{offer.code || 'No code'}</p></div><span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold capitalize text-secondary-foreground">{offer.status}</span></div>
          <p className="mt-4 text-lg font-semibold">{offer.discountType === 'percentage' ? `${offer.discountValue}% off` : `₹${offer.discountValue.toLocaleString('en-IN')} off`}</p>
          <dl className="mt-4 space-y-2 text-sm"><div className="flex justify-between gap-3"><dt className="text-muted-foreground">Valid from</dt><dd>{dateLabel(offer.startDate)}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">Valid until</dt><dd>{dateLabel(offer.endDate)}</dd></div><div className="flex justify-between gap-3"><dt className="text-muted-foreground">Recorded uses</dt><dd>{offer.usageCount}</dd></div></dl>
        </article>
      ))}</div> : null}
      {!loading && !error && filtered.length === 0 ? <div className="no-results"><p>{offers.length ? 'No offers match your filters.' : 'No offers are associated with this provider.'}</p></div> : null}
    </section>
  );
};
