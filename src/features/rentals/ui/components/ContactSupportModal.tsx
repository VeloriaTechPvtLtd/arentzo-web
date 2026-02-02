import React, { useState } from 'react';
import { X, Phone, Mail, MessageCircle, Send, CheckCircle2, HelpCircle, ChevronRight } from 'lucide-react';
import type { Rental } from '../../domain/entities';
import '../styles/RentalActionModals.css';

interface ContactSupportModalProps {
    rental: Rental;
    isOpen: boolean;
    onClose: () => void;
}

const SUPPORT_SUBJECTS = [
    { value: 'order_status', label: 'Order Status' },
    { value: 'payment_issue', label: 'Payment Issue' },
    { value: 'change_request', label: 'Change Request' },
    { value: 'cancellation', label: 'Cancellation Help' },
    { value: 'other', label: 'Other' },
];

const FAQ_LINKS = [
    { label: 'How long does order confirmation take?', href: '#' },
    { label: 'Can I change my pickup date?', href: '#' },
    { label: 'What is the refund policy?', href: '#' },
];

export const ContactSupportModal: React.FC<ContactSupportModalProps> = ({ rental, isOpen, onClose }) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        setSubject('');
        setMessage('');
        setIsSubmitted(false);
        onClose();
    };

    const handleSubmit = () => {
        if (!subject || !message.trim()) return;
        setIsSubmitted(true);
    };

    const isFormValid = subject && message.trim().length > 10;

    if (isSubmitted) {
        return (
            <div className="rental-action-modal" onClick={handleBackdropClick}>
                <div className="rental-action-modal__container">
                    <header className="rental-action-modal__header">
                        <h2 className="rental-action-modal__title">Contact Support</h2>
                        <button className="rental-action-modal__close-btn" onClick={handleClose}>
                            <X size={20} />
                        </button>
                    </header>
                    <div className="rental-action-modal__content">
                        <div className="rental-action-modal__success">
                            <div className="rental-action-modal__success-icon">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="rental-action-modal__success-title">Message Sent</h3>
                            <p className="rental-action-modal__success-text">
                                Our support team will get back to you within 2-4 hours.
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
                    <h2 className="rental-action-modal__title">Contact Support</h2>
                    <button className="rental-action-modal__close-btn" onClick={handleClose}>
                        <X size={20} />
                    </button>
                </header>

                <div className="rental-action-modal__content">
                    <div className="rental-action-modal__contact-options">
                        <button className="rental-action-modal__contact-option">
                            <Phone size={24} />
                            <span>Call</span>
                        </button>
                        <button className="rental-action-modal__contact-option">
                            <Mail size={24} />
                            <span>Email</span>
                        </button>
                        <button className="rental-action-modal__contact-option">
                            <MessageCircle size={24} />
                            <span>Chat</span>
                        </button>
                    </div>

                    <div className="rental-action-modal__info-card">
                        <div className="rental-action-modal__info-content" style={{ gap: '4px' }}>
                            <span className="rental-action-modal__info-label">Rental ID</span>
                            <span className="rental-action-modal__info-value" style={{ fontFamily: 'var(--font-mono)' }}>
                                {rental.id}
                            </span>
                        </div>
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">Subject</label>
                        <select
                            className="rental-action-modal__select"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            <option value="">Select a topic...</option>
                            {SUPPORT_SUBJECTS.map(item => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">Message</label>
                        <textarea
                            className="rental-action-modal__textarea"
                            placeholder="Describe your issue or question..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div className="rental-action-modal__faq-section">
                        <h4 className="rental-action-modal__faq-title">Frequently Asked</h4>
                        <div className="rental-action-modal__faq-links">
                            {FAQ_LINKS.map((faq, index) => (
                                <a key={index} href={faq.href} className="rental-action-modal__faq-link">
                                    <HelpCircle size={16} />
                                    <span style={{ flex: 1 }}>{faq.label}</span>
                                    <ChevronRight size={16} style={{ color: 'var(--muted-foreground)' }} />
                                </a>
                            ))}
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
                        Send Message
                    </button>
                </footer>
            </div>
        </div>
    );
};
