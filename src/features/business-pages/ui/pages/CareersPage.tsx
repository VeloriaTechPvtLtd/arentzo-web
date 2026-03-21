import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import {
    Rocket, Gem, Eye, Target, BookOpen, Heart,
    ShieldCheck, PieChart, GraduationCap, Clock, Palmtree, Monitor,
    MapPin, Briefcase
} from 'lucide-react';
import '../styles/BusinessPages.css';

const VALUE_ICONS = [Rocket, Gem, Eye, Target, BookOpen, Heart] as const;
const VALUE_KEYS = ['ownership', 'craft', 'transparency', 'impact', 'learning', 'empathy'] as const;

const PERK_ICONS = [ShieldCheck, PieChart, GraduationCap, Clock, Palmtree, Monitor] as const;
const PERK_KEYS = ['health', 'equity', 'learning', 'flexible', 'pto', 'gear'] as const;

const DEPARTMENT_KEYS = ['engineering', 'product', 'operations', 'growth'] as const;

const ValuesSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="values-section">
            <div className="values-section__inner">
                <h2 className="values-section__title">
                    {t('careers.values.title')}
                </h2>
                <p className="values-section__subtitle">
                    {t('careers.values.subtitle')}
                </p>
                <div className="values-section__grid">
                    {VALUE_KEYS.map((key, index) => {
                        const Icon = VALUE_ICONS[index];
                        return (
                            <div key={key} className="values-section__card">
                                <div className="values-section__card-icon">
                                    <Icon size={20} />
                                </div>
                                <h3 className="values-section__card-title">
                                    {t(`careers.values.items.${key}.title`)}
                                </h3>
                                <p className="values-section__card-desc">
                                    {t(`careers.values.items.${key}.description`)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const PerksSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="perks-section">
            <div className="perks-section__inner">
                <h2 className="perks-section__title">
                    {t('careers.perks.title')}
                </h2>
                <p className="perks-section__subtitle">
                    {t('careers.perks.subtitle')}
                </p>
                <div className="perks-section__grid">
                    {PERK_KEYS.map((key, index) => {
                        const Icon = PERK_ICONS[index];
                        return (
                            <div key={key} className="perks-section__card">
                                <div className="perks-section__icon">
                                    <Icon size={20} />
                                </div>
                                <h3 className="perks-section__card-title">
                                    {t(`careers.perks.items.${key}.title`)}
                                </h3>
                                <p className="perks-section__card-desc">
                                    {t(`careers.perks.items.${key}.description`)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

interface RoleData {
    title: string;
    location: string;
    type: string;
    experience: string;
}

const OpeningsSection: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="openings-section">
            <div className="openings-section__inner">
                <h2 className="openings-section__title">
                    {t('careers.openings.title')}
                </h2>
                <p className="openings-section__subtitle">
                    {t('careers.openings.subtitle')}
                </p>
                {DEPARTMENT_KEYS.map((dept) => {
                    const roles = t(`careers.openings.departments.${dept}.roles`, {
                        returnObjects: true
                    }) as RoleData[];

                    return (
                        <div key={dept} className="openings-section__department">
                            <h3 className="openings-section__dept-name">
                                {t(`careers.openings.departments.${dept}.name`)}
                            </h3>
                            {roles.map((role) => (
                                <div key={role.title} className="openings-section__role">
                                    <span className="openings-section__role-title">
                                        {role.title}
                                    </span>
                                    <div className="openings-section__role-meta">
                                        <span className="openings-section__role-tag">
                                            <MapPin size={10} style={{ display: 'inline', marginRight: 4 }} />
                                            {role.location}
                                        </span>
                                        <span className="openings-section__role-tag">
                                            <Briefcase size={10} style={{ display: 'inline', marginRight: 4 }} />
                                            {role.type}
                                        </span>
                                        <span className="openings-section__role-tag">
                                            {role.experience}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export const CareersPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <main>
            <section className="business-hero">
                <div className="business-hero__blob-1" />
                <div className="business-hero__blob-2" />
                <div className="business-hero__inner">
                    <h1 className="business-hero__title">
                        {t('careers.hero.title')}
                    </h1>
                    <p className="business-hero__subtitle">
                        {t('careers.hero.subtitle')}
                    </p>
                    <button className="business-hero__cta">
                        {t('careers.hero.cta')}
                        <ArrowRight size={18} />
                    </button>
                    <div className="business-hero__stats">
                        <div>
                            <div className="business-hero__stat-value">
                                {t('careers.hero.stats.teamSize')}
                            </div>
                            <div className="business-hero__stat-label">
                                {t('careers.hero.stats.teamSizeLabel')}
                            </div>
                        </div>
                        <div>
                            <div className="business-hero__stat-value">
                                {t('careers.hero.stats.cities')}
                            </div>
                            <div className="business-hero__stat-label">
                                {t('careers.hero.stats.citiesLabel')}
                            </div>
                        </div>
                        <div>
                            <div className="business-hero__stat-value">
                                {t('careers.hero.stats.remote')}
                            </div>
                            <div className="business-hero__stat-label">
                                {t('careers.hero.stats.remoteLabel')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ValuesSection />
            <PerksSection />
            <OpeningsSection />

            <section className="steps-section">
                <div className="steps-section__inner">
                    <h2 className="steps-section__title">
                        {t('careers.process.title')}
                    </h2>
                    <p className="steps-section__subtitle">
                        {t('careers.process.subtitle')}
                    </p>
                    <div className="steps-section__list">
                        {(['apply', 'screen', 'assessment', 'team', 'offer'] as const).map((key, index) => (
                            <div key={key} className="steps-section__item">
                                <div className="steps-section__number">{index + 1}</div>
                                <div>
                                    <h3 className="steps-section__item-title">
                                        {t(`careers.process.items.${key}.title`)}
                                    </h3>
                                    <p className="steps-section__item-desc">
                                        {t(`careers.process.items.${key}.description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="business-cta">
                <div className="business-cta__card">
                    <div className="business-cta__blob" />
                    <h2 className="business-cta__title">
                        {t('careers.cta.title')}
                    </h2>
                    <p className="business-cta__desc">
                        {t('careers.cta.description')}
                    </p>
                    <button className="business-cta__button">
                        {t('careers.cta.button')}
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </main>
    );
};
