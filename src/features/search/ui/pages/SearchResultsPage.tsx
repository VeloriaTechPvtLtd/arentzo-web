import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../../../shared/components/ui/ProductCard';
import { FilterBar } from '../components/FilterBar';
import { RecentSearches } from '../components/RecentSearches';
import { ContinueBrowsing } from '../components/ContinueBrowsing';
import { PriceDrop } from '../components/PriceDrop';
import type { Product } from '../../../customer-home/domain/entities/types';
import { useCart } from '../../../../shared/hooks/useCart';
import { useDrawer } from '../../../../shared/hooks/useDrawer';
import { FloatingCart } from '../../../../shared/components/cart/FloatingCart';
import '../styles/Search.css';

// Mock Data
const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'White King Size Bed with Premium Velvet Headboard',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 142,
        price: 3299900, // converted to cents
        isImported: true,
        isFavorite: false,
    },
    {
        id: '2',
        name: 'Single Bed with soft padding and built-in storage',
        image: 'https://images.unsplash.com/photo-1505693416388-b25c5396650f?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 122,
        price: 2599900,
        isImported: true,
        isFavorite: false,
    },
    {
        id: '3',
        name: 'Double Bed With long-lasting teak wood finish',
        image: 'https://images.unsplash.com/photo-1522771753062-588773b18d87?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 212,
        price: 3599900,
        isImported: true,
        isFavorite: true,
    },
    {
        id: '4',
        name: 'Modern double Bed with minimalistic design',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 142,
        price: 3399900,
        isImported: false,
        isFavorite: true,
    },
    {
        id: '5',
        name: 'White fabric Bed with soft cushion and elegant lines',
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 242,
        price: 4499900,
        isImported: true,
        isFavorite: false,
    },
    {
        id: '6',
        name: 'Premium Off-White Bed with contemporary style',
        image: 'https://images.unsplash.com/photo-1616594039964-ea8082018eac?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 132,
        price: 3299900,
        isImported: false,
        isFavorite: false,
    },
];

const MOCK_RECENT_SEARCHES = [
    { id: '1', label: 'White Bed' },
    { id: '2', label: 'Recliner Sofa', icon: '🛋️' },
    { id: '3', label: 'Beds', icon: '🛏️' },
];

const MOCK_BROWSING_ITEMS = [
    {
        id: '1',
        title: 'Premium Chairs',
        productCount: 120,
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=300&h=300',
        viewedAt: '4 Days Ago'
    }
];


// ... (previous code)

export const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const showResults = searchQuery.length > 0;

    const { items, totalItems } = useCart();
    const { openCheckout } = useDrawer();

    return (
        <div className="bg-[var(--background)] min-h-screen pb-24 pt-[72px]">


            {!showResults ? (
                <div className="max-w-2xl mx-auto animate-fade-in">
                    <RecentSearches
                        searches={MOCK_RECENT_SEARCHES}
                        onSelect={(s) => window.location.href = `/search?q=${encodeURIComponent(s.label)}`}
                        onClear={() => { }}
                    />
                    <ContinueBrowsing items={MOCK_BROWSING_ITEMS} />
                    <PriceDrop items={[]} />
                </div>
            ) : (
                <div className="animate-fade-in">
                    <div className="sticky top-[72px] z-10 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)] mb-4">
                        <FilterBar />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
                        {MOCK_PRODUCTS.map((product) => (
                            <ProductCard key={product.id} product={product as Product} />
                        ))}
                    </div>
                </div>
            )}

            {items.length > 0 && (
                <FloatingCart
                    items={items.map(item => ({
                        id: item.id,
                        image: item.product.image
                    }))}
                    totalItems={totalItems}
                    onViewCart={openCheckout}
                />
            )}
        </div>
    );
};
