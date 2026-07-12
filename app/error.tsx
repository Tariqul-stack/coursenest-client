'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#e94560]">Oops!</h1>
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-4">
          Something went wrong
        </h2>
        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={reset}
            className="bg-[#e94560] text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-[#1a1a2e] text-[#1a1a2e] px-6 py-3 rounded-xl font-semibold hover:bg-[#1a1a2e] hover:text-white transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}