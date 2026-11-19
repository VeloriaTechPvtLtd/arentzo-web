export interface UserProfileRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  avatarUrl: string | null;
}

export interface UpdateUserProfile {
  fullName: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
}

export interface UserProfileRepository {
  getCurrent(userId: string): Promise<UserProfileRecord | null>;
  updateCurrent(userId: string, profile: UpdateUserProfile): Promise<UserProfileRecord>;
}
