'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FiStar, FiUsers, FiClock, FiBook, FiCheck,
  FiPlay, FiLock, FiArrowLeft,
} from 'react-icons/fi';
import axiosInstance from '@/lib/axios';
import { ICourse } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import ReviewsSection from '@/components/courses/ReviewsSection';

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [openModule, setOpenModule] = useState<number | null>(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/courses/${id}`);
        setCourse(res.data.course);
      } catch {
        toast.error('Course not found');
        router.push('/courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, router]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!isAuthenticated) return;
      try {
        const res = await axiosInstance.get('/enrollments/my');
        const enrolled = res.data.enrollments.some(
          (e: any) => e.course._id === id || e.course === id
        );
        setIsEnrolled(enrolled);
      } catch {}
    };
    checkEnrollment();
  }, [isAuthenticated, id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to enroll');
      router.push('/login');
      return;
    }
    try {
      setEnrolling(true);
      if (course?.isFree) {
        await axiosInstance.post('/enrollments', { courseId: id });
        toast.success('Enrolled successfully!');
        setIsEnrolled(true);
        router.push(`/courses/${id}/learn`);
      } else {
        router.push(`/courses/${id}/checkout`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) return null;

  const totalLessons = course.curriculum?.reduce(
    (acc, mod) => acc + mod.lessons.length, 0
  ) || 0;

  const totalDuration = course.curriculum?.reduce(
    (acc, mod) => acc + mod.lessons.reduce((a, l) => a + (l.duration || 0), 0), 0
  ) || 0;

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition"
          >
            <FiArrowLeft /> Back to Courses
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left */}
            <div className="lg:col-span-2">
              <span className="inline-block bg-[#e94560] bg-opacity-20 text-[#e94560] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {course.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                {course.title}
              </h1>
              <p className="text-gray-300 mt-4 text-base leading-relaxed">
                {course.shortDescription}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <FiStar className="text-yellow-400" />
                  {course.averageRating > 0
                    ? course.averageRating.toFixed(1)
                    : 'New'}
                </span>
                <span className="flex items-center gap-1">
                  <FiUsers size={14} />
                  {course.totalEnrollments} students
                </span>
                <span className="flex items-center gap-1">
                  <FiBook size={14} />
                  {course.curriculum?.length || 0} modules
                </span>
                <span className="flex items-center gap-1">
                  <FiPlay size={14} />
                  {totalLessons} lessons
                </span>
                <span className="flex items-center gap-1">
                  <FiClock size={14} />
                  {totalDuration} mins total
                </span>
                <span className="bg-[#0f3460] px-3 py-1 rounded-full text-xs">
                  {course.level}
                </span>
              </div>

              {/* Instructor */}
              {typeof course.instructor === 'object' && (
                <div className="flex items-center gap-3 mt-6">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#e94560]"
                  />
                  <div>
                    <p className="text-xs text-gray-400">Instructor</p>
                    <p className="text-white font-semibold text-sm">
                      {course.instructor.name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right — Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-3xl font-bold text-[#1a1a2e]">
                    {course.isFree ? 'Free' : `$${course.price}`}
                  </p>

                  {isEnrolled ? (
                    <Link
                      href={`/courses/${id}/learn`}
                      className="block w-full text-center bg-green-500 text-white py-3 rounded-xl font-semibold mt-4 hover:bg-opacity-90 transition"
                    >
                      Continue Learning
                    </Link>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold mt-4 hover:bg-opacity-90 transition disabled:opacity-60"
                    >
                      {enrolling
                        ? 'Processing...'
                        : course.isFree
                        ? 'Enroll for Free'
                        : `Buy for $${course.price}`}
                    </button>
                  )}

                  <ul className="mt-5 space-y-2">
                    {[
                      `${totalLessons} lessons`,
                      `${totalDuration} minutes of content`,
                      'Lifetime access',
                      'Certificate of completion',
                      'Community Q&A support',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <FiCheck size={14} className="text-green-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-xl font-bold text-[#1a1a2e] mb-4">
                Course Overview
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {course.fullDescription}
              </p>
            </motion.div>

            {/* Tags */}
            {course.tags?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#1a1a2e] mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#f0f0f0] text-gray-600 text-sm px-4 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum */}
            {course.curriculum?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">
                  Course Curriculum
                </h2>
                <div className="space-y-3">
                  {course.curriculum.map((mod, index) => (
                    <div
                      key={mod.moduleId}
                      className="border border-gray-100 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setOpenModule(openModule === index ? null : index)
                        }
                        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 bg-[#e94560] text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="font-semibold text-[#1a1a2e] text-sm">
                            {mod.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {mod.lessons.length} lessons
                        </span>
                      </button>

                      {openModule === index && (
                        <div className="divide-y divide-gray-50">
                          {mod.lessons.map((lesson) => (
                            <div
                              key={lesson.lessonId}
                              className="flex items-center justify-between px-5 py-3"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.isFreePreview || isEnrolled ? (
                                  <FiPlay
                                    size={14}
                                    className="text-[#e94560]"
                                  />
                                ) : (
                                  <FiLock
                                    size={14}
                                    className="text-gray-300"
                                  />
                                )}
                                <span
                                  className={`text-sm ${
                                    lesson.isFreePreview || isEnrolled
                                      ? 'text-[#1a1a2e]'
                                      : 'text-gray-400'
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                                {lesson.isFreePreview && !isEnrolled && (
                                  <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                    Preview
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-400">
                                {lesson.duration} min
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ReviewsSection courseId={id as string} isEnrolled={isEnrolled} />

          {/* Right Sidebar — Instructor Info */}
          {typeof course.instructor === 'object' && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
                <h3 className="font-bold text-[#1a1a2e] mb-5">
                  About the Instructor
                </h3>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-[#f0f0f0]"
                  />
                  <div>
                    <p className="font-bold text-[#1a1a2e]">
                      {course.instructor.name}
                    </p>
                    <p className="text-xs text-[#e94560] font-semibold mt-0.5">
                      Expert Instructor
                    </p>
                  </div>
                </div>
                {course.instructor.bio && (
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {course.instructor.bio}
                  </p>
                )}
                <Link
                  href={`/instructors/${course.instructor._id}`}
                  className="block text-center mt-5 border-2 border-[#0f3460] text-[#0f3460] py-2 rounded-xl text-sm font-semibold hover:bg-[#0f3460] hover:text-white transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}