import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-[#e94560]">404</h1>
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/"
            className="bg-[#e94560] text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition"
          >
            Go Home
          </Link>
          <Link
            href="/courses"
            className="border-2 border-[#1a1a2e] text-[#1a1a2e] px-6 py-3 rounded-xl font-semibold hover:bg-[#1a1a2e] hover:text-white transition"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}