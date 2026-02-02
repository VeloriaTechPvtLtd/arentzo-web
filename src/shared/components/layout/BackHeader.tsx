import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './BackHeader.css';

interface BackHeaderProps {
    title?: string;
    rightElement?: React.ReactNode;
    onBack?: () => void;
}

export const BackHeader: React.FC<BackHeaderProps> = ({
    title = '',
    rightElement,
    onBack
}) => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate(-1);
        }
    };

    return (
        <header className={`back-header ${isScrolled ? 'back-header--scrolled' : ''}`}>
            <div className="back-header__container">
                <button
                    onClick={handleBack}
                    className="back-header__back-btn"
                    aria-label="Go back"
                >
                    <ChevronLeft size={24} />
                </button>

                {title && (
                    <h1 className="back-header__title">{title}</h1>
                )}

                <div className="back-header__right">
                    {rightElement}
                </div>
            </div>
        </header>
    );
};
