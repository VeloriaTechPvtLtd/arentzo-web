import React, { useState } from 'react';
import { Upload, X, CheckCircle2 } from 'lucide-react';

interface BugsSuggestionsSettingsProps {
    onSave: () => void;
}

type ReportType = 'bug' | 'suggestion';

export const BugsSuggestionsSettings: React.FC<BugsSuggestionsSettingsProps> = ({ onSave }) => {
    const [reportType, setReportType] = useState<ReportType>('bug');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [hasAttachment, setHasAttachment] = useState(true);

    const isBug = reportType === 'bug';

    return (
        <div className="settings-view">
            <div className="settings-section">
                <h3 className="settings-section__title">
                    {isBug ? 'Report a Bug' : 'Make a Suggestion'}
                </h3>
                <p className="settings-section__subtitle">
                    {isBug
                        ? 'Tell us if something is not working as expected'
                        : 'How can we make Arentzo even better?'}
                </p>

                <div className="bugs-toggle-container">
                    <div className="bugs-toggle-bg">
                        <button
                            className={`bugs-toggle-btn ${isBug ? 'bugs-toggle-btn--active' : ''}`}
                            onClick={() => setReportType('bug')}
                        >
                            Bug Report
                        </button>
                        <button
                            className={`bugs-toggle-btn ${!isBug ? 'bugs-toggle-btn--active' : ''}`}
                            onClick={() => setReportType('suggestion')}
                        >
                            Suggestion
                        </button>
                    </div>
                </div>

                <form className="bugs-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            placeholder={isBug ? "e.g., login button not working" : "e.g., add a dark mode feature"}
                            className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            placeholder={isBug ? "Describe the report" : "Describe your suggestion"}
                            className="form-textarea"
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Attachment (Optional)</label>

                        <div className="upload-dropzone">
                            <div className="upload-content">
                                <div className="upload-icon-wrapper">
                                    <Upload size={24} />
                                </div>
                                <span className="upload-text">Click to upload</span>
                                <span className="upload-hint">PNG, JPG or GIF (max 5mb)</span>
                            </div>
                        </div>

                        {hasAttachment && (
                            <div className="attachment-preview">
                                <div className="attachment-content">
                                    <div className="attachment-status">
                                        <CheckCircle2 size={20} className="text-green-500" />
                                    </div>
                                    <div className="attachment-info">
                                        <span className="attachment-name">Screenshot</span>
                                        <span className="attachment-id">45676543-87654...rcDOC</span>
                                    </div>
                                    <button
                                        className="attachment-remove"
                                        onClick={() => setHasAttachment(false)}
                                        aria-label="Remove attachment"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            <div className="settings-footer">
                <button
                    className="settings-save-btn"
                    onClick={onSave}
                >
                    Submit Report
                </button>
            </div>
        </div>
    );
};
