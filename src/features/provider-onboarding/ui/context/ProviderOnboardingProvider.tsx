import React, { useState } from 'react';
import type { ReactNode } from 'react';
import {
    ProviderOnboardingContext,
    type ProviderType,
    type ProviderBasicInfo,
    type VerificationDetails,
    type BankDetails,
    type BusinessRepresentative,
    type BusinessProfile,
    type BusinessAddress,
    type BusinessBanking,
    type BusinessDocuments
} from './ProviderOnboardingContext';

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
