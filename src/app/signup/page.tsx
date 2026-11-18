import { SignupPage } from '@/features/auth/ui/pages/SignupPage';
import { getSafeReturnPath } from '@/features/auth/ui/utils/getSafeReturnPath';

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return <SignupPage returnTo={getSafeReturnPath(next)} />;
}
