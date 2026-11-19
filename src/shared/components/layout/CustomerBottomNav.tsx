'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ClipboardList, Heart, LayoutGrid, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/ui/context/useAuth';
import { useDrawer } from '@/shared/hooks/useDrawer';
import './CustomerBottomNav.css';

export function CustomerBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { openProfile } = useDrawer();
  const navItems = [
    { href: '/browse', label: t('nav.marketplace'), icon: LayoutGrid },
    { href: '/favorites', label: t('nav.saved'), icon: Heart },
    { href: '/my-rentals', label: t('nav.rentals'), icon: ClipboardList },
  ];

  return <nav className="customer-bottom-nav" aria-label={t('nav.customerNavigation')}>
    {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined} className={pathname === href ? 'is-active' : ''}><Icon size={20} aria-hidden="true" /><span>{label}</span></Link>)}
    <button type="button" onClick={() => user ? openProfile() : router.push(`/login?next=${encodeURIComponent(pathname)}`)}><UserRound size={20} aria-hidden="true" /><span>{t('nav.account')}</span></button>
  </nav>;
}
