import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProviderOnboardingProvider, useProviderOnboarding } from './context/ProviderOnboardingContext';
import { ProviderTypeSelection } from './components/ProviderTypeSelection';
import { ProviderBasicInfo } from './components/ProviderBasicInfo';
import { IdentityVerification } from './components/IdentityVerification';
import { BankDetails } from './components/BankDetails';
import './ProviderOnboarding.css';

const OnboardingContent: React.FC = () => {
    const navigate = useNavigate();
    const { currentStep, prevStep } = useProviderOnboarding();

    const handleBack = () => {
        if (currentStep === 1) {
            navigate(-1);
        } else {
            prevStep();
        }
    };

    const getTitle = () => {
        switch (currentStep) {
            case 1: return 'Provider Type';
            case 2: return 'Basic Info';
            case 3: return 'Identity Verification';
            case 4: return 'Bank Details';
            default: return 'Provider Registration';
        }
    };

    return (
        <div className="provider-onboarding-page">
            <header className="provider-onboarding__header">
                <button onClick={handleBack} className="provider-onboarding__back-btn">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="provider-onboarding__title">{getTitle()}</h1>
                <div className="provider-onboarding__header-spacer" />
            </header>

            <main className="provider-onboarding__content">
                {currentStep === 1 && <ProviderTypeSelection />}
                {currentStep === 2 && <ProviderBasicInfo />}
                {currentStep === 3 && <IdentityVerification />}
                {currentStep === 4 && <BankDetails />}
            </main>
        </div>
    );
};

export const ProviderOnboardingPage: React.FC = () => {
    // Wrap content in provider here to ensure context is available
    return (
        <ProviderOnboardingProvider>
            <OnboardingContent />
        </ProviderOnboardingProvider>
    );
};
