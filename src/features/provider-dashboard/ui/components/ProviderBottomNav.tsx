'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, ClipboardList, Ticket } from 'lucide-react';
import '../styles/ProviderBottomNav.css';

const items = [
  { href: '/provider-dashboard', label: 'Home', icon: Home, end: true },
  { href: '/provider-dashboard/products', label: 'Listing', icon: LayoutGrid },
  { href: '/provider-dashboard/orders', label: 'Orders', icon: ClipboardList },
  { href: '/provider-dashboard/offers', label: 'Offers', icon: Ticket },
] as const;

export const ProviderBottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="provider-bottom-nav">
      {items.map(({ href, label, icon: Icon, ...rest }) => {
        const end = 'end' in rest && rest.end;
        const isActive = end ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`provider-bottom-nav__item ${isActive ? 'active' : ''}`}
          >
            <Icon size={22} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
