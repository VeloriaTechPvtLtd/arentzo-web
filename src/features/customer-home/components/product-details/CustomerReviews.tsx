import React from 'react';
import { Star } from 'lucide-react';
import type { Review } from '../../types';

interface CustomerReviewsProps {
    reviews: Review[];
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
    return (
        <div className="section-container customer-reviews">
            <h3 className="section-title">Reviews</h3>
            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <div className="reviewer-info">
                                <img src={review.userAvatar} alt={review.userName} className="reviewer-avatar" />
                                <div className="reviewer-meta">
                                    <h4 className="reviewer-name">{review.userName}</h4>
                                    <span className="review-date">{review.date}</span>
                                </div>
                            </div>
                            <div className="review-rating">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < review.rating ? "var(--home-primary)" : "none"}
                                        color={i < review.rating ? "var(--home-primary)" : "var(--home-border)"}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                        {review.images && review.images.length > 0 && (
                            <div className="review-images">
                                {review.images.map((img, idx) => (
                                    <img key={idx} src={img} alt={`Review ${idx + 1}`} className="review-image" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button className="see-all-btn">See All Reviews ({reviews.length})</button>
        </div>
    );
};
