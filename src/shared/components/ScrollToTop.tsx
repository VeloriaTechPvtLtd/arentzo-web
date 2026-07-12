'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LANDING_SCROLL_PATHS } from '@/lib/seo';

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '');
  if (!id) return false;

  const el = document.getElementById(id);
  if (!el) return false;

  el.scrollIntoView({
    behavior: 'smooth',
    block: id === 'waitlist-hero-form' ? 'center' : 'start',
  });
  return true;
}

/**
 * Scrolls to top on route change, or to hash targets for landing paths
 * like /#how-it-works, /#what-you-can-rent, /#waitlist-hero-form.
 */
export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    const { hash } = window.location;
    const fullPath = `${pathname}${hash}` as (typeof LANDING_SCROLL_PATHS)[number];

    if (hash && (LANDING_SCROLL_PATHS as readonly string[]).includes(fullPath)) {
      // Retry briefly in case the landing sections mount after navigation.
      let attempts = 0;
      const tryScroll = () => {
        if (scrollToHash(hash) || attempts >= 20) return;
        attempts += 1;
        window.requestAnimationFrame(tryScroll);
      };
      window.requestAnimationFrame(tryScroll);
      return;
    }

    if (hash) {
      window.requestAnimationFrame(() => {
        scrollToHash(hash);
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      const { hash } = window.location;
      if (hash) scrollToHash(hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
};
