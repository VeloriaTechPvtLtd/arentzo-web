'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import { RentalService } from '../../application/services/RentalService';
import { SupabaseRentalRepository } from '../../infrastructure/SupabaseRentalRepository';
import type { Rental } from '../../domain/entities';
import { mergeRentals } from '../../domain/rentalPage.js';
import { requestWithTimeout } from '@/features/catalog/domain/requestWithTimeout';
const service = new RentalService(new SupabaseRentalRepository());
type State = { key: string; items: Rental[]; nextOffset: number | null; loading: boolean; error: boolean };
export function useCustomerRentals(rentalId?: string) {
  const { user } = useAuth();
  const userId = user?.id;
  const key = JSON.stringify([userId, rentalId]);
  const [state, setState] = useState<State>({ key: '', items: [], nextOffset: null, loading: false, error: false });
  const epoch = useRef(0);
  const busy = useRef(false);
  const run = useCallback(async (offset = 0) => {
    if (!userId || busy.current) return;
    busy.current = true;
    const generation = ++epoch.current;
    setState(old => ({ key, items: offset && old.key === key ? old.items : [], nextOffset: offset || null, loading: true, error: false }));
    try {
      const page = await requestWithTimeout(() => rentalId
        ? service.getForCustomer(userId, rentalId).then(item => ({ items: item ? [item] : [], nextOffset: null }))
        : service.listForCustomer(userId, offset), 15000);
      if (generation !== epoch.current) return;
      setState(old => ({ key, items: offset ? mergeRentals(old.items, page.items) : page.items, nextOffset: page.nextOffset, loading: false, error: false }));
    } catch {
      if (generation === epoch.current) setState(old => ({ ...old, loading: false, error: true }));
    } finally {
      if (generation === epoch.current) busy.current = false;
    }
  }, [userId, rentalId, key]);
  const invalidate = useCallback(() => { epoch.current++; busy.current = false; }, []);
  useEffect(() => {
    busy.current = false;
    void run();
    return invalidate;
  }, [run, invalidate]);
  const fresh = Boolean(userId) && state.key === key;
  return {
    rentals: fresh ? state.items : [],
    loading: Boolean(userId) && (!fresh || state.loading),
    error: fresh && state.error,
    hasMore: fresh && state.nextOffset !== null,
    retry: () => void run(fresh ? state.nextOffset ?? 0 : 0),
    loadMore: () => { if (fresh && state.nextOffset !== null) void run(state.nextOffset); },
  };
}
