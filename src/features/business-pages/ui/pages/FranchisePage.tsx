import React from 'react';
import {
    Award, MapPin, GraduationCap, Monitor,
    Package, Headphones,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WaitlistPageShell } from '../../../landing/ui/components/WaitlistPageShell';
import { BusinessHeroSection } from '../components/BusinessHeroSection';
import { BenefitsGrid } from '../components/BenefitsGrid';
import { StepsSection } from '../components/StepsSection';
import { BusinessCTASection } from '../components/BusinessCTASection';
import { BusinessFAQSection } from '../components/BusinessFAQSection';
import '../styles/BusinessPages.css';

const HERO_STATS = [
    { valueKey: 'franchise.hero.stats.investment', labelKey: 'franchise.hero.stats.investmentLabel' },
    { valueKey: 'franchise.hero.stats.roi', labelKey: 'franchise.hero.stats.roiLabel' },
    { valueKey: 'franchise.hero.stats.territories', labelKey: 'franchise.hero.stats.territoriesLabel' },
];

const BENEFIT_ITEMS = [
    { titleKey: 'franchise.benefits.items.brand.title', descriptionKey: 'franchise.benefits.items.brand.description', icon: Award },
    { titleKey: 'franchise.benefits.items.territory.title', descriptionKey: 'franchise.benefits.items.territory.description', icon: MapPin },
    { titleKey: 'franchise.benefits.items.training.title', descriptionKey: 'franchise.benefits.items.training.description', icon: GraduationCap },
    { titleKey: 'franchise.benefits.items.technology.title', descriptionKey: 'franchise.benefits.items.technology.description', icon: Monitor },
    { titleKey: 'franchise.benefits.items.supply.title', descriptionKey: 'franchise.benefits.items.supply.description', icon: Package },
    { titleKey: 'franchise.benefits.items.support.title', descriptionKey: 'franchise.benefits.items.support.description', icon: Headphones },
];

const STEP_ITEMS = [
    { titleKey: 'franchise.steps.items.inquiry.title', descriptionKey: 'franchise.steps.items.inquiry.description' },
    { titleKey: 'franchise.steps.items.discovery.title', descriptionKey: 'franchise.steps.items.discovery.description' },
    { titleKey: 'franchise.steps.items.agreement.title', descriptionKey: 'franchise.steps.items.agreement.description' },
    { titleKey: 'franchise.steps.items.setup.title', descriptionKey: 'franchise.steps.items.setup.description' },
    { titleKey: 'franchise.steps.items.launch.title', descriptionKey: 'franchise.steps.items.launch.description' },
];

const INVESTMENT_KEYS = [
    'franchiseFee', 'setup', 'workingCapital', 'marketing', 'royalty', 'adFund',
] as const;

const FAQ_ITEMS = [
    { questionKey: 'franchise.faq.items.experience.question', answerKey: 'franchise.faq.items.experience.answer' },
    { questionKey: 'franchise.faq.items.financing.question', answerKey: 'franchise.faq.items.financing.answer' },
    { questionKey: 'franchise.faq.items.territory.question', answerKey: 'franchise.faq.items.territory.answer' },
    { questionKey: 'franchise.faq.items.timeline.question', answerKey: 'franchise.faq.items.timeline.answer' },
    { questionKey: 'franchise.faq.items.renewal.question', answerKey: 'franchise.faq.items.renewal.answer' },
];

export const FranchisePage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <WaitlistPageShell>
            <main>
                <BusinessHeroSection
                    titleKey="franchise.hero.title"
                    subtitleKey="franchise.hero.subtitle"
                    ctaKey="franchise.hero.cta"
                    stats={HERO_STATS}
                />
                <BenefitsGrid
                    titleKey="franchise.benefits.title"
                    subtitleKey="franchise.benefits.subtitle"
                    items={BENEFIT_ITEMS}
                />
                <StepsSection
                    titleKey="franchise.steps.title"
                    subtitleKey="franchise.steps.subtitle"
                    items={STEP_ITEMS}
                />
                <section className="investment-section">
                    <div className="investment-section__inner">
                        <h2 className="investment-section__title">{t('franchise.investment.title')}</h2>
                        <p className="investment-section__subtitle">{t('franchise.investment.subtitle')}</p>
                        <table className="investment-section__table">
                            <tbody>
                                {INVESTMENT_KEYS.map((key) => (
                                    <tr key={key} className="investment-section__row">
                                        <td className="investment-section__label">
                                            {t(`franchise.investment.items.${key}.label`)}
                                        </td>
                                        <td className="investment-section__value">
                                            {t(`franchise.investment.items.${key}.value`)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <BusinessFAQSection titleKey="franchise.faq.title" items={FAQ_ITEMS} />
                <BusinessCTASection
                    titleKey="franchise.cta.title"
                    descriptionKey="franchise.cta.description"
                    buttonKey="franchise.cta.button"
                />
            </main>
        </WaitlistPageShell>
    );
};
