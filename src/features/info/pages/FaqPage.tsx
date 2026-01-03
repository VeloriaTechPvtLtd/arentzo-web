import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { Navbar } from '../../../shared/components/layout/Navbar';
import { Footer } from '../../../shared/components/layout/Footer';

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

export const FaqPage: React.FC = () => {
    const navigate = useNavigate();
    const [openId, setOpenId] = useState<number | null>(1);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            <Navbar />

            <main className="max-w-2xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-900 flex-1 text-center mr-10">
                        Help Center / FAQs
                    </h1>
                </div>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="How can we help you"
                        className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ff7e5f]/20 transition-all font-medium"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff7e5f] transition-colors">
                        <Mic size={20} />
                    </button>
                </div>

                {/* FAQs Section */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFaq(faq.id)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50/50 transition-colors"
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
                                    <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed animate-fadeIn">
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
                <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <h2 className="text-xl font-extrabold text-gray-900 mb-1">Still need help?</h2>
                    <p className="text-gray-500 text-sm mb-8 font-medium">Contact us.</p>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-[#ff7e5f]/30 focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-[#ff7e5f]/30 focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                            />
                        </div>
                        <div>
                            <textarea
                                placeholder="Message"
                                rows={4}
                                className="w-full px-6 py-4 bg-gray-50 rounded-2xl border border-transparent focus:bg-white focus:border-[#ff7e5f]/30 focus:outline-none transition-all placeholder:text-gray-400 font-medium resize-none"
                            ></textarea>
                        </div>

                        <button className="w-full py-5 bg-[#ff7e5f] text-white rounded-2xl font-bold hover:bg-[#ff6b4a] shadow-lg shadow-[#ff7e5f]/20 transition-all active:scale-[0.98] mt-4">
                            Send Message
                        </button>
                    </form>

                    <div className="mt-8 space-y-2">
                        <p className="text-gray-500 text-sm font-medium">
                            Email: <span className="text-[#ff7e5f]">support@arentzo.com</span>
                        </p>
                        <p className="text-gray-500 text-sm font-medium">
                            Hours: <span className="text-gray-600">Mon–Fri, 9 AM – 6 PM</span>
                        </p>
                    </div>
                </section>
            </main>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}} />
        </div>
    );
};
