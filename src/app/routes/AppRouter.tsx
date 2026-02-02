import { createBrowserRouter, Navigate } from 'react-router-dom';
import { CustomerHomePage } from '../../features/customer-home/ui/pages/CustomerHomePage';
import { ProductDetailsPage } from '../../features/customer-home/ui/pages/ProductDetailsPage';
import { LoginPage } from '../../features/auth/ui/pages/LoginPage';
import { SignupPage } from '../../features/auth/ui/pages/SignupPage';
import { ForgotPasswordPage } from '../../features/auth/ui/pages/ForgotPasswordPage';
import { VerifyOtpPage } from '../../features/auth/ui/pages/VerifyOtpPage';
import { ResetPasswordPage } from '../../features/auth/ui/pages/ResetPasswordPage';
import { PasswordResetSuccessPage } from '../../features/auth/ui/pages/PasswordResetSuccessPage';
import { SearchResultsPage } from '../../features/search/ui/pages/SearchResultsPage';
import { MyRentalsPage } from '../../features/rentals/ui/pages/MyRentalsPage';
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

import { RootLayout } from '../../shared/components/layout/RootLayout';
import { StandardErrorBoundary } from '../../shared/components/error/StandardErrorBoundary';
import { FavoritesPage } from '../../features/favorites/ui/pages/FavoritesPage';
import { HomeRoute } from './HomeRoute';



export const router = createBrowserRouter([
    {
        element: <RootLayout />,
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
                path: '/product/:id',
                element: <ProductDetailsPage />,
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
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/signup',
                element: <SignupPage />,
            },
            {
                path: '/forgot-password',
                element: <ForgotPasswordPage />,
            },
            {
                path: '/verify-otp',
                element: <VerifyOtpPage />,
            },
            {
                path: '/reset-password',
                element: <ResetPasswordPage />,
            },
            {
                path: '/password-reset-success',
                element: <PasswordResetSuccessPage />,
            },
            {
                path: '/search',
                element: <SearchResultsPage />,
            },
            {
                path: '/my-rentals',
                element: <MyRentalsPage />,
            },
            {
                path: '/my-rentals/:id',
                element: <MyRentalsPage />,
            },
            {
                path: '/filters-test',
                element: <FilterTestPage />,
            },
            {
                path: '/provider-onboarding',
                element: <ProviderOnboardingPage />,
            },
            {
                path: '/favorites',
                element: <FavoritesPage />,
            },
            {
                path: '*',
                element: <div>404 Not Found</div>,
            }
        ]
    },
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
    }
]);
