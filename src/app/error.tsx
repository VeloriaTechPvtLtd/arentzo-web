'use client';

import { StandardErrorBoundary } from '@/shared/components/error/StandardErrorBoundary';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <StandardErrorBoundary error={error} reset={reset} />;
}
