'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import type { Product } from '@/shared/types/product';
import { CatalogService } from '../../application/services/CatalogService';
import { SupabaseCatalogRepository } from '../../infrastructure/SupabaseCatalogRepository';

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
  const [result, setResult] = useState<{ userId: string; items: Product[]; error: boolean }>({ userId: '', items: [], error: false });

  useEffect(() => {
    if (!user) return;
    let active = true;
    void service.listFavorites(user.id).then((products) => { if (active) setResult({ userId: user.id, items: products.map((product) => ({ ...product, isFavorite: true })), error: false }); })
      .catch(() => { if (active) setResult({ userId: user.id, items: [], error: true }); });
    return () => { active = false; };
  }, [user]);

  const removeFavorite = useCallback(async (productId: string) => {
    if (!user) return;
    try {
      await service.toggleFavorite(user.id, productId, true);
      setResult((current) => ({ ...current, items: current.items.filter((item) => item.id !== productId) }));
    } catch { setResult((current) => ({ ...current, error: true })); }
  }, [user]);
  const ready = Boolean(user) && result.userId === user?.id;
  return { products: ready ? result.items : [], loading: Boolean(user) && !ready, error: ready && result.error, removeFavorite };
}
