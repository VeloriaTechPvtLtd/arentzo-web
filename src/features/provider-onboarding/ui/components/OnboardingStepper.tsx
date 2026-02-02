import React from 'react';
import { useProviderOnboarding } from '../hooks/useProviderOnboarding';
import { ProviderTypeSelection } from './ProviderTypeSelection';
import { ProviderBasicInfo } from './ProviderBasicInfo';
import { IdentityVerification } from './IdentityVerification';
import { BankDetails } from './BankDetails';

// Business Components
import { BusinessRepresentativeInfo } from './BusinessRepresentativeInfo';
import { BusinessProfileInfo } from './BusinessProfileInfo';
import { BusinessAddressInfo } from './BusinessAddressInfo';
import { BusinessBankingInfo } from './BusinessBankingInfo';
import { BusinessDocumentsInfo } from './BusinessDocumentsInfo';

export const OnboardingStepper: React.FC = () => {
    const { currentStep, providerType } = useProviderOnboarding();

    if (providerType === 'business') {
        return (
            <div className="onboarding-stepper-content">
                {currentStep === 1 && <ProviderTypeSelection />}
                {currentStep === 2 && <BusinessRepresentativeInfo />}
                {currentStep === 3 && <BusinessProfileInfo />}
                {currentStep === 4 && <BusinessAddressInfo />}
                {currentStep === 5 && <BusinessBankingInfo />}
                {currentStep === 6 && <BusinessDocumentsInfo />}
            </div>
        );
    }

    // Individual flow (default)
    return (
        <div className="onboarding-stepper-content">
            {currentStep === 1 && <ProviderTypeSelection />}
            {currentStep === 2 && <ProviderBasicInfo />}
            {currentStep === 3 && <IdentityVerification />}
            {currentStep === 4 && <BankDetails />}
        </div>
    );
};
