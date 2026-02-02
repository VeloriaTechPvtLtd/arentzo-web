import React from 'react';
import type { CategoryTheme } from '../../domain/entities/types';

interface HeroBannerProps {
    theme: CategoryTheme;
    brandName?: string;
    brandImage?: string;
    cta?: string;
    onCtaClick?: () => void;
    variant?: 'simple' | 'featured';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
    theme,
    brandName,
    brandImage,
    cta,
    onCtaClick,
    variant = 'simple',
}) => {
    const hasCircuitPattern = theme.backgroundPattern === 'circuit';

    return (
        <section
            className={`hero-banner hero-banner--${variant} ${hasCircuitPattern ? 'hero-banner--circuit' : ''}`}
            style={{ background: theme.gradient }}
        >
            {hasCircuitPattern && (
                <div className="hero-banner__circuit-pattern" />
            )}

            <div className="hero-banner__content">
                {variant === 'featured' && brandName && (
                    <div className="hero-banner__brand">
                        <span className="hero-banner__brand-name">{brandName}</span>
                    </div>
                )}

                <h2 className="hero-banner__tagline">
                    {variant === 'featured' && cta ? cta : theme.tagline}
                </h2>

                {theme.subtitle && (
                    <p className="hero-banner__subtitle">{theme.subtitle}</p>
                )}

                {variant === 'featured' && (
                    <button
                        className="hero-banner__cta"
                        onClick={onCtaClick}
                    >
                        Rent now
                    </button>
                )}
            </div>

            {variant === 'featured' && brandImage && (
                <div className="hero-banner__image-container">
                    <img
                        src={brandImage}
                        alt={brandName || 'Featured'}
                        className="hero-banner__image"
                    />
                </div>
            )}
        </section>
    );
};
