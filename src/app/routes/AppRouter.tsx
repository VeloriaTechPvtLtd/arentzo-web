import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LandingPage } from '../../features/landing/LandingPage';
import { CustomerHomePage } from '../../features/customer-home/CustomerHomePage';
import { ProductDetailsPage } from '../../features/customer-home/ProductDetailsPage';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { SignupPage } from '../../features/auth/pages/SignupPage';
import { ForgotPasswordPage } from '../../features/auth/pages/ForgotPasswordPage';
import { VerifyOtpPage } from '../../features/auth/pages/VerifyOtpPage';
import { ResetPasswordPage } from '../../features/auth/pages/ResetPasswordPage';
import { PasswordResetSuccessPage } from '../../features/auth/pages/PasswordResetSuccessPage';
import { SearchResultsPage } from '../../features/search/SearchResultsPage';
import { FilterTestPage } from '../../features/filters/FilterTestPage';
import { ProviderOnboardingPage } from '../../features/provider-onboarding';
import { ProviderDashboard } from '../../features/provider-dashboard/ProviderDashboard';
import { ProviderProductsPage } from '../../features/provider-dashboard/components/ProviderProductsPage';
import { ProviderOffersPage } from '../../features/provider-dashboard/components/ProviderOffersPage';
import { ProviderOrdersPage } from '../../features/provider-dashboard/components/ProviderOrdersPage';
import { ProviderLayout } from '../../features/provider-dashboard/layouts/ProviderLayout';

import { AboutUsPage } from '../../features/info/pages/AboutUsPage';
import { ContactUsPage } from '../../features/info/pages/ContactUsPage';
import { PrivacyPolicyPage } from '../../features/info/pages/PrivacyPolicyPage';
import { TermsConditionsPage } from '../../features/info/pages/TermsConditionsPage';
import { FaqPage } from '../../features/info/pages/FaqPage';

import { RootLayout } from '../../shared/components/layout/RootLayout';
import { useAuth } from '../../features/auth/context/AuthContext';

const HomeRoute = () => {
    const { user } = useAuth();
    return user ? <CustomerHomePage /> : <LandingPage />;
};

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
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
                path: '/filters-test',
                element: <FilterTestPage />,
            },
            {
                path: '/provider-onboarding',
                element: <ProviderOnboardingPage />,
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
