'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import './StandardErrorBoundary.css';

type StandardErrorBoundaryProps = {
  error?: Error & { digest?: string };
  reset?: () => void;
};

export const StandardErrorBoundary: React.FC<StandardErrorBoundaryProps> = ({
  error,
  reset,
}) => {
  const router = useRouter();

  const errorMessage = error?.message || 'An unexpected error occurred.';
  const errorTitle = 'Application Error';

  return (
    <div className="error-boundary-container">
      <div className="error-content">
        <div className="error-icon-wrapper">
          <AlertTriangle size={64} className="error-icon" />
        </div>
        <h1 className="error-title">{errorTitle}</h1>
        <p className="error-message">{errorMessage}</p>
        <div className="error-actions">
          <button
            className="error-btn primary"
            onClick={() => (reset ? reset() : window.location.reload())}
          >
            <RefreshCcw size={18} />
            <span>Try Again</span>
          </button>
          <button className="error-btn secondary" onClick={() => router.push('/')}>
            <Home size={18} />
            <span>Go Home</span>
          </button>
        </div>
        {process.env.NODE_ENV === 'development' && error?.stack && (
          <div className="error-stack">
            <pre>{error.stack}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
