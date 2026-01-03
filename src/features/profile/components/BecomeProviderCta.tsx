import React, { useState } from 'react';
import { Store } from 'lucide-react';

interface BecomeProviderCtaProps {
    isAlreadyProvider?: boolean;
    onClick?: () => void;
}

export const BecomeProviderCta: React.FC<BecomeProviderCtaProps> = ({
    isAlreadyProvider = false,
    onClick,
}) => {
    const [imgError, setImgError] = useState(false);

    if (isAlreadyProvider) {
        return null;
    }

    return (
        <button className="profile-provider-cta" onClick={onClick}>
            <div className="profile-provider-cta__icon">
                {!imgError ? (
                    <img
                        src="https://img.icons8.com/3d-fluency/94/agreement.png"
                        alt="Become a Provider"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="profile-provider-cta__icon-placeholder">
                        <Store size={24} />
                    </div>
                )}
            </div>
            <div className="profile-provider-cta__content">
                <h4 className="profile-provider-cta__title">Become a Service Provider</h4>
                <p className="profile-provider-cta__subtitle">
                    List your items and start earning from rentals
                </p>
            </div>
        </button>
    );
};
