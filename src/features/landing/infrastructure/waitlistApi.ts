import { supabase } from '@/lib/supabase';

const STORAGE_KEY = 'arentzo-waitlist-emails';

/** Postgres unique_violation — email already on the waitlist. */
const UNIQUE_VIOLATION = '23505';

function persistLocal(email: string) {
  try {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const emails: string[] = raw ? (JSON.parse(raw) as string[]) : [];
    if (!emails.includes(email)) {
      emails.push(email);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
    }
  } catch {
    // ignore storage failures
  }
}

function isUniqueViolation(error: {
  code?: string;
  message?: string;
  details?: string;
}): boolean {
  if (error.code === UNIQUE_VIOLATION) return true;
  const text = `${error.message ?? ''} ${error.details ?? ''}`.toLowerCase();
  return text.includes('duplicate') || text.includes('unique');
}

/**
 * Persist a waitlist email via Supabase `waitlist_signups`.
 * Insert-only: duplicate emails count as success. localStorage is a
 * backup only when the network/DB is unreachable.
 */
export async function submitWaitlistEmail(
  email: string,
  source = 'landing',
): Promise<{ ok: true } | { ok: false; message: string }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) {
    return { ok: false, message: 'Please enter a valid email address.' };
  }

  try {
    const { error } = await supabase.from('waitlist_signups').insert({
      email: normalized,
      source,
    });

    if (error) {
      if (isUniqueViolation(error)) {
        persistLocal(normalized);
        return { ok: true };
      }
      if (process.env.NODE_ENV === "development") {
        console.warn('[waitlist]', error.message);
      }
      return {
        ok: false,
        message: 'Something went wrong. Please try again.',
      };
    }

    persistLocal(normalized);
    return { ok: true };
  } catch (err) {
    // Network / client failure — keep a local copy, but tell the user.
    persistLocal(normalized);
    if (process.env.NODE_ENV === "development") {
      console.warn('[waitlist]', err);
    }
    return {
      ok: false,
      message: 'Unable to reach the server. Please try again.',
    };
  }
}
