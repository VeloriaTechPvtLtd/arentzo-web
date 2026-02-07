import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface TermsSelectionProps {
    onNext: () => void;
}

export const TermsSelection: React.FC<TermsSelectionProps> = ({ onNext }) => {
    const [terms, setTerms] = useState([
        { id: 'standard', title: 'Standard', active: true, icon: '⚖️' },
        { id: 'smoking', title: 'No Smoking', active: false, icon: '🚭' },
        { id: 'drinking', title: 'No Drinking', active: false, icon: '📵' },
    ]);

    const toggleTerm = (id: string) => {
        setTerms(terms.map(t => t.id === id ? { ...t, active: !t.active } : t));
    };

    return (
        <div className="step-content">
            <div className="terms-header-section">
                <h2 className="section-title">Select Terms</h2>
                <p className="section-desc">Customize your rental agreement by enabling the application terms below</p>
            </div>

            <div className="terms-list mt-6 space-y-4">
                {terms.map(term => (
                    <div key={term.id} className="term-card">
                        <div className="term-info">
                            <div className="term-icon-circle">{term.icon}</div>
                            <div className="term-text">
                                <span className="term-title">{term.title}</span>
                                <button className="view-details-btn">View Details <ChevronRight size={14} /></button>
                            </div>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={term.active}
                                onChange={() => toggleTerm(term.id)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                ))}
            </div>

            <div className="notice-card mt-8">
                <span className="notice-title">Important Notice</span>
                <p className="notice-text mt-2">
                    Please review all selected terms carefully. Selecting "Standard" includes basic terms.
                    "No Smoking" and "No Drinks" are specific conditions for the service.
                    For full details, tap "View Details".
                </p>
            </div>

            <div className="step-footer">
                <button className="next-btn" onClick={onNext}>Next</button>
            </div>
        </div>
    );
};
