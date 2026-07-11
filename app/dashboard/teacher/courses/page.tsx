'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiPlus, FiEye, FiEdit, FiTrash2,
  FiToggleLeft, FiToggleRight, FiArrowLeft,
} from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import { ICourse } from '@/types';

export default function ManageCoursesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'teacher' && user.role !== 'admin') {
      router.push('/unauthorized');
      return;
    }
    fetchCourses();
  }, [user, loading]);

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get('/courses/my-courses');
      setCourses(res.data.courses);
    } catch {
      toast.error('Failed to fetch courses');
    } finally {
      setFetching(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await axiosInstance.delete(`/courses/${id}`);
      setCourses(courses.filter((c) => c._id !== id));
      toast.success('Course deleted');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Delete failed');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/courses/${id}/status`);
      setCourses(courses.map((c) =>
        c._id === id ? { ...c, status: res.data.course.status } : c
      ));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#f0f0f0] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/teacher"
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"
            >
              <FiArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a2e]">
                Manage Courses
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {courses.length} courses total
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/teacher/courses/add"
            className="flex items-center gap-2 bg-[#e94560] text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-opacity-90 transition"
          >
            <FiPlus /> New Course
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {courses.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 mb-4">
                No courses yet. Create your first course!
              </p>
              <Link
                href="/dashboard/teacher/courses/add"
                className="bg-[#e94560] text-white px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Create Course
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Course', 'Category', 'Level', 'Price', 'Students', 'Rating', 'Status', 'Actions'].map((h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-semibold text-gray-400 uppercase px-6 py-4"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {courses.map((course, index) => (
                    <motion.tr
                      key={course._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition"
                    >
                      {/* Course */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-14 h-10 rounded-xl object-cover shrink-0"
                          />
                          <p className="font-semibold text-[#1a1a2e] text-sm line-clamp-2 max-w-48">
                            {course.title}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {course.category}
                        </span>
                      </td>

                      {/* Level */}
                      <td className="px-6 py-4">
                        <span className="text-xs text-gray-600">
                          {course.level}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-[#1a1a2e] text-sm">
                          {course.isFree ? 'Free' : `$${course.price}`}
                        </span>
                      </td>

                      {/* Students */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {course.totalEnrollments}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {course.averageRating > 0
                            ? `${course.averageRating.toFixed(1)} ★`
                            : 'No ratings'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            course.status === 'published'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-yellow-100 text-yellow-600'
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/courses/${course._id}`}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#0f3460] hover:text-white transition"
                            title="View"
                          >
                            <FiEye size={14} />
                          </Link>
                          <Link
                            href={`/dashboard/teacher/courses/${course._id}/edit`}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#e94560] hover:text-white transition"
                            title="Edit"
                          >
                            <FiEdit size={14} />
                          </Link>
                          <button
                            onClick={() => handleToggle(course._id)}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#0f3460] hover:text-white transition"
                            title={course.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {course.status === 'published'
                              ? <FiToggleRight size={14} />
                              : <FiToggleLeft size={14} />}
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                            title="Delete"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}