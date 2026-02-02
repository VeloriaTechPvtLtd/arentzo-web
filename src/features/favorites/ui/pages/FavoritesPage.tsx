import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { ProductCard } from '../../../../shared/components/ui/ProductCard';
import { mockProducts } from '../../../customer-home/infrastructure/api/mockData';
import '../styles/FavoritesPage.css';

export const FavoritesPage: React.FC = () => {
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState(mockProducts.filter(p => p.isFavorite));

    const handleFavoriteToggle = (productId: string) => {
        setFavorites(prev => prev.filter(p => p.id !== productId));
        // In a real app, this would call an API
    };

    const handleAddToCart = (productId: string) => {
        console.log('Added to cart:', productId);
        // In a real app, this would use CartContext
    };

    return (
        <div className="favorites-page">
            <div className="favorites-container">
                <header className="favorites-header">
                    <h1 className="favorites-title">My Favorites</h1>
                    <p className="favorites-count">
                        {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
                    </p>
                </header>

                {favorites.length > 0 ? (
                    <div className="favorites-grid">
                        {favorites.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onFavoriteToggle={handleFavoriteToggle}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-favorites">
                        <Heart className="empty-icon" />
                        <h2 className="empty-text">Your list is empty</h2>
                        <p className="empty-subtext">
                            Looking for inspiration? Explore our marketplace and save your favorite items here.
                        </p>
                        <button
                            className="explore-btn"
                            onClick={() => navigate('/browse')}
                        >
                            Start Exploring
                        </button>
                    </div>
                )}

                {favorites.length > 0 && (
                    <div className="mt-12 p-6 rounded-2xl bg-secondary/30 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <ShoppingBag size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Ready to rent?</h3>
                                <p className="text-sm text-muted-foreground">Add your favorites to cart and check out in minutes.</p>
                            </div>
                        </div>
                        <button
                            className="explore-btn whitespace-nowrap"
                            onClick={() => navigate('/browse')}
                        >
                            View Marketplace
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
