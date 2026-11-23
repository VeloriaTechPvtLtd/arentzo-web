'use client';
import { useEffect, useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/shared/hooks/useCart';
import type { CartItem } from '@/shared/types/product';
import { CheckoutRecovery } from './CheckoutRecovery';
import { CheckoutHeader } from './CheckoutHeader';
import '../styles/Checkout.css';
interface CheckoutPanelProps { isOpen: boolean; onClose: () => void; }
function localDate(value?:string){if(!value)return '';const d=new Date(value);if(!Number.isFinite(d.getTime()))return '';return new Date(d.getTime()-d.getTimezoneOffset()*60000).toISOString().slice(0,16);}
function Dates({item,disabled,onSave}:{item:CartItem;disabled:boolean;onSave:(id:string,start:string,end:string,quantity:number)=>void}){
  const [start,setStart]=useState(localDate(item.start));const [end,setEnd]=useState(localDate(item.end));
  const supported=!item.saved||item.rentalType==='daily';
  if(!supported)return <p className="text-sm">This {item.rentalType || 'unknown'} cart mode can be viewed or removed here. Use mobile to edit it.</p>;
  return <form className="mt-3 grid gap-3" onSubmit={e=>{e.preventDefault();if(!start||!end)return;onSave(item.id,new Date(start).toISOString(),new Date(end).toISOString(),item.quantity);}}>
    <label className="text-sm">Start (your local time)<input className="block w-full rounded border border-border bg-background p-2" aria-label={`Start date for ${item.product.name}`} type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} required disabled={disabled}/></label>
    <label className="text-sm">End (your local time)<input className="block w-full rounded border border-border bg-background p-2" aria-label={`End date for ${item.product.name}`} type="datetime-local" value={end} onChange={e=>setEnd(e.target.value)} required disabled={disabled}/></label>
    <button className="rounded-lg bg-primary p-2 text-primary-foreground" disabled={disabled||!start||!end||Date.parse(end)<=Date.parse(start)}>{item.saved?'Save dates':'Save to my account'}</button>
  </form>;
}
export const CheckoutPanel: React.FC<CheckoutPanelProps> = ({ isOpen, onClose }) => {
  const { items,updateQuantity,removeFromCart,signedIn,busy,error,advisory,conflicts,refresh,saveDates,checkAvailability }=useCart();
  useEffect(()=>{if(!isOpen)return;const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=old;};},[isOpen]);
  useEffect(()=>{if(!isOpen)return;const key=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key);},[isOpen,onClose]);
  if(!isOpen)return null;
  return <div className="checkout-overlay checkout-overlay--open">
    <button className="checkout-overlay__backdrop" onClick={onClose} aria-label="Close cart"/>
    <section className="checkout-panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <CheckoutHeader onBack={onClose} title={signedIn?'My cart':'Guest cart'} showShare={false}/>
      <div className="checkout-panel__content px-5 py-4">
        <h2 id="cart-title" className="sr-only">{signedIn?'My saved rental cart':'Guest cart preview'}</h2>
        <p className="mb-4 rounded-xl border border-border bg-muted p-3 text-sm">{signedIn?'Choose dates, then save items to your account. Daily rates below are reference prices only. Checkout and payment are not enabled.':'This guest cart stays on this device. Sign in to manage a saved cart; guest items are not uploaded automatically.'}</p>
        {signedIn?<button className="mb-4 rounded border border-border px-3 py-2" disabled={busy} onClick={refresh}>Reload saved cart</button>:null}
        {busy?<p role="status">Updating cart…</p>:null}
        {error?<p role="alert" className="mb-4 text-destructive">{error} Reload saved cart to confirm the result before trying another change.</p>:null}
        {advisory?<p role="status" className="mb-4">{advisory}</p>:null}
        {items.length?<ul className="space-y-4">{items.map(item=><li key={`${item.id}:${item.start}:${item.end}`} className="rounded-xl border border-border bg-card p-3">
          <div className="flex gap-3"><img src={item.product.image} alt="" className="size-16 rounded-lg object-cover"/><div className="min-w-0 flex-1"><h3 className="font-semibold">{item.product.name}</h3><p className="text-sm">{item.product.currency||'INR'} {item.product.price.toLocaleString('en-IN')} / day · reference only</p><p className="text-xs">{signedIn?item.saved?'Saved to account':'Not saved yet':'On this device'}</p></div></div>
          <div className="mt-3 flex items-center gap-3">
            <button className="rounded border p-2" aria-label={`Decrease ${item.product.name} quantity`} disabled={busy||!!error||item.quantity<=1||!!(item.saved&&item.rentalType!=='daily')} onClick={()=>updateQuantity(item.id,item.quantity-1)}><Minus size={16}/></button>
            <span aria-label="Quantity">{item.quantity}</span>
            <button className="rounded border p-2" aria-label={`Increase ${item.product.name} quantity`} disabled={busy||!!error||!!(item.saved&&item.rentalType!=='daily')} onClick={()=>updateQuantity(item.id,item.quantity+1)}><Plus size={16}/></button>
            <button className="ml-auto p-2 text-destructive" aria-label={`Remove ${item.product.name}`} disabled={busy||!!error} onClick={()=>removeFromCart(item.id)}><Trash2 size={18}/></button>
          </div>
          {conflicts.filter(conflict=>conflict.cartItemId===item.id).map((conflict,index)=><p key={index} role="status" className="mt-3 text-sm text-destructive">{conflict.message}</p>)}
          {signedIn?<Dates item={item} disabled={busy||!!error} onSave={saveDates}/>:null}
        </li>)}</ul>:<p className="py-8 text-center">Your cart is empty. Browse listings to add items.</p>}
        {signedIn?<CheckoutRecovery/>:null}
      </div>
      <footer className="border-t border-border p-5">
        {signedIn?<button className="mb-3 w-full rounded border border-border p-3" disabled={busy||!!error||!items.some(i=>i.saved)} onClick={checkAvailability}>Check saved-item availability</button>:null}
        <button className="w-full rounded-xl bg-muted p-3 text-muted-foreground" disabled>Checkout unavailable</button>
      </footer>
    </section>
  </div>;
};
