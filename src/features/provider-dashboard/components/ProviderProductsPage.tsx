import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Box,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { mockProductAnalytics } from '../mockData';
import { ProductAnalyticsTable } from './ProductAnalyticsTable';
import { AddProductForm } from './AddProductForm';
import '../ProviderDashboard.css';

export const ProviderProductsPage: React.FC = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="provider-dashboard">
            <header className="dashboard-header">
                <div className="dashboard-title">
                    <h1>My Products</h1>
                    <p>Manage your inventory and track performance per item.</p>
                </div>

                <button className="quick-btn-main !w-auto !px-8 shadow-primary/20" onClick={() => setShowAddProduct(true)}>
                    <Plus size={20} /> Add New Product
                </button>
            </header>

            {/* Product Stats Row */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><Box size={24} /></div>
                    <span className="stat-label">Active Listings</span>
                    <div className="stat-value-container">
                        <span className="stat-value">12</span>
                        <span className="stat-change stat-change--up">
                            <ArrowUpRight size={14} style={{ marginRight: 4 }} /> 2
                        </span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#fffbeb', color: '#f59e0b' }}><Box size={24} /></div>
                    <span className="stat-label">Out of Stock</span>
                    <div className="stat-value-container">
                        <span className="stat-value">03</span>
                        <span className="stat-change stat-change--down">
                            <ArrowDownRight size={14} style={{ marginRight: 4 }} /> 1
                        </span>
                    </div>
                </div>
            </div>

            <main className="bg-card border border-border rounded-[32px] overflow-hidden shadow-sm">
                <div className="p-8 border-b border-border flex flex-wrap gap-4 justify-between items-center bg-secondary/10">
                    <div className="flex-1 min-w-[300px] relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, ID or category..."
                            className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-card hover:bg-secondary/50 px-6 py-4 rounded-2xl border border-border text-sm font-bold transition-all">
                            <Filter size={18} /> Filters
                        </button>
                        <button className="flex items-center gap-2 bg-card hover:bg-secondary/50 px-6 py-4 rounded-2xl border border-border text-sm font-bold transition-all">
                            Sort by <MoreHorizontal size={18} />
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    <ProductAnalyticsTable products={mockProductAnalytics} />
                </div>
            </main>

            {showAddProduct && (
                <AddProductForm
                    onClose={() => setShowAddProduct(false)}
                    onSuccess={() => setShowAddProduct(false)}
                />
            )}
        </div>
    );
};
