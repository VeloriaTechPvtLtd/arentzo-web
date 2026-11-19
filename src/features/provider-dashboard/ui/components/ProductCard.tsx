import React from 'react';
import {
    Tag,
    Layers,
    Star
} from 'lucide-react';
import { type Product } from '../../infrastructure/api/productsMockData';
import '../styles/ProductCard.css';

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: product.currency || 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusLabel = (status: string) => {
        return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const getConditionLabel = (condition: string) => {
        return condition.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <div className="modern-product-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <div className="product-image-section">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className={`status-overlay ${product.status}`}>
                    {getStatusLabel(product.sourceStatus || product.status)}
                </div>
            </div>

            <div className="product-info-section">
                <div className="product-header">
                    <span className="product-id-tag">{product.id}</span>
                    <div className="product-rating">
                        <Star size={12} fill="currentColor" />
                        <span>{product.rating}</span>
                    </div>
                </div>

                <h3 className="product-title" title={product.name}>
                    {product.name}
                </h3>

                <div className="product-meta-grid">
                    <div className="meta-item">
                        <Tag size={14} className="meta-icon" />
                        <span className="meta-text">{product.category}</span>
                    </div>
                    <div className="meta-item">
                        <Layers size={14} className="meta-icon" />
                        <span className="meta-text">{getConditionLabel(product.condition)}</span>
                    </div>
                </div>

                <div className="product-stats-bar">
                    <div className="product-price-stock">
                        <p className="product-price">{product.hasDailyRate === false ? 'Daily rate not set' : `${formatCurrency(product.price)} / day`}</p>
                        <div className="product-stock-tag">
                            <span className="stock-label">Stock:</span>
                            <span className="stock-value">{product.stock} Units</span>
                        </div>
                    </div>
                </div>

                <div className="product-card-footer">
                    <button className="edit-action-btn" onClick={event => { event.stopPropagation(); onClick?.(); }}>View details</button>
                </div>
            </div>
        </div>
    );
};
