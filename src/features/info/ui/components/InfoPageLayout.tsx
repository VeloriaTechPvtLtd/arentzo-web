import type { ReactNode } from 'react';
import { WaitlistPageShell } from '../../../landing/ui/components/WaitlistPageShell';

type InfoPageLayoutProps = {
  children: ReactNode;
  /** Wider content for legal docs; narrower for help/FAQ */
  width?: 'narrow' | 'wide';
};

export function InfoPageLayout({
  children,
  width = 'wide',
}: InfoPageLayoutProps) {
  return (
    <WaitlistPageShell>
      <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div
          className={
            width === 'narrow'
              ? 'mx-auto w-full max-w-2xl'
              : 'mx-auto w-full max-w-4xl'
          }
        >
          {children}
        </div>
      </main>
    </WaitlistPageShell>
  );
}
