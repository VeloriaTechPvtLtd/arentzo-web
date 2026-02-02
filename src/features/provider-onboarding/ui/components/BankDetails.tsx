import React, { useState } from 'react';
import { useProviderOnboarding } from '../hooks/useProviderOnboarding';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export const BankDetails: React.FC = () => {
    const { bankDetails, updateBankDetails } = useProviderOnboarding();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }, 1500);
    };

    const isValid = bankDetails.accountHolderName && bankDetails.accountNumber && bankDetails.ifscCode;

    if (isSuccess) {
        return (
            <div className="onboarding-step" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    backgroundColor: '#ECFDF5',
                    border: '2px solid #10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: '#10B981',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
                }}>
                    <CheckCircle size={48} />
                </div>
                <h2 style={{ fontSize: '1.625rem', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>Application Submitted!</h2>
                <p style={{ color: '#6B7280', fontSize: '1rem', lineHeight: '1.5' }}>
                    Your details are under review. We'll notify you once your provider account is active.
                </p>
                <button
                    className="primary-btn"
                    onClick={() => window.location.reload()}
                    style={{ marginTop: '2rem' }}
                >
                    Back to Profile
                </button>
            </div>
        );
    }

    return (
        <div className="onboarding-step">
            <div style={{
                backgroundColor: '#F3F4F6',
                padding: '1rem',
                borderRadius: '12px',
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'flex-start',
                marginBottom: '0.5rem'
            }}>
                <ShieldCheck size={24} color="#FF8066" style={{ flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#4B5563', lineHeight: '1.4' }}>
                    Your bank details are secure and only used for processing your rental payouts.
                </p>
            </div>

            <div className="form-group">
                <label className="form-label">Account Holder Name</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="As per bank record"
                    value={bankDetails.accountHolderName}
                    onChange={(e) => updateBankDetails({ accountHolderName: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Account Number</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your account number"
                    value={bankDetails.accountNumber}
                    onChange={(e) => updateBankDetails({ accountNumber: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">IFSC Code</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. HDFC0001234"
                    value={bankDetails.ifscCode}
                    onChange={(e) => updateBankDetails({ ifscCode: e.target.value.toUpperCase() })}
                />
                <button
                    type="button"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#FF8066',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textAlign: 'left',
                        padding: '0 4px',
                        cursor: 'pointer',
                        width: 'fit-content'
                    }}
                >
                    Find IFSC Code?
                </button>
            </div>

            <div className="form-group">
                <label className="form-label">Bank Name</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. HDFC Bank"
                    value={bankDetails.bankName || ''}
                    onChange={(e) => updateBankDetails({ bankName: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">UPI ID (Optional)</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="yourname@upi"
                    value={bankDetails.upiId}
                    onChange={(e) => updateBankDetails({ upiId: e.target.value })}
                />
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                <button
                    className="primary-btn"
                    onClick={handleSubmit}
                    disabled={!isValid || isSubmitting}
                    style={{ height: '54px' }}
                >
                    {isSubmitting ? 'Processing Application...' : 'Finish Registration'}
                </button>
            </div>
        </div>
    );
};
