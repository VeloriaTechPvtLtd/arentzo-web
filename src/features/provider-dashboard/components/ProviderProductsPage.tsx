import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Plus,
    CheckCircle2,
    AlertCircle,
    Edit,
    Trash2,
    Eye,
    Star,
    Box
} from 'lucide-react';
import { mockProducts } from '../data/productsMockData';
import type { Product } from '../data/productsMockData';
import { AddProductForm } from './AddProductForm';
import './ProviderProductsPage.css';

export const ProviderProductsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [showAddProduct, setShowAddProduct] = useState(false);

    const filteredProducts = mockProducts.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || product.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusIcon = (status: Product['status']) => {
        switch (status) {
            case 'active': return <CheckCircle2 size={16} className="text-green-500" />;
            case 'out_of_stock': return <AlertCircle size={16} className="text-red-500" />;
            case 'draft': return <Edit size={16} className="text-gray-500" />;
            case 'archived': return <Box size={16} className="text-orange-500" />;
            default: return null;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="provider-products-page">
            <header className="page-header">
                <div className="header-title">
                    <h1>Product Management</h1>
                    <p>Add, edit and track your inventory performance.</p>
                </div>

                <div className="header-actions">
                    <div className="header-stats">
                        <div className="mini-stat">
                            <span className="stat-label">Total Listings</span>
                            <span className="stat-value">{mockProducts.length}</span>
                        </div>
                        <div className="mini-stat">
                            <span className="stat-label">Out of Stock</span>
                            <span className="stat-value text-red-500">
                                {mockProducts.filter(p => p.status === 'out_of_stock').length}
                            </span>
                        </div>
                    </div>
                    <button className="create-product-btn" onClick={() => setShowAddProduct(true)}>
                        <Plus size={20} />
                        <span>Add Product</span>
                    </button>
                </div>
            </header>

            <div className="products-toolbar">
                <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search products, ID or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filters-wrapper">
                    <div className="filter-select">
                        <Filter size={18} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="out_of_stock">Out of Stock</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="products-table-container">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Product Info</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Stats</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                                    <span className="category-badge">{product.category}</span>
                                </td>
                                <td>
                                    <div className={`stock-info ${product.stock === 0 ? 'text-red-500 font-bold' : ''}`}>
                                        {product.stock} units
                                    </div>
                                </td>
                                <td className="price-cell">
                                    <span className="price-value">{formatCurrency(product.price)}</span>
                                    <span className="price-period">/ day</span>
                                </td>
                                <td className="stats-cell">
                                    <div className="performance-stats">
                                        <div className="stat-item" title="Rating">
                                            <Star size={14} className="text-yellow-400" />
                                            <span>{product.rating > 0 ? product.rating : 'N/A'}</span>
                                        </div>
                                        <div className="stat-item" title="Views">
                                            <Eye size={14} className="text-blue-400" />
                                            <span>{product.views}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge status--${product.status}`}>
                                        {getStatusIcon(product.status)}
                                        {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.replace('_', ' ').slice(1)}
                                    </span>
                                </td>
                                <td className="actions-cell">
                                    <button className="icon-btn" title="Edit">
                                        <Edit size={18} />
                                    </button>
                                    <button className="icon-btn text-red-400" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                    <button className="icon-btn" title="More">
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="no-results">
                        <p>No products found matching your criteria.</p>
                    </div>
                )}
            </div>

            {showAddProduct && (
                <AddProductForm
                    onClose={() => setShowAddProduct(false)}
                    onSuccess={() => setShowAddProduct(false)}
                />
            )}
        </div>
    );
};
