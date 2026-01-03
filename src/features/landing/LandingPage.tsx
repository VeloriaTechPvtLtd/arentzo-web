import React from 'react';
import { Navbar } from '../../shared/components/layout/Navbar';
import { Footer } from '../../shared/components/layout/Footer';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { CTASection } from './components/CTASection';

export const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-[#3d3436] selection:bg-[#ff7e5f]/30">
            <Navbar />

            <main>
                {/* Hero Section */}
                <HeroSection />

                {/* Browse by Category Section */}
                <div id="categories">
                    <CategorySection />
                </div>

                {/* How It Works Section */}
                <div id="how-it-works">
                    <HowItWorks />
                </div>

                {/* Why Choose Arentzo Section */}
                <div id="features">
                    <FeaturesSection />
                </div>

                {/* Final Call to Action */}
                <CTASection />
            </main>

            <Footer />
        </div>
    );
};
