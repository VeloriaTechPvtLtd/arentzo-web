import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LandingPage } from '../../features/landing/LandingPage';
import { CustomerHomePage } from '../../features/customer-home/CustomerHomePage';
import { LoginPage } from '../../features/auth/pages/LoginPage';
import { SignupPage } from '../../features/auth/pages/SignupPage';
import { ForgotPasswordPage } from '../../features/auth/pages/ForgotPasswordPage';
import { VerifyOtpPage } from '../../features/auth/pages/VerifyOtpPage';
import { ResetPasswordPage } from '../../features/auth/pages/ResetPasswordPage';
import { PasswordResetSuccessPage } from '../../features/auth/pages/PasswordResetSuccessPage';
import { SearchResultsPage } from '../../features/search/SearchResultsPage';
import { FilterTestPage } from '../../features/filters/FilterTestPage';

import { AboutUsPage } from '../../features/info/pages/AboutUsPage';
import { ContactUsPage } from '../../features/info/pages/ContactUsPage';
import { PrivacyPolicyPage } from '../../features/info/pages/PrivacyPolicyPage';
import { TermsConditionsPage } from '../../features/info/pages/TermsConditionsPage';
import { FaqPage } from '../../features/info/pages/FaqPage';

// Root layout component that handles scroll-to-top on route change
const RootLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return <Outlet />;
};

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <LandingPage />,
            },
            {
                path: '/home',
                element: <CustomerHomePage />,
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
                path: '*',
                element: <div>404 Not Found</div>,
            }
        ]
    }
]);
