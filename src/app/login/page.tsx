import { Suspense } from 'react';
import { LoginRoute } from './LoginRoute';

export default function Page() {
  return <Suspense fallback={<main className="min-h-screen" aria-busy="true" />}><LoginRoute /></Suspense>;
}
