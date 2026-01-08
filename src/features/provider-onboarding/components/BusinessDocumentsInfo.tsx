import React, { useRef, useState } from 'react';
import { Upload, Trash2, CheckCircle2, FileText, CreditCard, Award, MapPin, ShieldCheck, Briefcase } from 'lucide-react';
import { useProviderOnboarding } from '../context/ProviderOnboardingContext';

interface DocumentItemProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    file: File | null;
    onUpload: (file: File) => void;
    onRemove: () => void;
    isOptional?: boolean;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ title, description, icon, file, onUpload, onRemove, isOptional }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="document-item">
            <div className="document-item__info">
                <div className="document-item__icon">
                    {icon}
                </div>
                <div className="document-item__text">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h4 style={{ color: file ? '#10B981' : '#111827' }}>{title}</h4>
                        {isOptional && !file && <span style={{ fontSize: '0.6875rem', color: '#9CA3AF', backgroundColor: '#F3F4F6', padding: '1px 6px', borderRadius: '4px' }}>Optional</span>}
                    </div>
                    <p style={{ color: file ? '#10B981' : '#6B7280' }}>
                        {file ? file.name : description}
                    </p>
                </div>
            </div>

            <input
                type="file"
                ref={inputRef}
                hidden
                onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
            />

            {file ? (
                <button className="tag-remove" onClick={onRemove} style={{ padding: '8px', background: '#FEE2E2', borderRadius: '8px' }}>
                    <Trash2 size={18} color="#EF4444" />
                </button>
            ) : (
                <button className="document-upload-btn" onClick={() => inputRef.current?.click()}>
                    <Upload size={16} /> Upload
                </button>
            )}
        </div>
    );
};

export const BusinessDocumentsInfo: React.FC = () => {
    const { businessDocuments, updateBusinessDocuments } = useProviderOnboarding();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 2500);
        }, 1500);
    };

    const isValid = businessDocuments.panCard &&
        businessDocuments.businessProof &&
        businessDocuments.addressProof;

    if (isSuccess) {
        return (
            <div className="onboarding-step" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    backgroundColor: '#ECFDF5',
                    border: '2px solid #10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: '#10B981',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.15)'
                }}>
                    <CheckCircle2 size={48} />
                </div>
                <h2 style={{ fontSize: '1.625rem', fontWeight: '800', marginBottom: '0.75rem', color: '#111827' }}>Application Submitted!</h2>
                <p style={{ color: '#6B7280', fontSize: '1rem', lineHeight: '1.5' }}>
                    Your business details are under review. We'll verify your documents and notify you within 24-48 hours.
                </p>
                <button
                    className="primary-btn"
                    onClick={() => window.location.reload()}
                    style={{ marginTop: '2rem' }}
                >
                    Back to Profile
                </button>
            </div>
        );
    }

    return (
        <div className="onboarding-step">
            <div className="onboarding-step__header" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <h2 className="onboarding-step__title">Documents Required</h2>
                <p className="onboarding-step__description">
                    Please upload clear images (JPG, PNG) or PDFs of the following documents to verify your business identity.
                </p>
            </div>

            <div className="document-list">
                <DocumentItem
                    title="PAN Card"
                    description="Individual or Business PAN"
                    icon={<CreditCard size={20} />}
                    file={businessDocuments.panCard}
                    onUpload={(f) => updateBusinessDocuments({ panCard: f })}
                    onRemove={() => updateBusinessDocuments({ panCard: null })}
                />

                <DocumentItem
                    title="GST Certificate"
                    description="If registered (optional)"
                    icon={<FileText size={20} />}
                    file={businessDocuments.gstCertificate}
                    onUpload={(f) => updateBusinessDocuments({ gstCertificate: f })}
                    onRemove={() => updateBusinessDocuments({ gstCertificate: null })}
                    isOptional
                />

                <DocumentItem
                    title="Business Proof"
                    description="Required for Pvt Ltd, LLP"
                    icon={<Briefcase size={20} />}
                    file={businessDocuments.businessProof}
                    onUpload={(f) => updateBusinessDocuments({ businessProof: f })}
                    onRemove={() => updateBusinessDocuments({ businessProof: null })}
                />

                <DocumentItem
                    title="Address Proof"
                    description="Utility Bill, Rent Agreement"
                    icon={<MapPin size={20} />}
                    file={businessDocuments.addressProof}
                    onUpload={(f) => updateBusinessDocuments({ addressProof: f })}
                    onRemove={() => updateBusinessDocuments({ addressProof: null })}
                />

                <DocumentItem
                    title="Trade License"
                    description="Optional"
                    icon={<Award size={20} />}
                    file={businessDocuments.tradeLicense}
                    onUpload={(f) => updateBusinessDocuments({ tradeLicense: f })}
                    onRemove={() => updateBusinessDocuments({ tradeLicense: null })}
                    isOptional
                />

                <DocumentItem
                    title="Insurance Cert..."
                    description="Individual or Business PAN"
                    icon={<ShieldCheck size={20} />}
                    file={businessDocuments.insuranceCert}
                    onUpload={(f) => updateBusinessDocuments({ insuranceCert: f })}
                    onRemove={() => updateBusinessDocuments({ insuranceCert: null })}
                    isOptional
                />

                {/* Example of already uploaded item from image */}
                <div className="document-item" style={{ borderColor: '#ECFDF5', backgroundColor: '#F0FDF4' }}>
                    <div className="document-item__info">
                        <div className="document-item__icon" style={{ backgroundColor: '#10B981', color: 'white' }}>
                            <CheckCircle2 size={20} />
                        </div>
                        <div className="document-item__text">
                            <h4 style={{ color: '#065F46' }}>Cancelled Cheque</h4>
                            <p style={{ color: '#059669' }}>IMG_0987.jpg</p>
                        </div>
                    </div>
                    <button className="tag-remove" style={{ padding: '8px', background: '#FEE2E2', borderRadius: '8px' }}>
                        <Trash2 size={18} color="#EF4444" />
                    </button>
                </div>
            </div>

            <button
                className="primary-btn"
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
                style={{ height: '54px', marginTop: '2rem' }}
            >
                {isSubmitting ? 'Submitting Application...' : 'Submit & Continue'}
            </button>
        </div>
    );
};
