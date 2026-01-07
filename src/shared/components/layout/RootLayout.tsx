import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { GlobalDrawers } from './GlobalDrawers';

// Root layout component that handles scroll-to-top on route change
export const RootLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Outlet />
            <GlobalDrawers />
        </>
    );
};
