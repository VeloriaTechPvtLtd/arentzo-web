'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import type { Product } from '@/shared/types/product';
import { CatalogService } from '../../application/services/CatalogService';
import { SupabaseCatalogRepository } from '../../infrastructure/SupabaseCatalogRepository';

const service = new CatalogService(new SupabaseCatalogRepository());

export function useProductDetails(productId: string) {
  const { user } = useAuth();
  const router = useRouter();
  const [favoriteError, setFavoriteError] = useState(false);
  const [data, setData] = useState<{ product: Product | null; related: Product[]; error: boolean; loadedFor: string }>({ product: null, related: [], error: false, loadedFor: '' });

  useEffect(() => {
    let active = true;
    void Promise.all([service.listByIds([productId]), service.listAvailable()]).then(async ([items, available]) => {
      let ids: string[] = [];
      let savedStateError = false;
      if (user) { try { ids = await service.getFavoriteIds(user.id); } catch { savedStateError = true; } }
      const product = items[0] ? { ...items[0], isFavorite: ids.includes(items[0].id) } : null;
      if (active) { setData({ product, related: available.filter((item) => item.id !== productId).slice(0, 6), error: false, loadedFor: `${productId}:${user?.id || 'guest'}` }); setFavoriteError(savedStateError); }
    }).catch(() => { if (active) setData({ product: null, related: [], error: true, loadedFor: `${productId}:${user?.id || 'guest'}` }); });
    return () => { active = false; };
  }, [productId, user]);

  const toggleFavorite = useCallback(async (targetId: string) => {
    if (!user) { router.push(`/login?next=${encodeURIComponent(`/product/${productId}`)}`); return; }
    const target = data.product?.id === targetId ? data.product : data.related.find((item) => item.id === targetId);
    if (!target) return;
    try {
      await service.toggleFavorite(user.id, targetId, Boolean(target.isFavorite));
      setData((current) => ({
        ...current,
        product: current.product?.id === targetId ? { ...current.product, isFavorite: !current.product.isFavorite } : current.product,
        related: current.related.map((item) => item.id === targetId ? { ...item, isFavorite: !item.isFavorite } : item),
      }));
    } catch { setFavoriteError(true); }
  }, [data.product, data.related, productId, router, user]);

  const currentKey = `${productId}:${user?.id || 'guest'}`;
  return { product: data.loadedFor === currentKey ? data.product : null, related: data.loadedFor === currentKey ? data.related : [], loading: data.loadedFor !== currentKey, error: data.loadedFor === currentKey && data.error, favoriteError, toggleFavorite };
}
