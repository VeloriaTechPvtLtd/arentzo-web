'use client';

import React from 'react';
import Link from 'next/link';

const categories = [
    'Cars', 'Furniture', 'Bikes', 'Electronics',
];

const usefulLinks = [
    [
        { label: 'Browse rentals', href: '/browse' },
        { label: 'Search', href: '/search' },
        { label: 'FAQs', href: '/faqs' },
        { label: 'Contact', href: '/contact-us' },
    ],
    [
        { label: 'Partner', href: '/partner' },
        { label: 'Franchise', href: '/franchise' },
        { label: 'Seller', href: '/seller' },
        { label: 'Deliver', href: '/deliver' },
        { label: 'Resources', href: '/resources' },
    ],
    [
        { label: 'About us', href: '/about-us' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
        { label: 'Privacy', href: '/privacy-policy' },
        { label: 'Terms', href: '/terms-and-conditions' },
    ],
];

export const Footer: React.FC = () => (
    <footer className="border-t border-white/5 bg-[#1a1617] pt-12 pb-24 text-white sm:pt-16 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 grid gap-12 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <section aria-labelledby="footer-useful-links">
                    <h2 id="footer-useful-links" className="mb-6 text-lg font-bold text-white sm:mb-8">Useful links</h2>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 sm:gap-x-8">
                        {usefulLinks.map((column, index) => (
                            <div key={index} className="flex min-w-0 flex-col gap-3">
                                {column.map(({ label, href }) => (
                                    <Link key={href} href={href} className="text-[13px] text-gray-400 transition-colors hover:text-white focus-visible:text-white">
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="footer-categories">
                    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3 sm:mb-8">
                        <h2 id="footer-categories" className="text-lg font-bold text-white">Browse by category</h2>
                        <Link href="/browse" className="text-sm font-medium text-gray-400 transition-colors hover:text-white hover:underline focus-visible:text-white">Browse all rentals</Link>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 sm:gap-x-8">
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={`/search?q=${encodeURIComponent(category)}`}
                                className="min-w-0 text-[13px] text-gray-400 transition-colors hover:text-white focus-visible:text-white"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            <div className="flex flex-col gap-4 border-t border-white/5 pt-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                <p className="text-[13px] text-gray-500">© Veloria Tech (OPC) Private Limited, 2024–2026</p>
                <p className="text-[13px] text-gray-400">
                    Need help?{' '}
                    <Link href="/contact-us" className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white">
                        Contact Arentzo support
                    </Link>
                </p>
            </div>
        </div>
    </footer>
);
