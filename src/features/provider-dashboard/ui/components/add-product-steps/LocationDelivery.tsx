import React from 'react';
import { MapPin, Edit2, Box, Truck, Check } from 'lucide-react';

interface LocationDeliveryProps {
    onNext: () => void;
}

export const LocationDelivery: React.FC<LocationDeliveryProps> = ({ onNext }) => {
    return (
        <div className="step-content">
            <p className="step-description">Configure pickup location & delivery options</p>

            <div className="location-section mt-4">
                <div className="section-header-row">
                    <MapPin size={20} className="section-icon" />
                    <span className="section-title">Pickup Location</span>
                </div>

                <div className="map-card mt-2">
                    <div className="map-preview">
                        <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=800&q=80" alt="Map" />
                        <button className="change-btn"><Edit2 size={14} /> Change</button>
                    </div>
                    <div className="address-info">
                        <span className="address-label">SELECTED ADDRESS</span>
                        <span className="address-value">123 Main St, New York</span>
                        <span className="address-sub">NY 10001, USA</span>
                    </div>
                </div>
            </div>

            <div className="delivery-options-section mt-8">
                <span className="section-title">Delivery Options</span>

                <div className="delivery-card mt-4">
                    <label className="checkbox-row">
                        <div className="checkbox-container">
                            <input type="checkbox" defaultChecked />
                            <span className="checkbox-mark"><Check size={14} /></span>
                        </div>
                        <div className="option-info">
                            <div className="option-title-row">
                                <Box size={18} />
                                <span className="option-title">Self Pickup</span>
                            </div>
                            <p className="option-desc">Customer collects product to customer's location (most common)</p>
                        </div>
                    </label>
                </div>

                <div className="delivery-card mt-4">
                    <label className="checkbox-row align-start">
                        <div className="checkbox-container mt-1">
                            <input type="checkbox" defaultChecked />
                            <span className="checkbox-mark"><Check size={14} /></span>
                        </div>
                        <div className="option-info w-full">
                            <div className="option-title-row">
                                <Truck size={18} />
                                <span className="option-title">Provide Delivery</span>
                            </div>
                            <p className="option-desc">You Deliver the product to customer's location</p>

                            <div className="delivery-fields mt-4">
                                <div className="input-group">
                                    <label>Delivery Radius (Km)</label>
                                    <input type="text" placeholder="Enter delivery radius" />
                                </div>
                                <div className="input-group mt-3">
                                    <label>Delivery Fee</label>
                                    <input type="text" placeholder="e.g. ₹999" />
                                </div>
                            </div>
                        </div>
                    </label>
                </div>

                <div className="summary-banner mt-8">
                    <span className="summary-title">Available Delivery Methods:</span>
                    <ul className="summary-list">
                        <li><Check size={14} /> Self Pickup <span className="highlight">(free)</span></li>
                        <li><Check size={14} /> Provider Delivery <span className="highlight">($50.00, 50km radius)</span></li>
                    </ul>
                </div>
            </div>

            <div className="step-footer">
                <button className="next-btn" onClick={onNext}>Next</button>
            </div>
        </div>
    );
};
