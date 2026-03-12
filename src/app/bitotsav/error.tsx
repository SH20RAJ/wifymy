'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an external reporting service
    console.error(error)
  }, [error])

  return (
    <div className="p-8 bg-black text-red-500 min-h-screen z-50 relative">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <pre className="mt-4 whitespace-pre-wrap">{error.message}</pre>
      <pre className="mt-4 text-xs">{error.stack}</pre>
      <button
        className="mt-4 bg-white text-black px-4 py-2"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
