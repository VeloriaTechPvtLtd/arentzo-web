import React from 'react';
import { Settings, ChevronRight } from 'lucide-react';

interface ProfileSettingsLinkProps {
    onClick?: () => void;
}

export const ProfileSettingsLink: React.FC<ProfileSettingsLinkProps> = ({ onClick }) => {
    return (
        <div className="profile-settings-link">
            <button className="profile-settings-link__button" onClick={onClick}>
                <span className="profile-settings-link__icon">
                    <Settings size={24} />
                </span>
                <span className="profile-settings-link__label">Settings</span>
                <span className="profile-settings-link__arrow">
                    <ChevronRight size={22} />
                </span>
            </button>
        </div>
    );
};
