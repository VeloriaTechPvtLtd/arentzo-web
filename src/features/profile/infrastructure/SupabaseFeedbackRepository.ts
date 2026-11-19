import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';
import type { FeedbackRepository, FeedbackSubmission } from '../application/ports/FeedbackRepository';

export class SupabaseFeedbackRepository implements FeedbackRepository {
  async submit(feedback: FeedbackSubmission): Promise<void> {
    const { error } = await getSupabaseClient().from('app_feedback').insert({
      user_id: feedback.userId,
      feedback_type: feedback.feedbackType,
      title: feedback.title,
      description: feedback.description,
      status: 'pending',
      attachments: null,
      user_name: feedback.userName || 'Unknown',
      user_email: feedback.userEmail || 'Unknown',
      device_info: 'Web',
      os_info: feedback.osInfo,
      browser_info: feedback.browserInfo,
      app_version: 'Web',
    });
    if (error) throw error;
  }
}
