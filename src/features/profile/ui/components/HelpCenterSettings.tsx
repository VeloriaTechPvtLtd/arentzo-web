import React, { useState } from 'react';
import { Search, Mic, ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

const faqs: FaqItem[] = [
    {
        id: 1,
        question: "How do I reset my password?",
        answer: "To reset your password, go to the login screen and tap on the 'Forgot Password' link. You will receive an email with instructions on how to set a new password for your account."
    },
    {
        id: 2,
        question: "How do I update my billing information?",
        answer: "You can update your billing information in the Payment Methods section of your profile settings. Select the card you wish to update or add a new payment method."
    },
    {
        id: 3,
        question: "Can I change my subscription plan?",
        answer: "Yes, you can upgrade or downgrade your subscription plan at any time from your account settings under the 'Subscription' tab."
    }
];

export const HelpCenterSettings: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(1);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="settings-view px-5 pt-2">
            {/* Search Bar */}
            <div className="relative mb-8">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    placeholder="How can we help you"
                    className="w-full pl-12 pr-12 py-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff7e5f]/20 transition-all font-medium text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff7e5f] transition-colors">
                    <Mic size={20} />
                </button>
            </div>

            {/* FAQs Section */}
            <section className="mb-10">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full px-5 py-4.5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
                            >
                                <span className="font-semibold text-gray-800 text-[15px]">
                                    {faq.question}
                                </span>
                                {openId === faq.id ? (
                                    <ChevronUp size={20} className="text-gray-400" />
                                ) : (
                                    <ChevronDown size={20} className="text-gray-400" />
                                )}
                            </button>
                            {openId === faq.id && (
                                <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed">
                                    <div className="pt-2 border-t border-gray-50 mt-2">
                                        {faq.answer}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-8">
                <h2 className="text-xl font-extrabold text-gray-900 mb-1">Still need help?</h2>
                <p className="text-gray-500 text-sm mb-6 font-medium">Contact us.</p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-[#ff7e5f]/30 focus:outline-none transition-all placeholder:text-gray-400 font-medium text-sm"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-[#ff7e5f]/30 focus:outline-none transition-all placeholder:text-gray-400 font-medium text-sm"
                    />
                    <textarea
                        placeholder="Message"
                        rows={4}
                        className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-[#ff7e5f]/30 focus:outline-none transition-all placeholder:text-gray-400 font-medium text-sm resize-none"
                    ></textarea>

                    <button className="w-full py-4.5 bg-[#ff7e5f] text-white rounded-2xl font-bold hover:bg-[#ff6b4a] shadow-lg shadow-[#ff7e5f]/20 transition-all active:scale-[0.98] mt-2">
                        Send Message
                    </button>
                </form>

                <div className="mt-6 space-y-1.5">
                    <p className="text-[13px] text-gray-500 font-medium">
                        Email: <span className="text-[#ff7e5f]">support@arentzo.com</span>
                    </p>
                    <p className="text-[13px] text-gray-500 font-medium">
                        Hours: <span className="text-gray-600">Mon–Fri, 9 AM – 6 PM</span>
                    </p>
                </div>
            </section>
        </div>
    );
};
