import React, { useRef } from 'react';
import { Camera, Trash2, Plus, User, MessageCircle } from 'lucide-react';
import { useProviderOnboarding } from '../hooks/useProviderOnboarding';

export const ProviderBasicInfo: React.FC = () => {
    const { basicInfo, updateBasicInfo, nextStep } = useProviderOnboarding();
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    return (
        <div className="onboarding-step">
            <div className="profile-upload-section" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <div
                    className="profile-image-container"
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        backgroundColor: '#F3F4F6',
                        margin: '0 auto',
                        position: 'relative',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        border: '2px solid white'
                    }}
                >
                    {basicInfo.profileImage ? (
                        <img src={basicInfo.profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={48} color="#9CA3AF" />
                        </div>
                    )}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#FF8066',
                            border: '2px solid white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            color: 'white'
                        }}
                    >
                        <Camera size={16} />
                    </button>
                </div>
                <div style={{ marginTop: '0.75rem' }}>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#FF8066',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        {basicInfo.profileImage ? 'Change Photo' : 'Upload Photo'}
                    </button>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Full Name / Business Name</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Enter name"
                    value={basicInfo.businessName}
                    onChange={(e) => updateBasicInfo({ businessName: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Specialization</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Home Decor, Apartment, Studio"
                    value={basicInfo.specialization}
                    onChange={(e) => updateBasicInfo({ specialization: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                    className="form-textarea"
                    placeholder="Describe your services or experience..."
                    rows={4}
                    value={basicInfo.description}
                    onChange={(e) => updateBasicInfo({ description: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                    type="date"
                    className="form-input"
                    value={basicInfo.dob}
                    onChange={(e) => updateBasicInfo({ dob: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Gender</label>
                <div className="segmented-control">
                    {['Male', 'Female', 'Other'].map((g) => (
                        <button
                            key={g}
                            type="button"
                            className={`segmented-control__item ${basicInfo.gender.toLowerCase() === g.toLowerCase() ? 'active' : ''}`}
                            onClick={() => updateBasicInfo({ gender: g.toLowerCase() })}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                    type="tel"
                    className="form-input"
                    placeholder="+91 XXXXX XXXXX"
                    value={basicInfo.phoneNumber}
                    onChange={(e) => updateBasicInfo({ phoneNumber: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Social Media (Optional)</label>
                {basicInfo.socialLinks.map((link) => (
                    <div key={link.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}>
                                <MessageCircle size={18} />
                            </div>
                            <input
                                type="text"
                                className="form-input"
                                style={{ paddingLeft: '40px' }}
                                placeholder="Social media profile link"
                                value={link.url}
                                onChange={(e) => handleSocialLinkChange(link.id, e.target.value)}
                            />
                        </div>
                        {basicInfo.socialLinks.length > 1 && (
                            <button
                                onClick={() => handleRemoveSocialLink(link.id)}
                                style={{
                                    border: '1.5px solid #FEE2E2',
                                    backgroundColor: '#FEF2F2',
                                    borderRadius: '12px',
                                    padding: '0 0.75rem',
                                    cursor: 'pointer',
                                    color: '#EF4444'
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
                        border: '1.5px dashed #FF9B82',
                        borderRadius: '12px',
                        padding: '0.875rem',
                        color: '#FF8066',
                        width: '100%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: '600'
                    }}
                >
                    <Plus size={20} /> Add more links
                </button>
            </div>

            <button
                className="primary-btn"
                onClick={nextStep}
                style={{ height: '54px' }}
            >
                Confirm & Continue
            </button>
        </div>
    );
};
