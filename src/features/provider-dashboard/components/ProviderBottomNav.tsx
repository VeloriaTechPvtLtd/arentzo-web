import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, ClipboardList, Ticket } from 'lucide-react';
import './ProviderBottomNav.css';

export const ProviderBottomNav: React.FC = () => {
    return (
        <nav className="provider-bottom-nav">
            <NavLink
                to="/provider-dashboard"
                end
                className={({ isActive }) => `provider-bottom-nav__item ${isActive ? 'active' : ''}`}
            >
                <Home size={22} />
                <span>Home</span>
            </NavLink>

            <NavLink
                to="/provider-dashboard/products"
                className={({ isActive }) => `provider-bottom-nav__item ${isActive ? 'active' : ''}`}
            >
                <LayoutGrid size={22} />
                <span>Listing</span>
            </NavLink>

            <NavLink
                to="/provider-dashboard/orders"
                className={({ isActive }) => `provider-bottom-nav__item ${isActive ? 'active' : ''}`}
            >
                <ClipboardList size={22} />
                <span>Orders</span>
            </NavLink>

            <NavLink
                to="/provider-dashboard/offers"
                className={({ isActive }) => `provider-bottom-nav__item ${isActive ? 'active' : ''}`}
            >
                <Ticket size={22} />
                <span>Offers</span>
            </NavLink>
        </nav>
    );
};
