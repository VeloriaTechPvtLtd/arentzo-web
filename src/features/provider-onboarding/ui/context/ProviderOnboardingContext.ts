import { createContext } from 'react';

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

export interface ProviderOnboardingContextType extends ProviderOnboardingState {
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

export const ProviderOnboardingContext = createContext<ProviderOnboardingContextType | undefined>(undefined);
