import React from 'react';
import {
    DollarSign, Code, Megaphone, Headphones,
    BarChart3, GraduationCap, CheckCircle2,
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
    { valueKey: 'partner.hero.stats.cities', labelKey: 'partner.hero.stats.citiesLabel' },
    { valueKey: 'partner.hero.stats.partners', labelKey: 'partner.hero.stats.partnersLabel' },
    { valueKey: 'partner.hero.stats.growth', labelKey: 'partner.hero.stats.growthLabel' },
];

const BENEFIT_ITEMS = [
    { titleKey: 'partner.benefits.items.revenue.title', descriptionKey: 'partner.benefits.items.revenue.description', icon: DollarSign },
    { titleKey: 'partner.benefits.items.technology.title', descriptionKey: 'partner.benefits.items.technology.description', icon: Code },
    { titleKey: 'partner.benefits.items.marketing.title', descriptionKey: 'partner.benefits.items.marketing.description', icon: Megaphone },
    { titleKey: 'partner.benefits.items.support.title', descriptionKey: 'partner.benefits.items.support.description', icon: Headphones },
    { titleKey: 'partner.benefits.items.analytics.title', descriptionKey: 'partner.benefits.items.analytics.description', icon: BarChart3 },
    { titleKey: 'partner.benefits.items.training.title', descriptionKey: 'partner.benefits.items.training.description', icon: GraduationCap },
];

const STEP_ITEMS = [
    { titleKey: 'partner.steps.items.apply.title', descriptionKey: 'partner.steps.items.apply.description' },
    { titleKey: 'partner.steps.items.review.title', descriptionKey: 'partner.steps.items.review.description' },
    { titleKey: 'partner.steps.items.agreement.title', descriptionKey: 'partner.steps.items.agreement.description' },
    { titleKey: 'partner.steps.items.launch.title', descriptionKey: 'partner.steps.items.launch.description' },
];

const FAQ_ITEMS = [
    { questionKey: 'partner.faq.items.eligibility.question', answerKey: 'partner.faq.items.eligibility.answer' },
    { questionKey: 'partner.faq.items.cost.question', answerKey: 'partner.faq.items.cost.answer' },
    { questionKey: 'partner.faq.items.integration.question', answerKey: 'partner.faq.items.integration.answer' },
    { questionKey: 'partner.faq.items.exclusivity.question', answerKey: 'partner.faq.items.exclusivity.answer' },
    { questionKey: 'partner.faq.items.termination.question', answerKey: 'partner.faq.items.termination.answer' },
];

const TIER_KEYS = ['silver', 'gold', 'platinum'] as const;

export const PartnerPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <WaitlistPageShell>
            <main>
                <BusinessHeroSection
                    titleKey="partner.hero.title"
                    subtitleKey="partner.hero.subtitle"
                    ctaKey="partner.hero.cta"
                    stats={HERO_STATS}
                />
                <BenefitsGrid
                    titleKey="partner.benefits.title"
                    subtitleKey="partner.benefits.subtitle"
                    items={BENEFIT_ITEMS}
                />
                <StepsSection
                    titleKey="partner.steps.title"
                    subtitleKey="partner.steps.subtitle"
                    items={STEP_ITEMS}
                />
                <section className="tiers-section">
                    <div className="tiers-section__inner">
                        <h2 className="tiers-section__title">{t('partner.tiers.title')}</h2>
                        <p className="tiers-section__subtitle">{t('partner.tiers.subtitle')}</p>
                        <div className="tiers-section__grid">
                            {TIER_KEYS.map((tier) => (
                                <div
                                    key={tier}
                                    className={`tiers-section__card ${tier === 'gold' ? 'tiers-section__card--featured' : ''}`}
                                >
                                    <h3 className="tiers-section__card-name">
                                        {t(`partner.tiers.${tier}.name`)}
                                    </h3>
                                    <p className="tiers-section__card-commission">
                                        {t(`partner.tiers.${tier}.commission`)}
                                    </p>
                                    <ul className="tiers-section__feature-list">
                                        {(t(`partner.tiers.${tier}.features`, { returnObjects: true }) as string[]).map(
                                            (feature) => (
                                                <li key={feature} className="tiers-section__feature-item">
                                                    <CheckCircle2 className="tiers-section__check-icon" />
                                                    {feature}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <BusinessFAQSection titleKey="partner.faq.title" items={FAQ_ITEMS} />
                <BusinessCTASection
                    titleKey="partner.cta.title"
                    descriptionKey="partner.cta.description"
                    buttonKey="partner.cta.button"
                />
            </main>
        </WaitlistPageShell>
    );
};
