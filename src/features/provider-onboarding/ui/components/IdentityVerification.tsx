import React, { useRef } from 'react';
import { Camera, User, CheckCircle2 } from 'lucide-react';
import { useProviderOnboarding } from '../hooks/useProviderOnboarding';

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
        <div className="upload-box" onClick={() => inputRef.current?.click()} style={{ position: 'relative' }}>
            <input type="file" ref={inputRef} hidden accept="image/*,.pdf" onChange={handleFileChange} />
            <div className="upload-box__icon">
                {file ? <CheckCircle2 size={32} color="#10B981" /> : <Camera size={32} color="#FF9B82" />}
            </div>
            <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: '700', color: '#111827' }}>{label}</h4>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6B7280' }}>
                    {file ? 'Document uploaded' : description}
                </p>
            </div>
            {file && (
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#10B981',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px'
                }}>
                    <CheckCircle2 size={12} />
                </div>
            )}
        </div>
    );
};

export const IdentityVerification: React.FC = () => {
    const { verification, updateVerification, nextStep } = useProviderOnboarding();

    const isValid = verification.documentNumber && verification.frontImage && verification.panNumber;

    return (
        <div className="onboarding-step">
            <p className="onboarding-step__description">
                Verify your identity using Aadhaar or Driving License.
                Please ensure all details match your documents exactly.
            </p>

            <div className="form-group">
                <label className="form-label">Verification ID Type</label>
                <div className="segmented-control">
                    <button
                        type="button"
                        className={`segmented-control__item ${verification.documentType === 'aadhaar' ? 'active' : ''}`}
                        onClick={() => updateVerification({ documentType: 'aadhaar' })}
                    >
                        Aadhaar Card
                    </button>
                    <button
                        type="button"
                        className={`segmented-control__item ${verification.documentType === 'driving_license' ? 'active' : ''}`}
                        onClick={() => updateVerification({ documentType: 'driving_license' })}
                    >
                        Driving License
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">
                    {verification.documentType === 'aadhaar' ? 'Aadhaar Number' : 'License Number'}
                </label>
                <input
                    type="text"
                    className="form-input"
                    placeholder={verification.documentType === 'aadhaar' ? "XXXX XXXX XXXX" : "DL-XXXXXXXXXXX"}
                    value={verification.documentNumber}
                    onChange={(e) => updateVerification({ documentNumber: e.target.value })}
                />
            </div>

            <div className="upload-grid">
                <FileUploadBox
                    label="Front Side"
                    description="Clear JPG/PNG"
                    file={verification.frontImage}
                    onUpload={(file) => updateVerification({ frontImage: file })}
                />
                <FileUploadBox
                    label="Back Side"
                    description="Clear JPG/PNG"
                    file={verification.backImage}
                    onUpload={(file) => updateVerification({ backImage: file })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">PAN Card Number</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="ABCDE1234F"
                    value={verification.panNumber}
                    onChange={(e) => updateVerification({ panNumber: e.target.value.toUpperCase() })}
                />
                <p style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>This is required for tax and payment purposes.</p>
            </div>

            <div
                style={{
                    backgroundColor: 'white',
                    border: '1.5px solid #E5E7EB',
                    borderRadius: '16px',
                    padding: '1.25rem'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: '700', color: '#111827' }}>Selfie Verification</h4>
                        <p style={{ margin: '0.125rem 0 0 0', fontSize: '0.8125rem', color: '#6B7280' }}>Match your face with your ID</p>
                    </div>
                    <span style={{
                        fontSize: '0.625rem',
                        fontWeight: '800',
                        color: '#EF4444',
                        backgroundColor: '#FEF2F2',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        textTransform: 'uppercase'
                    }}>
                        Required
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        backgroundColor: '#F3F4F6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                        {verification.selfieImage ? (
                            <img
                                src={URL.createObjectURL(verification.selfieImage)}
                                alt="Selfie"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <User size={28} color="#9CA3AF" />
                        )}
                    </div>
                    <button
                        type="button"
                        className="take-selfie-btn"
                        onClick={() => {
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e: Event) => {
                                const target = e.target as HTMLInputElement;
                                if (target.files && target.files[0]) {
                                    updateVerification({ selfieImage: target.files[0] });
                                }
                            };
                            input.click();
                        }}
                    >
                        <Camera size={20} />
                        {verification.selfieImage ? 'Retake Selfie' : 'Take a Selfie'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
                <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: '700', color: '#111827' }}>Different Current Address?</h4>
                    <p style={{ margin: '0.125rem 0 0 0', fontSize: '0.8125rem', color: '#6B7280' }}>
                        Only if different from your official ID.
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
                style={{ height: '54px', marginTop: '1rem' }}
            >
                Submit for Verification
            </button>
        </div>
    );
};
