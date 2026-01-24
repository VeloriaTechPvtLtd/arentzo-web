// Mock data for Customer Home Feature

import type { Product, TopSelection, CategoryTheme } from '../types';

export const categoryThemes: Record<string, CategoryTheme> = {
    all: {
        primary: '#ff7e5f',
        gradient: 'linear-gradient(135deg, #ffb399 0%, #ff7e5f 100%)',
        tagline: "Don't Just Rent a Car",
        subtitle: 'Rent an Experience',
    },
    travel_transport: {
        primary: '#ff7e5f',
        gradient: 'linear-gradient(135deg, #ffb399 0%, #ff7e5f 100%)',
        tagline: 'Rent an Experience',
        subtitle: 'From cars to campers - explore the world your way',
    },
    home_essentials: {
        primary: '#8B5CF6',
        gradient: 'linear-gradient(135deg, #a78bfa 0%, #8B5CF6 100%)',
        tagline: 'Make Every Space Home',
        subtitle: 'Furniture, appliances & more for any occasion',
    },
    garden_outdoor: {
        primary: '#10B981',
        gradient: 'linear-gradient(135deg, #6EE7B7 0%, #10B981 100%)',
        tagline: 'Transform Your Outdoors',
        subtitle: 'From gardens to patios - create your dream space',
    },
    tech_gadgets: {
        primary: '#1e3a5f',
        gradient: 'linear-gradient(135deg, #2d4a6f 0%, #1e3a5f 100%)',
        backgroundPattern: 'circuit',
        tagline: 'Why Buy? Just Try',
        subtitle: 'Get laptops, cameras, accessories - pay only for what you use',
    },
    events_parties: {
        primary: '#EC4899',
        gradient: 'linear-gradient(135deg, #f472b6 0%, #EC4899 100%)',
        tagline: 'Make Moments Memorable',
        subtitle: 'Everything you need for the perfect celebration',
    },
    work_industry: {
        primary: '#F59E0B',
        gradient: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
        tagline: 'Power Your Business',
        subtitle: 'Professional equipment for every industry',
    },
    fashion_accessories: {
        primary: '#be185d',
        gradient: 'linear-gradient(135deg, #f472b6 0%, #be185d 100%)',
        tagline: 'Dress for the Occasion',
        subtitle: 'Luxury fashion without the commitment',
    },
    sports_leisure: {
        primary: '#06B6D4',
        gradient: 'linear-gradient(135deg, #67E8F9 0%, #06B6D4 100%)',
        tagline: 'Run Smarter',
        subtitle: 'Train Stronger',
    },
    care_wellness: {
        primary: '#EC4899',
        gradient: 'linear-gradient(135deg, #FBCFE8 0%, #EC4899 100%)',
        tagline: 'Care Made Easy',
        subtitle: 'Medical equipment & wellness gear when you need it',
    },
    storage_space: {
        primary: '#6366F1',
        gradient: 'linear-gradient(135deg, #A5B4FC 0%, #6366F1 100%)',
        tagline: 'Space When You Need It',
        subtitle: 'Secure storage solutions for every need',
    },
};

export const featuredBrands: Record<string, { name: string; logo?: string; image: string; cta: string }> = {
    travel_transport: {
        name: 'Land Rover',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop',
        cta: 'Drive Luxury',
    },
    sports_leisure: {
        name: 'NordicTrack',
        image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop',
        cta: 'Train Stronger',
    },
    tech_gadgets: {
        name: 'Apple',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
        cta: 'Experience Innovation',
    },
};

export const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Land Rover Defender...',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&auto=format&fit=crop',
        price: 9999999,
        originalPrice: 12499999,
        discount: 25,
        rating: 5,
        reviewCount: 542,
        isImported: true,
        isAvailable: true,
        isFavorite: true,
        images: [
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop',
        ],
        seller: {
            id: 's1',
            name: 'Jack Rayn',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop',
            rating: 4.8,
            reviewCount: 156,
            isVerified: true
        },
        specifications: [
            { label: 'Condition', value: 'Excellent' },
            { label: 'Brand', value: 'Land Rover' },
            { label: 'Model', value: 'Range Rover' },
            { label: 'Year', value: '2024' },
            { label: 'Color', value: 'White' }
        ],
        overview: 'The Range Rover Sports Special Edition is a luxury SUV that combines elegance, power, and state-of-the-art technology. Perfect for your needs, this product features high-end materials and exceptional durability.',
        terms: [
            { id: 't1', icon: 'id', title: 'Valid ID & Verification', description: 'Government-issued ID is mandatory for your security and hassle-free booking.' },
            { id: 't2', icon: 'shield', title: 'Security Deposit', description: 'Small refundable deposit. Automatically returned within 2-3 days post-return inspection.' },
            { id: 't3', icon: 'zap', title: 'Flexible Cancellation', description: 'Free cancellation up to 48 hours before your booking starts.' },
            { id: 't4', icon: 'truck', title: 'Delivery & Pickup', description: 'Delivery options available at your location for a nominal fee.' }
        ],
        reviews: [
            {
                id: 'r1',
                userName: 'Jack nayer',
                userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop',
                rating: 5,
                date: '1 week ago',
                comment: 'Well maintained and clean Ride. Absolutely elegant and luxury look. Go for it. 🔥',
                images: [
                    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&auto=format&fit=crop'
                ]
            },
            {
                id: 'r2',
                userName: 'Tyagi',
                userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop',
                rating: 5,
                date: '2 weeks ago',
                comment: 'Well maintained and clean Ride. Absolutely elegant and luxury look. Go for it. 🔥'
            }
        ]
    },
    {
        id: '2',
        name: 'Toyota Fortuner 1.5 Turbo...',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop',
        price: 99999999,
        originalPrice: 124999999,
        discount: 25,
        rating: 5,
        reviewCount: 411,
        isImported: false,
        isAvailable: true,
        isFavorite: false,
    },
    {
        id: '3',
        name: 'Hyundai Tucson Midsize-SUV...',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&auto=format&fit=crop',
        price: 9999999,
        originalPrice: 12499999,
        discount: 25,
        rating: 5,
        reviewCount: 212,
        isImported: false,
        isAvailable: true,
        isFavorite: true,
    },
    {
        id: '4',
        name: 'Macbook Air 16 inch 256gb...',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop',
        price: 9999999,
        originalPrice: 12499999,
        discount: 25,
        rating: 5,
        reviewCount: 542,
        isImported: true,
        isAvailable: true,
        isFavorite: true,
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop',
        ],
    },
    {
        id: '5',
        name: 'Microsoft tri350 18inch...',
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&auto=format&fit=crop',
        price: 99999999,
        originalPrice: 124999999,
        discount: 25,
        rating: 5,
        reviewCount: 411,
        isImported: false,
        isAvailable: true,
        isFavorite: false,
    },
    {
        id: '6',
        name: 'Macbook rosegold 13 inch...',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&auto=format&fit=crop',
        price: 9999999,
        originalPrice: 12499999,
        discount: 25,
        rating: 5,
        reviewCount: 212,
        isImported: false,
        isAvailable: true,
        isFavorite: false,
    },
];

