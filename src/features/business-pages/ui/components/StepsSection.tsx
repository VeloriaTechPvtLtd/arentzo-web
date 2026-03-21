import React from 'react';
import { useTranslation } from 'react-i18next';

interface StepItem {
    titleKey: string;
    descriptionKey: string;
}

interface StepsSectionProps {
    titleKey: string;
    subtitleKey: string;
    items: StepItem[];
}

export const StepsSection: React.FC<StepsSectionProps> = ({
    titleKey,
    subtitleKey,
    items,
}) => {
    const { t } = useTranslation();

    return (
        <section className="steps-section">
            <div className="steps-section__inner">
                <h2 className="steps-section__title">{t(titleKey)}</h2>
                <p className="steps-section__subtitle">{t(subtitleKey)}</p>
                <div className="steps-section__list">
                    {items.map((item, index) => (
                        <div key={item.titleKey} className="steps-section__item">
                            <div className="steps-section__number">{index + 1}</div>
                            <div>
                                <h3 className="steps-section__item-title">
                                    {t(item.titleKey)}
                                </h3>
                                <p className="steps-section__item-desc">
                                    {t(item.descriptionKey)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
