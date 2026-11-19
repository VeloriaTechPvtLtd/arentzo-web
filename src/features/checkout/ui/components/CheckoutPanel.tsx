'use client';

import { useEffect } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/shared/hooks/useCart';
import { CheckoutHeader } from './CheckoutHeader';
import '../styles/Checkout.css';

interface CheckoutPanelProps { isOpen: boolean; onClose: () => void; }

export const CheckoutPanel: React.FC<CheckoutPanelProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart } = useCart();
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <div className={`checkout-overlay ${isOpen ? 'checkout-overlay--open' : ''}`}>
      <button className="checkout-overlay__backdrop" onClick={onClose} aria-label="Close cart" />
      <section className="checkout-panel" role="dialog" aria-modal="true" aria-labelledby="cart-preview-title">
        <CheckoutHeader onBack={onClose} title="Cart preview" showShare={false} />
        <div className="checkout-panel__content px-5 py-4">
          <p className="mb-5 rounded-xl border border-border bg-muted p-4 text-sm text-muted-foreground" role="status">
            This guest cart is saved on this device. Prices are display-only; booking and payment are unavailable in this preview, and no order will be placed.
          </p>
          {items.length ? <ul className="space-y-4">{items.map(({ id, product, quantity }) => (
            <li key={id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
              <img src={product.image} alt="" className="size-16 rounded-lg object-cover bg-muted" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-semibold text-foreground">{product.name}</h2>
                <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString('en-IN')} per day</p>
                <div className="mt-2 flex items-center gap-3">
                  <button className="rounded border border-border p-1" aria-label={`Decrease ${product.name} quantity`} onClick={() => updateQuantity(id, quantity - 1)}><Minus size={14} /></button>
                  <span aria-label="Quantity">{quantity}</span>
                  <button className="rounded border border-border p-1" aria-label={`Increase ${product.name} quantity`} onClick={() => updateQuantity(id, quantity + 1)}><Plus size={14} /></button>
                  <button className="ml-auto rounded p-1 text-destructive" aria-label={`Remove ${product.name}`} onClick={() => removeFromCart(id)}><Trash2 size={16} /></button>
                </div>
              </div>
            </li>
          ))}</ul> : <p className="py-12 text-center text-muted-foreground">Your cart is empty. Browse listings to add items.</p>}
        </div>
        <footer className="border-t border-border p-5">
          <button className="w-full rounded-xl bg-muted px-4 py-3 font-semibold text-muted-foreground" disabled aria-disabled="true">Checkout unavailable</button>
        </footer>
      </section>
    </div>
  );
};
