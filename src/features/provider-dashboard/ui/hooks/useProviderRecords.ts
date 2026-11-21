'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import { ProviderService } from '../../application/services/ProviderService';
import { SupabaseProviderRepository } from '../../infrastructure/SupabaseProviderRepository';
import type { Order } from '../../infrastructure/api/ordersMockData';
import type { Product } from '../../infrastructure/api/productsMockData';
import type { Offer } from '../../infrastructure/api/offersMockData';

const service = new ProviderService(new SupabaseProviderRepository());

type RecordsState<T> = { items: T[]; loading: boolean; error: boolean; retry: () => void };

function useRecords(kind: 'products' | 'orders' | 'offers') {
  const { user } = useAuth();
  const providerId = user?.providerId || '';
  const [attempt, setAttempt] = useState(0);
  const requestKey = JSON.stringify([user?.id, providerId, kind, attempt]);
  const [state, setState] = useState<{ ownerId: string; items: (Product | Order | Offer)[]; error: boolean }>({ ownerId: '', items: [], error: false });
  useEffect(() => {
    if (!providerId) return;
    let active = true;
    const request = kind === 'products' ? service.getProducts(providerId) : kind === 'orders' ? service.getOrders(providerId) : service.getOffers(providerId);
    void request.then((items) => { if (active) setState({ ownerId: requestKey, items, error: false }); })
      .catch(() => { if (active) setState({ ownerId: requestKey, items: [], error: true }); });
    return () => { active = false; };
  }, [kind, providerId, requestKey]);
  const ready = state.ownerId === requestKey && Boolean(providerId);
  return { retry: () => setAttempt(value => value + 1), items: ready ? state.items : [], loading: Boolean(providerId) && !ready, error: Boolean(user && user.role === 'service_provider' && !providerId) || (ready && state.error) };
}

export function useProviderProducts(): RecordsState<Product> {
  const result = useRecords('products');
  return { ...result, items: result.items as Product[] };
}
export function useProviderOrders(): RecordsState<Order> {
  const result = useRecords('orders');
  return { ...result, items: result.items as Order[] };
}
export function useProviderOffers(): RecordsState<Offer> {
  const result = useRecords('offers');
  return { ...result, items: result.items as Offer[] };
}
