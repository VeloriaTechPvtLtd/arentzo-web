import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../shared/components/layout/Footer';
import { HomeHeader } from './components/HomeHeader';
import { CategoryTabs } from './components/CategoryTabs';
import { HeroBanner } from './components/HeroBanner';
import { SubcategoryCards } from './components/SubcategoryCards';
import { ProductsGrid } from './components/ProductsGrid';
import { TopSelections } from './components/TopSelections';
import { FloatingCart } from './components/FloatingCart';
import { ProfilePanel } from '../profile';
import { CheckoutPanel } from '../checkout';
import { MessagesPanel } from '../messages';
import type { Product, CategoryTheme } from './types';
import {
    categoryThemes,
    featuredBrands,
    mockProducts,
    topSelections,
    sportsSelections,
} from './data/mockData';
import categoriesData from '../../app_content/categories.json';
import './CustomerHome.css';




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
    // const [activeTab, setActiveTab] = useState<TabId>('home'); // Removed BottomNavigation state
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [cartItems, setCartItems] = useState<{ id: string; image: string }[]>([
        { id: '1', image: mockProducts[0].image },
        { id: '2', image: mockProducts[1].image },
        { id: '3', image: mockProducts[2].image },
    ]);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);

    const navigate = useNavigate();

    const handleProfileClick = useCallback(() => {
        setIsProfileOpen(true);
    }, []);

    const handleProfileClose = useCallback(() => {
        setIsProfileOpen(false);
    }, []);

    const handleCheckoutOpen = useCallback(() => {
        setIsCheckoutOpen(true);
    }, []);

    const handleCheckoutClose = useCallback(() => {
        setIsCheckoutOpen(false);
    }, []);

    const handleMessagesOpen = useCallback(() => {
        setIsMessagesOpen(true);
    }, []);

    const handleMessagesClose = useCallback(() => {
        setIsMessagesOpen(false);
    }, []);

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
        setProducts((prev) =>
            prev.map((p) =>
                p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
            )
        );
    };

    const handleAddToCart = (productId: string) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === productId ? { ...p, quantity: 1 } : p
            )
        );
        const product = products.find((p) => p.id === productId);
        if (product && !cartItems.find((item) => item.id === productId)) {
            setCartItems((prev) => [...prev, { id: productId, image: product.image }]);
        }
    };

    const handleQuantityChange = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === productId ? { ...p, quantity: 0 } : p
                )
            );
            setCartItems((prev) => prev.filter((item) => item.id !== productId));
        } else {
            setProducts((prev) =>
                prev.map((p) =>
                    p.id === productId ? { ...p, quantity } : p
                )
            );
        }
    };

    // Determine if we show featured brand variant
    const showFeaturedBrand = currentBrand && (
        activeCategory === 'travel_transport' ||
        activeCategory === 'sports_leisure'
    );

    return (
        <div className={`customer-home customer-home--${activeCategory}`}>
            <div className="customer-home__content">
                <HomeHeader
                    userName="Hello, User"
                    location="BEML Layout, Brookefield"
                    messageCount={3}
                    onSearchClick={() => navigate('/search')}
                    onProfileClick={handleProfileClick}
                    onLocationClick={() => console.log('Location clicked')}
                    onMessageClick={handleMessagesOpen}
                />

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

                {showFeaturedBrand ? (
                    <TopSelections
                        title={selectionsTitle}
                        selections={currentSelections}
                    />
                ) : (
                    <ProductsGrid
                        title={sectionTitle}
                        products={products}
                        onFavoriteToggle={handleFavoriteToggle}
                        onAddToCart={handleAddToCart}
                        onQuantityChange={handleQuantityChange}
                    />
                )}

                {/* Additional Products Section */}
                {!showFeaturedBrand && (
                    <ProductsGrid
                        title="You May Also Like"
                        products={[...products].reverse()}
                        onFavoriteToggle={handleFavoriteToggle}
                        onAddToCart={handleAddToCart}
                        onQuantityChange={handleQuantityChange}
                    />
                )}

                {showFeaturedBrand && (
                    <>
                        <ProductsGrid
                            title={sectionTitle}
                            products={products}
                            onFavoriteToggle={handleFavoriteToggle}
                            onAddToCart={handleAddToCart}
                            onQuantityChange={handleQuantityChange}
                        />
                    </>
                )}
            </div>

            {cartItems.length > 0 && (
                <FloatingCart
                    items={cartItems}
                    totalItems={cartItems.length}
                    onViewCart={handleCheckoutOpen}
                />
            )}

            {/* BottomNavigation removed as per request */}

            <ProfilePanel isOpen={isProfileOpen} onClose={handleProfileClose} />
            <CheckoutPanel isOpen={isCheckoutOpen} onClose={handleCheckoutClose} />
            <MessagesPanel isOpen={isMessagesOpen} onClose={handleMessagesClose} />
            <Footer />
        </div>
    );
};
