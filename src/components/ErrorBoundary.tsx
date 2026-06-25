import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("AEGIS render error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-aegis-bg px-6 text-center">
          <div className="max-w-md">
            <h1 className="text-lg font-semibold text-aegis-white">
              Something went wrong loading this page
            </h1>
            <p className="mt-2 text-sm text-aegis-slate">
              Try refreshing. If the problem continues, use a newer browser or
              contact us at{" "}
              <a
                href="mailto:contact@aegis-research.uk"
                className="text-aegis-teal-bright underline-offset-2 hover:underline"
              >
                contact@aegis-research.uk
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-md bg-aegis-teal px-5 py-3 text-sm font-medium text-white touch-manipulation"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
