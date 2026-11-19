'use client';
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { Product, CartItem } from '../types/product';
import { CartContext } from './CartContext';
import { loadCart, saveCart } from './cartStorage.js';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import { getSupabaseClient } from '../infrastructure/supabase/client';
import { createCartRepository } from '@/features/cart/infrastructure/cartRepository.mjs';

type Row = { id: string; product_id: string; quantity: number; start_datetime?: string; end_datetime?: string; start_date?: string; end_date?: string; rental_type?: string; products?: { title?: string; daily_rate?: number; images?: string[]; currency?: string; is_active?: boolean } | null };
function mapRow(row: Row): CartItem {
  const p = row.products;
  return { id: row.id, quantity: row.quantity, saved: true, start: row.start_datetime || row.start_date, end: row.end_datetime || row.end_date, rentalType: row.rental_type,
    product: { id: row.product_id, name: p?.title || 'Rental item', image: p?.images?.[0] || '/logo.svg', price: Number(p?.daily_rate || 0), currency: p?.currency || 'INR', rating: 0, reviewCount: 0, isAvailable: p?.is_active === true } };
}
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const owner = user?.id || '';
  const [guest, setGuest] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [account, setAccount] = useState<{owner: string; items: CartItem[]}>({owner:'',items:[]});
  const [status, setStatus] = useState<{owner:string; busy:boolean; error:string; advisory:string}>({owner:'',busy:false,error:'',advisory:''});
  const generation = useRef(0);
  const lock = useRef(false);
  const items = useMemo(() => owner ? account.owner === owner ? account.items : [] : guest, [owner, account, guest]);
  const repo = useCallback(() => createCartRepository(getSupabaseClient(), owner), [owner]);
  const refresh = useCallback(async () => {
    if (!owner || lock.current) return;
    const epoch = ++generation.current;
    lock.current = true;
    setStatus({owner,busy:true,error:'',advisory:''});
    try {
      const rows = await repo().list();
      if (epoch !== generation.current) return;
      setAccount(old=>({owner,items:[...(rows as Row[]).map(mapRow),...(old.owner===owner?old.items.filter(i=>!i.saved && !(rows as Row[]).some(row=>row.id===i.id)):[])]}));
      setStatus({owner,busy:false,error:'',advisory:''});
    } catch {
      if(epoch===generation.current) setStatus({owner,busy:false,error:'Could not load your saved cart. Retry before making changes.',advisory:''});
    } finally { if(epoch===generation.current) lock.current=false; }
  },[owner,repo]);
  const invalidate = useCallback(()=>{generation.current++;lock.current=false;},[]);
  useEffect(()=>{
    setGuest(loadCart(window.localStorage)); setReady(true);
  },[]);
  useEffect(()=>{if(ready)saveCart(window.localStorage,guest);},[guest,ready]);
  useEffect(()=>{invalidate();void refresh();return invalidate;},[refresh,invalidate]);
  const modifyLocal = useCallback((fn:(items:CartItem[])=>CartItem[])=>{
    if(owner)setAccount(old=>({owner,items:fn(old.owner===owner?old.items:[])}));else setGuest(fn);
  },[owner]);
  const addToCart = useCallback((product:Product,quantity=1)=>{
    if(!Number.isSafeInteger(quantity)||quantity<1)return;
    modifyLocal(old=>{
      const draft=old.find(i=>!i.saved&&i.product.id===product.id);
      return draft?old.map(i=>i.id===draft.id?{...i,quantity:i.quantity+quantity}:i):[...old,{id:owner?crypto.randomUUID():product.id,product,quantity}];
    });
  },[modifyLocal,owner]);
  const mutate = useCallback(async (operation:()=>Promise<unknown>, after?:()=>void)=>{
    if(!owner||lock.current||status.owner===owner&&status.error)return;
    const epoch=++generation.current;lock.current=true;
    setStatus({owner,busy:true,error:'',advisory:''});
    try {
      await operation();
      if(epoch!==generation.current)return;
      after?.();
      const rows=await repo().list();
      if(epoch!==generation.current)return;
      setAccount(old=>({owner,items:[...(rows as Row[]).map(mapRow),...(old.owner===owner?old.items.filter(i=>!i.saved && !(rows as Row[]).some(row=>row.id===i.id)):[])]}));
      setStatus({owner,busy:false,error:'',advisory:''});
    } catch(e) {
      if(epoch===generation.current)setStatus({owner,busy:false,error:e instanceof Error?e.message:'Cart update failed. Reload to confirm the saved state before retrying.',advisory:''});
    } finally {if(epoch===generation.current)lock.current=false;}
  },[owner,repo,status.owner,status.error]);
  const findItem=useCallback((id:string)=>{
    const exact=items.find(i=>i.id===id); if(exact)return exact;
    const matches=items.filter(i=>i.product.id===id);
    return matches.length===1?matches[0]:undefined;
  },[items]);
  const removeFromCart=useCallback((id:string)=>{
    const item=findItem(id);if(!item)return;
    if(item.saved)void mutate(()=>repo().remove(item.id));else modifyLocal(old=>old.filter(i=>i.id!==item.id));
  },[findItem,mutate,repo,modifyLocal]);
  const updateQuantity=useCallback((id:string,quantity:number)=>{
    const item=findItem(id);if(!item||!Number.isSafeInteger(quantity)||quantity<1)return;
    if(item.saved)void mutate(()=>repo().update(item.id,{quantity}));else modifyLocal(old=>old.map(i=>i.id===item.id?{...i,quantity}:i));
  },[findItem,mutate,repo,modifyLocal]);
  const saveDates=useCallback((id:string,start:string,end:string,quantity:number)=>{
    const item=findItem(id);if(!item||!owner)return;
    void mutate(()=>item.saved?repo().update(id,{start,end,quantity}):repo().add({id:item.id,productId:item.product.id,start,end,quantity}),()=>{
      if(!item.saved)modifyLocal(old=>old.filter(i=>i.id!==item.id));
    });
  },[findItem,owner,mutate,repo,modifyLocal]);
  const checkAvailability=useCallback(async()=>{
    if(!owner||lock.current)return;
    const ids=items.filter(i=>i.saved).map(i=>i.id);if(!ids.length)return;
    const epoch=++generation.current;lock.current=true;setStatus({owner,busy:true,error:'',advisory:''});
    try{
      const result=await repo().checkAvailability(ids);
      if(epoch===generation.current)setStatus({owner,busy:false,error:'',advisory:result.available?'No conflicts reported for saved items. This is not a reservation or price guarantee.':'Saved items have availability conflicts. Review dates and quantities; nothing has been booked.'});
    }catch{if(epoch===generation.current)setStatus({owner,busy:false,error:'Availability could not be checked. Nothing has been booked.',advisory:''});}
    finally{if(epoch===generation.current)lock.current=false;}
  },[owner,items,repo]);
  const clearCart=useCallback(()=>{if(!owner)setGuest([]);},[owner]);
  const totalItems=useMemo(()=>items.reduce((n,i)=>n+i.quantity,0),[items]);
  const totalPrice=useMemo(()=>items.reduce((n,i)=>n+i.product.price*i.quantity,0),[items]);
  return <CartContext.Provider value={{items,addToCart,removeFromCart,updateQuantity,clearCart,totalItems,totalPrice,signedIn:!!owner,busy:status.owner===owner&&status.busy,error:status.owner===owner?status.error:'',advisory:status.owner===owner?status.advisory:'',refresh:()=>void refresh(),saveDates,checkAvailability:()=>void checkAvailability()}}>{children}</CartContext.Provider>;
};
