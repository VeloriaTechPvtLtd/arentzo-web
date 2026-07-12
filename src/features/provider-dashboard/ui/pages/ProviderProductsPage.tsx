'use client';

import React, { useState } from 'react';
import {
    Search,
    Filter,
    Plus
} from 'lucide-react';
import { mockProducts, type Product } from '../../infrastructure/api/productsMockData';
import { AddProductForm } from '../components/AddProductForm';
import { useProviderFilters } from '../hooks/useProviderFilters';
import { ProviderFilterModal, type FilterDefinition } from '../components/ProviderFilterModal';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailsDrawer } from '../components/ProductDetailsDrawer';
import '../styles/ProviderProductsPage.css';

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

    const [showAddProduct, setShowAddProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const uniqueCategories = Array.from(new Set(mockProducts.map(p => p.category)));

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

    const filteredProducts = mockProducts.filter(product => {
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

                    <button className="create-product-btn" onClick={() => setShowAddProduct(true)}>
                        <Plus size={20} />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

            {/* Product Grid View */}
            <div className="products-grid">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                    />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-results">
                    <p>No products found matching your criteria.</p>
                    <button onClick={resetFilters} className="text-primary hover:underline mt-2">
                        Clear all filters
                    </button>
                </div>
            )}

            {showAddProduct && (
                <AddProductForm
                    onClose={() => setShowAddProduct(false)}
                    onSuccess={() => setShowAddProduct(false)}
                />
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
