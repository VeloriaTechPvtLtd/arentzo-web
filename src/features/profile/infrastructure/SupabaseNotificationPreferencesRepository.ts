import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';
import type { NotificationPreferences, NotificationPreferencesRepository } from '../application/ports/NotificationPreferencesRepository';

const fields = 'enable_push,enable_email,notify_on_app_updates,notify_on_offers,notify_on_payments,notify_on_rentals';

export class SupabaseNotificationPreferencesRepository implements NotificationPreferencesRepository {
  async getForUser(userId: string): Promise<NotificationPreferences | null> {
    const { data, error } = await getSupabaseClient().from('notification_preference')
      .select(fields).eq('user_id', userId).maybeSingle();
    if (error) throw error;
    if (!data) return null;
    return {
      push: data.enable_push ?? true,
      email: data.enable_email ?? true,
      app: data.notify_on_app_updates ?? true,
      offers: data.notify_on_offers ?? true,
      payments: data.notify_on_payments ?? true,
      rentals: data.notify_on_rentals ?? true,
    };
  }

  async updateForUser(userId: string, preferences: NotificationPreferences): Promise<void> {
    const { data, error } = await getSupabaseClient().from('notification_preference')
      .update({
        enable_push: preferences.push,
        enable_email: preferences.email,
        notify_on_app_updates: preferences.app,
        notify_on_offers: preferences.offers,
        notify_on_payments: preferences.payments,
        notify_on_rentals: preferences.rentals,
      })
      .eq('user_id', userId).select('user_id').maybeSingle();
    if (error) throw error;
    if (!data) throw new Error('Notification settings could not be saved for this account.');
  }
}
