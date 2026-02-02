import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { GlobalDrawers } from './GlobalDrawers';

export const MainLayout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <AppHeader />
            <Outlet />
            <GlobalDrawers />
        </>
    );
};
