import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../features/auth/ui/context/AuthContext';
import { isWaitlistMarketingPath } from '../../../features/landing/ui/components/WaitlistPageShell';
import { AppHeader } from './AppHeader';
import { GlobalDrawers } from './GlobalDrawers';

export const MainLayout = () => {
    const { pathname } = useLocation();
    const { user } = useAuth();
    // Logged-in home uses AppHeader + CustomerHome; guests get WaitlistNavbar on Landing.
    // Other marketing routes always use WaitlistNavbar (never stack AppHeader).
    const hideAppHeader =
        pathname === '/'
            ? !user
            : isWaitlistMarketingPath(pathname);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {!hideAppHeader && <AppHeader />}
            <Outlet />
            <GlobalDrawers />
        </>
    );
};
