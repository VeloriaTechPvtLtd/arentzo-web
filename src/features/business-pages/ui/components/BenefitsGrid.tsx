import React from 'react';
import { useTranslation } from 'react-i18next';
import type { LucideIcon } from 'lucide-react';

interface BenefitItem {
    titleKey: string;
    descriptionKey: string;
    icon: LucideIcon;
}

interface BenefitsGridProps {
    titleKey: string;
    subtitleKey: string;
    items: BenefitItem[];
}

export const BenefitsGrid: React.FC<BenefitsGridProps> = ({
    titleKey,
    subtitleKey,
    items,
}) => {
    const { t } = useTranslation();

    return (
        <section className="benefits-section">
            <div className="benefits-section__inner">
                <h2 className="benefits-section__title">{t(titleKey)}</h2>
                <p className="benefits-section__subtitle">{t(subtitleKey)}</p>
                <div className="benefits-section__grid">
                    {items.map((item) => (
                        <div key={item.titleKey} className="benefits-section__card">
                            <div className="benefits-section__icon">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="benefits-section__card-title">
                                {t(item.titleKey)}
                            </h3>
                            <p className="benefits-section__card-desc">
                                {t(item.descriptionKey)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
