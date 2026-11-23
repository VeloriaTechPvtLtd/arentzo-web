'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../../infrastructure/api/productsMockData';

interface ProductDetailsDrawerProps { product: Product; onClose: () => void; }

export function ProductDetailsDrawer({ product, onClose }: ProductDetailsDrawerProps) {
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if(event.key === 'Escape') onClose(); }; document.addEventListener('keydown', onKey); return () => document.removeEventListener('keydown', onKey); }, [onClose]);
  return (
    <div className="provider-drawer-overlay provider-drawer-overlay--open">
      <button className="provider-drawer-overlay__backdrop" onClick={onClose} aria-label="Close listing details" />
      <section className="provider-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="provider-listing-title">
        <header className="provider-drawer-panel__header">
          <h2 id="provider-listing-title">Listing details</h2>
          <button className="provider-drawer-panel__back" onClick={onClose} aria-label="Close"><X size={22} /></button>
        </header>
        <div className="provider-drawer-panel__content p-5">
          <img src={product.image} alt={product.name} className="max-h-64 w-full rounded-2xl bg-muted object-cover" />
          <h3 className="mt-5 text-xl font-bold">{product.name}</h3>
          <dl className="mt-4 space-y-3 rounded-2xl border border-border bg-card p-4 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Status</dt><dd className="capitalize">{(product.sourceStatus || product.status).replaceAll('_', ' ')}</dd></div>
            <div className="flex justify-between gap-4"><dt>Verification</dt><dd>{product.verificationStatus}</dd></div>
            <div className="flex justify-between gap-4"><dt>Visibility</dt><dd>{product.visibility}</dd></div>
            <div className="flex justify-between gap-4"><dt>Enabled</dt><dd>{product.activeFlag == null ? 'Unknown' : product.activeFlag ? 'Yes' : 'No'}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Condition</dt><dd className="capitalize">{product.condition.replaceAll('_', ' ')}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Daily rate</dt><dd>{product.hasDailyRate === false ? 'Not set' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: product.currency || 'INR' }).format(product.price)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Available quantity</dt><dd>{product.stock}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Views</dt><dd>{product.views}</dd></div>
          </dl>
          <p role="status" className="mt-4 rounded-xl border border-border bg-muted p-4 text-sm text-muted-foreground">Editing, availability changes, and listing creation are unavailable until provider-write workflows are verified.</p>
        </div>
      </section>
    </div>
  );
}
