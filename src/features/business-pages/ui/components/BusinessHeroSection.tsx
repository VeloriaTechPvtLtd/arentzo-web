import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StatItem {
    valueKey: string;
    labelKey: string;
}

interface BusinessHeroSectionProps {
    titleKey: string;
    subtitleKey: string;
    ctaKey: string;
    stats: StatItem[];
    onCtaClick?: () => void;
}

export const BusinessHeroSection: React.FC<BusinessHeroSectionProps> = ({
    titleKey,
    subtitleKey,
    ctaKey,
    stats,
    onCtaClick,
}) => {
    const { t } = useTranslation();

    return (
        <section className="business-hero">
            <div className="business-hero__blob-1" />
            <div className="business-hero__blob-2" />
            <div className="business-hero__inner">
                <h1 className="business-hero__title">
                    {t(titleKey)}
                </h1>
                <p className="business-hero__subtitle">
                    {t(subtitleKey)}
                </p>
                <button
                    className="business-hero__cta"
                    onClick={onCtaClick}
                    type="button"
                >
                    {t(ctaKey)}
                    <ArrowRight className="w-5 h-5" />
                </button>
                <div className="business-hero__stats">
                    {stats.map((stat) => (
                        <div key={stat.valueKey}>
                            <div className="business-hero__stat-value">
                                {t(stat.valueKey)}
                            </div>
                            <div className="business-hero__stat-label">
                                {t(stat.labelKey)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
