import Link from 'next/link';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#e94560]">403</h1>
        <h2 className="text-2xl font-bold text-[#1a1a2e] mt-4">
          Access Denied
        </h2>
        <p className="text-gray-500 mt-2">
          You don&apos;t have permission to access this page.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-[#e94560] text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;