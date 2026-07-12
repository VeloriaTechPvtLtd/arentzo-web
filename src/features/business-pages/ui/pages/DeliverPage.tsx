import React from 'react';
import {
    Clock, Banknote, ShieldCheck,
    Headphones, Navigation, TrendingUp, CheckCircle2,
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
    { valueKey: 'deliver.hero.stats.drivers', labelKey: 'deliver.hero.stats.driversLabel' },
    { valueKey: 'deliver.hero.stats.avgEarning', labelKey: 'deliver.hero.stats.avgEarningLabel' },
    { valueKey: 'deliver.hero.stats.cities', labelKey: 'deliver.hero.stats.citiesLabel' },
];

const BENEFIT_ITEMS = [
    { titleKey: 'deliver.benefits.items.flexible.title', descriptionKey: 'deliver.benefits.items.flexible.description', icon: Clock },
    { titleKey: 'deliver.benefits.items.earnings.title', descriptionKey: 'deliver.benefits.items.earnings.description', icon: Banknote },
    { titleKey: 'deliver.benefits.items.insurance.title', descriptionKey: 'deliver.benefits.items.insurance.description', icon: ShieldCheck },
    { titleKey: 'deliver.benefits.items.support.title', descriptionKey: 'deliver.benefits.items.support.description', icon: Headphones },
    { titleKey: 'deliver.benefits.items.navigation.title', descriptionKey: 'deliver.benefits.items.navigation.description', icon: Navigation },
    { titleKey: 'deliver.benefits.items.growth.title', descriptionKey: 'deliver.benefits.items.growth.description', icon: TrendingUp },
];

const STEP_ITEMS = [
    { titleKey: 'deliver.steps.items.apply.title', descriptionKey: 'deliver.steps.items.apply.description' },
    { titleKey: 'deliver.steps.items.verification.title', descriptionKey: 'deliver.steps.items.verification.description' },
    { titleKey: 'deliver.steps.items.training.title', descriptionKey: 'deliver.steps.items.training.description' },
    { titleKey: 'deliver.steps.items.deliver.title', descriptionKey: 'deliver.steps.items.deliver.description' },
];

const VEHICLE_KEYS = ['twoWheeler', 'threeWheeler', 'fourWheeler'] as const;

const FAQ_ITEMS = [
    { questionKey: 'deliver.faq.items.earnings.question', answerKey: 'deliver.faq.items.earnings.answer' },
    { questionKey: 'deliver.faq.items.fuel.question', answerKey: 'deliver.faq.items.fuel.answer' },
    { questionKey: 'deliver.faq.items.items.question', answerKey: 'deliver.faq.items.items.answer' },
    { questionKey: 'deliver.faq.items.rejection.question', answerKey: 'deliver.faq.items.rejection.answer' },
    { questionKey: 'deliver.faq.items.payouts.question', answerKey: 'deliver.faq.items.payouts.answer' },
];

export const DeliverPage: React.FC = () => {
    const { t } = useTranslation();
    const generalRequirements = t(
        'deliver.vehicleRequirements.general', { returnObjects: true }
    ) as string[];

    return (
        <WaitlistPageShell>
            <main>
                <BusinessHeroSection
                    titleKey="deliver.hero.title"
                    subtitleKey="deliver.hero.subtitle"
                    ctaKey="deliver.hero.cta"
                    stats={HERO_STATS}
                />
                <BenefitsGrid
                    titleKey="deliver.benefits.title"
                    subtitleKey="deliver.benefits.subtitle"
                    items={BENEFIT_ITEMS}
                />
                <StepsSection
                    titleKey="deliver.steps.title"
                    subtitleKey="deliver.steps.subtitle"
                    items={STEP_ITEMS}
                />
                <section className="vehicles-section">
                    <div className="vehicles-section__inner">
                        <h2 className="vehicles-section__title">
                            {t('deliver.vehicleRequirements.title')}
                        </h2>
                        <p className="vehicles-section__subtitle">
                            {t('deliver.vehicleRequirements.subtitle')}
                        </p>
                        <div className="vehicles-section__grid">
                            {VEHICLE_KEYS.map((key) => (
                                <div key={key} className="vehicles-section__card">
                                    <h3 className="vehicles-section__card-type">
                                        {t(`deliver.vehicleRequirements.items.${key}.type`)}
                                    </h3>
                                    <p className="vehicles-section__card-desc">
                                        {t(`deliver.vehicleRequirements.items.${key}.description`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="requirements-section__list" style={{ maxWidth: '48rem', margin: '0 auto' }}>
                            {generalRequirements.map((item) => (
                                <div key={item} className="requirements-section__item">
                                    <CheckCircle2 className="requirements-section__icon" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <BusinessFAQSection titleKey="deliver.faq.title" items={FAQ_ITEMS} />
                <BusinessCTASection
                    titleKey="deliver.cta.title"
                    descriptionKey="deliver.cta.description"
                    buttonKey="deliver.cta.button"
                />
            </main>
        </WaitlistPageShell>
    );
};
