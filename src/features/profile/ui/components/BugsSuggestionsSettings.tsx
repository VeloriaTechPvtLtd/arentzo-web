'use client';

import React, { useState } from 'react';
import { useAuth } from '@/features/auth/ui/context/AuthContext';
import { FeedbackService } from '../../application/services/FeedbackService';
import type { FeedbackType } from '../../application/ports/FeedbackRepository';
import { SupabaseFeedbackRepository } from '../../infrastructure/SupabaseFeedbackRepository';

interface BugsSuggestionsSettingsProps {
    onSave: () => void;
}

const feedbackService = new FeedbackService(new SupabaseFeedbackRepository());

export const BugsSuggestionsSettings: React.FC<BugsSuggestionsSettingsProps> = ({ onSave }) => {
    const { user } = useAuth();
    const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const isBug = feedbackType === 'bug';

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!user) {
            setError('Sign in to submit feedback.');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            await feedbackService.submit({
                userId: user.id,
                userName: user.name || '',
                userEmail: user.email,
                feedbackType,
                title,
                description,
                browserInfo: navigator.userAgent,
                osInfo: navigator.platform || 'Web',
            });
            setSubmitted(true);
        } catch {
            setError('Your feedback could not be submitted. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="settings-view">
            <div className="settings-section">
                <h3 className="settings-section__title">{isBug ? 'Report a bug' : 'Make a suggestion'}</h3>
                <p className="settings-section__subtitle">
                    {isBug ? 'Tell us if something is not working as expected.' : 'Share an idea to improve Arentzo.'}
                </p>

                {submitted ? (
                    <div role="status" className="settings-section__success">
                        <p>Thank you. Your feedback was submitted.</p>
                        <button type="button" className="settings-save-btn" onClick={onSave}>Done</button>
                    </div>
                ) : (
                <>

                <div className="bugs-toggle-container">
                    <div className="bugs-toggle-bg">
                        <button type="button" aria-pressed={isBug} className={`bugs-toggle-btn ${isBug ? 'bugs-toggle-btn--active' : ''}`} onClick={() => setFeedbackType('bug')}>
                            Bug report
                        </button>
                        <button type="button" aria-pressed={!isBug} className={`bugs-toggle-btn ${!isBug ? 'bugs-toggle-btn--active' : ''}`} onClick={() => setFeedbackType('suggestion')}>
                            Suggestion
                        </button>
                    </div>
                </div>

                <form className="bugs-form" onSubmit={(event) => void submit(event)}>
                    {error ? <p role="alert">{error}</p> : null}
                    <div className="form-group">
                        <label className="form-label" htmlFor="feedback-title">Title</label>
                        <input id="feedback-title" type="text" placeholder={isBug ? 'e.g., login button not working' : 'e.g., add a dark mode feature'} className="form-input" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={160} required />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="feedback-description">Description</label>
                        <textarea id="feedback-description" placeholder="Describe your feedback" className="form-textarea" rows={5} value={description} onChange={(event) => setDescription(event.target.value)} maxLength={5000} required />
                    </div>
                    <p className="settings-section__subtitle">File attachments are not available yet.</p>
                    <div className="settings-footer">
                        <button className="settings-save-btn" type="submit" disabled={submitting || !user}>
                            {submitting ? 'Submitting…' : 'Submit feedback'}
                        </button>
                    </div>
                </form>
                </>
                )}
            </div>
        </div>
    );
};
