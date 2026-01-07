import React from 'react';
import { User, Briefcase } from 'lucide-react';
import { useProviderOnboarding, type ProviderType } from '../context/ProviderOnboardingContext';

export const ProviderTypeSelection: React.FC = () => {
    const { providerType, setProviderType, nextStep } = useProviderOnboarding();

    const handleSelect = (type: ProviderType) => {
        setProviderType(type);
    };

    const handleContinue = () => {
        if (providerType) {
            nextStep();
        }
    };

    return (
        <div className="onboarding-step">
            <div className="onboarding-step__header">
                <h2 className="onboarding-step__title">Select your provider type</h2>
                <p className="onboarding-step__description">
                    This choice impacts your rental process and compliance requirements
                </p>
            </div>

            <div
                className={`provider-type-card ${providerType === 'individual' ? 'selected' : ''}`}
                onClick={() => handleSelect('individual')}
            >
                <div className="provider-type-icon">
                    <User size={24} />
                </div>
                <div className="provider-type-info">
                    <h3>Individual Provider</h3>
                    <p>You are a single service provider.</p>
                </div>
                {providerType === 'individual' && (
                    <button className="provider-type-btn" onClick={(e) => {
                        e.stopPropagation();
                        handleContinue();
                    }}>
                        Continue
                    </button>
                )}
            </div>

            <div
                className={`provider-type-card ${providerType === 'business' ? 'selected' : ''}`}
                onClick={() => handleSelect('business')}
            >
                <div className="provider-type-icon">
                    <Briefcase size={24} />
                </div>
                <div className="provider-type-info">
                    <h3>Business Provider</h3>
                    <p>You are a business with multiple service providers.</p>
                </div>
                {providerType === 'business' && (
                    <button className="provider-type-btn" onClick={(e) => {
                        e.stopPropagation();
                        handleContinue();
                    }}>
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
};
