import React from 'react';
import {
    BookOpen, ShoppingBag, Handshake, Store,
    Code, Package, Webhook, FlaskConical,
    FileText, Lock, ShieldAlert, Scale,
    Palette, Newspaper, Trophy, PenTool,
    HelpCircle, Users, Video, MessageCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navbar } from '../../../../shared/components/layout/Navbar';
import { Footer } from '../../../../shared/components/layout/Footer';
import { BusinessHeroSection } from '../components/BusinessHeroSection';
import { BusinessCTASection } from '../components/BusinessCTASection';
import '../styles/BusinessPages.css';

interface ResourceCardProps {
    titleKey: string;
    descriptionKey: string;
    icon: React.ReactNode;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
    titleKey, descriptionKey, icon,
}) => {
    const { t } = useTranslation();

    return (
        <div className="resource-cards__card">
            <div className="resource-cards__card-icon">{icon}</div>
            <h4 className="resource-cards__card-title">{t(titleKey)}</h4>
            <p className="resource-cards__card-desc">{t(descriptionKey)}</p>
        </div>
    );
};

interface SectionConfig {
    sectionKey: string;
    items: { key: string; icon: React.ReactNode }[];
}

const SECTIONS: SectionConfig[] = [
    {
        sectionKey: 'gettingStarted',
        items: [
            { key: 'renter', icon: <BookOpen className="w-5 h-5" /> },
            { key: 'seller', icon: <ShoppingBag className="w-5 h-5" /> },
            { key: 'partner', icon: <Handshake className="w-5 h-5" /> },
            { key: 'franchise', icon: <Store className="w-5 h-5" /> },
        ],
    },
    {
        sectionKey: 'developer',
        items: [
            { key: 'api', icon: <Code className="w-5 h-5" /> },
            { key: 'sdk', icon: <Package className="w-5 h-5" /> },
            { key: 'webhooks', icon: <Webhook className="w-5 h-5" /> },
            { key: 'sandbox', icon: <FlaskConical className="w-5 h-5" /> },
        ],
    },
    {
        sectionKey: 'legal',
        items: [
            { key: 'terms', icon: <FileText className="w-5 h-5" /> },
            { key: 'privacy', icon: <Lock className="w-5 h-5" /> },
            { key: 'acceptable', icon: <ShieldAlert className="w-5 h-5" /> },
            { key: 'compliance', icon: <Scale className="w-5 h-5" /> },
        ],
    },
    {
        sectionKey: 'brand',
        items: [
            { key: 'guidelines', icon: <Palette className="w-5 h-5" /> },
            { key: 'assets', icon: <Newspaper className="w-5 h-5" /> },
            { key: 'caseStudies', icon: <Trophy className="w-5 h-5" /> },
            { key: 'blog', icon: <PenTool className="w-5 h-5" /> },
        ],
    },
    {
        sectionKey: 'community',
        items: [
            { key: 'helpCenter', icon: <HelpCircle className="w-5 h-5" /> },
            { key: 'forums', icon: <Users className="w-5 h-5" /> },
            { key: 'webinars', icon: <Video className="w-5 h-5" /> },
            { key: 'contact', icon: <MessageCircle className="w-5 h-5" /> },
        ],
    },
];

const LINK_MAP: Record<string, string> = {
    terms: '/terms-and-conditions',
    privacy: '/privacy-policy',
    contact: '/contact-us',
    seller: '/seller',
    partner: '/partner',
    franchise: '/franchise',
};

export const ResourcesPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <BusinessHeroSection
                    titleKey="resources.hero.title"
                    subtitleKey="resources.hero.subtitle"
                    ctaKey="resources.hero.cta"
                    stats={[]}
                />
                <div className="resource-cards">
                    <div className="resource-cards__inner">
                        {SECTIONS.map((section) => (
                            <div key={section.sectionKey}>
                                <h3 className="resource-cards__section-title">
                                    {t(`resources.sections.${section.sectionKey}.title`)}
                                </h3>
                                <p className="resource-cards__section-subtitle">
                                    {t(`resources.sections.${section.sectionKey}.subtitle`)}
                                </p>
                                <div className="resource-cards__grid">
                                    {section.items.map((item) => {
                                        const linkTo = LINK_MAP[item.key];
                                        const card = (
                                            <ResourceCard
                                                key={item.key}
                                                titleKey={`resources.sections.${section.sectionKey}.items.${item.key}.title`}
                                                descriptionKey={`resources.sections.${section.sectionKey}.items.${item.key}.description`}
                                                icon={item.icon}
                                            />
                                        );

                                        if (linkTo) {
                                            return (
                                                <Link
                                                    key={item.key}
                                                    to={linkTo}
                                                    className="no-underline"
                                                >
                                                    {card}
                                                </Link>
                                            );
                                        }

                                        return card;
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <BusinessCTASection
                    titleKey="resources.cta.title"
                    descriptionKey="resources.cta.description"
                    buttonKey="resources.cta.button"
                />
            </main>
            <Footer />
        </div>
    );
};
