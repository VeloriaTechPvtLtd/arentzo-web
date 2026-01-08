import React, { useState } from 'react';
import {
    Plus,
    Tag,
    Calendar,
    Trash2,
    Edit,
    CheckCircle2
} from 'lucide-react';
import { AddOfferForm } from './AddOfferForm';
import '../ProviderDashboard.css';

interface MockOffer {
    id: string;
    title: string;
    discount: string;
    status: 'active' | 'scheduled' | 'expired';
    expiryDate: string;
    usageCount: number;
}

const MOCK_OFFERS: MockOffer[] = [
    { id: '1', title: 'Weekend Special', discount: '20% OFF', status: 'active', expiryDate: '2024-05-30', usageCount: 45 },
    { id: '2', title: 'Early Bird Rental', discount: '₹500 OFF', status: 'scheduled', expiryDate: '2024-06-15', usageCount: 0 },
    { id: '3', title: 'Summer Bonanza', discount: '15% OFF', status: 'expired', expiryDate: '2024-04-01', usageCount: 120 },
];

export const ProviderOffersPage: React.FC = () => {
    const [showAddOffer, setShowAddOffer] = useState(false);

    return (
        <div className="provider-dashboard">
            <header className="dashboard-header">
                <div className="dashboard-title">
                    <h1>Offers & Promotions</h1>
                    <p>Drive more sales with targeted discounts and limited time deals.</p>
                </div>

                <button className="quick-btn-main !w-auto !px-10 !bg-emerald-600 shadow-emerald-200" onClick={() => setShowAddOffer(true)}>
                    <Tag size={20} /> New Promotion
                </button>
            </header>

            <main className="grid gap-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_OFFERS.map((offer) => (
                        <div key={offer.id} className="bg-card border border-border rounded-[40px] p-8 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                            <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-900 uppercase tracking-widest ${offer.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' :
                                    offer.status === 'scheduled' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                        'bg-gray-100 text-gray-700 border border-gray-200'
                                }`}>
                                {offer.status}
                            </div>

                            <div className="mb-8">
                                <div className="w-16 h-16 rounded-[22px] bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Tag size={32} />
                                </div>
                                <h3 className="text-xl font-900 text-foreground mb-2 group-hover:text-primary transition-colors">{offer.title}</h3>
                                <div className="flex items-baseline gap-1">
                                    <p className="text-4xl font-900 text-foreground">{offer.discount}</p>
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Saving</span>
                                </div>
                            </div>

                            <div className="bg-secondary/30 rounded-3xl p-5 space-y-3 mb-8">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground font-bold">
                                        <Calendar size={16} />
                                        <span>Expiry</span>
                                    </div>
                                    <span className="font-900 text-foreground">{new Date(offer.expiryDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground font-bold">
                                        <CheckCircle2 size={16} />
                                        <span>Redemptions</span>
                                    </div>
                                    <span className="font-900 text-foreground">{offer.usageCount}</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 py-4 rounded-2xl bg-foreground text-background font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2">
                                    <Edit size={16} /> Manage
                                </button>
                                <button className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        className="border-2 border-dashed border-border rounded-[40px] p-10 flex flex-col items-center justify-center gap-6 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-500 group"
                        onClick={() => setShowAddOffer(true)}
                    >
                        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:rotate-90 transition-all duration-500">
                            <Plus size={40} />
                        </div>
                        <div className="text-center">
                            <span className="block font-900 text-lg mb-1">Create Promotion</span>
                            <span className="text-sm font-medium opacity-60">Boost your visibility today</span>
                        </div>
                    </button>
                </div>
            </main>

            {showAddOffer && (
                <AddOfferForm
                    onClose={() => setShowAddOffer(false)}
                    onSuccess={() => setShowAddOffer(false)}
                />
            )}
        </div>
    );
};
