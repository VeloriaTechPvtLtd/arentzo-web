import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Box, Tag, ClipboardList } from 'lucide-react';
import './ProviderBottomNav.css';

export const ProviderBottomNav: React.FC = () => {
    return (
        <nav className="provider-bottom-nav">
            <NavLink
                to="/provider-dashboard"
                end
                className={({ isActive }) => `provider-bottom-nav__item ${isActive ? 'active' : ''}`}
            >
                <LayoutDashboard size={22} />
                <span>Dashboard</span>
            </NavLink>

            <NavLink
                to="/provider-dashboard/products"
                className={({ isActive }) => `provider-bottom-nav__item ${isActive ? 'active' : ''}`}
            >
                <Box size={22} />
                <span>Products</span>
            </NavLink>

            <NavLink
                to="/provider-dashboard/offers"
                className={({ isActive }) => `provider-bottom-nav__item ${isActive ? 'active' : ''}`}
            >
                <Tag size={22} />
                <span>Offers</span>
            </NavLink>

            <NavLink
                to="/provider-dashboard/orders"
                className={({ isActive }) => `provider-bottom-nav__item ${isActive ? 'active' : ''}`}
            >
                <ClipboardList size={22} />
                <span>Orders</span>
            </NavLink>
        </nav>
    );
};
