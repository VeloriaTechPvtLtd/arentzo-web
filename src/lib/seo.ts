import type { Metadata } from 'next';

export const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, '') || 'https://arentzo.com';

export const SITE_NAME = 'Arentzo';

export const DEFAULT_DESCRIPTION =
  'Arentzo — peer-to-peer rental marketplace. Rent electronics, vehicles, tools, furniture, and event equipment. Save money or earn from unused items.';

export const DEFAULT_KEYWORDS = [
  'Arentzo',
  'rental marketplace',
  'peer-to-peer rentals',
  'rent items',
  'share economy',
  'rent electronics',
  'rent vehicles',
  'rent tools',
  'rent furniture India',
];

/** Public paths to submit via sitemap (Search Console). */
export const PUBLIC_SEO_PATHS = [
  { path: '/', priority: 1, changeFrequency: 'weekly' as const },
  { path: '/browse', priority: 0.9, changeFrequency: 'daily' as const },
  { path: '/search', priority: 0.7, changeFrequency: 'daily' as const },
  { path: '/about-us', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact-us', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/terms-and-conditions', priority: 0.5, changeFrequency: 'yearly' as const },
  { path: '/faqs', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/partner', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/franchise', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/seller', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/warehouse', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/deliver', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/resources', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/careers', priority: 0.6, changeFrequency: 'weekly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
] as const;

/** Hash anchors used on the landing page (for scroll + SEO notes). */
export const LANDING_SCROLL_PATHS = [
  '/#how-it-works',
  '/#what-you-can-rent',
  '/#waitlist-hero-form',
] as const;

export const BLOG_SLUGS = [
  'rental-economy-reshaping-india',
  'introducing-smart-pricing',
  'increase-listing-visibility',
  'expanding-25-new-cities',
  'real-time-inventory-at-scale',
  'pricing-for-maximum-profit',
  'sustainability-impact-report-2025',
  'payment-gateway-upgrade',
  'side-hustle-to-full-time-sellers',
] as const;

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  image?: string;
};

export function absoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
  image = '/logo.svg',
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images: [
        {
          url: absoluteUrl(image),
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/** Per-route SEO copy used by page files. */
export const PAGE_SEO = {
  home: {
    title: 'Rent Anything, Anytime, Anywhere',
    description: DEFAULT_DESCRIPTION,
    path: '/',
  },
  browse: {
    title: 'Browse Marketplace',
    description:
      'Browse thousands of rental listings on Arentzo — furniture, electronics, vehicles, tools, and more near you.',
    path: '/browse',
  },
  search: {
    title: 'Search Rentals',
    description:
      'Search Arentzo for items to rent. Find furniture, gadgets, vehicles, and equipment with flexible rental terms.',
    path: '/search',
  },
  about: {
    title: 'About Us',
    description:
      'Learn about Arentzo — our mission to make renting simpler, greener, and more accessible across India.',
    path: '/about-us',
  },
  contact: {
    title: 'Contact Us',
    description:
      'Get in touch with the Arentzo team for support, partnerships, grievances, and media inquiries.',
    path: '/contact-us',
  },
  privacy: {
    title: 'Privacy Policy',
    description:
      'Read how Arentzo collects, uses, and protects your personal information.',
    path: '/privacy-policy',
  },
  terms: {
    title: 'Terms and Conditions',
    description:
      'Review the terms and conditions that govern your use of the Arentzo rental marketplace.',
    path: '/terms-and-conditions',
  },
  faqs: {
    title: 'FAQs',
    description:
      'Answers to common questions about renting, listing, payments, delivery, and support on Arentzo.',
    path: '/faqs',
  },
  partner: {
    title: 'Partner With Us',
    description:
      'Partner with Arentzo to grow the rental economy — business collaborations and strategic alliances.',
    path: '/partner',
  },
  franchise: {
    title: 'Franchise Opportunities',
    description:
      'Explore Arentzo franchise opportunities and bring the rental marketplace to your city.',
    path: '/franchise',
  },
  seller: {
    title: 'Become a Provider',
    description:
      'List your items on Arentzo and earn by renting out unused products to verified customers.',
    path: '/seller',
  },
  warehouse: {
    title: 'Warehouse Solutions',
    description:
      'Arentzo warehouse and fulfillment solutions for rental inventory at scale.',
    path: '/warehouse',
  },
  deliver: {
    title: 'Delivery Partners',
    description:
      'Join Arentzo as a delivery partner and power pickup and drop-offs for rentals.',
    path: '/deliver',
  },
  resources: {
    title: 'Resources',
    description:
      'Guides, tips, and resources to help renters and providers succeed on Arentzo.',
    path: '/resources',
  },
  careers: {
    title: 'Careers',
    description:
      'Join the Arentzo team. Explore open roles and help build the future of rentals.',
    path: '/careers',
  },
  blog: {
    title: 'Blog',
    description:
      'Product updates, rental tips, and stories from the Arentzo community.',
    path: '/blog',
  },
  favorites: {
    title: 'Favorites',
    description: 'Your saved rental listings on Arentzo.',
    path: '/favorites',
    noIndex: true,
  },
  myRentals: {
    title: 'My Rentals',
    description: 'Track and manage your active and past rentals on Arentzo.',
    path: '/my-rentals',
    noIndex: true,
  },
  providerOnboarding: {
    title: 'Provider Onboarding',
    description: 'Complete your Arentzo provider profile and start listing items.',
    path: '/provider-onboarding',
    noIndex: true,
  },
  providerDashboard: {
    title: 'Provider Dashboard',
    description: 'Manage listings, offers, and orders as an Arentzo provider.',
    path: '/provider-dashboard',
    noIndex: true,
  },
  providerProducts: {
    title: 'Provider Products',
    description: 'Manage your product listings on Arentzo.',
    path: '/provider-dashboard/products',
    noIndex: true,
  },
  providerOffers: {
    title: 'Provider Offers',
    description: 'Create and manage rental offers on Arentzo.',
    path: '/provider-dashboard/offers',
    noIndex: true,
  },
  providerOrders: {
    title: 'Provider Orders',
    description: 'View and fulfill rental orders on Arentzo.',
    path: '/provider-dashboard/orders',
    noIndex: true,
  },
  filtersTest: {
    title: 'Filters Test',
    description: 'Internal filter testing page.',
    path: '/filters-test',
    noIndex: true,
  },
  product: {
    title: 'Product Details',
    description: 'View rental product details, pricing, and availability on Arentzo.',
    path: '/product',
  },
  rentalDetail: {
    title: 'Rental Details',
    description: 'View details for your rental on Arentzo.',
    path: '/my-rentals',
    noIndex: true,
  },
} as const;
