import React, { useState } from 'react';
import { Bell, Package, Heart } from 'lucide-react';

interface ProfileQuickActionsProps {
    onNotificationsClick?: () => void;
    onFavouritesClick?: () => void;
    onRentalsClick?: () => void;
}

export const ProfileQuickActions: React.FC<ProfileQuickActionsProps> = ({
    onNotificationsClick,
    onFavouritesClick,
    onRentalsClick,
}) => {
    const [notifImgError, setNotifImgError] = useState(false);
    const [rentalsImgError, setRentalsImgError] = useState(false);
    const [favouritesImgError, setFavouritesImgError] = useState(false);

    return (
        <div className="profile-quick-actions profile-quick-actions--three">
            <button className="profile-quick-action" onClick={onNotificationsClick}>
                <div className="profile-quick-action__icon">
                    {!notifImgError ? (
                        <img
                            src="https://img.icons8.com/3d-fluency/188/appointment-reminders.png"
                            alt="Notifications"
                            onError={() => setNotifImgError(true)}
                        />
                    ) : (
                        <div className="profile-quick-action__icon-placeholder">
                            <Bell size={32} />
                        </div>
                    )}
                </div>
                <span className="profile-quick-action__label">Notifications</span>
            </button>

            <button className="profile-quick-action" onClick={onRentalsClick}>
                <div className="profile-quick-action__icon">
                    {!rentalsImgError ? (
                        <img
                            src="https://img.icons8.com/3d-fluency/188/box.png"
                            alt="My Rentals"
                            onError={() => setRentalsImgError(true)}
                        />
                    ) : (
                        <div className="profile-quick-action__icon-placeholder">
                            <Package size={32} />
                        </div>
                    )}
                </div>
                <span className="profile-quick-action__label">My Rentals</span>
            </button>

            <button className="profile-quick-action" onClick={onFavouritesClick}>
                <div className="profile-quick-action__icon">
                    {!favouritesImgError ? (
                        <img
                            src="https://img.icons8.com/3d-fluency/188/like.png"
                            alt="Favourites"
                            onError={() => setFavouritesImgError(true)}
                        />
                    ) : (
                        <div className="profile-quick-action__icon-placeholder">
                            <Heart size={32} />
                        </div>
                    )}
                </div>
                <span className="profile-quick-action__label">Favourites</span>
            </button>
        </div>
    );
};
