import React, { useState } from 'react';
import { X, AlertTriangle, Camera, Send, CheckCircle2 } from 'lucide-react';
import type { Rental } from '../../domain/entities';
import '../styles/RentalActionModals.css';

interface ReportIssueModalProps {
    rental: Rental;
    isOpen: boolean;
    onClose: () => void;
}

const ISSUE_TYPES = [
    { value: 'damage', label: 'Damage to Item' },
    { value: 'malfunction', label: 'Item Malfunction' },
    { value: 'missing_parts', label: 'Missing Parts/Accessories' },
    { value: 'wrong_item', label: 'Wrong Item Received' },
    { value: 'other', label: 'Other Issue' },
];

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({ rental, isOpen, onClose }) => {
    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        setIssueType('');
        setDescription('');
        setIsSubmitted(false);
        onClose();
    };

    const handleSubmit = () => {
        if (!issueType || !description.trim()) return;
        setIsSubmitted(true);
    };

    const isFormValid = issueType && description.trim().length > 10;

    if (isSubmitted) {
        return (
            <div className="rental-action-modal" onClick={handleBackdropClick}>
                <div className="rental-action-modal__container">
                    <header className="rental-action-modal__header">
                        <h2 className="rental-action-modal__title">Report Issue</h2>
                        <button className="rental-action-modal__close-btn" onClick={handleClose}>
                            <X size={20} />
                        </button>
                    </header>
                    <div className="rental-action-modal__content">
                        <div className="rental-action-modal__success">
                            <div className="rental-action-modal__success-icon">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="rental-action-modal__success-title">Issue Reported</h3>
                            <p className="rental-action-modal__success-text">
                                We've received your report and will get back to you within 24 hours.
                            </p>
                        </div>
                    </div>
                    <footer className="rental-action-modal__footer">
                        <button
                            className="rental-action-modal__btn rental-action-modal__btn--primary"
                            onClick={handleClose}
                            style={{ flex: 1 }}
                        >
                            Done
                        </button>
                    </footer>
                </div>
            </div>
        );
    }

    return (
        <div className="rental-action-modal" onClick={handleBackdropClick}>
            <div className="rental-action-modal__container">
                <header className="rental-action-modal__header">
                    <h2 className="rental-action-modal__title">Report Issue</h2>
                    <button className="rental-action-modal__close-btn" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </header>

                <div className="rental-action-modal__content">
                    <div className="rental-action-modal__product-preview">
                        <img
                            src={rental.productImage}
                            alt={rental.productName}
                            className="rental-action-modal__product-image"
                        />
                        <div className="rental-action-modal__product-details">
                            <h4 className="rental-action-modal__product-name">{rental.productName}</h4>
                            <span className="rental-action-modal__product-provider">
                                {rental.providerName}
                            </span>
                            <span className="rental-action-modal__product-provider">
                                ID: {rental.id}
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">Issue Type</label>
                        <select
                            className="rental-action-modal__select"
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                        >
                            <option value="">Select issue type...</option>
                            {ISSUE_TYPES.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">Description</label>
                        <textarea
                            className="rental-action-modal__textarea"
                            placeholder="Please describe the issue in detail..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">Attach Photos (Optional)</label>
                        <div className="rental-action-modal__upload-area">
                            <div className="rental-action-modal__upload-icon">
                                <Camera size={24} />
                            </div>
                            <p className="rental-action-modal__upload-text">
                                <strong>Tap to upload</strong> photos of the issue
                            </p>
                        </div>
                    </div>

                    <div className="rental-action-modal__info-card rental-action-modal__info-card--warning">
                        <div className="rental-action-modal__info-icon rental-action-modal__info-icon--warning">
                            <AlertTriangle size={18} />
                        </div>
                        <div className="rental-action-modal__info-content">
                            <span className="rental-action-modal__info-label">Response Time</span>
                            <span className="rental-action-modal__info-value">
                                Our support team will respond within 24 hours
                            </span>
                        </div>
                    </div>
                </div>

                <footer className="rental-action-modal__footer">
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--primary"
                        onClick={handleSubmit}
                        disabled={!isFormValid}
                    >
                        <Send size={16} />
                        Submit Report
                    </button>
                </footer>
            </div>
        </div>
    );
};
