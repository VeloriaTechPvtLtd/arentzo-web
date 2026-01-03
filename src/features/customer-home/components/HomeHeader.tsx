import React from 'react';
import { User, Search, Mic, MapPin, ChevronDown, MessageSquare } from 'lucide-react';

interface HomeHeaderProps {
    userName?: string;
    location?: string;
    messageCount?: number;
    onSearchClick?: () => void;
    onProfileClick?: () => void;
    onLocationClick?: () => void;
    onMessageClick?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
    userName = 'Hello, User',
    location = 'BEML Layout, Brookefield',
    messageCount = 0,
    onSearchClick,
    onProfileClick,
    onLocationClick,
    onMessageClick,
}) => {
    return (
        <header className="home-header">
            <div className="home-header__user-info">
                <h2 className="home-header__greeting">{userName}</h2>
                <button
                    className="home-header__location"
                    onClick={onLocationClick}
                >
                    <MapPin size={14} />
                    <span>{location}</span>
                    <ChevronDown size={14} />
                </button>
            </div>

            <div className="home-header__search-container">
                <button
                    className="home-header__search"
                    onClick={onSearchClick}
                >
                    <Search size={20} className="home-header__search-icon" />
                    <span className="home-header__search-placeholder">Search</span>
                    <Mic size={20} className="home-header__mic-icon" />
                </button>
            </div>

            <div className="home-header__actions">
                <button
                    className="home-header__action-btn home-header__action-btn--message"
                    onClick={onMessageClick}
                    aria-label="Messages"
                >
                    <MessageSquare size={22} />
                    {messageCount > 0 && (
                        <span className="home-header__badge">
                            {messageCount > 99 ? '99+' : messageCount}
                        </span>
                    )}
                </button>

                <button
                    className="home-header__action-btn"
                    onClick={onProfileClick}
                    aria-label="Profile"
                >
                    <User size={22} />
                </button>
            </div>
        </header>
    );
};
