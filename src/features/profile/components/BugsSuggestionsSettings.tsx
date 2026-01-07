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
    const [hasAttachment, setHasAttachment] = useState(true); // Mocking one attachment as per design

    const isBug = reportType === 'bug';

    return (
        <div className="settings-view px-5 pt-2">
            <div className="settings-section">
                <h3 className="settings-section__title">
                    {isBug ? 'Report a bug' : 'Make a suggestion'}
                </h3>
                <p className="settings-section__subtitle">
                    {isBug
                        ? 'Tell us if something is not working as expected'
                        : 'How can we make Arentzo even better?'}
                </p>

                {/* Tab Toggle */}
                <div className="bugs-toggle-container mt-6 mb-8">
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

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    {/* Title Field */}
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

                    {/* Description Field */}
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

                    {/* Attachment Section */}
                    <div className="form-group">
                        <label className="form-label">Attachment (Optional)</label>

                        <div className="upload-dropzone">
                            <div className="upload-content">
                                <div className="upload-icon-wrapper">
                                    <Upload size={24} className="text-gray-400" />
                                </div>
                                <span className="upload-text">Click to upload</span>
                                <span className="upload-hint">PNG, JPG or GIF (max 5mb)</span>
                            </div>
                        </div>

                        {hasAttachment && (
                            <div className="attachment-preview mt-4">
                                <div className="attachment-content">
                                    <div className="attachment-status">
                                        <CheckCircle2 size={20} className="text-green-500" />
                                    </div>
                                    <div className="attachment-info">
                                        <span className="attachment-name">Screenshot</span>
                                        <span className="attachment-id">45676543-87654-8765433-rcDOC...</span>
                                    </div>
                                    <button
                                        className="attachment-remove"
                                        onClick={() => setHasAttachment(false)}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            <div className="settings-footer px-0">
                <button
                    className="settings-save-btn"
                    onClick={onSave}
                    style={{ background: '#ff7e5f' }}
                >
                    Submit
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .bugs-toggle-container {
                    padding: 4px;
                }
                .bugs-toggle-bg {
                    display: flex;
                    background: var(--muted);
                    border-radius: 100px;
                    padding: 4px;
                    position: relative;
                }
                .bugs-toggle-btn {
                    flex: 1;
                    padding: 12px;
                    border-radius: 100px;
                    border: none;
                    background: transparent;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--muted-foreground);
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bugs-toggle-btn--active {
                    background: #ff7e5f;
                    color: white;
                    box-shadow: 0 4px 12px rgba(255, 126, 95, 0.2);
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .form-label {
                    font-size: 15px;
                    font-weight: 700;
                    color: var(--foreground);
                }
                .form-input {
                    width: 100%;
                    padding: 16px;
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    font-size: 14px;
                    color: var(--foreground);
                    transition: all 0.2s;
                }
                .form-input::placeholder {
                    color: var(--muted-foreground);
                }
                .form-input:focus {
                    outline: none;
                    border-color: #ff7e5f;
                    background: var(--card);
                    box-shadow: 0 0 0 4px rgba(255, 126, 95, 0.05);
                }
                .form-textarea {
                    width: 100%;
                    padding: 16px;
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    font-size: 14px;
                    color: var(--foreground);
                    resize: none;
                    transition: all 0.2s;
                }
                .form-textarea:focus {
                    outline: none;
                    border-color: #ff7e5f;
                    background: var(--card);
                    box-shadow: 0 0 0 4px rgba(255, 126, 95, 0.05);
                }
                
                .upload-dropzone {
                    border: 1px dashed #ff7e5f;
                    border-radius: 16px;
                    padding: 32px;
                    background: var(--muted);
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    justify-content: center;
                }
                .upload-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }
                .upload-icon-wrapper {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    background: var(--card);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                    margin-bottom: 4px;
                }
                .upload-text {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--muted-foreground);
                }
                .upload-hint {
                    font-size: 12px;
                    color: var(--muted-foreground);
                }
                
                .attachment-preview {
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 16px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
                }
                .attachment-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .attachment-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .attachment-name {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--foreground);
                }
                .attachment-id {
                    font-size: 11px;
                    color: var(--muted-foreground);
                }
                .attachment-remove {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--muted);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--muted-foreground);
                    cursor: pointer;
                }
            `}} />
        </div>
    );
};
