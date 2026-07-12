export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0]">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-gray-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}