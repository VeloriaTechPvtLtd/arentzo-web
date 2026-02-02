import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { MenuSection } from '../../domain/entities';

interface ProfileMenuSectionProps {
    section: MenuSection;
}

export const ProfileMenuSection: React.FC<ProfileMenuSectionProps> = ({ section }) => {
    return (
        <div className="profile-menu-section">
            <h3 className="profile-menu-section__title">{section.title}</h3>
            <div className="profile-menu-section__items">
                {section.items.map((item) => (
                    <button
                        key={item.id}
                        className="profile-menu-item"
                        onClick={item.onClick}
                    >
                        <span className="profile-menu-item__icon">{item.icon}</span>
                        <span className="profile-menu-item__label">{item.label}</span>
                        {item.hasArrow !== false && (
                            <span className="profile-menu-item__arrow">
                                <ChevronRight size={20} />
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
