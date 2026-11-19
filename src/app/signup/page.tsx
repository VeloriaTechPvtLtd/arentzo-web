import { Suspense } from 'react';
import { SignupRoute } from './SignupRoute';

export default function Page() {
  return <Suspense fallback={<main className="min-h-screen" aria-busy="true" />}><SignupRoute /></Suspense>;
}
