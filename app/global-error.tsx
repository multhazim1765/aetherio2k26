'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#0a0a0f]">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Critical Error</h2>
            <button
              onClick={reset}
              className="bg-[#4f46e5] text-white px-6 py-2 rounded-lg"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
