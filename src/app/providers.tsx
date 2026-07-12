'use client';

import '@/lib/i18n';
import { AuthProvider } from '@/features/auth/ui/context/AuthContext';
import { CartProvider } from '@/shared/context/CartProvider';
import { DrawerProvider } from '@/shared/context/DrawerProvider';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { ScrollToTop } from '@/shared/components/ScrollToTop';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DrawerProvider>
          <CartProvider>
            <ScrollToTop />
            {children}
          </CartProvider>
        </DrawerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
