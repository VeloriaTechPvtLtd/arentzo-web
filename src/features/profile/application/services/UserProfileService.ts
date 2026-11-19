import type { UpdateUserProfile, UserProfileRepository } from '../ports/UserProfileRepository';

export class UserProfileService {
  constructor(private readonly repository: UserProfileRepository) {}

  getCurrent(userId: string) {
    if (!userId) throw new Error('Sign in to view your profile.');
    return this.repository.getCurrent(userId);
  }

  updateCurrent(userId: string, profile: UpdateUserProfile) {
    if (!userId) throw new Error('Sign in to edit your profile.');
    if (!profile.fullName.trim()) throw new Error('Enter your full name.');
    if (profile.phone && !/^[+\d()\s.-]{7,20}$/.test(profile.phone)) {
      throw new Error('Enter a valid phone number.');
    }
    return this.repository.updateCurrent(userId, {
      ...profile,
      fullName: profile.fullName.trim(),
      phone: profile.phone?.trim() || null,
      dateOfBirth: profile.dateOfBirth || null,
      gender: profile.gender || null,
    });
  }
}
