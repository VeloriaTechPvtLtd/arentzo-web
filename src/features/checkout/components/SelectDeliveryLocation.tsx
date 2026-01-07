import React, { useState } from 'react';
import { Search, Navigation, Home, MoreHorizontal, Share } from 'lucide-react';

export interface AddressItem {
    id: string;
    label: string;
    address: string;
    phone: string;
}

interface SelectDeliveryLocationProps {
    currentAddressId?: string;
    onSelect: (address: AddressItem) => void;
    showActions?: boolean;
}

const SAVED_ADDRESSES = [
    {
        id: '1',
        label: 'Home',
        address: 'Kalyani Business Centre,3rd Floor, Office No. 305, R. B. Kadam Marg, Opposite Mahalaxmi Garden, Shahupuri East, Kolhapur - 416012',
        phone: '0231-9988776'
    },
    {
        id: '2',
        label: 'Home',
        address: 'Shree Vasant Vihar, Flat No. 502, Tower B, S. R. Patil Road, Near Rajaram Maharaj Mandir, Gokul Nagar, Kolhapur - 416008',
        phone: '0971-9656789'
    }
];



export const SelectDeliveryLocation: React.FC<SelectDeliveryLocationProps> = ({
    currentAddressId = '1',
    onSelect,
    showActions = true,
}) => {
    const [selectedId, setSelectedId] = useState(currentAddressId);
    const [actionAddressId, setActionAddressId] = useState<string | null>(null);

    const handleActionClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setActionAddressId(id);
    };

    const closeActions = () => {
        setActionAddressId(null);
    };

    const handleDelete = () => {
        console.log('Delete address:', actionAddressId);
        closeActions();
    };

    const handleEdit = () => {
        console.log('Edit address:', actionAddressId);
        closeActions();
    };

    const handleUseCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Current Location:', latitude, longitude);
                    // Use Google Maps Geocoding API here to get address from lat/lng
                    // For now, mock it:
                    const newAddr = {
                        id: 'current-loc',
                        label: 'Current Location',
                        address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
                        phone: ''
                    };
                    handleSelect(newAddr);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to retrieve your location');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        console.log('Searching for:', query);
        // Integrate Google Places Autocomplete API here using the query
    };

    const handleSelect = (addr: AddressItem) => {
        setSelectedId(addr.id);
        // Optional: Call onSelect immediately or have a confirm button. 
        // For this UI flow, clicking usually selects it.
        onSelect(addr);
    };

    return (
        <div className="select-location-panel">
            <h2 className="select-location__title">Select Delivery Location</h2>

            <div className="location-search">
                <Search size={20} className="location-search__icon" />
                <input
                    type="text"
                    placeholder="Search for area, street name..."
                    className="location-search__input"
                    onChange={handleSearchChange}
                />
            </div>

            {showActions && (
                <div className="location-actions">
                    <button className="location-action-item" onClick={handleUseCurrentLocation}>
                        <div className="location-action-item__icon location-action-item__icon--red">
                            <Navigation size={20} />
                        </div>
                        <span className="location-action-item__text location-action-item__text--red">Use your current location</span>
                        <span className="location-action-item__arrow">›</span>
                    </button>
                </div>
            )}

            <div className="saved-addresses">
                <h3 className="saved-addresses__title">Your saved addresses</h3>

                <div className="saved-addresses__list">
                    {SAVED_ADDRESSES.map((addr) => {
                        const isSelected = selectedId === addr.id;
                        return (
                            <div
                                key={addr.id}
                                className={`saved-address-card ${isSelected ? 'saved-address-card--selected' : ''}`}
                                onClick={() => handleSelect(addr)}
                            >
                                <div className="saved-address-card__header">
                                    <div className={`saved-address-card__icon ${isSelected ? 'saved-address-card__icon--selected' : ''}`}>
                                        <Home size={20} />
                                    </div>
                                    <h4 className="saved-address-card__label">{addr.label}</h4>
                                </div>

                                <p className="saved-address-card__text">
                                    {addr.address}
                                </p>

                                <p className="saved-address-card__phone">
                                    Phone number: <span className="phone-value">{addr.phone}</span>
                                </p>

                                {isSelected && (
                                    <div className="saved-address-card__actions">
                                        <button
                                            className="address-action-btn"
                                            onClick={(e) => handleActionClick(e, addr.id)}
                                        >
                                            <MoreHorizontal size={20} />
                                        </button>
                                        <button className="address-action-btn">
                                            <Share size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {actionAddressId && (
                <div className="address-action-overlay" onClick={closeActions}>
                    <div className="address-action-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="address-action-modal__content">
                            <button className="address-action-modal__btn address-action-modal__btn--delete" onClick={handleDelete}>
                                Delete
                            </button>
                            <div className="address-action-modal__divider" />
                            <button className="address-action-modal__btn" onClick={handleEdit}>
                                Edit
                            </button>
                        </div>
                        <button className="address-action-modal__cancel" onClick={closeActions}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
