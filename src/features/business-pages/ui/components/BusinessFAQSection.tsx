import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FaqItem {
    questionKey: string;
    answerKey: string;
}

interface BusinessFAQSectionProps {
    titleKey: string;
    items: FaqItem[];
}

export const BusinessFAQSection: React.FC<BusinessFAQSectionProps> = ({
    titleKey,
    items,
}) => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="faq-section__inner">
                <h2 className="faq-section__title">{t(titleKey)}</h2>
                {items.map((item, index) => (
                    <div key={item.questionKey} className="faq-section__item">
                        <button
                            className="faq-section__question"
                            onClick={() => toggleItem(index)}
                            type="button"
                        >
                            {t(item.questionKey)}
                            <ChevronDown
                                className={`faq-section__chevron ${openIndex === index ? 'faq-section__chevron--open' : ''
                                    }`}
                            />
                        </button>
                        {openIndex === index && (
                            <p className="faq-section__answer">{t(item.answerKey)}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};
