import { createContext } from 'react';
import type { Theme } from '../types/theme';

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    currentTheme: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
