import React, { useRef } from 'react';
import { Camera, User } from 'lucide-react';
import { useProviderOnboarding } from '../context/ProviderOnboardingContext';

const FileUploadBox: React.FC<{
    label: string;
    description: string;
    file: File | null;
    onUpload: (file: File) => void;
}> = ({ label, description, file, onUpload }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <div
            onClick={() => inputRef.current?.click()}
            style={{
                border: '1px dashed var(--border-light)',
                borderRadius: '16px',
                padding: '1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: file ? 'var(--surface-highlight)' : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem'
            }}
        >
            <input type="file" ref={inputRef} hidden accept="image/*,.pdf" onChange={handleFileChange} />
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--surface-input)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-c)'
            }}>
                <Camera size={24} />
            </div>
            <div>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9375rem' }}>{label}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {file ? file.name : description}
                </p>
            </div>
        </div>
    );
};

export const IdentityVerification: React.FC = () => {
    const { verification, updateVerification, nextStep } = useProviderOnboarding();

    const isValid = verification.documentNumber && verification.frontImage && verification.panNumber;

    return (
        <div className="onboarding-step">
            <div className="onboarding-step__header">
                <p className="onboarding-step__description" style={{ textAlign: 'left' }}>
                    Verify your identity using Aadhaar or Driving License.
                    Please ensure all details match your documents.
                </p>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.25rem', backgroundColor: 'var(--surface-input)', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <button
                    style={{
                        flex: 1,
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        backgroundColor: verification.documentType === 'aadhaar' ? 'var(--primary-c)' : 'transparent',
                        color: verification.documentType === 'aadhaar' ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                    onClick={() => updateVerification({ documentType: 'aadhaar' })}
                >
                    Aadhaar Number
                </button>
                <button
                    style={{
                        flex: 1,
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        backgroundColor: verification.documentType === 'driving_license' ? 'var(--primary-c)' : 'transparent',
                        color: verification.documentType === 'driving_license' ? 'white' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                    onClick={() => updateVerification({ documentType: 'driving_license' })}
                >
                    Driving License
                </button>
            </div>

            <div className="form-group">
                <label className="form-label">
                    {verification.documentType === 'aadhaar' ? '12-digit Aadhaar Number' : 'Driving License Number'}
                </label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="XXXX XXXX XXXX"
                    value={verification.documentNumber}
                    onChange={(e) => updateVerification({ documentNumber: e.target.value })}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FileUploadBox
                    label={verification.documentType === 'aadhaar' ? 'Aadhaar Front' : 'Front Side'}
                    description="Upload Front Side"
                    file={verification.frontImage}
                    onUpload={(file) => updateVerification({ frontImage: file })}
                />
                <FileUploadBox
                    label={verification.documentType === 'aadhaar' ? 'Aadhaar Back' : 'Back Side'}
                    description="Upload Back Side"
                    file={verification.backImage}
                    onUpload={(file) => updateVerification({ backImage: file })}
                />
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label className="form-label">Pan Details</label>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '-0.25rem', marginBottom: '0.5rem' }}>
                    Permanent Account Number
                </p>
                <input
                    type="text"
                    className="form-input"
                    placeholder="ABCDE1234F"
                    value={verification.panNumber}
                    onChange={(e) => updateVerification({ panNumber: e.target.value })}
                />
            </div>

            <div
                style={{
                    marginTop: '1.5rem',
                    border: '1px solid var(--border-light)',
                    borderRadius: '12px',
                    padding: '1rem'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '0.9375rem' }}>Selfie Verification</h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Match your face with your ID</p>
                    </div>
                    <span style={{
                        fontSize: '0.7rem',
                        color: 'red',
                        border: '1px solid red',
                        padding: '2px 6px',
                        borderRadius: '4px'
                    }}>
                        REQUIRED
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {verification.selfieImage ? (
                            <img
                                src={URL.createObjectURL(verification.selfieImage)}
                                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            />
                        ) : (
                            <User size={24} color="#999" />
                        )}
                    </div>
                    <button
                        style={{
                            flex: 1,
                            backgroundColor: 'var(--surface-input)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            color: 'var(--primary-c)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontWeight: '600'
                        }}
                    >
                        <Camera size={18} /> Take Selfie
                    </button>
                    <input type="file" hidden accept="image/*" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            updateVerification({ selfieImage: e.target.files[0] });
                        }
                    }} />
                </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h4 style={{ margin: 0, fontSize: '0.9375rem' }}>Different Address?</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', maxWidth: '250px' }}>
                        Upload proof only if your current address is different from your selected ID.
                    </p>
                </div>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={verification.differentAddress}
                        onChange={(e) => updateVerification({ differentAddress: e.target.checked })}
                    />
                    <span className="slider round"></span>
                </label>
            </div>

            <button
                className="primary-btn"
                onClick={nextStep}
                disabled={!isValid}
                style={{ marginTop: '2rem' }}
            >
                Verify & Proceed
            </button>
        </div>
    );
};
