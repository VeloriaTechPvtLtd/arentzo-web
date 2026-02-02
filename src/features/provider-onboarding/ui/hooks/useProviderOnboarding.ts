import { useContext } from 'react';
import { ProviderOnboardingContext } from '../context/ProviderOnboardingContext';

export const useProviderOnboarding = () => {
    const context = useContext(ProviderOnboardingContext);
    if (!context) {
        throw new Error('useProviderOnboarding must be used within a ProviderOnboardingProvider');
    }
    return context;
};
