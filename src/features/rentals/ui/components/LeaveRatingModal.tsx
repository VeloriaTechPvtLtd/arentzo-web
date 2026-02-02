import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import type { Rental } from '../../domain/entities';
import '../styles/RentalActionModals.css';

interface LeaveRatingModalProps {
    rental: Rental;
    isOpen: boolean;
    onClose: () => void;
}

const RATING_LABELS = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

const QUICK_TAGS = [
    'Great condition',
    'On-time pickup',
    'Friendly provider',
    'Good value',
    'Well maintained',
    'Easy process',
    'Would recommend',
    'Fast response'
];

export const LeaveRatingModal: React.FC<LeaveRatingModalProps> = ({ rental, isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    if (!isOpen) return null;

    const displayRating = hoverRating || rating;

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const handleClose = () => {
        setRating(0);
        setHoverRating(0);
        setReview('');
        setSelectedTags([]);
        setIsSubmitted(false);
        onClose();
    };

    const handleTagClick = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleSubmit = () => {
        if (rating === 0) return;
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="rental-action-modal" onClick={handleBackdropClick}>
                <div className="rental-action-modal__container">
                    <header className="rental-action-modal__header">
                        <h2 className="rental-action-modal__title">Leave Review</h2>
                        <button className="rental-action-modal__close-btn" onClick={handleClose}>
                            <X size={20} />
                        </button>
                    </header>
                    <div className="rental-action-modal__content">
                        <div className="rental-action-modal__success">
                            <div className="rental-action-modal__success-icon">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="rental-action-modal__success-title">Thank You!</h3>
                            <p className="rental-action-modal__success-text">
                                Your review helps other renters make better decisions.
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
                    <h2 className="rental-action-modal__title">Leave Review</h2>
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
                        </div>
                    </div>

                    <div className="rental-action-modal__form-group" style={{ alignItems: 'center' }}>
                        <label className="rental-action-modal__label">Rate your experience</label>
                        <div className="rental-action-modal__star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    className={`rental-action-modal__star ${star <= displayRating ? 'rental-action-modal__star--filled' : ''
                                        }`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                >
                                    <Star />
                                </button>
                            ))}
                        </div>
                        <span className="rental-action-modal__rating-label">
                            {displayRating > 0 ? RATING_LABELS[displayRating - 1] : ''}
                        </span>
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">Quick Feedback</label>
                        <div className="rental-action-modal__tags">
                            {QUICK_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    className={`rental-action-modal__tag ${selectedTags.includes(tag) ? 'rental-action-modal__tag--selected' : ''
                                        }`}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="rental-action-modal__form-group">
                        <label className="rental-action-modal__label">Write a Review (Optional)</label>
                        <textarea
                            className="rental-action-modal__textarea"
                            placeholder="Share your experience with this rental..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            style={{ minHeight: '100px' }}
                        />
                    </div>
                </div>

                <footer className="rental-action-modal__footer">
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--secondary"
                        onClick={handleClose}
                    >
                        Skip
                    </button>
                    <button
                        className="rental-action-modal__btn rental-action-modal__btn--primary"
                        onClick={handleSubmit}
                        disabled={rating === 0}
                    >
                        <Star size={16} />
                        Submit Review
                    </button>
                </footer>
            </div>
        </div>
    );
};
