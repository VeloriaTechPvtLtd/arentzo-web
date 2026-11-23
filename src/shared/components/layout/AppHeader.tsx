'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  User,
  Search,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../../../features/auth/ui/context/AuthContext';
import { useDrawer } from '../../hooks/useDrawer';
import './AppHeader.css';

export const AppHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, activeRole: selectedRole } = useAuth();
  const activeRole = user ? selectedRole : undefined;
  const {
    openProfile,
    openMessages,
  } = useDrawer();

  const isAuthPage = [
    '/login',
    '/signup',
    '/forgot-password',
    '/verify-otp',
    '/reset-password',
  ].includes(pathname);
  const isHomePage = pathname === '/' || pathname === '/home';

  if (isAuthPage) return null;

  const getPageTitle = () => {
    if (isHomePage) return 'Arentzo';
    if (activeRole === 'service_provider') return 'Provider Console';
    if (pathname.startsWith('/search')) return 'Search';
    if (pathname.startsWith('/browse')) return 'Marketplace';
    if (pathname.startsWith('/favorites')) return 'Favorites';
    if (pathname.startsWith('/my-rentals')) return 'My Rentals';
    return 'Arentzo';
  };

  return (
    <header
      className={`app-header ${activeRole ? `app-header--${activeRole.replace('_', '-')}` : ''}`}
    >
      <div className="app-header__container">
        <div className="app-header__left">
          <Link
            href={activeRole === 'service_provider' ? '/provider-dashboard' : '/'}
            className="app-header__logo"
          >
            <img src="/logo.svg" alt="Arentzo" className="w-8 h-8 mr-2" />
            <span className="app-header__logo-text">{getPageTitle()}</span>
          </Link>
        </div>

        <div className="app-header__center">
          {user ? (
            activeRole === 'service_provider' ? (
              <nav className="app-header__nav">
                <Link href="/provider-dashboard" className="app-header__nav-link">
                  Dashboard
                </Link>
                <Link
                  href="/provider-dashboard/products"
                  className="app-header__nav-link"
                >
                  Products
                </Link>
                <Link
                  href="/provider-dashboard/offers"
                  className="app-header__nav-link"
                >
                  Offers
                </Link>
                <Link
                  href="/provider-dashboard/orders"
                  className="app-header__nav-link"
                >
                  Orders
                </Link>
              </nav>
            ) : null
          ) : (
            <nav className="app-header__nav">
              <Link href="/browse" className="app-header__nav-link">
                Marketplace
              </Link>
              <Link href="/#how-it-works" className="app-header__nav-link">
                How it Works
              </Link>
              <Link href="/contact-us" className="app-header__nav-link">
                Support
              </Link>
            </nav>
          )}
        </div>

        <div className="app-header__right">
          {user ? (
            <>
              {activeRole !== 'service_provider' &&
                (pathname === '/search' ? (
                  <div className="flex-1 w-full max-w-[600px] mx-4">
                    <div className="app-header__search">
                      <Search size={18} className="app-header__search-icon" />
                      <input
                        type="text"
                        placeholder="Search for furniture, mattresses..."
                        defaultValue={searchParams.get('q') || ''}
                        onChange={(e) => {
                          const query = e.target.value;
                          const next = new URLSearchParams(searchParams.toString());
                          if (query) {
                            next.set('q', query);
                          } else {
                            next.delete('q');
                          }
                          const qs = next.toString();
                          router.replace(qs ? `${pathname}?${qs}` : pathname);
                        }}
                        className="w-full bg-transparent border-none focus:outline-none"
                        autoFocus
                      />
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/search"
                    className="app-header__action-btn"
                    aria-label="Search"
                  >
                    <Search size={22} />
                  </Link>
                ))}
              <button
                className="app-header__action-btn"
                onClick={openMessages}
                aria-label="Messages"
              >
                <MessageSquare size={22} />
                <span className="app-header__badge">3</span>
              </button>
              <button
                className="app-header__profile-btn"
                onClick={openProfile}
                aria-label="Profile"
              >
                <div className="app-header__avatar">
                  <User size={20} />
                  <div className="app-header__avatar-status" />
                </div>
              </button>
            </>
          ) : (
            <div className="app-header__auth-btns">
              <button className="app-header__login-btn" onClick={() => router.push(`/login?next=${encodeURIComponent(pathname)}`)}>
                Login
              </button>
              <button className="app-header__signup-btn" onClick={() => router.push(`/signup?next=${encodeURIComponent(pathname)}`)}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
