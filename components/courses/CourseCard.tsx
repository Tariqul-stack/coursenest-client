import Link from 'next/link';
import { FiStar, FiUsers, FiClock } from 'react-icons/fi';
import { ICourse } from '@/types';

const CourseCard = ({ course }: { course: ICourse }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Free / Paid Badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
            course.isFree
              ? 'bg-green-500 text-white'
              : 'bg-[#e94560] text-white'
          }`}
        >
          {course.isFree ? 'FREE' : `$${course.price}`}
        </span>
        {/* Level Badge */}
        <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-[#1a1a2e] text-white">
          {course.level}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category */}
        <span className="text-xs font-semibold text-[#e94560] uppercase tracking-wider">
          {course.category}
        </span>

        {/* Title */}
        <h3 className="text-[#1a1a2e] font-bold text-base mt-1 mb-2 line-clamp-2 flex-1">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
          {course.shortDescription}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={
              typeof course.instructor === 'object'
                ? course.instructor.avatar
                : ''
            }
            alt="instructor"
            className="w-7 h-7 rounded-full object-cover"
          />
          <span className="text-gray-500 text-xs">
            {typeof course.instructor === 'object'
              ? course.instructor.name
              : ''}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <FiStar size={12} className="text-yellow-400" />
            {course.averageRating > 0
              ? course.averageRating.toFixed(1)
              : 'New'}
          </span>
          <span className="flex items-center gap-1">
            <FiUsers size={12} />
            {course.totalEnrollments} students
          </span>
          <span className="flex items-center gap-1">
            <FiClock size={12} />
            {course.curriculum?.length || 0} modules
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[#1a1a2e] font-bold text-lg">
            {course.isFree ? 'Free' : `$${course.price}`}
          </span>
          <Link
            href={`/courses/${course._id}`}
            className="bg-[#e94560] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-opacity-90 transition"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;