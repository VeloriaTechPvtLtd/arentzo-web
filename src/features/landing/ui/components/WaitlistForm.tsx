import { useState, type FormEvent } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { submitWaitlistEmail } from '../../infrastructure/waitlistApi';

type WaitlistFormProps = {
  variant?: 'light' | 'dark';
  className?: string;
  id?: string;
  source?: string;
};

export function WaitlistForm({
  variant = 'light',
  className,
  id,
  source = 'landing',
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const isDark = variant === 'dark';

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setPending(true);
    try {
      const result = await submitWaitlistEmail(trimmed, source);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setSuccess(true);
      setEmail('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  };

  if (success) {
    return (
      <p
        className={cn(
          'text-sm font-semibold',
          isDark ? 'text-primary' : 'text-primary',
          className,
        )}
        role="status"
      >
        You&apos;re on the list! We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={cn('flex w-full flex-col gap-2', className)}
      noValidate
    >
      <div className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:items-stretch">
        <div className="relative min-w-0 w-full flex-1">
          <Mail
            className={cn(
              'pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2',
              isDark ? 'text-background/40' : 'text-muted-foreground',
            )}
            aria-hidden
          />
          <Input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={pending}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id ?? 'waitlist'}-error` : undefined}
            className={cn(
              'h-11 w-full min-w-0 rounded-full pl-10 text-sm',
              isDark &&
                'border-background/30 bg-background/15 text-background placeholder:text-background/45 focus-visible:border-primary focus-visible:ring-primary/40',
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-11 w-full shrink-0 rounded-full px-5 text-sm font-semibold shadow-sm sm:w-auto sm:px-6"
        >
          {pending ? 'Joining…' : 'Join Waitlist'}
        </Button>
      </div>
      {error ? (
        <p
          id={`${id ?? 'waitlist'}-error`}
          className={cn('text-xs', isDark ? 'text-red-300' : 'text-destructive')}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
