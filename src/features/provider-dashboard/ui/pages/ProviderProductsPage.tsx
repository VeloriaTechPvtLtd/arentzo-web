import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Plus
} from 'lucide-react';
import { mockProducts } from '../../infrastructure/api/productsMockData';
import { AddProductForm } from '../components/AddProductForm';
import { useProviderFilters } from '../hooks/useProviderFilters';
import { ProviderFilterModal, type FilterDefinition } from '../components/ProviderFilterModal';
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

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

            <div className="products-table-container">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Status/Condition</th>
                            <th className="actions-cell"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td className="product-cell">
                                    <div className="product-info">
                                        <img src={product.image} alt={product.name} />
                                        <div className="product-text">
                                            <span className="product-name">{product.name}</span>
                                            <span className="product-id">{product.id}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="category-pouch">{product.category}</span>
                                </td>
                                <td>
                                    <div className="stock-box">{product.stock}</div>
                                </td>
                                <td>
                                    <div className="price-box">{formatCurrency(product.price)}</div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-1 items-start">
                                        <span className={`status-pill ${product.status}`}>
                                            {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.replace('_', ' ').slice(1)}
                                        </span>
                                        {product.condition && (
                                            <span className="text-[10px] font-semibold text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                                                {product.condition.replace('_', ' ').toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="actions-cell">
                                    <button className="icon-btn" title="More">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="products-mobile-cards">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-mobile-card">
                        <div className="product-mobile-card__header">
                            <div className="product-mobile-card__info">
                                <img src={product.image} alt={product.name} className="product-mobile-card__image" />
                                <div className="product-mobile-card__main">
                                    <span className="product-mobile-card__name">{product.name}</span>
                                    <span className="product-mobile-card__id">{product.id}</span>
                                </div>
                            </div>
                            <button className="icon-btn">
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <div className="product-mobile-card__body">
                            <div className="product-mobile-card__grid">
                                <div className="product-mobile-card__field">
                                    <span className="field-label">Price</span>
                                    <span className="price-value">{formatCurrency(product.price)}</span>
                                </div>
                                <div className="product-mobile-card__field">
                                    <span className="field-label">Stock</span>
                                    <span className="stock-value">{product.stock} units</span>
                                </div>
                                <div className="product-mobile-card__field">
                                    <span className="field-label">Category</span>
                                    <span className="text-sm font-medium">{product.category}</span>
                                </div>
                                <div className="product-mobile-card__field">
                                    <span className="field-label">Status</span>
                                    <div className="flex gap-1.5 flex-wrap">
                                        <span className={`status-pill ${product.status}`}>
                                            {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.replace('_', ' ').slice(1)}
                                        </span>
                                        {product.condition && (
                                            <span className="text-[10px] font-semibold text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200 uppercase">
                                                {product.condition.replace('_', ' ')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
        </div>
    );
};
