
"use client";

import { useEffect } from "react";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("About Page Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="mb-4 text-6xl">⚠️</div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Something went wrong
      </h1>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-gray-500">
        We ran into an issue while loading this page. It might be a temporary
        problem — try again or come back later.
      </p>

      {/* Error digest (for debugging) */}
      {error?.digest && (
        <p className="mt-3 text-xs text-gray-400">
          Error ID: {error.digest}
        </p>
      )}

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => reset()}
          className="rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-90"
        >
          Try Again
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

