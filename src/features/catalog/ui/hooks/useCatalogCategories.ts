'use client';

import { useEffect, useState } from 'react';
import type { Category } from '@/features/customer-home/domain/entities/types';
import { CatalogService } from '../../application/services/CatalogService';
import { SupabaseCatalogRepository } from '../../infrastructure/SupabaseCatalogRepository';

const service = new CatalogService(new SupabaseCatalogRepository());

export function useCatalogCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  useEffect(() => {
    let active = true;
    void service.listCategories().then((data) => { if (active) { setCategories(data); setState('ready'); } })
      .catch(() => { if (active) setState('error'); });
    return () => { active = false; };
  }, []);
  return { categories, loading: state === 'loading', error: state === 'error' };
}
