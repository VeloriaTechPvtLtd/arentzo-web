import React, { useRef } from 'react';
import { Camera, CloudUpload } from 'lucide-react';
import { useProviderOnboarding } from '../context/ProviderOnboardingContext';

export const BusinessRepresentativeInfo: React.FC = () => {
    const { businessRepresentative, updateBusinessRepresentative, nextStep } = useProviderOnboarding();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            updateBusinessRepresentative({ governmentId: e.target.files[0] });
        }
    };

    const isValid = businessRepresentative.fullName &&
        businessRepresentative.designation &&
        businessRepresentative.mobileNumber &&
        businessRepresentative.email;

    return (
        <div className="onboarding-step">
            <div className="onboarding-step__header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <h2 className="onboarding-step__title">Representative Details</h2>
                <p className="onboarding-step__description">
                    Please provide details of the authorized person managing this business account.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Contact Person Full Name</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Jack Ryan"
                    value={businessRepresentative.fullName}
                    onChange={(e) => updateBusinessRepresentative({ fullName: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Designation</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Manager, Owner"
                    value={businessRepresentative.designation}
                    onChange={(e) => updateBusinessRepresentative({ designation: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <div className="otp-input-group">
                    <input
                        type="text"
                        className="form-input country-code"
                        value="+91"
                        readOnly
                    />
                    <div className="phone-input-wrapper">
                        <input
                            type="tel"
                            className="form-input"
                            placeholder="12345-67890"
                            style={{ paddingRight: '100px' }}
                            value={businessRepresentative.mobileNumber}
                            onChange={(e) => updateBusinessRepresentative({ mobileNumber: e.target.value })}
                        />
                        <button className="send-otp-btn">Send OTP</button>
                    </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '4px' }}>
                    We will send a verification code to this number.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                    type="email"
                    className="form-input"
                    placeholder="jackryan@gmail.com"
                    value={businessRepresentative.email}
                    onChange={(e) => updateBusinessRepresentative({ email: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Government ID of Contact Person</label>
                <div
                    className="upload-box"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ borderStyle: 'dashed', backgroundColor: businessRepresentative.governmentId ? '#FFF5F3' : '#F9FAFB' }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                    />
                    <div className="upload-box__icon">
                        <CloudUpload size={32} color="#FF9B82" />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', fontWeight: '700' }}>Tap to Upload</h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#6B7280' }}>
                            {businessRepresentative.governmentId
                                ? businessRepresentative.governmentId.name
                                : 'Passport, Driver\'s License, or National ID'}
                        </p>
                        {!businessRepresentative.governmentId && (
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.6875rem', color: '#9CA3AF' }}>
                                (Max file size: 5MB)
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <button
                className="primary-btn"
                onClick={nextStep}
                disabled={!isValid}
                style={{ height: '54px', marginTop: '1rem' }}
            >
                Save & Continue
            </button>
        </div>
    );
};
