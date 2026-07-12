import { useEffect, type ReactNode } from 'react';
import { useTheme } from '../../../../shared/context/useTheme';
import type { Theme } from '../../../../shared/types/theme';
import { WaitlistNavbar } from './WaitlistNavbar';
import { WaitlistFooter } from './WaitlistFooter';
import '../landing.css';

type WaitlistPageShellProps = {
  children: ReactNode;
  /** When false, only chrome is applied (caller owns padding). Default true. */
  withFooter?: boolean;
};

/** Shared waitlist chrome: light theme, WaitlistNavbar + WaitlistFooter. */
export function WaitlistPageShell({
  children,
  withFooter = true,
}: WaitlistPageShellProps) {
  const { setTheme } = useTheme();

  useEffect(() => {
    const previous = (localStorage.getItem('theme') as Theme | null) ?? 'system';
    setTheme('light');
    return () => setTheme(previous);
  }, [setTheme]);

  return (
    <div className="landing-page flex min-h-screen flex-col overflow-x-hidden bg-background font-sans text-foreground antialiased">
      <WaitlistNavbar />
      <div className="flex-1">{children}</div>
      {withFooter ? <WaitlistFooter /> : null}
    </div>
  );
}

/** Routes that use waitlist marketing chrome (hide AppHeader). */
export const WAITLIST_MARKETING_PATHS = [
  '/',
  '/about-us',
  '/contact-us',
  '/privacy-policy',
  '/terms-and-conditions',
  '/faqs',
  '/partner',
  '/franchise',
  '/seller',
  '/warehouse',
  '/deliver',
  '/resources',
  '/careers',
  '/blog',
] as const;

export function isWaitlistMarketingPath(pathname: string): boolean {
  if (WAITLIST_MARKETING_PATHS.includes(pathname as (typeof WAITLIST_MARKETING_PATHS)[number])) {
    return true;
  }
  return pathname.startsWith('/blog/');
}
