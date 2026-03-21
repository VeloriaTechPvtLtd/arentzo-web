import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BusinessCTASectionProps {
    titleKey: string;
    descriptionKey: string;
    buttonKey: string;
    onButtonClick?: () => void;
}

export const BusinessCTASection: React.FC<BusinessCTASectionProps> = ({
    titleKey,
    descriptionKey,
    buttonKey,
    onButtonClick,
}) => {
    const { t } = useTranslation();

    return (
        <section className="business-cta">
            <div className="business-cta__card">
                <div className="business-cta__blob" />
                <h2 className="business-cta__title">{t(titleKey)}</h2>
                <p className="business-cta__desc">{t(descriptionKey)}</p>
                <button
                    className="business-cta__button"
                    onClick={onButtonClick}
                    type="button"
                >
                    {t(buttonKey)}
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
};
