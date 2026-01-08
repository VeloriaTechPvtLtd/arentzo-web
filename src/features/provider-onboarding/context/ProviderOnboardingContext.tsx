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
    bankName?: string;
    panNumber: string;
    upiId: string;
}

// Business specific interfaces
export interface BusinessRepresentative {
    fullName: string;
    designation: string;
    mobileNumber: string;
    email: string;
    governmentId: File | null;
}

export interface BusinessProfile {
    legalName: string;
    businessType: string;
    rentalFocus: string[];
    businessPan: string;
    registrationNumber: string;
    gstin: string;
}

export interface BusinessAddress {
    registeredAddress: {
        street: string;
        apt: string;
        zip: string;
        city: string;
        state: string;
    };
    isOperatingSame: boolean;
    serviceAreas: string[];
}

export interface BusinessBanking {
    accountHolderName: string;
    accountNumber: string;
    ifscCode: string;
    bankName?: string;
    branchName?: string;
    documentType: 'cheque' | 'statement';
    bankProof: File | null;
    upiId: string;
}

export interface BusinessDocuments {
    panCard: File | null;
    gstCertificate: File | null;
    businessProof: File | null;
    addressProof: File | null;
    tradeLicense: File | null;
    insuranceCert: File | null;
}

interface ProviderOnboardingState {
    providerType: ProviderType | null;
    currentStep: number;
    basicInfo: ProviderBasicInfo;
    verification: VerificationDetails;
    bankDetails: BankDetails;
    // Business specific state
    businessRepresentative: BusinessRepresentative;
    businessProfile: BusinessProfile;
    businessAddress: BusinessAddress;
    businessBanking: BusinessBanking;
    businessDocuments: BusinessDocuments;
}

interface ProviderOnboardingContextType extends ProviderOnboardingState {
    setProviderType: (type: ProviderType) => void;
    setStep: (step: number) => void;
    updateBasicInfo: (info: Partial<ProviderBasicInfo>) => void;
    updateVerification: (info: Partial<VerificationDetails>) => void;
    updateBankDetails: (info: Partial<BankDetails>) => void;
    // Business updaters
    updateBusinessRepresentative: (info: Partial<BusinessRepresentative>) => void;
    updateBusinessProfile: (info: Partial<BusinessProfile>) => void;
    updateBusinessAddress: (info: Partial<BusinessAddress>) => void;
    updateBusinessBanking: (info: Partial<BusinessBanking>) => void;
    updateBusinessDocuments: (info: Partial<BusinessDocuments>) => void;
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

const initialBusinessRepresentative: BusinessRepresentative = {
    fullName: '',
    designation: '',
    mobileNumber: '',
    email: '',
    governmentId: null,
};

const initialBusinessProfile: BusinessProfile = {
    legalName: '',
    businessType: '',
    rentalFocus: [],
    businessPan: '',
    registrationNumber: '',
    gstin: '',
};

const initialBusinessAddress: BusinessAddress = {
    registeredAddress: {
        street: '',
        apt: '',
        zip: '',
        city: '',
        state: '',
    },
    isOperatingSame: true,
    serviceAreas: [],
};

const initialBusinessBanking: BusinessBanking = {
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    documentType: 'cheque',
    bankProof: null,
    upiId: '',
};

const initialBusinessDocuments: BusinessDocuments = {
    panCard: null,
    gstCertificate: null,
    businessProof: null,
    addressProof: null,
    tradeLicense: null,
    insuranceCert: null,
};

export const ProviderOnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [providerType, setProviderType] = useState<ProviderType | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [basicInfo, setBasicInfo] = useState<ProviderBasicInfo>(initialBasicInfo);
    const [verification, setVerification] = useState<VerificationDetails>(initialVerification);
    const [bankDetails, setBankDetails] = useState<BankDetails>(initialBankDetails);

    const [businessRepresentative, setBusinessRepresentative] = useState<BusinessRepresentative>(initialBusinessRepresentative);
    const [businessProfile, setBusinessProfile] = useState<BusinessProfile>(initialBusinessProfile);
    const [businessAddress, setBusinessAddress] = useState<BusinessAddress>(initialBusinessAddress);
    const [businessBanking, setBusinessBanking] = useState<BusinessBanking>(initialBusinessBanking);
    const [businessDocuments, setBusinessDocuments] = useState<BusinessDocuments>(initialBusinessDocuments);

    const updateBasicInfo = (info: Partial<ProviderBasicInfo>) => {
        setBasicInfo((prev) => ({ ...prev, ...info }));
    };

    const updateVerification = (info: Partial<VerificationDetails>) => {
        setVerification((prev) => ({ ...prev, ...info }));
    };

    const updateBankDetails = (info: Partial<BankDetails>) => {
        setBankDetails((prev) => ({ ...prev, ...info }));
    };

    const updateBusinessRepresentative = (info: Partial<BusinessRepresentative>) => {
        setBusinessRepresentative((prev) => ({ ...prev, ...info }));
    };

    const updateBusinessProfile = (info: Partial<BusinessProfile>) => {
        setBusinessProfile((prev) => ({ ...prev, ...info }));
    };

    const updateBusinessAddress = (info: Partial<BusinessAddress>) => {
        setBusinessAddress((prev) => ({ ...prev, ...info }));
    };

    const updateBusinessBanking = (info: Partial<BusinessBanking>) => {
        setBusinessBanking((prev) => ({ ...prev, ...info }));
    };

    const updateBusinessDocuments = (info: Partial<BusinessDocuments>) => {
        setBusinessDocuments((prev) => ({ ...prev, ...info }));
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
                businessRepresentative,
                businessProfile,
                businessAddress,
                businessBanking,
                businessDocuments,
                setProviderType,
                setStep: setCurrentStep,
                updateBasicInfo,
                updateVerification,
                updateBankDetails,
                updateBusinessRepresentative,
                updateBusinessProfile,
                updateBusinessAddress,
                updateBusinessBanking,
                updateBusinessDocuments,
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
