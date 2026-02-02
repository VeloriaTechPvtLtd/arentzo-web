import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { GlobalDrawers } from './GlobalDrawers';

export const DetailLayout = () => {
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
