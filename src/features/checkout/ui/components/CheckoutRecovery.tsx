'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';
import { createCheckoutRecovery } from '../../infrastructure/checkoutRecovery.mjs';

const copy: Record<string,string> = {
  pending: 'Booking completion is not confirmed yet. Your cart has not been cleared. Do not pay again while this is being resolved.',
  completed: 'The server has confirmed this transaction’s booking result. Open My rentals to review it. This check did not change your cart.',
  not_completed: 'This payment attempt is marked unsuccessful. No booking confirmation is inferred and your cart is unchanged.',
  refund_pending: 'Payment was received but no booking was completed. A refund is pending. Do not pay again for this attempt.',
  refunded: 'The server records this attempt as refunded with no completed booking. Your cart is unchanged.',
};
function StatusForm({owner}:{owner:string}) {
  const [reference,setReference]=useState('');
  const [state,setState]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const version=useRef(0),locked=useRef(false);
  useEffect(()=>()=>{version.current++;},[]);
  async function check(event:React.FormEvent) {
    event.preventDefault();if(locked.current)return;
    locked.current=true;const token=++version.current;setBusy(true);setState('');setError('');
    try {
      const result=await createCheckoutRecovery(getSupabaseClient(),owner,process.env.SUPABASE_URL).check(reference);
      if(token===version.current)setState(result.state);
    } catch(e) {if(token===version.current)setError(e instanceof Error?e.message:'Unable to check this transaction.');}
    finally {locked.current=false;if(token===version.current)setBusy(false);}
  }
  return <details className="mt-4 rounded-xl border border-border p-3">
    <summary className="cursor-pointer font-medium">Check an existing transaction</summary>
    <p className="my-3 text-sm text-muted-foreground">Rental Dev status lookup only. This does not charge, resume payment, place an order or clear your cart.</p>
    <form onSubmit={check} className="grid gap-3">
      <label className="text-sm">Transaction reference<input className="mt-1 block w-full rounded border border-border bg-background p-2" value={reference} onChange={e=>{setReference(e.target.value);setState('');setError('');}} maxLength={128} autoComplete="off" spellCheck={false} disabled={busy} required /></label>
      <button type="submit" className="rounded border border-border p-2" disabled={busy||!reference.trim()}>{busy?'Checking status…':'Check status only'}</button>
    </form>
    {error?<p role="alert" className="mt-3 text-sm text-destructive">{error}</p>:null}
    {state?<p role="status" className="mt-3 text-sm">{copy[state]}</p>:null}
    {state==='completed'?<Link className="mt-3 inline-block text-primary underline" href="/my-rentals">Open My rentals</Link>:null}
  </details>;
}
export function CheckoutRecovery(){
  const {user}=useAuth();
  if(!user?.id||process.env.SUPABASE_URL!=='https://astiltnwyoxtcisedcyx.supabase.co')return null;
  return <StatusForm key={user.id} owner={user.id}/>;
}
