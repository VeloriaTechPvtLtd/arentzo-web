import type { Metadata } from 'next';
import { CheckoutReturnPage } from '@/features/checkout/ui/components/CheckoutReturnPage';
export const metadata: Metadata = { title: 'Check your booking', robots: { index: false, follow: false } };
export default function Page() { return <CheckoutReturnPage />; }
