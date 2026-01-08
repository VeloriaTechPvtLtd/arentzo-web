import React from 'react';
import { MoreHorizontal, Eye, ShoppingCart, Heart } from 'lucide-react';
import type { ProductAnalytics } from '../types';

interface ProductAnalyticsTableProps {
    products: ProductAnalytics[];
}

export const ProductAnalyticsTable: React.FC<ProductAnalyticsTableProps> = ({ products }) => {
    return (
        <div className="products-table-container">
            <table className="products-table">
                <thead>
                    <tr>
                        <th className="!pl-8">Product</th>
                        <th>Status</th>
                        <th>Performance</th>
                        <th>Total Revenue</th>
                        <th className="!pr-8">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-secondary/5 transition-colors">
                            <td className="!pl-8">
                                <div className="product-cell">
                                    <img src={product.image} alt={product.name} className="product-img shadow-sm" />
                                    <div className="product-info">
                                        <span className="product-info-name">{product.name}</span>
                                        <span className="product-info-id">SKU-{product.id.slice(0, 6).toUpperCase()}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className={`status-badge status-badge--${product.status}`}>
                                    {product.status.replace('_', ' ')}
                                </span>
                            </td>
                            <td>
                                <div className="flex items-center gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-900 text-muted-foreground uppercase opacity-60 mb-1">Views</span>
                                        <div className="flex items-center gap-1.5 text-sm font-bold">
                                            <Eye size={14} className="text-primary" /> {product.views.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-900 text-muted-foreground uppercase opacity-60 mb-1">Cart</span>
                                        <div className="flex items-center gap-1.5 text-sm font-bold">
                                            <ShoppingCart size={14} className="text-orange-500" /> {product.cartAdds.toLocaleString()}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-900 text-muted-foreground uppercase opacity-60 mb-1">Likes</span>
                                        <div className="flex items-center gap-1.5 text-sm font-bold">
                                            <Heart size={14} className="text-red-500" /> {product.favorites.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <span className="text-lg font-900 text-foreground">
                                    ₹{product.revenue.toLocaleString()}
                                </span>
                            </td>
                            <td className="!pr-8">
                                <div className="flex gap-2">
                                    <button className="action-btn !bg-card border border-border hover:!border-primary">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
