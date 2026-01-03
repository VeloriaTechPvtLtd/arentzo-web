import React, { useState } from 'react';
import { SearchHeader } from './components/SearchHeader';
import { RecentSearches } from './components/RecentSearches';
import { ContinueBrowsing } from './components/ContinueBrowsing';
import { PriceDrop } from './components/PriceDrop';
import { SearchResults } from './components/SearchResults';

// Mock Data
const MOCK_RECENT_SEARCHES = [
    { id: '1', label: 'White' },
    { id: '2', label: 'Recliner Sofa', icon: '🛋️' }, // Using emoji for now, can replace with specific icons
    { id: '3', label: 'Beds', icon: '🛏️' },
    { id: '4', label: 'Double Beds', icon: '🛏️' },
    { id: '5', label: 'Armchairs', icon: '🪑' },
    { id: '6', label: 'Tables', icon: '🥛' },
];

const MOCK_BROWSING_ITEMS = [
    {
        id: '1',
        title: 'Chairs',
        productCount: 120,
        image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=300&h=300',
        viewedAt: '4 Days Ago'
    },
    {
        id: '2',
        title: 'Beds',
        productCount: 145,
        image: 'https://images.unsplash.com/photo-1505693416388-503928ae61f6?auto=format&fit=crop&q=80&w=300&h=300',
        viewedAt: '4 Days Ago'
    },
    {
        id: '3',
        title: 'Tables',
        productCount: 232,
        image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&q=80&w=300&h=300',
        viewedAt: '4 Days Ago'
    }
];

const MOCK_DEALS = [
    {
        id: '1',
        title: 'Elegant Recliner sofa with soft...',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.5,
        reviewCount: 512,
        price: 24999,
        discountTag: 'Price drop'
    },
    {
        id: '2',
        title: 'Fabric recliner sofa with easy-to-clean...',
        image: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.8,
        reviewCount: 442,
        price: 19999,
        discountTag: 'Price drop'
    },
    {
        id: '3',
        title: 'Plush recliner sofa for ultimate...',
        image: 'https://images.unsplash.com/photo-1568294627254-4ea0f0556665?auto=format&fit=crop&q=80&w&300&h=300',
        rating: 4.7,
        reviewCount: 742,
        price: 21999,
        discountTag: 'Price drop'
    }
];

const MOCK_SEARCH_RESULTS = [
    {
        id: '101',
        title: 'White King Size Bed..',
        image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.8,
        reviewCount: 142,
        price: 32999,
        discountTag: 'Imported'
    },
    {
        id: '102',
        title: 'Single Bed with soft...',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.5,
        reviewCount: 122,
        price: 25999,
        discountTag: 'Imported'
    },
    {
        id: '103',
        title: 'Double Bed With long...',
        image: 'https://images.unsplash.com/photo-1505691938895-1cd1027d1a58?auto=format&fit=crop&q=80&w=300&h=300',
        rating: 4.9,
        reviewCount: 212,
        price: 35999,
        discountTag: 'Imported'
    }
];

export const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [recentSearches, setRecentSearches] = useState(MOCK_RECENT_SEARCHES);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.length > 0) {
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setShowResults(false);
    };

    const handleRecentSearchSelect = (search: typeof MOCK_RECENT_SEARCHES[0]) => {
        setSearchQuery(search.label);
        setShowResults(true);
    };

    const handleClearHistory = () => {
        setRecentSearches([]);
    };

    return (
        <div className="min-h-screen bg-white pb-safe">
            <SearchHeader
                value={searchQuery}
                onChange={handleSearch}
                onClear={handleClearSearch}
            />

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
                    {/* In a real app we'd filter based on query, here we just show mock results */}
                    <SearchResults
                        query={searchQuery}
                        results={MOCK_SEARCH_RESULTS}
                    />
                </div>
            )}
        </div>
    );
};
