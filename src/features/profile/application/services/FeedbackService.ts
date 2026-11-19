import type { FeedbackRepository, FeedbackSubmission } from '../ports/FeedbackRepository';

export class FeedbackService {
  constructor(private readonly repository: FeedbackRepository) {}

  async submit(feedback: FeedbackSubmission): Promise<void> {
    const title = feedback.title.trim();
    const description = feedback.description.trim();
    if (!feedback.userId) throw new Error('Sign in to submit feedback.');
    if (!title || title.length > 160) throw new Error('Enter a title up to 160 characters.');
    if (!description || description.length > 5000) throw new Error('Enter a description up to 5,000 characters.');
    await this.repository.submit({ ...feedback, title, description });
  }
}
