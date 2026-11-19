'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { useAuth } from '../context/useAuth';

interface SignupPageProps {
  returnTo: string;
}

export function SignupPage({ returnTo }: SignupPageProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { signUp, loading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!fullName || !email || !password || !confirmation) return setError(t('auth.errors.required'));
    if (password !== confirmation) return setError(t('auth.errors.passwordMismatch'));
    if (!acceptedTerms) return setError(t('auth.errors.terms'));
    try {
      const isAuthenticated = await signUp(email, fullName, password);
      if (isAuthenticated) return router.replace(returnTo);
      sessionStorage.setItem('arentzo_pending_verification_email', email);
      router.push('/verify-otp');
    } catch {
      setError(t('auth.errors.signup'));
    }
  };

  return (
    <AuthLayout title={t('auth.signup.title')} subtitle={t('auth.signup.subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput label={t('auth.signup.fullName')} placeholder={t('auth.signup.fullNamePlaceholder')} value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" required />
        <AuthInput label={t('auth.signup.email')} placeholder={t('auth.signup.emailPlaceholder')} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        <AuthInput label={t('auth.signup.password')} type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />
        <AuthInput label={t('auth.signup.confirmPassword')} type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" required />
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-1 accent-primary" />
          <span>
            {t('auth.signup.terms')}{' '}
            <Link href="/terms-and-conditions" className="font-semibold text-primary underline">{t('footer.terms')}</Link>{' '}
            <Link href="/privacy-policy" className="font-semibold text-primary underline">{t('footer.privacy')}</Link>
          </span>
        </label>
        {error ? <p role="alert" className="text-sm font-medium text-destructive">{error}</p> : null}
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary px-5 py-4 font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? t('auth.signup.submitting') : t('auth.signup.submit')}
        </button>
        <p className="text-center text-sm text-muted-foreground">
          {t('auth.signup.hasAccount')}{' '}
          <Link href={`/login?next=${encodeURIComponent(returnTo)}`} className="font-bold text-primary underline">{t('auth.signup.loginLink')}</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
