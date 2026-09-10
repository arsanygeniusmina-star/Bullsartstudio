import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8 bg-bulls-surface/90 border border-bulls-border m-6 rounded-sm text-center">
          <div className="max-w-md space-y-4">
            <div className="w-12 h-12 rounded-full bg-bulls-red/20 text-bulls-red flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-display font-bold text-white text-xl uppercase tracking-wider">
              Component Refresh Needed
            </h3>
            <p className="font-body text-bulls-muted text-sm leading-relaxed">
              A temporary interface error occurred. Please click below to reload the studio display.
            </p>
            <button
              onClick={this.handleReset}
              className="btn-primary inline-flex items-center gap-2 py-2.5 px-5 text-xs uppercase tracking-widest"
            >
              <RefreshCw size={14} />
              <span>Reload Section</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
