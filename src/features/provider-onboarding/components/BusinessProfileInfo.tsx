import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useProviderOnboarding } from '../context/ProviderOnboardingContext';

export const BusinessProfileInfo: React.FC = () => {
    const { businessProfile, updateBusinessProfile, nextStep } = useProviderOnboarding();

    const isValid = businessProfile.legalName &&
        businessProfile.businessType &&
        businessProfile.businessPan;

    const businessTypes = ['Sole Proprietorship', 'Partnership', 'Pvt Ltd', 'LLP', 'Other'];
    const categories = ['Electronics', 'Furniture', 'Photography', 'Camping', 'Sports'];

    return (
        <div className="onboarding-step">
            <div className="onboarding-step__header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <h2 className="onboarding-step__title">Tell us about your Business</h2>
                <p className="onboarding-step__description">
                    Please enter your details exactly as they appear on your legal documents to set up your rental profile.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Legal Business Name</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Angle one"
                    value={businessProfile.legalName}
                    onChange={(e) => updateBusinessProfile({ legalName: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Business Type</label>
                <div style={{ position: 'relative' }}>
                    <select
                        className="form-select"
                        style={{ width: '100%', appearance: 'none', paddingRight: '40px' }}
                        value={businessProfile.businessType}
                        onChange={(e) => updateBusinessProfile({ businessType: e.target.value })}
                    >
                        <option value="" disabled>Select Business Type</option>
                        {businessTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <ChevronDown size={20} className="input-icon-right" />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Rental Focus <span style={{ fontWeight: 400, color: '#6B7280' }}>(Select all that apply)</span></label>
                <div style={{ position: 'relative' }}>
                    <select
                        className="form-select"
                        style={{ width: '100%', appearance: 'none', paddingRight: '40px' }}
                        multiple={false} // Keeping it simple for now, but UI shows dropdown
                        value={businessProfile.rentalFocus[0] || ''}
                        onChange={(e) => updateBusinessProfile({ rentalFocus: [e.target.value] })}
                    >
                        <option value="" disabled>Select Rental Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <ChevronDown size={20} className="input-icon-right" />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Business PAN</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    value={businessProfile.businessPan}
                    onChange={(e) => updateBusinessProfile({ businessPan: e.target.value.toUpperCase() })}
                />
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>
                    10-digit Permanent Account Number
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Registration Number (CIN / Udyam)</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="U56432JH5432UYT..."
                        style={{ paddingRight: '80px' }}
                        value={businessProfile.registrationNumber}
                        onChange={(e) => updateBusinessProfile({ registrationNumber: e.target.value })}
                    />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8125rem', color: '#9CA3AF' }}>
                        Optional
                    </span>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">GSTIN</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="23AAAAA23AA23AS"
                        style={{ paddingRight: '80px' }}
                        value={businessProfile.gstin}
                        onChange={(e) => updateBusinessProfile({ gstin: e.target.value.toUpperCase() })}
                    />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8125rem', color: '#9CA3AF' }}>
                        Optional
                    </span>
                </div>
            </div>

            <button
                className="primary-btn"
                onClick={nextStep}
                disabled={!isValid}
                style={{ height: '54px', marginTop: '1.5rem' }}
            >
                Save & Continue
            </button>
        </div>
    );
};
