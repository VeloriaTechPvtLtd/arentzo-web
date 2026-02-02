import React, { useEffect, useCallback } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { ProviderOnboardingProvider } from '../context/ProviderOnboardingProvider';
import { useProviderOnboarding } from '../hooks/useProviderOnboarding';
import { OnboardingStepper } from './OnboardingStepper';
import '../styles/ProviderOnboarding.css';

const OnboardingContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { currentStep, prevStep } = useProviderOnboarding();

    const handleBack = () => {
        if (currentStep === 1) {
            onClose();
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
            default: return 'Become a Provider';
        }
    };

    return (
        <div className="profile-panel">
            <header className="profile-panel__header">
                <button
                    className="profile-panel__back"
                    onClick={handleBack}
                    aria-label="Back"
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="profile-panel__title">{getTitle()}</h2>
                <button
                    className="profile-panel__close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
            </header>

            <div className="profile-panel__content">
                <OnboardingStepper />
            </div>
        </div>
    );
};

export const ProviderOnboardingPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    return (
        <div className={`profile-overlay ${isOpen ? 'profile-overlay--open' : ''}`}>
            <div className="profile-overlay__backdrop" onClick={handleBackdropClick} />
            <ProviderOnboardingProvider>
                <OnboardingContent onClose={onClose} />
            </ProviderOnboardingProvider>
        </div>
    );
};
