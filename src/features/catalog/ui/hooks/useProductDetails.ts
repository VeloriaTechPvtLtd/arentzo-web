'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import type { Product } from '@/shared/types/product';
import { CatalogService } from '../../application/services/CatalogService';
import { SupabaseCatalogRepository } from '../../infrastructure/SupabaseCatalogRepository';
import { requestWithTimeout, RequestTimeoutError } from '../../domain/requestWithTimeout.js';

const service = new CatalogService(new SupabaseCatalogRepository());
const DETAIL_REQUEST_TIMEOUT_MS = 8_000;
const RELATED_REQUEST_TIMEOUT_MS = 12_000;

type ProductDetailsError = 'not_found' | 'timeout' | 'request_failed' | null;

export function useProductDetails(productId: string) {
  const { user } = useAuth();
  const router = useRouter();
  const [retryCount, setRetryCount] = useState(0);
  const [favoriteError, setFavoriteError] = useState(false);
  const [data, setData] = useState<{ product: Product | null; related: Product[]; error: ProductDetailsError; loadedFor: string }>({ product: null, related: [], error: null, loadedFor: '' });

  useEffect(() => {
    let active = true;
    const requestKey = `${productId}:${user?.id || 'guest'}:${retryCount}`;

    void requestWithTimeout(() => service.listByIds([productId]), DETAIL_REQUEST_TIMEOUT_MS)
      .then((items) => {
        if (!active) return;
        const item = items[0];
        if (!item) {
          setData({ product: null, related: [], error: 'not_found', loadedFor: requestKey });
          return;
        }

        // Render the requested listing as soon as its own read completes. Related
        // listings and saved-state reads are secondary and must not hold the page.
        setData({ product: { ...item, isFavorite: false }, related: [], error: null, loadedFor: requestKey });
        setFavoriteError(false);

        if (user) {
          void requestWithTimeout(() => service.getFavoriteIds(user.id), DETAIL_REQUEST_TIMEOUT_MS)
            .then((ids) => {
              if (!active) return;
              setData((current) => current.loadedFor === requestKey && current.product
                ? { ...current, product: { ...current.product, isFavorite: ids.includes(item.id) } }
                : current);
            })
            .catch(() => { if (active) setFavoriteError(true); });
        }

        void requestWithTimeout(() => service.listAvailable(), RELATED_REQUEST_TIMEOUT_MS)
          .then((available) => {
            if (!active) return;
            setData((current) => current.loadedFor === requestKey
              ? { ...current, related: available.filter((candidate) => candidate.id !== productId).slice(0, 6) }
              : current);
          })
          .catch(() => { /* Related listings are optional; keep the product detail visible. */ });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setData({
          product: null,
          related: [],
          error: error instanceof RequestTimeoutError ? 'timeout' : 'request_failed',
          loadedFor: requestKey,
        });
      });
    return () => { active = false; };
  }, [productId, user, retryCount]);

  const retry = useCallback(() => setRetryCount((count) => count + 1), []);

  const toggleFavorite = useCallback(async (targetId: string) => {
    if (!user) { router.push(`/login?next=${encodeURIComponent(`/product/?id=${productId}`)}`); return; }
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

  const currentKey = `${productId}:${user?.id || 'guest'}:${retryCount}`;
  return { product: data.loadedFor === currentKey ? data.product : null, related: data.loadedFor === currentKey ? data.related : [], loading: data.loadedFor !== currentKey, error: data.loadedFor === currentKey ? data.error : null, favoriteError, toggleFavorite, retry };
}
