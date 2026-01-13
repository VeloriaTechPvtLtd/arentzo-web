import React, { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Plus
} from 'lucide-react';
import { mockProducts } from '../data/productsMockData';
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
                            <th>Status</th>
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
                                    <span className={`status-pill ${product.status}`}>
                                        {product.status.replace('_', ' ').charAt(0).toUpperCase() + product.status.replace('_', ' ').slice(1)}
                                    </span>
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
