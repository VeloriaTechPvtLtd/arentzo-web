import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from '../../shared/components/ui/ProductCard';
import { SearchHeader } from './components/SearchHeader';
import { FilterBar } from './components/FilterBar';
import { RecentSearches } from './components/RecentSearches';
import { ContinueBrowsing } from './components/ContinueBrowsing';
import { PriceDrop } from './components/PriceDrop';
import './Search.css';

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

export const SearchResultsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setShowResults(query.length > 0);
    };

    const handleClear = () => {
        setSearchQuery('');
        setShowResults(false);
    };

    return (
        <div className="bg-[var(--background)] min-h-screen pb-24">
            <SearchHeader
                value={searchQuery}
                onChange={handleSearch}
                onClear={handleClear}
            />

            {!showResults ? (
                <div className="max-w-2xl mx-auto animate-fade-in">
                    <RecentSearches
                        searches={MOCK_RECENT_SEARCHES}
                        onSelect={(s) => handleSearch(s.label)}
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
                            <ProductCard key={product.id} product={product as any} />
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Cart Notification FAB */}
            <div className="cart-fab">
                <div className="cart-fab-images">
                    <img src={MOCK_PRODUCTS[0].image} alt="" className="cart-fab-img" />
                    <img src={MOCK_PRODUCTS[1].image} alt="" className="cart-fab-img" />
                    <div className="cart-fab-badge">+2</div>
                </div>

                <div className="flex-1 flex flex-col">
                    <span className="font-bold text-base leading-none">View Cart</span>
                    <span className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">3 Items added</span>
                </div>

                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <ChevronRight size={18} />
                </div>
            </div>
        </div>
    );
};
