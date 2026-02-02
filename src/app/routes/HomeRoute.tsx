import React from 'react';
import { useAuth } from '../../features/auth/ui/context/AuthContext';
import { CustomerHomePage } from '../../features/customer-home/ui/pages/CustomerHomePage';
import { LandingPage } from '../../features/landing/ui/pages/LandingPage';

export const HomeRoute: React.FC = () => {
    const { user } = useAuth();
    return user ? <CustomerHomePage /> : <LandingPage />;
};
