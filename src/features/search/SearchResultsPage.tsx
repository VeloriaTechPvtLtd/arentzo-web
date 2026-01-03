
import React, { useState } from 'react';
import { ChevronLeft, X, SlidersHorizontal, ArrowUpDown, ChevronRight } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import type { Product } from './components/ProductCard';
import { useNavigate } from 'react-router-dom';

// Mock Data
const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'White King Size Bed..',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 142,
        price: 32999,
        isImported: true,
        isWishlisted: false,
    },
    {
        id: '2',
        title: 'Single Bed with soft...',
        image: 'https://images.unsplash.com/photo-1505693416388-b25c5396650f?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 122,
        price: 25999,
        isImported: true,
        isWishlisted: false,
    },
    {
        id: '3',
        title: 'Double Bed With long...',
        image: 'https://images.unsplash.com/photo-1522771753062-588773b18d87?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 212,
        price: 35999,
        isImported: true,
        isWishlisted: true,
    },
    {
        id: '4',
        title: 'Modern double Bed with...',
        image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 142,
        price: 33999,
        isImported: false,
        isWishlisted: true,
    },
    {
        id: '5',
        title: 'White fabric Bed with soft...',
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 242,
        price: 44999,
        isImported: true,
        isWishlisted: false,
    },
    {
        id: '6',
        title: 'Premium Off-White Bed...',
        image: 'https://images.unsplash.com/photo-1616594039964-ea8082018eac?auto=format&fit=crop&q=80&w=300',
        rating: 5,
        reviewCount: 132,
        price: 32999,
        isImported: false,
        isWishlisted: false,
    },
];

export const SearchResultsPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('Beds');

    return (
        <div className="min-h-screen bg-[#fff9f5] pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-[#fff9f5] p-4">
                <div className="flex items-center gap-3 bg-white border border-[#ffe0d6] rounded-full px-4 py-3 shadow-sm">
                    <button onClick={() => navigate(-1)} className="text-[#3d3436]">
                        <ChevronLeft size={24} />
                    </button>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-[#3d3436] font-medium"
                    />
                    <button onClick={() => setSearchQuery('')} className="text-gray-400">
                        <X size={20} className="fill-current bg-gray-200 rounded-full p-0.5 text-white" />
                    </button>
                </div>

                {/* Filter & Sort */}
                <div className="flex gap-3 mt-4">
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#ffe0d6] text-sm font-medium text-[#3d3436] shadow-2xs">
                        <SlidersHorizontal size={16} />
                        Filters
                        <ChevronRight size={14} className="rotate-90" />
                    </button>
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-[#ffe0d6] text-sm font-medium text-[#3d3436] shadow-2xs">
                        <ArrowUpDown size={16} />
                        Sort
                        <ChevronRight size={14} className="rotate-90" />
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="px-4 grid grid-cols-2 gap-4">
                {MOCK_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Bottom Cart Notification */}
            <div className="fixed bottom-8 left-0 right-0 px-4 flex justify-center">
                <div className="bg-[#ff7e5f] text-white rounded-full pl-2 pr-6 py-2 flex items-center gap-4 shadow-xl shadow-orange-200 max-w-sm w-full mx-auto relative overflow-hidden">
                    {/* Image Stack */}
                    <div className="flex -space-x-4 items-center pl-1">
                        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 z-30">
                            <img src={MOCK_PRODUCTS[0].image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-100 z-20">
                            <img src={MOCK_PRODUCTS[1].image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-white text-[#ff7e5f] flex items-center justify-center text-xs font-bold z-10">
                            +2
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <span className="font-bold text-lg leading-none">View Cart</span>
                        <span className="text-xs opacity-90">3 Items</span>
                    </div>

                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <ChevronRight size={20} className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};
