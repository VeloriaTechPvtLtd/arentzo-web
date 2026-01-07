import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProviderOnboarding } from '../context/ProviderOnboardingContext';
import { CheckCircle } from 'lucide-react';

export const BankDetails: React.FC = () => {
    const { bankDetails, updateBankDetails } = useProviderOnboarding();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }, 1500);
    };

    const isValid = bankDetails.accountHolderName && bankDetails.accountNumber && bankDetails.ifscCode;

    if (isSuccess) {
        return (
            <div className="onboarding-step" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <CheckCircle size={64} style={{ color: '#4caf50', marginBottom: '1rem' }} />
                <h2 style={{ color: 'var(--text-primary)' }}>Registration Successful!</h2>
                <p style={{ color: 'var(--text-secondary)' }}>You are now a service provider.</p>
            </div>
        );
    }

    return (
        <div className="onboarding-step">
            <div className="form-group">
                <label className="form-label">Account Holder Name</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter account holder name"
                    value={bankDetails.accountHolderName}
                    onChange={(e) => updateBankDetails({ accountHolderName: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Account Number</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter account number"
                    value={bankDetails.accountNumber}
                    onChange={(e) => updateBankDetails({ accountNumber: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">IFSC Code</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter IFSC code"
                    value={bankDetails.ifscCode}
                    onChange={(e) => updateBankDetails({ ifscCode: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Pan Number</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your Pan card number"
                    value={bankDetails.panNumber}
                    onChange={(e) => updateBankDetails({ panNumber: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">UPI Id (Optional)</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter UPI Id"
                    value={bankDetails.upiId}
                    onChange={(e) => updateBankDetails({ upiId: e.target.value })}
                />
            </div>

            <button
                className="primary-btn"
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Next'}
            </button>
        </div>
    );
};