export const topSelections: TopSelection[] = [
    {
        id: '1',
        name: 'Favourites',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&auto=format&fit=crop',
        ],
        itemCount: 9,
    },
    {
        id: '2',
        name: 'Campers',
        images: [
            'https://images.unsplash.com/photo-1564866657315-6c1e7d0a83c5?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&auto=format&fit=crop',
        ],
        itemCount: 12,
    },
    {
        id: '3',
        name: "Suv's",
        images: [
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&auto=format&fit=crop',
        ],
        itemCount: 21,
    },
    {
        id: '4',
        name: 'off-roader vehicle',
        images: [
            'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=200&auto=format&fit=crop',
        ],
        itemCount: 19,
    },
    {
        id: '5',
        name: 'sports cars',
        images: [
            'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&auto=format&fit=crop',
        ],
        itemCount: 11,
    },
    {
        id: '6',
        name: 'convertibles',
        images: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&auto=format&fit=crop',
        ],
        itemCount: 4,
    },
];

export const sportsSelections: TopSelection[] = [
    {
        id: '1',
        name: 'Favourites',
        images: [
            'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&auto=format&fit=crop',
        ],
        itemCount: 9,
    },
    {
        id: '2',
        name: 'Camping Gears',
        images: [
            'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1476611338391-6f395a0dd82f?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=200&auto=format&fit=crop',
        ],
        itemCount: 12,
    },
    {
        id: '3',
        name: 'Snow Sports',
        images: [
            'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1486218119243-13883505764c?w=200&auto=format&fit=crop',
        ],
        itemCount: 21,
    },
    {
        id: '4',
        name: 'Water Sports',
        images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop',
        ],
        itemCount: 19,
    },
    {
        id: '5',
        name: 'Musical',
        images: [
            'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=200&auto=format&fit=crop',
        ],
        itemCount: 11,
    },
    {
        id: '6',
        name: 'Arts & Craft',
        images: [
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1499892477393-f675706cbe6e?w=200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=200&auto=format&fit=crop',
        ],
        itemCount: 4,
    },
];

export const subcategoryImages: Record<string, Record<string, string>> = {
    travel_transport: {
        Cars: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop',
        SUVs: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop',
        Campers: 'https://images.unsplash.com/photo-1564866657315-6c1e7d0a83c5?w=400&auto=format&fit=crop',
        Trucks: 'https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=400&auto=format&fit=crop',
        Vans: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=400&auto=format&fit=crop',
        Buses: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&auto=format&fit=crop',
        Boats: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&auto=format&fit=crop',
        Watercraft: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop',
        'Off-Road Vehicles': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&auto=format&fit=crop',
        'Snow Vehicles': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&auto=format&fit=crop',
    },
    tech_gadgets: {
        Computers: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop',
        Cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop',
        'Camera Accessories': 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=400&auto=format&fit=crop',
        Gaming: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&auto=format&fit=crop',
        'Audio Equipment': 'https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=400&auto=format&fit=crop',
        Printers: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400&auto=format&fit=crop',
        Scanners: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=400&auto=format&fit=crop',
        'Specialized Devices': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop',
    },
    sports_leisure: {
        'Water Sports': 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&auto=format&fit=crop',
        'Snow Sports': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&auto=format&fit=crop',
        'Camping Gear': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&auto=format&fit=crop',
        'Fitness Gear': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop',
        'Musical Instruments': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop',
        'Arts & Crafts': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&auto=format&fit=crop',
        Aviation: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&auto=format&fit=crop',
    },
};

export const cartItems = [
    {
        id: '1',
        product: mockProducts[0],
        quantity: 2,
    },
    {
        id: '2',
        product: mockProducts[1],
        quantity: 1,
    },
];
