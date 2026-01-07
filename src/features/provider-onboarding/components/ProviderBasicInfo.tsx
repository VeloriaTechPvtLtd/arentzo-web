import React, { useRef } from 'react';
import { Camera, Trash2, Plus } from 'lucide-react';
import { useProviderOnboarding } from '../context/ProviderOnboardingContext';

export const ProviderBasicInfo: React.FC = () => {
    const { basicInfo, updateBasicInfo, nextStep, providerType } = useProviderOnboarding();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isBusiness = providerType === 'business';

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    updateBasicInfo({ profileImage: ev.target.result as string });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleAddSocialLink = () => {
        updateBasicInfo({
            socialLinks: [...basicInfo.socialLinks, { id: Date.now().toString(), url: '' }]
        });
    };

    const handleRemoveSocialLink = (id: string) => {
        updateBasicInfo({
            socialLinks: basicInfo.socialLinks.filter(link => link.id !== id)
        });
    };

    const handleSocialLinkChange = (id: string, value: string) => {
        const newLinks = basicInfo.socialLinks.map(link =>
            link.id === id ? { ...link, url: value } : link
        );
        updateBasicInfo({ socialLinks: newLinks });
    };

    const isValid = basicInfo.phoneNumber && basicInfo.description && basicInfo.specialization &&
        (isBusiness ? basicInfo.businessName : true);

    return (
        <div className="onboarding-step">
            <div className="profile-upload-section" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div
                    className="profile-image-container"
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: '#f0f0f0',
                        margin: '0 auto',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '2px solid white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    {basicInfo.profileImage ? (
                        <img src={basicInfo.profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Camera size={32} color="#999" />
                        </div>
                    )}
                </div>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                        marginTop: '0.5rem',
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-c)',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    {basicInfo.profileImage ? 'Change Photo' : 'Upload Photo'}
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

            {isBusiness && (
                <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Enter your Business name"
                        value={basicInfo.businessName}
                        onChange={(e) => updateBasicInfo({ businessName: e.target.value })}
                    />
                </div>
            )}

            <div className="form-group">
                <label className="form-label">Specialization / Services Offered</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="e.g car rental"
                    value={basicInfo.specialization}
                    onChange={(e) => updateBasicInfo({ specialization: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Business Description</label>
                <textarea
                    className="form-textarea"
                    placeholder="Describe your services..."
                    rows={4}
                    value={basicInfo.description}
                    onChange={(e) => updateBasicInfo({ description: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Date of Birth (DOB)</label>
                <input
                    type="date"
                    className="form-input"
                    value={basicInfo.dob}
                    onChange={(e) => updateBasicInfo({ dob: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                    className="form-select"
                    value={basicInfo.gender}
                    onChange={(e) => updateBasicInfo({ gender: e.target.value })}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                    type="tel"
                    className="form-input"
                    placeholder="Enter your phone number"
                    value={basicInfo.phoneNumber}
                    onChange={(e) => updateBasicInfo({ phoneNumber: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Social Media (Optional)</label>
                {basicInfo.socialLinks.map((link, index) => (
                    <div key={link.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                            type="text"
                            className="form-input"
                            style={{ flex: 1 }}
                            placeholder="Link your social media profiles"
                            value={link.url}
                            onChange={(e) => handleSocialLinkChange(link.id, e.target.value)}
                        />
                        {index > 0 && (
                            <button
                                onClick={() => handleRemoveSocialLink(link.id)}
                                style={{
                                    background: 'none',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '8px',
                                    width: '40px',
                                    cursor: 'pointer',
                                    color: '#ff4444'
                                }}
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>
                ))}

                <button
                    onClick={handleAddSocialLink}
                    style={{
                        background: 'none',
                        border: '1px dashed var(--primary-c)',
                        borderRadius: '12px',
                        padding: '0.75rem',
                        color: 'var(--primary-c)',
                        width: '100%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: '500'
                    }}
                >
                    <Plus size={18} /> Add another link
                </button>
            </div>

            <button
                className="primary-btn"
                onClick={nextStep}
                disabled={!isValid}
            >
                Save
            </button>
        </div>
    );
};
