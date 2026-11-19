'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../../../../shared/components/ui/ProductCard';
import { useFavoriteProducts } from '../../../catalog/ui/hooks/useCatalogProducts';
import { useCart } from '@/shared/hooks/useCart';
import '../styles/FavoritesPage.css';

export const FavoritesPage: React.FC = () => {
    const router = useRouter();
    const { products: favorites, loading, error, removeFavorite } = useFavoriteProducts();
    const { addToCart } = useCart();

    return (
        <div className="favorites-page">
            <div className="favorites-container">
                <header className="favorites-header">
                    <h1 className="favorites-title">My Favorites</h1>
                    <p className="favorites-count">
                        {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
                    </p>
                </header>

                {loading ? <p role="status">Loading your saved listings…</p> : null}
                {error ? <p role="alert">We couldn’t load your saved listings. Refresh and try again.</p> : null}
                {!loading && !error && favorites.length > 0 ? (
                    <div className="favorites-grid">
                        {favorites.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onFavoriteToggle={removeFavorite}
                                onAddToCart={(id) => { const product = favorites.find((item) => item.id === id); if (product) addToCart(product); }}
                            />
                        ))}
                    </div>
                ) : null}
                {!loading && !error && favorites.length === 0 ? (
                    <div className="empty-favorites">
                        <Heart className="empty-icon" />
                        <h2 className="empty-text">Your list is empty</h2>
                        <p className="empty-subtext">
                            Looking for inspiration? Explore our marketplace and save your favorite items here.
                        </p>
                        <button
                            className="explore-btn"
                            onClick={() => router.push('/browse')}
                        >
                            Start Exploring
                        </button>
                    </div>
                ) : null}

                {!loading && !error && favorites.length > 0 && (
                    <div className="mt-12 p-6 rounded-2xl bg-secondary/30 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <ShoppingBag size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Ready to rent?</h3>
                                <p className="text-sm text-muted-foreground">Save listings here and add an item to your cart when you are ready.</p>
                            </div>
                        </div>
                        <button
                            className="explore-btn whitespace-nowrap"
                            onClick={() => router.push('/browse')}
                        >
                            View Marketplace
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
