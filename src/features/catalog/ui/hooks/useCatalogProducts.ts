'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import type { Product } from '@/shared/types/product';
import { CatalogService } from '../../application/services/CatalogService';
import { SupabaseCatalogRepository } from '../../infrastructure/SupabaseCatalogRepository';
import {
  beginFavoritesLoad,
  completeFavoriteRemoval,
  completeFavoritesLoad,
  failFavoriteMutation,
  failFavoritesLoad,
} from '../../../favorites/domain/favoriteCollectionState.mjs';

const service = new CatalogService(new SupabaseCatalogRepository());

export function useCatalogProducts() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [items, setItems] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [favoritesError, setFavoritesError] = useState(false);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    void service.listAvailable().then(async (products) => {
      let favoriteIds: string[] = [];
      let savedStateError = false;
      if (user) { try { favoriteIds = await service.getFavoriteIds(user.id); } catch { savedStateError = true; } }
      if (active) {
        setItems(products.map((product) => ({ ...product, isFavorite: favoriteIds.includes(product.id) })));
        setLoadedUserId(user?.id ?? null);
        setLoaded(true);
        setFavoritesError(savedStateError);
      }
    }).catch(() => { if (active) { setItems([]); setError(true); } });
    return () => { active = false; };
  }, [user]);

  const toggleFavorite = useCallback(async (productId: string) => {
    if (!user) { router.push(`/login?next=${encodeURIComponent(pathname)}`); return; }
    const product = items.find((item) => item.id === productId);
    if (!product) return;
    try {
      await service.toggleFavorite(user.id, productId, Boolean(product.isFavorite));
      setItems((current) => current.map((item) => item.id === productId ? { ...item, isFavorite: !item.isFavorite } : item));
    } catch { setFavoritesError(true); }
  }, [items, pathname, router, user]);

  const identityReady = loaded && loadedUserId === (user?.id ?? null);
  return { products: identityReady ? items : [], loading: !identityReady && !error, error, favoritesError, toggleFavorite };
}

export function useFavoriteProducts() {
  const { user } = useAuth();
  const [attempt, setAttempt] = useState(0);
  const [removalKeys, setRemovalKeys] = useState<Set<string>>(new Set());
  const inFlight = useRef(new Set<string>());
  const [result, setResult] = useState<{ userId: string; items: Product[]; loading: boolean; loadError: boolean; mutationError: boolean }>({ userId: '', items: [], loading: false, loadError: false, mutationError: false });

  useEffect(() => {
    if (!user) {
      setResult({ userId: '', items: [], loading: false, loadError: false, mutationError: false });
      return;
    }
    let active = true;
    setResult((current) => beginFavoritesLoad(current, user.id));
    void service.listFavorites(user.id).then((products) => {
      if (active) setResult(completeFavoritesLoad(user.id, products.map((product) => ({ ...product, isFavorite: true }))));
    }).catch(() => {
      if (active) setResult((current) => failFavoritesLoad(current, user.id));
    });
    return () => { active = false; };
  }, [attempt, user]);

  const removeFavorite = useCallback(async (productId: string) => {
    if (!user || result.userId !== user.id || result.loading || result.loadError || result.mutationError) return;
    const key = `${user.id}:${productId}`;
    if (inFlight.current.has(key)) return;
    inFlight.current.add(key);
    setRemovalKeys((current) => new Set(current).add(key));
    setResult((current) => ({ ...current, mutationError: false }));
    try {
      await service.toggleFavorite(user.id, productId, true);
      setResult((current) => completeFavoriteRemoval(current, user.id, productId));
    } catch {
      setResult((current) => failFavoriteMutation(current, user.id));
    } finally {
      inFlight.current.delete(key);
      setRemovalKeys((current) => { const next = new Set(current); next.delete(key); return next; });
    }
  }, [result.userId, result.loading, result.loadError, result.mutationError, user]);
  const ready = Boolean(user) && result.userId === user?.id;
  const removalPrefix = user ? user.id + ":" : "";
  const removingIds = new Set(user ? [...removalKeys].filter((key) => key.startsWith(removalPrefix)).map((key) => key.slice(removalPrefix.length)) : []);
  const retry = useCallback(() => {
    if (!user || [...inFlight.current].some((key) => key.startsWith(user.id + ":"))) return;
    setAttempt((current) => current + 1);
  }, [user]);
  return {
    products: ready ? result.items : [],
    loading: Boolean(user) && (!ready || result.loading),
    error: ready && result.loadError,
    mutationError: ready && result.mutationError,
    removingIds,
    removeFavorite,
    retry,
  };
}
