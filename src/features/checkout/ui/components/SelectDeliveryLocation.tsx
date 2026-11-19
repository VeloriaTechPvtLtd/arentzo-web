'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Home, MapPin } from 'lucide-react';
import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';

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

type AddressRow = {
    id: string;
    label: string | null;
    name: string | null;
    address_type: string | null;
    address: string | null;
    address_line1: string | null;
    address_line2: string | null;
    landmark: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pincode: string | null;
    postal_code: string | null;
    recipient_name: string | null;
    recipient_phone: string | null;
    full_name: string | null;
    phone: string | null;
    is_default: boolean | null;
};

function toAddress(row: AddressRow): AddressItem {
    const address = row.address || [
        row.address_line1,
        row.address_line2,
        row.landmark,
        row.city,
        row.state,
        row.postal_code || row.pincode,
        row.country,
    ].filter(Boolean).join(', ');
    return {
        id: row.id,
        label: row.label || row.address_type || row.name || 'Saved address',
        address,
        phone: row.recipient_phone || row.phone || '',
    };
}

export const SelectDeliveryLocation: React.FC<SelectDeliveryLocationProps> = ({
    currentAddressId,
    onSelect,
    showActions = true,
}) => {
    const [addresses, setAddresses] = useState<AddressItem[]>([]);
    const [selectedId, setSelectedId] = useState(currentAddressId || '');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [signedIn, setSignedIn] = useState<boolean | null>(null);

    useEffect(() => {
        let active = true;
        const loadAddresses = async () => {
            setLoading(true);
            setError(null);
            try {
                const client = getSupabaseClient();
                const { data: { user }, error: authError } = await client.auth.getUser();
                if (authError && !user) throw authError;
                if (!user) {
                    if (active) {
                        setSignedIn(false);
                        setAddresses([]);
                    }
                    return;
                }

                const { data, error: queryError } = await client.from('user_addresses')
                    .select('id,label,name,address_type,address,address_line1,address_line2,landmark,city,state,country,pincode,postal_code,recipient_name,recipient_phone,full_name,phone,is_default')
                    .eq('user_id', user.id)
                    .is('deleted_at', null)
                    .order('is_default', { ascending: false })
                    .order('created_at', { ascending: false })
                    .limit(50);
                if (queryError) throw queryError;
                if (active) {
                    setSignedIn(true);
                    setAddresses(((data || []) as AddressRow[]).map(toAddress));
                }
            } catch {
                if (active) setError('Saved addresses could not be loaded. Please try again.');
            } finally {
                if (active) setLoading(false);
            }
        };
        void loadAddresses();
        return () => { active = false; };
    }, []);

    const visibleAddresses = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return addresses;
        return addresses.filter((address) => `${address.label} ${address.address} ${address.phone}`.toLowerCase().includes(query));
    }, [addresses, search]);

    return (
        <div className="select-location-panel" data-show-actions={showActions}>
            <h2 className="select-location__title">Saved addresses</h2>
            {signedIn && addresses.length > 1 ? (
                <input
                    type="search"
                    aria-label="Search saved addresses"
                    placeholder="Search saved addresses"
                    className="saved-address-search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            ) : null}
            {loading ? <p role="status">Loading addresses…</p> : null}
            {error ? <p role="alert">{error}</p> : null}
            {!loading && !error && signedIn === false ? <p>Sign in to view your saved addresses.</p> : null}
            {!loading && !error && signedIn && addresses.length === 0 ? <p>You have no saved addresses yet.</p> : null}
            {!loading && !error && signedIn && addresses.length > 0 ? (
                <div className="saved-addresses">
                    <h3 className="saved-addresses__title">Your saved addresses</h3>
                    {visibleAddresses.length === 0 ? <p>No addresses match your search.</p> : null}
                    <div className="saved-addresses__list">
                        {visibleAddresses.map((address) => {
                            const selected = address.id === selectedId;
                            return (
                                <button
                                    type="button"
                                    key={address.id}
                                    className={`saved-address-card ${selected ? 'saved-address-card--selected' : ''}`}
                                    onClick={() => {
                                        setSelectedId(address.id);
                                        onSelect(address);
                                    }}
                                >
                                    <div className="saved-address-card__header">
                                        <div className={`saved-address-card__icon ${selected ? 'saved-address-card__icon--selected' : ''}`}>
                                            {address.label.toLowerCase().includes('home') ? <Home size={20} /> : <MapPin size={20} />}
                                        </div>
                                        <h4 className="saved-address-card__label">{address.label}</h4>
                                    </div>
                                    <p className="saved-address-card__text">{address.address || 'Address details unavailable'}</p>
                                    {address.phone ? <p className="saved-address-card__phone">Phone number: <span className="phone-value">{address.phone}</span></p> : null}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
