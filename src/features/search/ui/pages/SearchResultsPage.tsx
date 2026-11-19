'use client';

import React, { useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import { BackHeader } from '../../../../shared/components/layout/BackHeader';
import { ProductCard } from '../../../../shared/components/ui/ProductCard';
import { RecentSearches } from '../components/RecentSearches';
import { useCart } from '../../../../shared/hooks/useCart';
import { useDrawer } from '../../../../shared/hooks/useDrawer';
import { FloatingCart } from '../../../../shared/components/cart/FloatingCart';
import { useCatalogProducts } from '@/features/catalog/ui/hooks/useCatalogProducts';
import { useCatalogCategories } from '@/features/catalog/ui/hooks/useCatalogCategories';
import type { Product } from '@/shared/types/product';
import '../styles/Search.css';

type RecentSearch = { id: string; label: string };

export const SearchResultsPage: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
    const [sortOrder, setSortOrder] = useState<'relevance' | 'price-asc' | 'price-desc' | 'rating'>('relevance');
    const { products, loading, error, toggleFavorite } = useCatalogProducts();
    const { categories } = useCatalogCategories();
    const { items: cartItems, totalItems, addToCart, updateQuantity } = useCart();
    const { openCheckout } = useDrawer();

    const recordRecentSearch = (value: string) => {
        const normalized = value.trim();
        if (normalized.length < 2) return;
        const updated = [{ id: normalized.toLowerCase(), label: normalized }, ...recentSearches.filter((entry) => entry.label.toLowerCase() !== normalized.toLowerCase())].slice(0, 8);
        setRecentSearches(updated);
    };

    const results = useMemo(() => {
        const normalized = query.trim().toLocaleLowerCase();
        if (!normalized) return [];
        const matches = products.filter((product) => {
            const categoryName = categories.find((category) => category.id === product.category)?.name || '';
            return `${product.name} ${product.brand || ''} ${categoryName} ${product.overview || ''}`.toLocaleLowerCase().includes(normalized);
        });
        if (sortOrder === 'price-asc') return matches.sort((a, b) => a.price - b.price);
        if (sortOrder === 'price-desc') return matches.sort((a, b) => b.price - a.price);
        if (sortOrder === 'rating') return matches.sort((a, b) => b.rating - a.rating);
        return matches;
    }, [categories, products, query, sortOrder]);

    const setQuery = (value: string) => {
        const next = new URLSearchParams(searchParams.toString());
        if (value.trim()) next.set('q', value);
        else next.delete('q');
        const suffix = next.toString();
        router.replace(suffix ? `${pathname}?${suffix}` : pathname, { scroll: false });
    };

    const clearHistory = () => {
        setRecentSearches([]);
    };

    const renderSearchInput = () => (
        <div className="search-header-input">
            <div className="search-header-input__field">
                {!query && <SearchIcon className="search-header-input__icon" size={18} />}
                <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => { if (event.key === 'Enter') recordRecentSearch(query); }}
                    placeholder="Search current rental listings"
                    className="search-header-input__input"
                    aria-label="Search listings"
                />
                {query && <button type="button" onClick={() => setQuery('')} className="search-header-input__clear" aria-label="Clear search"><X size={18} /></button>}
            </div>
        </div>
    );

    return (
        <div className="search-results-page">
            <BackHeader title="" rightElement={renderSearchInput()} onBack={() => router.back()} />
            <main className="search-results-page__content">
                {!query.trim() ? (
                    <section className="search-results-page__suggestions" aria-label="Recent searches">
                        <RecentSearches searches={recentSearches} onSelect={(item) => setQuery(item.label)} onClear={clearHistory} />
                        <p className="px-4 py-8 text-center text-sm text-muted-foreground">Search current rental listings by name, brand, or category.</p>
                    </section>
                ) : (
                    <section className="search-results-page__results" aria-live="polite">
                        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Results for <span className="font-bold normal-case text-primary">“{query}”</span></p>
                            <label className="flex items-center gap-2 text-sm text-muted-foreground">Sort by
                                <select aria-label="Sort search results" value={sortOrder} onChange={(event) => setSortOrder(event.target.value as typeof sortOrder)} className="rounded-lg border border-border bg-background px-3 py-2 text-foreground">
                                    <option value="relevance">Relevance</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="rating">Rating</option>
                                </select>
                            </label>
                        </div>
                        {loading ? <p role="status" className="px-4 py-8 text-center text-sm text-muted-foreground">Loading current listings…</p> : null}
                        {error ? <p role="alert" className="px-4 py-8 text-center text-sm text-destructive">Current listings could not be loaded. Try again later.</p> : null}
                        {!loading && !error && results.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 px-4 pb-20 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {results.map((product) => {
                                    const cartQuantity = cartItems.find((item) => item.product.id === product.id)?.quantity || 0;
                                    return <ProductCard key={product.id} product={{ ...product, quantity: cartQuantity } as Product} onFavoriteToggle={toggleFavorite} onAddToCart={(id) => { const match = products.find((item) => item.id === id); if (match?.isAvailable) addToCart(match); }} onQuantityChange={updateQuantity} />;
                                })}
                            </div>
                        ) : null}
                        {!loading && !error && results.length === 0 ? <div className="px-6 py-20 text-center"><h2 className="text-lg font-semibold">No current listings found</h2><p className="mt-2 text-sm text-muted-foreground">Try another search term or browse all available rentals.</p><button type="button" onClick={() => router.push('/browse')} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Browse rentals</button></div> : null}
                    </section>
                )}
            </main>
            {cartItems.length > 0 ? <FloatingCart items={cartItems.map((item) => ({ id: item.id, image: item.product.image }))} totalItems={totalItems} onViewCart={openCheckout} /> : null}
        </div>
    );
};
