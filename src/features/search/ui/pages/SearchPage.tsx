import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RecentSearches } from '../components/RecentSearches';
import { ContinueBrowsing } from '../components/ContinueBrowsing';
import { PriceDrop } from '../components/PriceDrop';
import { SearchResults } from '../components/SearchResults';
import { FloatingCart } from '../../../../shared/components/cart/FloatingCart';
import { useCart } from '../../../../shared/hooks/useCart';
import { useDrawer } from '../../../../shared/hooks/useDrawer';

// Mock Data
const MOCK_RECENT_SEARCHES = [
    { id: '1', label: 'White Bed' },
    { id: '2', label: 'Recliner Sofa', icon: '🛋️' },
    { id: '3', label: 'Beds', icon: '🛏️' },
    { id: '4', label: 'Double Beds', icon: '🛏️' },
    { id: '5', label: 'Armchairs', icon: '🪑' },
    { id: '6', label: 'Dining Tables', icon: '🍽️' },
];

const MOCK_BROWSING_ITEMS = [
    {
        id: '1',
        title: 'Premium Chairs',
        productCount: 120,
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=300&h=300',
        viewedAt: '4 Days Ago'
    },
    {
        id: '2',
        title: 'Design Beds',
        productCount: 145,
        image: 'https://images.unsplash.com/photo-1505693416388-503928ae61f6?auto=format&fit=crop&q=80&w=300&h=300',
        viewedAt: '4 Days Ago'
    },
    {
        id: '3',
        title: 'Modern Tables',
        productCount: 232,
        image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&q=80&w=300&h=300',
        viewedAt: '4 Days Ago'
    }
];

const MOCK_DEALS = [
    {
        id: '1',
        title: 'Elegant Recliner sofa with soft premium fabric',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.5,
        reviewCount: 512,
        price: 24999,
        discountTag: 'Price drop'
    },
    {
        id: '2',
        title: 'Fabric recliner sofa with easy-to-clean material',
        image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.8,
        reviewCount: 442,
        price: 19999,
        discountTag: 'Price drop'
    },
    {
        id: '3',
        title: 'Plush recliner sofa for ultimate living room comfort',
        image: 'https://images.unsplash.com/photo-1568294627254-4ea0f0556665?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.7,
        reviewCount: 742,
        price: 21999,
        discountTag: 'Price drop'
    }
];

const MOCK_SEARCH_RESULTS = [
    {
        id: '101',
        title: 'White King Size Bed with premium finish',
        image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.8,
        reviewCount: 142,
        price: 32999,
        isImported: true
    },
    {
        id: '102',
        title: 'Single Bed with soft padding and extra storage',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.5,
        reviewCount: 122,
        price: 25999,
        isImported: true
    },
    {
        id: '103',
        title: 'Double Bed With long-lasting teak wood material',
        image: 'https://images.unsplash.com/photo-1505691938895-1cd1027d1a58?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.9,
        reviewCount: 212,
        price: 35999,
        isImported: true
    }
];

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    const showResults = searchQuery.length > 0;

    const [recentSearches, setRecentSearches] = useState(MOCK_RECENT_SEARCHES);
    const { items, totalItems } = useCart();
    const { openCheckout } = useDrawer();

    const handleRecentSearchSelect = (search: { label: string }) => {
        setSearchParams({ q: search.label });
    };

    const handleClearHistory = () => {
        setRecentSearches([]);
    };

    return (
        <div className="min-h-screen pb-safe bg-[var(--background)] pt-[72px]">
            {/* AppHeader handles the Search Input now */}

            <main className="max-w-2xl mx-auto px-4 py-4">
                {!showResults ? (
                    <div className="animate-fade-in">
                        <RecentSearches
                            searches={recentSearches}
                            onSelect={handleRecentSearchSelect}
                            onClear={handleClearHistory}
                        />

                        <ContinueBrowsing items={MOCK_BROWSING_ITEMS} />

                        <PriceDrop items={MOCK_DEALS} />
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <SearchResults
                            query={searchQuery}
                            results={MOCK_SEARCH_RESULTS}
                        />
                    </div>
                )}
            </main>


            {
                items.length > 0 && (
                    <FloatingCart
                        items={items.map(item => ({ id: item.id, image: item.product.image }))}
                        totalItems={totalItems}
                        onViewCart={openCheckout}
                    />
                )
            }
        </div >
    );
};

