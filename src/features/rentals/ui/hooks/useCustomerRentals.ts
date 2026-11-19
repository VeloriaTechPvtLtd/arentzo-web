'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import { RentalService } from '../../application/services/RentalService';
import { SupabaseRentalRepository } from '../../infrastructure/SupabaseRentalRepository';

const service = new RentalService(new SupabaseRentalRepository());

export function useCustomerRentals(rentalId?: string) {
  const { user } = useAuth();
  const [result, setResult] = useState<{ ownerId: string | null; items: import('../../domain/entities').Rental[]; error: boolean }>({ ownerId: null, items: [], error: false });
  const userId = user?.id;
  const request = useMemo(() => ({ userId, rentalId }), [userId, rentalId]);

  useEffect(() => {
    if (!request.userId) return;
    let active = true;
    const operation = request.rentalId
      ? service.getForCustomer(request.userId, request.rentalId).then((item) => item ? [item] : [])
      : service.listForCustomer(request.userId);
    void operation.then((items) => { if (active) setResult({ ownerId: request.userId!, items, error: false }); })
      .catch(() => { if (active) setResult({ ownerId: request.userId!, items: [], error: true }); });
    return () => { active = false; };
  }, [request]);

  const hasFreshResult = Boolean(userId) && result.ownerId === userId;
  return { rentals: hasFreshResult ? result.items : [], loading: Boolean(userId) && !hasFreshResult, error: hasFreshResult && result.error };
}
