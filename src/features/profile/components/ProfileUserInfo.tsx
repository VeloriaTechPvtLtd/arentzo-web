import React from 'react';
import { Check } from 'lucide-react';
import type { UserProfile, UserRole } from '../types';

interface ProfileUserInfoProps {
    user: UserProfile;
    showRoleSwitcher?: boolean;
    onRoleSwitch?: (role: UserRole) => void;
}

export const ProfileUserInfo: React.FC<ProfileUserInfoProps> = ({
    user,
    showRoleSwitcher = false,
    onRoleSwitch,
}) => {
    const getRoleLabel = (role: UserRole): string => {
        switch (role) {
            case 'customer':
                return 'Customer';
            case 'service_provider':
                return 'Service Provider';
            default:
                return role;
        }
    };

    const getInitials = (name: string): string => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // If role switcher is requested and user has both roles
    if (showRoleSwitcher && user.roles.length > 1) {
        // Sort roles so Service Provider is at top as in mockup
        const sortedRoles = [...user.roles].sort((a, b) => {
            if (a === 'service_provider') return -1;
            if (b === 'service_provider') return 1;
            return 0;
        });

        return (
            <div className="profile-user">
                <div className="profile-user__roles">
                    {sortedRoles.map((role) => (
                        <button
                            key={role}
                            className={`profile-user__role-card ${user.activeRole === role ? 'profile-user__role-card--active' : ''
                                }`}
                            onClick={() => onRoleSwitch?.(role)}
                        >
                            <div className="profile-user__role-avatar">
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.name} />
                                ) : (
                                    <div className="profile-user__avatar-placeholder">
                                        {getInitials(user.name)}
                                    </div>
                                )}
                            </div>
                            <div className="profile-user__role-info">
                                <span className="profile-user__role-label">
                                    {getRoleLabel(role)}
                                </span>
                                <span className="profile-user__role-name">{user.name}</span>
                                <span className="profile-user__role-email">{user.email}</span>
                            </div>
                            {user.activeRole === role && (
                                <div className="profile-user__role-check">
                                    <Check size={14} strokeWidth={4} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // Default single role view
    return (
        <div className="profile-user">
            <div className="profile-user__card">
                <div className="profile-user__avatar">
                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt={user.name}
                            className="profile-user__avatar-image"
                        />
                    ) : (
                        <div className="profile-user__avatar-placeholder">
                            {getInitials(user.name)}
                        </div>
                    )}
                </div>
                <div className="profile-user__details">
                    <span className="profile-user__role-badge">
                        {getRoleLabel(user.activeRole)}
                    </span>
                    <h3 className="profile-user__name">{user.name}</h3>
                    <p className="profile-user__email">{user.email}</p>
                </div>
                {user.isVerified && (
                    <div className="profile-user__role-check">
                        <Check size={14} strokeWidth={4} />
                    </div>
                )}
            </div>
        </div>
    );
};
