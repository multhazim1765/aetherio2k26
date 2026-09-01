'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-16 h-16 text-[#f59e0b] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-[#9ca3af] mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="bg-[#4f46e5] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#4338ca] transition"
          >
            Try Again
          </button>
          <a
            href="/"
            className="bg-white/10 text-slate-300 hover:text-white px-6 py-2.5 rounded-lg font-semibold border border-white/10 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
