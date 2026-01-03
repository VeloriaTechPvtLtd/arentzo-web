import React from 'react';
import { LogOut } from 'lucide-react';

interface ProfileLogoutProps {
    onLogout?: () => void;
}

export const ProfileLogout: React.FC<ProfileLogoutProps> = ({ onLogout }) => {
    return (
        <>
            <div className="profile-logout">
                <button className="profile-logout__button" onClick={onLogout}>
                    <span className="profile-logout__icon">
                        <LogOut size={20} />
                    </span>
                    <span className="profile-logout__label">Logout</span>
                </button>
            </div>
            <p className="profile-app-version">App Version 1.0.0</p>
        </>
    );
};
