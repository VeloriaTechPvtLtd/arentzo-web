import React, { useState } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { useProviderOnboarding } from '../hooks/useProviderOnboarding';

export const BusinessAddressInfo: React.FC = () => {
    const { businessAddress, updateBusinessAddress, nextStep } = useProviderOnboarding();
    const [areaInput, setAreaInput] = useState('');

    const handleAddArea = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && areaInput.trim()) {
            if (!businessAddress.serviceAreas.includes(areaInput.trim())) {
                updateBusinessAddress({
                    serviceAreas: [...businessAddress.serviceAreas, areaInput.trim()]
                });
            }
            setAreaInput('');
        }
    };

    const handleRemoveArea = (area: string) => {
        updateBusinessAddress({
            serviceAreas: businessAddress.serviceAreas.filter(a => a !== area)
        });
    };

    const updateAddr = (field: string, value: string) => {
        updateBusinessAddress({
            registeredAddress: {
                ...businessAddress.registeredAddress,
                [field]: value
            }
        });
    };

    const addr = businessAddress.registeredAddress;
    const isValid = addr.street && addr.zip && addr.city && addr.state;

    return (
        <div className="onboarding-step">
            <div className="onboarding-step__header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <h2 className="onboarding-step__title">Where is your Business located?</h2>
                <p className="onboarding-step__description">
                    This helps us verify your operations and connect you with local customers.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ fontSize: '1.0625rem', fontWeight: 800 }}>Registered Business Address</label>
            </div>

            <div className="form-group">
                <label className="form-label">Street Address</label>
                <div className="input-with-icon">
                    <input
                        type="text"
                        className="form-input"
                        placeholder="123 Market St"
                        value={addr.street}
                        onChange={(e) => updateAddr('street', e.target.value)}
                    />
                    <MapPin size={20} className="input-icon-right" />
                </div>
            </div>

            <div className="address-grid">
                <div className="form-group">
                    <label className="form-label">Apt / Suit</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Unit 4B"
                        value={addr.apt}
                        onChange={(e) => updateAddr('apt', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Zip Code</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="10001"
                        value={addr.zip}
                        onChange={(e) => updateAddr('zip', e.target.value)}
                    />
                </div>
            </div>

            <div className="address-grid">
                <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="New York"
                        value={addr.city}
                        onChange={(e) => updateAddr('city', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="NY"
                        value={addr.state}
                        onChange={(e) => updateAddr('state', e.target.value)}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderTop: '1px solid #F3F4F6' }}>
                <div>
                    <h4 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 800 }}>Operating Address</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8125rem', color: '#6B7280' }}>
                        Same as registered address
                    </p>
                </div>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={businessAddress.isOperatingSame}
                        onChange={(e) => updateBusinessAddress({ isOperatingSame: e.target.checked })}
                    />
                    <span className="slider round"></span>
                </label>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label" style={{ fontSize: '1.0625rem', fontWeight: 800 }}>Service Areas</label>
                    <button style={{ background: 'none', border: 'none', color: '#FF8066', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
                        View Map
                    </button>
                </div>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#6B7280' }}>
                    Search service cities or pin codes
                </p>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#D1D5DB' }}>
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        className="form-input"
                        style={{ paddingLeft: '44px' }}
                        placeholder="Enter city or pincode..."
                        value={areaInput}
                        onChange={(e) => setAreaInput(e.target.value)}
                        onKeyDown={handleAddArea}
                    />
                </div>
                <div className="tags-container">
                    {businessAddress.serviceAreas.map(area => (
                        <div key={area} className="tag">
                            {area}
                            <X size={14} className="tag-remove" onClick={() => handleRemoveArea(area)} />
                        </div>
                    ))}
                    {/* Mock tags from image */}
                    {businessAddress.serviceAreas.length === 0 && (
                        <>
                            <div className="tag">New York, NY <X size={14} className="tag-remove" /></div>
                            <div className="tag">10001 <X size={14} className="tag-remove" /></div>
                            <div className="tag">Brooklyn, NY <X size={14} className="tag-remove" /></div>
                        </>
                    )}
                </div>
            </div>

            <button
                className="primary-btn"
                onClick={nextStep}
                disabled={!isValid}
                style={{ height: '54px', marginTop: '1.5rem' }}
            >
                Continue
            </button>
        </div>
    );
};
