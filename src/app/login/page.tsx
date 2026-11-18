import { LoginPage } from '@/features/auth/ui/pages/LoginPage';
import { getSafeReturnPath } from '@/features/auth/ui/utils/getSafeReturnPath';

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return <LoginPage returnTo={getSafeReturnPath(next)} />;
}
