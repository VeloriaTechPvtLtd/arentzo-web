'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginForm } from '../components/LoginForm';

interface LoginPageProps {
  returnTo: string;
}

export function LoginPage({ returnTo }: LoginPageProps) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <AuthLayout title={t('auth.login.title')} subtitle={t('auth.login.subtitle')}>
      <LoginForm
        onSuccess={() => router.replace(returnTo)}
        onSignupClick={() => router.push(`/signup?next=${encodeURIComponent(returnTo)}`)}
        onForgotPasswordClick={() => router.push('/forgot-password')}
      />
    </AuthLayout>
  );
}
