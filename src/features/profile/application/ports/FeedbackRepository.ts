export type FeedbackType = 'bug' | 'suggestion';

export interface FeedbackSubmission {
  userId: string;
  userName: string;
  userEmail: string;
  feedbackType: FeedbackType;
  title: string;
  description: string;
  browserInfo: string;
  osInfo: string;
}

export interface FeedbackRepository {
  submit(feedback: FeedbackSubmission): Promise<void>;
}
