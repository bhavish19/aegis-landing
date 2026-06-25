import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";
import AegisLandingPage from "./AegisLandingPage";

const Analytics = lazy(() =>
  import("@vercel/analytics/react").then((mod) => ({ default: mod.Analytics })),
);

const rootEl = document.getElementById("root");

if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <AegisLandingPage />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </ErrorBoundary>
    </StrictMode>,
  );
}