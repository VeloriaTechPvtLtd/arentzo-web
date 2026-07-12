'use client';

import { useAuth } from '@/features/auth/ui/context/AuthContext';
import { CustomerHomePage } from '@/features/customer-home/ui/pages/CustomerHomePage';
import { LandingPage } from '@/features/landing/ui/pages/LandingPage';

export default function HomePageClient() {
  const { user } = useAuth();
  return user ? <CustomerHomePage /> : <LandingPage />;
}
