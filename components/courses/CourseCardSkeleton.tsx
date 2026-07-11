const CourseCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-5">
        <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
        <div className="h-5 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded w-1/3" />
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded-xl w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;