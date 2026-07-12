'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import { BackHeader } from '../../../../shared/components/layout/BackHeader';
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
        price: 3299900,
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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
    const showResults = searchValue.length > 0;

    const { items, totalItems } = useCart();
    const { openCheckout } = useDrawer();

    const replaceQuery = (next: URLSearchParams) => {
        const qs = next.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname);
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        const newParams = new URLSearchParams(searchParams.toString());
        if (value) {
            newParams.set('q', value);
        } else {
            newParams.delete('q');
        }
        replaceQuery(newParams);
    };

    const handleClearSearch = () => {
        setSearchValue('');
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete('q');
        replaceQuery(newParams);
    };

    const renderSearchInput = () => (
        <div className="search-header-input">
            <div className="search-header-input__field">
                {!searchValue && <SearchIcon className="search-header-input__icon" size={18} />}
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search for furniture, mattresses..."
                    className="search-header-input__input"
                    autoFocus
                />
                {searchValue && (
                    <button
                        onClick={handleClearSearch}
                        className="search-header-input__clear"
                        aria-label="Clear search"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="search-results-page">
            <BackHeader
                title=""
                rightElement={renderSearchInput()}
                onBack={() => router.back()}
            />

            <main className="search-results-page__content">
                {!showResults ? (
                    <div className="search-results-page__suggestions">
                        <RecentSearches
                            searches={MOCK_RECENT_SEARCHES}
                            onSelect={(s) => handleSearchChange(s.label)}
                            onClear={() => { }}
                        />
                        <ContinueBrowsing items={MOCK_BROWSING_ITEMS} />
                        <PriceDrop items={[]} />
                    </div>
                ) : (
                    <div className="search-results-page__results">
                        <div className="search-results-page__filter-bar">
                            <FilterBar />
                        </div>

                        <div className="search-results-page__grid">
                            {MOCK_PRODUCTS.map((product) => (
                                <ProductCard key={product.id} product={product as Product} />
                            ))}
                        </div>
                    </div>
                )}
            </main>

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
