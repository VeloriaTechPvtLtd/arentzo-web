'use client';

import { X } from 'lucide-react';
import type { Order } from '../../infrastructure/api/ordersMockData';

interface OrderDetailsDrawerProps { order: Order; onClose: () => void; }

function displayDate(value: string): string {
  if (!value) return 'Not provided';
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? 'Not provided' : date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

export function OrderDetailsDrawer({ order, onClose }: OrderDetailsDrawerProps) {
  return (
    <div className="provider-drawer-overlay provider-drawer-overlay--open">
      <button className="provider-drawer-overlay__backdrop" onClick={onClose} aria-label="Close booking details" />
      <section className="provider-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="provider-booking-title">
        <header className="provider-drawer-panel__header">
          <h2 id="provider-booking-title">Booking details</h2>
          <button className="provider-drawer-panel__back" onClick={onClose} aria-label="Close"><X size={22} /></button>
        </header>
        <div className="provider-drawer-panel__content p-5">
          <article className="rounded-2xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Booking reference</p>
            <p className="font-semibold">{order.id}</p>
            <p className="mt-3 text-xs text-muted-foreground">Status</p>
            <p className="font-semibold capitalize">{order.rentalStatus.replaceAll('_', ' ')}</p>
          </article>
          <article className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
            <img src={order.image} alt="" className="size-16 rounded-xl bg-muted object-cover" />
            <div><h3 className="font-semibold">{order.productName}</h3><p className="text-sm text-muted-foreground">Quantity: {order.quantity}</p></div>
          </article>
          <dl className="mt-4 space-y-3 rounded-2xl border border-border bg-card p-4 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Customer</dt><dd>{order.customerName}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Rental starts</dt><dd className="text-right">{displayDate(order.startDate)}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Rental ends</dt><dd className="text-right">{displayDate(order.returnDate)}</dd></div>
            <div className="flex justify-between gap-4 border-t border-border pt-3"><dt className="text-muted-foreground">Booking total</dt><dd>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: order.currency || 'INR' }).format(order.totalAmount)}</dd></div>
          </dl>
          <p role="status" className="mt-4 rounded-xl border border-border bg-muted p-4 text-sm text-muted-foreground">Booking status changes and handover verification are disabled until the corresponding server workflows are verified.</p>
        </div>
      </section>
    </div>
  );
}
