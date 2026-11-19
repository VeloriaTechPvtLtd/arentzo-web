'use client';

import React, { useMemo, useState } from 'react';
import {
    Search,
    Filter,
    Plus
} from 'lucide-react';
import type { Product } from '../../infrastructure/api/productsMockData';
import { useProviderFilters } from '../hooks/useProviderFilters';
import { ProviderFilterModal, type FilterDefinition } from '../components/ProviderFilterModal';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsDrawer } from '../components/ProductDetailsDrawer';
import '../styles/ProviderProductsPage.css';
import { useProviderProducts } from '../hooks/useProviderRecords';

export const ProviderProductsPage: React.FC = () => {
    const {
        isOpen,
        openFilters,
        closeFilters,
        filters,
        updateFilter,
        resetFilters,
        searchQuery,
        setSearchQuery,
        activeFilterCount
    } = useProviderFilters({
        categories: [] as string[],
        status: [] as string[],
        condition: [] as string[],
        priceRange: { min: null, max: null } as { min: number | null; max: number | null },
        stockRange: { min: null, max: null } as { min: number | null; max: number | null }
    });

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { items: products, loading, error } = useProviderProducts();

    const uniqueCategories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);

    const filterDefinitions: FilterDefinition[] = [
        {
            id: 'categories',
            label: 'Categories',
            type: 'checkbox',
            options: uniqueCategories.map(cat => ({ id: cat, label: cat }))
        },
        {
            id: 'condition',
            label: 'Condition',
            type: 'checkbox',
            options: [
                { id: 'new', label: 'New' },
                { id: 'like_new', label: 'Like New' },
                { id: 'good', label: 'Good' },
                { id: 'fair', label: 'Fair' }
            ]
        },
        {
            id: 'status',
            label: 'Status',
            type: 'checkbox',
            options: [
                { id: 'active', label: 'Active' },
                { id: 'out_of_stock', label: 'Out of Stock' },
                { id: 'draft', label: 'Draft' },
                { id: 'archived', label: 'Archived' }
            ]
        },
        {
            id: 'priceRange',
            label: 'Price Range',
            type: 'range',
            minLabel: 'Min Price',
            maxLabel: 'Max Price'
        },
        {
            id: 'stockRange',
            label: 'Stock Level',
            type: 'range',
            minLabel: 'Min Stock',
            maxLabel: 'Max Stock'
        }
    ];

    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
        const matchesStatus = filters.status.length === 0 || filters.status.includes(product.status);
        const matchesCondition = filters.condition.length === 0 || filters.condition.includes(product.condition);

        const matchesPrice =
            (filters.priceRange.min === null || product.price >= filters.priceRange.min) &&
            (filters.priceRange.max === null || product.price <= filters.priceRange.max);

        const matchesStock =
            (filters.stockRange.min === null || product.stock >= filters.stockRange.min) &&
            (filters.stockRange.max === null || product.stock <= filters.stockRange.max);

        return matchesSearch && matchesCategory && matchesStatus && matchesCondition && matchesPrice && matchesStock;
    });

    return (
        <div className="provider-products-page">
            <div className="products-toolbar">
                <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search products, ID or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filters-wrapper">
                    <button
                        className={`filter-btn ${activeFilterCount > 0 ? 'active' : ''}`}
                        onClick={openFilters}
                    >
                        <Filter size={18} />
                        <span>Filter</span>
                        {activeFilterCount > 0 && (
                            <span className="filter-badge">{activeFilterCount}</span>
                        )}
                    </button>

                    <button className="create-product-btn" disabled title="Provider listing writes are awaiting backend verification">
                        <Plus size={20} />
                        <span>Add Product unavailable</span>
                    </button>
                </div>
            </div>

            {/* Product Grid View */}
            {loading ? <p role="status">Loading provider listings…</p> : null}
            {error ? <p role="alert">We couldn’t load provider listings. Refresh and try again.</p> : null}
            {!loading && !error ? <p role="status" className="mb-3 text-sm text-muted-foreground">Listing changes are disabled until provider-write workflows are verified.</p> : null}
            <div className="products-grid">
                {!loading && !error ? filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                    />
                )) : null}
            </div>

            {!loading && !error && filteredProducts.length === 0 && (
                <div className="no-results">
                    <p>No products found matching your criteria.</p>
                    <button onClick={resetFilters} className="text-primary hover:underline mt-2">
                        Clear all filters
                    </button>
                </div>
            )}

            <ProviderFilterModal
                isOpen={isOpen}
                onClose={closeFilters}
                filters={filters}
                onUpdate={updateFilter as (key: string, value: unknown) => void}
                onReset={resetFilters}
                definitions={filterDefinitions}
            />

            {selectedProduct && (
                <ProductDetailsDrawer
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};
