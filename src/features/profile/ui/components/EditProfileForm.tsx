'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/ui/context/AuthContext';
import { UserProfileService } from '../../application/services/UserProfileService';
import { SupabaseUserProfileRepository } from '../../infrastructure/SupabaseUserProfileRepository';
import type { UserProfileRecord } from '../../application/ports/UserProfileRepository';

const profileService = new UserProfileService(new SupabaseUserProfileRepository());

export const EditProfileForm: React.FC<{ onSaved: (profile: UserProfileRecord) => void }> = ({ onSaved }) => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfileRecord | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        if (!user) {
            setLoading(false);
            setError('Sign in to edit your profile.');
            return () => { active = false; };
        }
        void profileService.getCurrent(user.id).then((data) => {
            if (!active) return;
            if (!data) setError('We could not find a profile for this account.');
            else setProfile(data);
        }).catch(() => {
            if (active) setError('Your profile could not be loaded. Please try again.');
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, [user]);

    const save = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user || !profile) return;
        setSaving(true);
        setError('');
        const form = new FormData(event.currentTarget);
        try {
            const updated = await profileService.updateCurrent(user.id, {
                fullName: String(form.get('fullName') || ''),
                phone: String(form.get('phone') || ''),
                dateOfBirth: String(form.get('dateOfBirth') || ''),
                gender: String(form.get('gender') || ''),
            });
            onSaved(updated);
        } catch (saveError) {
            setError(saveError instanceof Error ? saveError.message : 'Your profile could not be saved. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p role="status">Loading your profile…</p>;
    if (!profile) return <p role="alert">{error || 'Profile unavailable.'}</p>;

    return (
        <form className="profile-edit-form" onSubmit={save}>
            {error ? <p role="alert">{error}</p> : null}
            <label>Full name<input name="fullName" defaultValue={profile.fullName} required maxLength={120} /></label>
            <label>Email<input type="email" value={profile.email} readOnly /></label>
            <label>Phone<input name="phone" type="tel" defaultValue={profile.phone || ''} autoComplete="tel" /></label>
            <label>Date of birth<input name="dateOfBirth" type="date" defaultValue={profile.dateOfBirth || ''} /></label>
            <label>Gender
                <select name="gender" defaultValue={profile.gender || ''}>
                    <option value="">Prefer not to say</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save profile'}</button>
        </form>
    );
};
