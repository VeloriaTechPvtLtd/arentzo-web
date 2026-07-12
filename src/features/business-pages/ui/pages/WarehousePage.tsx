import React from 'react';
import {
    Banknote, Monitor, ShieldCheck,
    GraduationCap, BarChart3, Network, CheckCircle2,
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
    { valueKey: 'warehouse.hero.stats.warehouses', labelKey: 'warehouse.hero.stats.warehousesLabel' },
    { valueKey: 'warehouse.hero.stats.sqft', labelKey: 'warehouse.hero.stats.sqftLabel' },
    { valueKey: 'warehouse.hero.stats.fulfillment', labelKey: 'warehouse.hero.stats.fulfillmentLabel' },
];

const BENEFIT_ITEMS = [
    { titleKey: 'warehouse.benefits.items.revenue.title', descriptionKey: 'warehouse.benefits.items.revenue.description', icon: Banknote },
    { titleKey: 'warehouse.benefits.items.technology.title', descriptionKey: 'warehouse.benefits.items.technology.description', icon: Monitor },
    { titleKey: 'warehouse.benefits.items.insurance.title', descriptionKey: 'warehouse.benefits.items.insurance.description', icon: ShieldCheck },
    { titleKey: 'warehouse.benefits.items.training.title', descriptionKey: 'warehouse.benefits.items.training.description', icon: GraduationCap },
    { titleKey: 'warehouse.benefits.items.volume.title', descriptionKey: 'warehouse.benefits.items.volume.description', icon: BarChart3 },
    { titleKey: 'warehouse.benefits.items.network.title', descriptionKey: 'warehouse.benefits.items.network.description', icon: Network },
];

const STEP_ITEMS = [
    { titleKey: 'warehouse.steps.items.register.title', descriptionKey: 'warehouse.steps.items.register.description' },
    { titleKey: 'warehouse.steps.items.inspection.title', descriptionKey: 'warehouse.steps.items.inspection.description' },
    { titleKey: 'warehouse.steps.items.agreement.title', descriptionKey: 'warehouse.steps.items.agreement.description' },
    { titleKey: 'warehouse.steps.items.integration.title', descriptionKey: 'warehouse.steps.items.integration.description' },
    { titleKey: 'warehouse.steps.items.activate.title', descriptionKey: 'warehouse.steps.items.activate.description' },
];

const FAQ_ITEMS = [
    { questionKey: 'warehouse.faq.items.earnings.question', answerKey: 'warehouse.faq.items.earnings.answer' },
    { questionKey: 'warehouse.faq.items.inventory.question', answerKey: 'warehouse.faq.items.inventory.answer' },
    { questionKey: 'warehouse.faq.items.liability.question', answerKey: 'warehouse.faq.items.liability.answer' },
    { questionKey: 'warehouse.faq.items.exclusivity.question', answerKey: 'warehouse.faq.items.exclusivity.answer' },
    { questionKey: 'warehouse.faq.items.termination.question', answerKey: 'warehouse.faq.items.termination.answer' },
];

export const WarehousePage: React.FC = () => {
    const { t } = useTranslation();
    const requirements = t('warehouse.requirements.items', { returnObjects: true }) as string[];

    return (
        <WaitlistPageShell>
            <main>
                <BusinessHeroSection
                    titleKey="warehouse.hero.title"
                    subtitleKey="warehouse.hero.subtitle"
                    ctaKey="warehouse.hero.cta"
                    stats={HERO_STATS}
                />
                <BenefitsGrid
                    titleKey="warehouse.benefits.title"
                    subtitleKey="warehouse.benefits.subtitle"
                    items={BENEFIT_ITEMS}
                />
                <StepsSection
                    titleKey="warehouse.steps.title"
                    subtitleKey="warehouse.steps.subtitle"
                    items={STEP_ITEMS}
                />
                <section className="requirements-section">
                    <div className="requirements-section__inner">
                        <h2 className="requirements-section__title">
                            {t('warehouse.requirements.title')}
                        </h2>
                        <p className="requirements-section__subtitle">
                            {t('warehouse.requirements.subtitle')}
                        </p>
                        <div className="requirements-section__list">
                            {requirements.map((item) => (
                                <div key={item} className="requirements-section__item">
                                    <CheckCircle2 className="requirements-section__icon" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <BusinessFAQSection titleKey="warehouse.faq.title" items={FAQ_ITEMS} />
                <BusinessCTASection
                    titleKey="warehouse.cta.title"
                    descriptionKey="warehouse.cta.description"
                    buttonKey="warehouse.cta.button"
                />
            </main>
        </WaitlistPageShell>
    );
};
