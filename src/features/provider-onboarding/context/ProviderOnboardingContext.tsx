import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type ProviderType = 'individual' | 'business';

export interface SocialLink {
    id: string;
    url: string;
}

export interface ProviderBasicInfo {
    businessName: string;
    specialization: string;
    description: string;
    dob: string;
    gender: string;
    phoneNumber: string;
    socialLinks: SocialLink[];
    profileImage: string | null;
}

export interface VerificationDetails {
    documentType: 'aadhaar' | 'driving_license';
    documentNumber: string;
    frontImage: File | null;
    backImage: File | null;
    panNumber: string;
    selfieImage: File | null;
    differentAddress: boolean;
}

export interface BankDetails {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    panNumber: string; // Repeated in designs, might be same as above
    upiId: string;
}

interface ProviderOnboardingState {
    providerType: ProviderType | null;
    currentStep: number;
    basicInfo: ProviderBasicInfo;
    verification: VerificationDetails;
    bankDetails: BankDetails;
}

interface ProviderOnboardingContextType extends ProviderOnboardingState {
    setProviderType: (type: ProviderType) => void;
    setStep: (step: number) => void;
    updateBasicInfo: (info: Partial<ProviderBasicInfo>) => void;
    updateVerification: (info: Partial<VerificationDetails>) => void;
    updateBankDetails: (info: Partial<BankDetails>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const ProviderOnboardingContext = createContext<ProviderOnboardingContextType | undefined>(undefined);

const initialBasicInfo: ProviderBasicInfo = {
    businessName: '',
    specialization: '',
    description: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    socialLinks: [{ id: '1', url: '' }],
    profileImage: null,
};

const initialVerification: VerificationDetails = {
    documentType: 'aadhaar',
    documentNumber: '',
    frontImage: null,
    backImage: null,
    panNumber: '',
    selfieImage: null,
    differentAddress: false,
};

const initialBankDetails: BankDetails = {
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    panNumber: '',
    upiId: '',
};

export const ProviderOnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [providerType, setProviderType] = useState<ProviderType | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [basicInfo, setBasicInfo] = useState<ProviderBasicInfo>(initialBasicInfo);
    const [verification, setVerification] = useState<VerificationDetails>(initialVerification);
    const [bankDetails, setBankDetails] = useState<BankDetails>(initialBankDetails);

    const updateBasicInfo = (info: Partial<ProviderBasicInfo>) => {
        setBasicInfo((prev) => ({ ...prev, ...info }));
    };

    const updateVerification = (info: Partial<VerificationDetails>) => {
        setVerification((prev) => ({ ...prev, ...info }));
    };

    const updateBankDetails = (info: Partial<BankDetails>) => {
        setBankDetails((prev) => ({ ...prev, ...info }));
    };

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => Math.max(1, prev - 1));

    return (
        <ProviderOnboardingContext.Provider
            value={{
                providerType,
                currentStep,
                basicInfo,
                verification,
                bankDetails,
                setProviderType,
                setStep: setCurrentStep,
                updateBasicInfo,
                updateVerification,
                updateBankDetails,
                nextStep,
                prevStep,
            }}
        >
            {children}
        </ProviderOnboardingContext.Provider>
    );
};

export const useProviderOnboarding = () => {
    const context = useContext(ProviderOnboardingContext);
    if (!context) {
        throw new Error('useProviderOnboarding must be used within a ProviderOnboardingProvider');
    }
    return context;
};
