import React from 'react';
import {
    ShieldCheck,
    Verified,
    BadgeDollarSign,
    HeadphonesIcon,
    Star,
    Rocket
} from 'lucide-react';

const benefits = [
    {
        title: 'Quality Guarantees',
        description: 'All items are inspected and maintained to ensure they meet our high quality standards.',
        icon: ShieldCheck,
        color: 'bg-red-50 text-red-500'
    },
    {
        title: 'Trusted Partner',
        description: 'We work only with verified and trusted partners to provide the best rental experience.',
        icon: Verified,
        color: 'bg-orange-50 text-orange-500'
    },
    {
        title: 'Affordable Pricing',
        description: 'Competitive and transparent pricing with no hidden fees or surprise charges.',
        icon: BadgeDollarSign,
        color: 'bg-blue-50 text-blue-500'
    },
    {
        title: '24/7 Support',
        description: 'Our customer support team is available around the clock to help you with anything.',
        icon: HeadphonesIcon,
        color: 'bg-pink-50 text-pink-500'
    },
    {
        title: 'Premium Products',
        description: 'Access a curated collection of premium products and luxury rentals in one place.',
        icon: Star,
        color: 'bg-yellow-50 text-yellow-500'
    },
    {
        title: 'Quick Delivery',
        description: 'Fast and reliable delivery options to get your items when and where you need them.',
        icon: Rocket,
        color: 'bg-indigo-50 text-indigo-500'
    }
];

export const FeaturesSection: React.FC = () => {
    return (
        <section className="pt-24 pb-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-20">
                    <h2 className="text-4xl font-bold text-[#3d3436]">Why Choose Arentzo</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        We make it easy for you to rent and enjoy our premium services with full peace of mind.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="group p-8 rounded-3xl border border-gray-100 hover:border-[#ff7e5f]/20 hover:shadow-2xl hover:shadow-[#ff7e5f]/5 transition-all duration-500 space-y-6">
                            <div className={`w-14 h-14 ${benefit.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                                <benefit.icon className="w-7 h-7" />
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-[#3d3436] group-hover:text-[#ff7e5f] transition-colors">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed text-sm">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
