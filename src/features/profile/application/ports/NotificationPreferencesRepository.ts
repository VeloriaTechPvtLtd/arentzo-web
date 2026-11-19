export interface NotificationPreferences {
  push: boolean;
  email: boolean;
  app: boolean;
  offers: boolean;
  payments: boolean;
  rentals: boolean;
}

export interface NotificationPreferencesRepository {
  getForUser(userId: string): Promise<NotificationPreferences | null>;
  updateForUser(userId: string, preferences: NotificationPreferences): Promise<void>;
}
