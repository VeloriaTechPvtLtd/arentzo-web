'use client';

import React, { useEffect, useState } from 'react';
import type { Theme } from '../types/theme';
import { FORCE_LIGHT_THEME } from '../types/theme';
import { ThemeContext } from './ThemeContextDefinition';

function readStoredTheme(): Theme {
  try {
    if (typeof window === 'undefined') return 'light';
    const savedTheme = window.localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  } catch {
    return 'light';
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  const setTheme = (next: Theme) => {
    // Dark theme implementation retained; switching is disabled while forced light.
    if (FORCE_LIGHT_THEME) {
      setThemeState('light');
      return;
    }
    setThemeState(next);
  };

  useEffect(() => {
    if (FORCE_LIGHT_THEME) {
      setThemeState('light');
      return;
    }
    setThemeState(readStoredTheme());
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    const removeOldTheme = () => {
      root.classList.remove('light', 'dark');
    };

    const applyTheme = (targetTheme: 'light' | 'dark') => {
      removeOldTheme();
      root.classList.add(targetTheme);
      setResolvedTheme(targetTheme);
    };

    // Keep dark/system logic below for when FORCE_LIGHT_THEME is turned off.
    if (FORCE_LIGHT_THEME) {
      applyTheme('light');
      try {
        window.localStorage.setItem('theme', 'light');
      } catch {
        // ignore
      }
      return;
    }

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      applyTheme(systemTheme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    applyTheme(theme);
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // ignore storage errors during SSR / restricted environments
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: FORCE_LIGHT_THEME ? 'light' : theme,
        setTheme,
        currentTheme: FORCE_LIGHT_THEME ? 'light' : resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
