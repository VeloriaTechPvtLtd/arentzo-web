import React from 'react';
import {
    Layout,
    Utensils,
    Monitor,
    Hammer,
    Mic2,
    Music,
    Warehouse,
    Truck,
    Grid
} from 'lucide-react';

const categories = [
    {
        title: 'Home & Office',
        description: 'Quality furniture and office essentials',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=400',
        icon: Layout
    },
    {
        title: 'Kitchen & Dining',
        description: 'Cookware, appliances and more',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400',
        icon: Utensils
    },
    {
        title: 'Multimedia',
        description: 'Cameras, drones and production gear',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400',
        icon: Monitor
    },
    {
        title: 'Construction',
        description: 'Professional tools and equipment',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400',
        icon: Hammer
    },
    {
        title: 'Event Equipment',
        description: 'Sound, lighting and projectors',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
        icon: Mic2
    },
    {
        title: 'Party & Events',
        description: 'Decorations and event essentials',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400',
        icon: Music
    },
    {
        title: 'Storage & Spaces',
        description: 'Storage units and co-working spaces',
        image: 'https://images.unsplash.com/photo-1549194388-f61be84a6e9e?auto=format&fit=crop&q=80&w=400',
        icon: Warehouse
    },
    {
        title: 'Logistics',
        description: 'Transportation and moving services',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=400',
        icon: Truck
    }
];

export const CategorySection: React.FC = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl font-bold text-[#3d3436]">Browse by Category</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        Everything you need, available for rent. From home gear to professional equipment.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="group relative h-[250px] overflow-hidden rounded-3xl cursor-pointer hover:shadow-2xl transition-all duration-500"
                        >
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                                <div className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{cat.title}</h3>
                                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {cat.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* More Card */}
                    <div className="group relative h-[250px] overflow-hidden rounded-3xl cursor-pointer bg-gradient-to-br from-[#ff7e5f] to-[#feb47b] p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-500">
                        <div className="self-end p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
                            <Grid className="w-6 h-6" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-white">More</h3>
                            <p className="text-white/80 text-sm">Explore all categories & subcategories</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform">
                            View All <span className="text-xl">→</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
