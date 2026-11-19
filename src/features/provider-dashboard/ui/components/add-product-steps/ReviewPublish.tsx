import React from 'react';
import { CheckCircle2, MapPin, Calendar, CreditCard, ShieldCheck } from 'lucide-react';
import type { ProductDraftFields } from '../AddProductForm';

interface ReviewPublishProps {
    onPublish: () => void;
    data: { form: ProductDraftFields; categoryName?: string; subcategoryName?: string; subcategoryImage?: string; rates?: { price?: number } };
}

export const ReviewPublish: React.FC<ReviewPublishProps> = ({ onPublish, data }) => {
    return (
        <div className="step-content">
            <div className="review-header text-center py-6">
                <div className="success-icon-bg mx-auto">
                    <CheckCircle2 size={40} className="text-primary" />
                </div>
                <h2 className="text-2xl font-800 mt-4">Review Your Listing</h2>
                <p className="text-muted-foreground mt-2">Check all details before publishing to the marketplace</p>
            </div>

            <div className="review-sections space-y-6 mt-4">
                {/* Product Summary */}
                <div className="review-section-card">
                    <div className="review-section-header">
                        <span className="section-title">Product Details</span>
                        <button className="edit-link">Edit</button>
                    </div>
                    <div className="product-summary mt-3">
                        <img src={data.subcategoryImage} alt="Product" className="summary-img" />
                        <div className="summary-info">
                            <h3 className="font-700">{data.form.title || 'Untitled listing'}</h3>
                            <p className="text-sm text-muted-foreground">{data.categoryName} • {data.subcategoryName}</p>
                            {data.rates?.price ? <span className="price-tag mt-2">₹{data.rates.price}/day</span> : null}
                        </div>
                    </div>
                </div>

                {/* Location & Delivery */}
                <div className="review-section-card">
                    <div className="review-section-header">
                        <span className="section-title">Location & Delivery</span>
                        <button className="edit-link">Edit</button>
                    </div>
                    <div className="icon-detail-row mt-3">
                        <MapPin size={18} className="text-primary" />
                        <div>
                        <p className="font-600">No saved location</p>
                        <p className="text-xs text-muted-foreground">Location details are not yet connected.</p>
                        </div>
                    </div>
                </div>

                {/* Rates & Terms */}
                <div className="review-section-card">
                    <div className="review-section-header">
                        <span className="section-title">Rates & Terms</span>
                        <button className="edit-link">Edit</button>
                    </div>
                    <div className="info-grid mt-3">
                        <div className="icon-detail-row">
                            <CreditCard size={18} className="text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Security Deposit</p>
                                <p className="font-600">Not configured</p>
                            </div>
                        </div>
                        <div className="icon-detail-row">
                            <ShieldCheck size={18} className="text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Terms</p>
                                <p className="font-600">Not configured</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Availability */}
                <div className="review-section-card">
                    <div className="review-section-header">
                        <span className="section-title">Availability</span>
                        <button className="edit-link">Edit</button>
                    </div>
                    <div className="icon-detail-row mt-3">
                        <Calendar size={18} className="text-primary" />
                        <div>
                            <p className="font-600">Not configured</p>
                            <p className="text-xs text-muted-foreground">Availability settings are not connected.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="step-footer mt-8">
                <button className="next-btn publish-btn" onClick={onPublish}>Publish Listing</button>
            </div>
        </div>
    );
};
