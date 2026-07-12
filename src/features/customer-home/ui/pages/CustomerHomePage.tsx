'use client';

import React, { useState, useMemo } from 'react';
// import { useRouter } from 'next/navigation';
import { CategoryTabs } from '../components/CategoryTabs';
import { HeroBanner } from '../components/HeroBanner';
import { SubcategoryCards } from '../components/SubcategoryCards';
import { ProductsGrid } from '../components/ProductsGrid';
import { TopSelections } from '../components/TopSelections';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { useCart } from '../../../../shared/hooks/useCart';
import { useDrawer } from '../../../../shared/hooks/useDrawer';
import { FloatingCart } from '../../../../shared/components/cart/FloatingCart';
import type { CategoryTheme } from '../../domain/entities/types';
import type { Product } from '../../../../shared/types/product';
import {
    categoryThemes,
    featuredBrands,
    mockProducts,
    topSelections,
    sportsSelections,
} from '../../infrastructure/api/mockData';
import categoriesData from '../../../../app_content/categories.json';
import '../styles/CustomerHome.css';

interface Category {
    id: string;
    name: string;
    icon: string;
    subcategories: {
        name: string;
        examples: string[];
    }[];
}

export const CustomerHomePage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [localProducts, setLocalProducts] = useState<Product[]>(mockProducts);

    const { items: cartItems, addToCart, updateQuantity } = useCart();
    // Layout-related state is now handled in CustomerLayout

    // const router = useRouter();

    // Sync products with cart state
    const products = useMemo(() => {
        return localProducts.map(product => {
            const cartItem = cartItems.find(item => item.product.id === product.id);
            return {
                ...product,
                quantity: cartItem ? cartItem.quantity : 0
            };
        });
    }, [localProducts, cartItems]);

    const categories = categoriesData as Category[];

    const currentCategory = useMemo(() => {
        if (activeCategory === 'all') {
            return categories[0]; // Default to Travel for "All"
        }
        return categories.find((cat) => cat.id === activeCategory) || categories[0];
    }, [activeCategory, categories]);

    const currentTheme = useMemo((): CategoryTheme => {
        return categoryThemes[activeCategory] || categoryThemes.all;
    }, [activeCategory]);

    const currentBrand = useMemo(() => {
        return featuredBrands[activeCategory] || null;
    }, [activeCategory]);

    const currentSelections = useMemo(() => {
        if (activeCategory === 'sports_leisure') {
            return sportsSelections;
        }
        return topSelections;
    }, [activeCategory]);

    const sectionTitle = useMemo(() => {
        switch (activeCategory) {
            case 'sports_leisure':
                return 'Sports Bestsellers';
            case 'tech_gadgets':
                return 'Tech Essentials';
            case 'travel_transport':
            case 'all':
                return 'Similar Searches';
            default:
                return 'Popular Picks';
        }
    }, [activeCategory]);

    const selectionsTitle = useMemo(() => {
        switch (activeCategory) {
            case 'sports_leisure':
                return 'Sports Bestsellers';
            case 'tech_gadgets':
                return 'Tech Collections';
            default:
                return 'Top Selections';
        }
    }, [activeCategory]);

    const handleFavoriteToggle = (productId: string) => {
        setLocalProducts((prev) =>
            prev.map((p) =>
                p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
            )
        );
    };

    const handleAddToCart = (productId: string) => {
        const product = products.find((p) => p.id === productId);
        if (product) {
            addToCart(product);
        }
    };

    const handleQuantityChange = (productId: string, quantity: number) => {
        updateQuantity(productId, quantity);
    };

    // Determine if we show featured brand variant
    const showFeaturedBrand = currentBrand && (
        activeCategory === 'travel_transport' ||
        activeCategory === 'sports_leisure'
    );

    const { openCheckout } = useDrawer();

    return (
        <CustomerLayout className={`customer-home--${activeCategory}`}>
            <div className="customer-home__content">
                <CategoryTabs
                    categories={categories.map((cat) => ({
                        id: cat.id,
                        name: cat.name,
                        icon: cat.icon,
                    }))}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />

                <div className="customer-home__hero-section">
                    <HeroBanner
                        theme={currentTheme}
                        brandName={currentBrand?.name}
                        brandImage={currentBrand?.image}
                        cta={currentBrand?.cta}
                        variant={showFeaturedBrand ? 'featured' : 'simple'}
                    />

                    <SubcategoryCards
                        subcategories={currentCategory.subcategories}
                        categoryColor={currentTheme.primary}
                    />
                </div>

                {/* Main Action Section */}
                <div className="flex flex-col gap-2">
                    {showFeaturedBrand && (
                        <TopSelections
                            title={selectionsTitle}
                            selections={currentSelections}
                        />
                    )}

                    <ProductsGrid
                        title={sectionTitle}
                        products={products}
                        onFavoriteToggle={handleFavoriteToggle}
                        onAddToCart={handleAddToCart}
                        onQuantityChange={handleQuantityChange}
                    />

                    {/* Discovery Section - only show if not in a specific brand focus */}
                    {!showFeaturedBrand && (
                        <ProductsGrid
                            title="You May Also Like"
                            products={[...products].reverse()}
                            onFavoriteToggle={handleFavoriteToggle}
                            onAddToCart={handleAddToCart}
                            onQuantityChange={handleQuantityChange}
                        />
                    )}
                </div>
            </div>

            {cartItems.length > 0 && (
                <FloatingCart
                    items={cartItems.map(item => ({
                        id: item.id,
                        image: item.product.image
                    }))}
                    totalItems={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    onViewCart={openCheckout}
                />
            )}
        </CustomerLayout>
    );
};
