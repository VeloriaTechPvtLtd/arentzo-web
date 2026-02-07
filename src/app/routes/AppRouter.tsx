import { createBrowserRouter, Navigate } from 'react-router-dom';
import { CustomerHomePage } from '../../features/customer-home/ui/pages/CustomerHomePage';
import { ProductDetailsPage } from '../../features/customer-home/ui/pages/ProductDetailsPage';
import { SearchResultsPage } from '../../features/search/ui/pages/SearchResultsPage';
import { MyRentalsPage } from '../../features/rentals/ui/pages/MyRentalsPage';
import { RentalDetailPage } from '../../features/rentals/ui/pages/RentalDetailPage';
import { FilterTestPage } from '../../features/filters/ui/pages/FilterTestPage';
import { ProviderOnboardingPage } from '../../features/provider-onboarding';
import { ProviderDashboard } from '../../features/provider-dashboard/ui/pages/ProviderDashboard';
import { ProviderProductsPage } from '../../features/provider-dashboard/ui/pages/ProviderProductsPage';
import { ProviderOffersPage } from '../../features/provider-dashboard/ui/pages/ProviderOffersPage';
import { ProviderOrdersPage } from '../../features/provider-dashboard/ui/pages/ProviderOrdersPage';
import { ProviderLayout } from '../../features/provider-dashboard/ui/layouts/ProviderLayout';

import { AboutUsPage } from '../../features/info/ui/pages/AboutUsPage';
import { ContactUsPage } from '../../features/info/ui/pages/ContactUsPage';
import { PrivacyPolicyPage } from '../../features/info/ui/pages/PrivacyPolicyPage';
import { TermsConditionsPage } from '../../features/info/ui/pages/TermsConditionsPage';
import { FaqPage } from '../../features/info/ui/pages/FaqPage';

import { MainLayout } from '../../shared/components/layout/MainLayout';
import { DetailLayout } from '../../shared/components/layout/DetailLayout';
import { StandardErrorBoundary } from '../../shared/components/error/StandardErrorBoundary';
import { FavoritesPage } from '../../features/favorites/ui/pages/FavoritesPage';
import { HomeRoute } from './HomeRoute';

export const router = createBrowserRouter([
    // Main Layout Routes (with AppHeader)
    {
        element: <MainLayout />,
        errorElement: <StandardErrorBoundary />,
        children: [
            {
                path: '/',
                element: <HomeRoute />,
            },
            {
                path: '/browse',
                element: <CustomerHomePage />,
            },
            {
                path: '/home',
                element: <Navigate to="/" replace />,
            },
            {
                path: '/about-us',
                element: <AboutUsPage />,
            },
            {
                path: '/contact-us',
                element: <ContactUsPage />,
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicyPage />,
            },
            {
                path: '/terms-and-conditions',
                element: <TermsConditionsPage />,
            },
            {
                path: '/faqs',
                element: <FaqPage />,
            },
            {
                path: '/my-rentals',
                element: <MyRentalsPage />,
            },
            {
                path: '/favorites',
                element: <FavoritesPage />,
            },
            {
                path: '/filters-test',
                element: <FilterTestPage />,
            },
            {
                path: '/provider-onboarding',
                element: <ProviderOnboardingPage />,
            },
        ]
    },
    // Detail Layout Routes (with BackHeader - no main AppHeader)
    {
        element: <DetailLayout />,
        errorElement: <StandardErrorBoundary />,
        children: [
            {
                path: '/search',
                element: <SearchResultsPage />,
            },
            {
                path: '/product/:id',
                element: <ProductDetailsPage />,
            },
            {
                path: '/my-rentals/:id',
                element: <RentalDetailPage />,
            },
        ]
    },
    // Auth Routes (no layout header needed) - EMPTY
    {
        element: <DetailLayout />,
        errorElement: <StandardErrorBoundary />,
        children: []
    },
    // Provider Dashboard (has its own layout)
    {
        path: '/provider-dashboard',
        element: <ProviderLayout />,
        errorElement: <StandardErrorBoundary />,
        children: [
            {
                index: true,
                element: <ProviderDashboard />,
            },
            {
                path: 'products',
                element: <ProviderProductsPage />,
            },
            {
                path: 'offers',
                element: <ProviderOffersPage />,
            },
            {
                path: 'orders',
                element: <ProviderOrdersPage />,
            }
        ]
    },
    // 404 fallback
    {
        path: '*',
        element: <div>404 Not Found</div>,
    }
]);
