'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBookOpen, FiAward, FiClock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';

interface EnrollmentWithCourse {
  _id: string;
  course: {
    _id: string;
    title: string;
    thumbnail: string;
    category: string;
    instructor: { name: string; avatar: string };
  };
  progressPercent: number;
  certificateIssued: boolean;
  certificateId?: string;
  enrolledAt: string;
}

export default function StudentDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<EnrollmentWithCourse[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    fetchEnrollments();
  }, [user, loading]);

  const fetchEnrollments = async () => {
    try {
      const res = await axiosInstance.get('/enrollments/my');
      setEnrollments(res.data.enrollments);
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setFetching(false);
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const completed = enrollments.filter((e) => e.progressPercent === 100);
  const inProgress = enrollments.filter((e) => e.progressPercent < 100);
  const certificates = enrollments.filter((e) => e.certificateIssued);

  return (
    <div className="bg-[#f0f0f0] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-[#1a1a2e]">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Track your learning progress and achievements
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: FiBookOpen,
              label: 'Enrolled Courses',
              value: enrollments.length,
              color: '#e94560',
              bg: '#fff0f3',
            },
            {
              icon: FiClock,
              label: 'In Progress',
              value: inProgress.length,
              color: '#0f3460',
              bg: '#f0f4ff',
            },
            {
              icon: FiAward,
              label: 'Certificates Earned',
              value: certificates.length,
              color: '#e94560',
              bg: '#fff0f3',
            },
          ].map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: kpi.bg }}
              >
                <kpi.icon size={24} color={kpi.color} />
              </div>
              <div>
                <p className="text-3xl font-bold text-[#1a1a2e]">{kpi.value}</p>
                <p className="text-gray-500 text-sm mt-0.5">{kpi.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1a1a2e]">
              My Courses
            </h2>
            <Link
              href="/courses"
              className="text-sm text-[#e94560] font-semibold flex items-center gap-1 hover:gap-2 transition-all"
            >
              Browse More <FiArrowRight />
            </Link>
          </div>

          {enrollments.length === 0 ? (
            <div className="text-center py-12">
              <FiBookOpen size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">
                You have not enrolled in any courses yet.
              </p>
              <Link
                href="/courses"
                className="inline-block mt-4 bg-[#e94560] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrollments.map((enrollment, index) => (
                <motion.div
                  key={enrollment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition"
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={enrollment.course.thumbnail}
                      alt={enrollment.course.title}
                      className="w-full h-36 object-cover"
                    />
                    {enrollment.certificateIssued && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <span className="text-xs font-semibold text-[#e94560] uppercase">
                      {enrollment.course.category}
                    </span>
                    <h3 className="font-bold text-[#1a1a2e] text-sm mt-1 line-clamp-2">
                      {enrollment.course.title}
                    </h3>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span className="font-semibold text-[#1a1a2e]">
                          {enrollment.progressPercent}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-[#e94560] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${enrollment.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <Link
                        href={`/courses/${enrollment.course._id}/learn`}
                        className="flex-1 text-center bg-[#1a1a2e] text-white text-xs font-semibold py-2 rounded-xl hover:bg-[#e94560] transition"
                      >
                        {enrollment.progressPercent === 100
                          ? 'Review'
                          : 'Continue'}
                      </Link>
                      {enrollment.certificateIssued &&
                        enrollment.certificateId && (
                          <Link
                            href={`/certificate/${enrollment.certificateId}`}
                            className="flex-1 text-center border border-green-500 text-green-600 text-xs font-semibold py-2 rounded-xl hover:bg-green-50 transition"
                          >
                            Certificate
                          </Link>
                        )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Certificates Section */}
        {certificates.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">
              My Certificates 🏆
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {certificates.map((enrollment) => (
                <div
                  key={enrollment.certificateId}
                  className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl p-6 text-white"
                >
                  <FiAward size={32} className="text-[#e94560] mb-3" />
                  <h3 className="font-bold text-sm line-clamp-2">
                    {enrollment.course.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1">
                    ID: {enrollment.certificateId}
                  </p>
                  <Link
                    href={`/certificate/${enrollment.certificateId}`}
                    className="inline-block mt-4 bg-[#e94560] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-opacity-90 transition"
                  >
                    View Certificate
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}