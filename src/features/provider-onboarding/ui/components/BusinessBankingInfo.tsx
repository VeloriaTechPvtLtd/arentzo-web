import React, { useRef } from 'react';
import { Lock, CloudUpload, CheckCircle2 } from 'lucide-react';
import { useProviderOnboarding } from '../hooks/useProviderOnboarding';

export const BusinessBankingInfo: React.FC = () => {
    const { businessBanking, updateBusinessBanking, businessProfile, nextStep } = useProviderOnboarding();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            updateBusinessBanking({ bankProof: e.target.files[0] });
        }
    };

    const isValid = businessBanking.accountNumber &&
        businessBanking.ifscCode &&
        businessBanking.bankProof;

    return (
        <div className="onboarding-step">
            <div className="onboarding-step__header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <h2 className="onboarding-step__title">Banking & Payments</h2>
                <p className="onboarding-step__description">
                    Enter your payout details. Account holder name must match business name.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Account Holder Name</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className="form-input form-input--locked"
                        value={businessProfile.legalName || 'Angle one Enterprises'}
                        readOnly
                    />
                    <Lock size={18} className="input-lock-icon" />
                </div>
                <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>ⓘ</span> Autofilled from PAN verification, non-editable
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Account Number</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter Account Number"
                    value={businessBanking.accountNumber}
                    onChange={(e) => updateBusinessBanking({ accountNumber: e.target.value })}
                />
            </div>

            <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label">IFSC Code</label>
                    <button style={{ background: 'none', border: 'none', color: '#FF8066', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
                        Find Code
                    </button>
                </div>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="HDFC00001223"
                        style={{ paddingRight: '40px' }}
                        value={businessBanking.ifscCode}
                        onChange={(e) => updateBusinessBanking({ ifscCode: e.target.value.toUpperCase() })}
                    />
                    <CheckCircle2 size={20} className="input-icon-right" color="#FF8066" />
                </div>
                <p style={{ fontSize: '0.8125rem', color: '#10B981', fontWeight: 600, marginTop: '8px' }}>
                    HDFC Bank, Koramangala Branch
                </p>
            </div>

            <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="form-label">Verification Document</label>
                    <span style={{ fontSize: '0.8125rem', color: '#9CA3AF', backgroundColor: '#F3F4F6', padding: '2px 8px', borderRadius: '4px' }}>Optional</span>
                </div>
                <p style={{ margin: '4px 0 8px 0', fontSize: '0.875rem', color: '#6B7280' }}>
                    Upload one of the following proofs:
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div
                        className={`segmented-control__item ${businessBanking.documentType === 'cheque' ? 'active' : ''}`}
                        style={{ border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px' }}
                        onClick={() => updateBusinessBanking({ documentType: 'cheque' })}
                    >
                        <CheckCircle2 size={16} /> Cancelled Cheque <span style={{ fontSize: '0.6875rem', opacity: 0.6 }}>(jpg/PDF)</span>
                    </div>
                    <div
                        className={`segmented-control__item ${businessBanking.documentType === 'statement' ? 'active' : ''}`}
                        style={{ border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px' }}
                        onClick={() => updateBusinessBanking({ documentType: 'statement' })}
                    >
                        <CheckCircle2 size={16} /> Bank Statement
                    </div>
                </div>

                <div
                    className="upload-box upload-box--mini"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ borderStyle: 'dashed', marginTop: '1rem', backgroundColor: businessBanking.bankProof ? '#FFF5F3' : '#F9FAFB' }}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        hidden
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                    />
                    <div className="upload-box__icon">
                        <CloudUpload size={24} color="#FF9B82" />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h4 style={{ margin: '0 0 0.125rem 0', fontSize: '0.9375rem', fontWeight: '700' }}>
                            {businessBanking.bankProof ? 'Bank Proof Uploaded' : 'Upload Bank Proof'}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#6B7280' }}>
                            {businessBanking.bankProof ? businessBanking.bankProof.name : 'Tap to browse files'}
                        </p>
                        {!businessBanking.bankProof && (
                            <p style={{ margin: '2px 0 0 0', fontSize: '0.6875rem', color: '#9CA3AF' }}>(Max file size: 5MB)</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">UPI Handle / VPA</label>
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="user@iupi"
                        style={{ paddingRight: '80px' }}
                        value={businessBanking.upiId}
                        onChange={(e) => updateBusinessBanking({ upiId: e.target.value })}
                    />
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8125rem', color: '#9CA3AF' }}>
                        Optional
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '0.5rem' }}>
                <Lock size={14} color="#9CA3AF" />
                <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', margin: 0 }}>
                    Your payment data is encrypted and secure
                </p>
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
