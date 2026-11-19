import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';
import type { UserProfileRecord, UpdateUserProfile, UserProfileRepository } from '../application/ports/UserProfileRepository';

type UserRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
  avatar_url: string | null;
};

const profileColumns = 'id,full_name,email,phone,date_of_birth,gender,avatar_url';

function mapProfile(row: UserRow): UserProfileRecord {
  return {
    id: row.id,
    fullName: row.full_name || '',
    email: row.email || '',
    phone: row.phone,
    dateOfBirth: row.date_of_birth,
    gender: row.gender,
    avatarUrl: row.avatar_url,
  };
}

export class SupabaseUserProfileRepository implements UserProfileRepository {
  async getCurrent(userId: string): Promise<UserProfileRecord | null> {
    const { data, error } = await getSupabaseClient().from('users')
      .select(profileColumns).eq('id', userId).maybeSingle();
    if (error) throw error;
    return data ? mapProfile(data as UserRow) : null;
  }

  async updateCurrent(userId: string, profile: UpdateUserProfile): Promise<UserProfileRecord> {
    const payload = {
      full_name: profile.fullName,
      phone: profile.phone,
      date_of_birth: profile.dateOfBirth,
      gender: profile.gender,
    };
    const { data, error } = await getSupabaseClient().from('users')
      .update(payload).eq('id', userId).select(profileColumns).maybeSingle();
    if (error) throw error;
    if (!data) throw new Error('Your profile was not updated. Check your account access and try again.');
    return mapProfile(data as UserRow);
  }
}
