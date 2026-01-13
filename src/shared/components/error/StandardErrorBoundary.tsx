import React from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
import './StandardErrorBoundary.css';

export const StandardErrorBoundary: React.FC = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    let errorMessage = "An unexpected error occurred.";
    let errorTitle = "Application Error";

    if (isRouteErrorResponse(error)) {
        errorTitle = `${error.status} Error`;
        errorMessage = error.data?.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="error-boundary-container">
            <div className="error-content">
                <div className="error-icon-wrapper">
                    <AlertTriangle size={64} className="error-icon" />
                </div>
                <h1 className="error-title">{errorTitle}</h1>
                <p className="error-message">{errorMessage}</p>
                <div className="error-actions">
                    <button className="error-btn primary" onClick={() => window.location.reload()}>
                        <RefreshCcw size={18} />
                        <span>Try Again</span>
                    </button>
                    <button className="error-btn secondary" onClick={() => navigate('/')}>
                        <Home size={18} />
                        <span>Go Home</span>
                    </button>
                </div>
                {import.meta.env.DEV && error instanceof Error && (
                    <div className="error-stack">
                        <pre>{error.stack}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};
