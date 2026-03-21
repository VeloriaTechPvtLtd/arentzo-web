import React from 'react';
import {
    ListPlus, TrendingUp, LayoutDashboard,
    ShieldCheck, Wallet, UserCheck,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../../../../shared/components/layout/Navbar';
import { Footer } from '../../../../shared/components/layout/Footer';
import { BusinessHeroSection } from '../components/BusinessHeroSection';
import { BenefitsGrid } from '../components/BenefitsGrid';
import { StepsSection } from '../components/StepsSection';
import { BusinessCTASection } from '../components/BusinessCTASection';
import { BusinessFAQSection } from '../components/BusinessFAQSection';
import '../styles/BusinessPages.css';

const HERO_STATS = [
    { valueKey: 'seller.hero.stats.sellers', labelKey: 'seller.hero.stats.sellersLabel' },
    { valueKey: 'seller.hero.stats.avgEarning', labelKey: 'seller.hero.stats.avgEarningLabel' },
    { valueKey: 'seller.hero.stats.categories', labelKey: 'seller.hero.stats.categoriesLabel' },
];

const BENEFIT_ITEMS = [
    { titleKey: 'seller.benefits.items.listing.title', descriptionKey: 'seller.benefits.items.listing.description', icon: ListPlus },
    { titleKey: 'seller.benefits.items.pricing.title', descriptionKey: 'seller.benefits.items.pricing.description', icon: TrendingUp },
    { titleKey: 'seller.benefits.items.dashboard.title', descriptionKey: 'seller.benefits.items.dashboard.description', icon: LayoutDashboard },
    { titleKey: 'seller.benefits.items.protection.title', descriptionKey: 'seller.benefits.items.protection.description', icon: ShieldCheck },
    { titleKey: 'seller.benefits.items.payments.title', descriptionKey: 'seller.benefits.items.payments.description', icon: Wallet },
    { titleKey: 'seller.benefits.items.verification.title', descriptionKey: 'seller.benefits.items.verification.description', icon: UserCheck },
];

const STEP_ITEMS = [
    { titleKey: 'seller.steps.items.register.title', descriptionKey: 'seller.steps.items.register.description' },
    { titleKey: 'seller.steps.items.list.title', descriptionKey: 'seller.steps.items.list.description' },
    { titleKey: 'seller.steps.items.earn.title', descriptionKey: 'seller.steps.items.earn.description' },
];

const EARNING_KEYS = [
    'cameras', 'vehicles', 'electronics', 'events', 'tools', 'fashion',
] as const;

const FAQ_ITEMS = [
    { questionKey: 'seller.faq.items.fees.question', answerKey: 'seller.faq.items.fees.answer' },
    { questionKey: 'seller.faq.items.items.question', answerKey: 'seller.faq.items.items.answer' },
    { questionKey: 'seller.faq.items.damage.question', answerKey: 'seller.faq.items.damage.answer' },
    { questionKey: 'seller.faq.items.cancellation.question', answerKey: 'seller.faq.items.cancellation.answer' },
    { questionKey: 'seller.faq.items.tax.question', answerKey: 'seller.faq.items.tax.answer' },
];

export const SellerPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <BusinessHeroSection
                    titleKey="seller.hero.title"
                    subtitleKey="seller.hero.subtitle"
                    ctaKey="seller.hero.cta"
                    stats={HERO_STATS}
                />
                <BenefitsGrid
                    titleKey="seller.benefits.title"
                    subtitleKey="seller.benefits.subtitle"
                    items={BENEFIT_ITEMS}
                />
                <StepsSection
                    titleKey="seller.steps.title"
                    subtitleKey="seller.steps.subtitle"
                    items={STEP_ITEMS}
                />
                <section className="earnings-section">
                    <div className="earnings-section__inner">
                        <h2 className="earnings-section__title">{t('seller.earnings.title')}</h2>
                        <p className="earnings-section__subtitle">{t('seller.earnings.subtitle')}</p>
                        <div className="earnings-section__grid">
                            {EARNING_KEYS.map((key) => (
                                <div key={key} className="earnings-section__card">
                                    <span className="earnings-section__category">
                                        {t(`seller.earnings.items.${key}.category`)}
                                    </span>
                                    <span className="earnings-section__range">
                                        {t(`seller.earnings.items.${key}.range`)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <BusinessFAQSection titleKey="seller.faq.title" items={FAQ_ITEMS} />
                <BusinessCTASection
                    titleKey="seller.cta.title"
                    descriptionKey="seller.cta.description"
                    buttonKey="seller.cta.button"
                />
            </main>
            <Footer />
        </div>
    );
};
