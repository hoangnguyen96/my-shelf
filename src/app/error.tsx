"use client";

// Components
import { ErrorBoundary } from "@app/components/common";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return <ErrorBoundary error={error} reset={reset} />;
};

export default Error;
