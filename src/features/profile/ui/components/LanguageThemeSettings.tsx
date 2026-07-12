import React, { useState } from 'react';
import { Globe, Sun, Moon, Laptop } from 'lucide-react';
import { useTheme } from '../../../../shared/context/ThemeContext';
import type { Theme } from '../../../../shared/types/theme';
import { FORCE_LIGHT_THEME } from '../../../../shared/types/theme';

interface LanguageThemeSettingsProps {
    onSave: () => void;
}

const languages = [
    { id: 'fr', label: 'French' },
    { id: 'no', label: 'Norwegian' },
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'Hindi' },
];

const themes = [
    { id: 'light', label: 'Light', icon: <Sun size={20} />, description: 'Default light mode' },
    { id: 'dark', label: 'Dark', icon: <Moon size={20} />, description: 'Easier on the eyes' },
    { id: 'system', label: 'System Preference', icon: <Laptop size={20} />, description: 'Match device settings' },
];

export const LanguageThemeSettings: React.FC<LanguageThemeSettingsProps> = () => {
    const [selectedLang, setSelectedLang] = useState('fr');
    const { theme: selectedTheme, setTheme } = useTheme();

    return (
        <div className="settings-view">
            <div className="settings-section">
                <h3 className="settings-section__title">Preferred Language</h3>
                <p className="settings-section__subtitle">Choose your app language</p>
                <div className="settings-list">
                    {languages.map((lang) => (
                        <button
                            key={lang.id}
                            className={`settings-item settings-item--selectable ${selectedLang === lang.id ? 'settings-item--active' : ''}`}
                            onClick={() => setSelectedLang(lang.id)}
                        >
                            <span className="settings-item__content">
                                <span className="settings-item__icon">
                                    <Globe size={20} />
                                </span>
                                <span className="settings-item__label">{lang.label}</span>
                            </span>
                            <span className="settings-radio">
                                <span className={`settings-radio__circle ${selectedLang === lang.id ? 'settings-radio__circle--checked' : ''}`} />
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Dark theme UI kept but hidden while FORCE_LIGHT_THEME is on */}
            {!FORCE_LIGHT_THEME && (
            <div className="settings-section">
                <h3 className="settings-section__title">App Theme</h3>
                <p className="settings-section__subtitle">Switch between light & dark mode</p>

                <div className="theme-grid">
                    {themes.slice(0, 2).map((theme) => (
                        <button
                            key={theme.id}
                            className={`theme-card ${selectedTheme === theme.id ? 'theme-card--active' : ''}`}
                            onClick={() => setTheme(theme.id as Theme)}
                        >
                            <div className={`theme-preview theme-preview--${theme.id}`}>
                                <div className="theme-preview__bars">
                                    <div className="theme-preview__bar" />
                                    <div className="theme-preview__bar theme-preview__bar--short" />
                                </div>
                            </div>
                            <div className="theme-card__footer">
                                <div className="theme-card__info">
                                    <span className="theme-card__icon">{theme.icon}</span>
                                    <div className="theme-card__text">
                                        <span className="theme-card__label">{theme.label}</span>
                                        <span className="theme-card__desc">{theme.description}</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    className={`theme-card theme-card--full ${selectedTheme === 'system' ? 'theme-card--active' : ''}`}
                    onClick={() => setTheme('system')}
                >
                    <div className="theme-preview theme-preview--system">
                        <div className="theme-preview__split">
                            <div className="theme-preview__side theme-preview__side--light" />
                            <div className="theme-preview__side theme-preview__side--dark" />
                        </div>
                        <div className="theme-preview__bars">
                            <div className="theme-preview__bar" />
                            <div className="theme-preview__bar theme-preview__bar--short" />
                        </div>
                    </div>
                    <div className="theme-card__footer">
                        <div className="theme-card__info">
                            <span className="theme-card__icon"><Laptop size={20} /></span>
                            <div className="theme-card__text">
                                <span className="theme-card__label">System Preference</span>
                                <span className="theme-card__desc">Match device settings</span>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
            )}

        </div>
    );
};
