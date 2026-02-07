import React, { useState } from 'react';

interface RentalRatesProps {
    onNext: () => void;
}

export const RentalRates: React.FC<RentalRatesProps> = ({ onNext }) => {
    const [enableSubscription, setEnableSubscription] = useState(true);
    const [freeTrial, setFreeTrial] = useState(true);

    return (
        <div className="step-content">
            <div className="rates-card">
                <div className="input-group">
                    <label>Actual Price per day</label>
                    <div className="price-input-wrapper">
                        <span className="currency-symbol">₹</span>
                        <input type="text" placeholder="0.00" />
                    </div>
                </div>

                <div className="input-group">
                    <label>Discounted Price per day</label>
                    <div className="price-input-wrapper">
                        <span className="currency-symbol">₹</span>
                        <input type="text" placeholder="0.00" />
                    </div>
                </div>

                <div className="grid-2-cols">
                    <div className="input-group">
                        <label>Weekly Discount</label>
                        <div className="percent-input-wrapper">
                            <input type="text" placeholder="0.00" />
                            <span className="percent-symbol">%</span>
                        </div>
                    </div>
                    <div className="input-group">
                        <label>Monthly Discount</label>
                        <div className="percent-input-wrapper">
                            <input type="text" placeholder="0.00" />
                            <span className="percent-symbol">%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rates-card mt-6">
                <div className="input-group">
                    <label>Deposit</label>
                    <div className="price-input-wrapper">
                        <span className="currency-symbol">₹</span>
                        <input type="text" placeholder="0.00" />
                    </div>
                </div>
                <p className="helper-text">Set a refundable security deposit, temporarily held on the renter's card until the booking is completed.</p>

                <div className="valuation-section mt-4">
                    <label className="section-label">Product Valuation</label>
                    <div className="grid-2-cols">
                        <div className="input-group">
                            <label className="sub-label">Market value</label>
                            <div className="price-input-wrapper">
                                <span className="currency-symbol">₹</span>
                                <input type="text" placeholder="0.00" />
                            </div>
                            <p className="tiny-text">Current estimated worth of the product.</p>
                        </div>
                        <div className="input-group">
                            <label className="sub-label">Replacement value</label>
                            <div className="price-input-wrapper">
                                <span className="currency-symbol">₹</span>
                                <input type="text" placeholder="0.00" />
                            </div>
                            <p className="tiny-text">Cost to replace if lost or damaged.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rates-card mt-6">
                <div className="toggle-header">
                    <div className="toggle-info">
                        <div className="icon-badge">🏷️</div>
                        <div>
                            <span className="toggle-title">Enable Subscription</span>
                            <p className="toggle-subtitle">Fixed duration & fee plan</p>
                        </div>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={enableSubscription}
                            onChange={(e) => setEnableSubscription(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                {enableSubscription && (
                    <div className="subscription-fields mt-4 space-y-4">
                        <div className="input-group">
                            <label>Minimum Subscription Duration</label>
                            <input type="text" placeholder="e.g. 1 Month" />
                        </div>
                        <div className="input-group">
                            <label>Subscription Duration</label>
                            <input type="text" placeholder="e.g. 1 Month" />
                        </div>
                        <div className="grid-2-cols">
                            <div className="input-group">
                                <label>Flat Monthly Fee</label>
                                <div className="price-input-wrapper">
                                    <span className="currency-symbol">₹</span>
                                    <input type="text" placeholder="0.00" />
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Monthly Discount</label>
                                <div className="percent-input-wrapper">
                                    <input type="text" placeholder="0.00" />
                                    <span className="percent-symbol">%</span>
                                </div>
                            </div>
                        </div>

                        <div className="toggle-header pt-4">
                            <div className="toggle-info">
                                <div className="icon-badge rotate-icon">🔄</div>
                                <div>
                                    <span className="toggle-title">Free Trail</span>
                                    <p className="toggle-subtitle">Enable free trail to this listing</p>
                                </div>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={freeTrial}
                                    onChange={(e) => setFreeTrial(e.target.checked)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        {freeTrial && (
                            <div className="input-group">
                                <label>Free Trail Duration</label>
                                <div className="unit-input-wrapper">
                                    <input type="text" placeholder="e.g. 4 days" />
                                    <span className="unit-label">/ Days</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="step-footer">
                <button className="next-btn" onClick={onNext}>Next</button>
            </div>
        </div>
    );
};
