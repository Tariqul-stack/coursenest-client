'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FiBookOpen, FiUsers, FiDollarSign,
  FiStar, FiArrowRight, FiPlus, FiEye,
  FiEdit, FiTrash2, FiToggleLeft, FiToggleRight,
} from 'react-icons/fi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import { ICourse } from '@/types';
import toast from 'react-hot-toast';

const monthlyData = [
  { month: 'Jan', revenue: 0 },
  { month: 'Feb', revenue: 0 },
  { month: 'Mar', revenue: 0 },
  { month: 'Apr', revenue: 0 },
  { month: 'May', revenue: 0 },
  { month: 'Jun', revenue: 0 },
  { month: 'Jul', revenue: 0 },
  { month: 'Aug', revenue: 0 },
  { month: 'Sep', revenue: 0 },
  { month: 'Oct', revenue: 0 },
  { month: 'Nov', revenue: 0 },
  { month: 'Dec', revenue: 0 },
];

export default function TeacherDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push('/login');
      return;
    }
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
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await axiosInstance.delete(`/courses/${id}`);
      toast.success('Course deleted successfully');
      setCourses(courses.filter((c) => c._id !== id));
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Delete failed');
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const res = await axiosInstance.patch(`/courses/${id}/status`);
      setCourses(
        courses.map((c) =>
          c._id === id ? { ...c, status: res.data.course.status } : c
        )
      );
      toast.success('Course status updated');
    } catch (error: any) {
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

  const totalEnrollments = courses.reduce(
    (acc, c) => acc + c.totalEnrollments, 0
  );
  const publishedCourses = courses.filter((c) => c.status === 'published');
  const avgRating =
    courses.length > 0
      ? (
          courses.reduce((acc, c) => acc + c.averageRating, 0) / courses.length
        ).toFixed(1)
      : '0.0';

  return (
    <div className="bg-[#f0f0f0] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">
              Teacher Dashboard 👨‍🏫
            </h1>
            <p className="text-gray-500 mt-1">
              Welcome back, {user?.name}!
            </p>
          </div>
          <Link
            href="/dashboard/teacher/courses/add"
            className="flex items-center gap-2 bg-[#e94560] text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-opacity-90 transition"
          >
            <FiPlus /> New Course
          </Link>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            {
              icon: FiBookOpen,
              label: 'Total Courses',
              value: courses.length,
              color: '#e94560',
              bg: '#fff0f3',
            },
            {
              icon: FiEye,
              label: 'Published',
              value: publishedCourses.length,
              color: '#0f3460',
              bg: '#f0f4ff',
            },
            {
              icon: FiUsers,
              label: 'Total Students',
              value: totalEnrollments,
              color: '#e94560',
              bg: '#fff0f3',
            },
            {
              icon: FiStar,
              label: 'Avg Rating',
              value: avgRating,
              color: '#0f3460',
              bg: '#f0f4ff',
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
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: kpi.bg }}
              >
                <kpi.icon size={22} color={kpi.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a2e]">
                  {kpi.value}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{kpi.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1a1a2e]">
              Monthly Revenue
            </h2>
            <span className="text-sm text-gray-400">
              {new Date().getFullYear()}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
              <Bar
                dataKey="revenue"
                fill="#e94560"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* My Courses Table */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#1a1a2e]">My Courses</h2>
            <Link
              href="/dashboard/teacher/courses"
              className="text-sm text-[#e94560] font-semibold flex items-center gap-1"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12">
              <FiBookOpen size={40} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">
                You have not created any courses yet.
              </p>
              <Link
                href="/dashboard/teacher/courses/add"
                className="inline-block mt-4 bg-[#e94560] text-white px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Create First Course
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase pb-3">
                      Course
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase pb-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase pb-3">
                      Students
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase pb-3">
                      Price
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-400 uppercase pb-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {courses.slice(0, 5).map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50 transition">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-12 h-10 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-semibold text-[#1a1a2e] text-sm line-clamp-1">
                              {course.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {course.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
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
                      <td className="py-4">
                        <span className="text-sm text-gray-600">
                          {course.totalEnrollments}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="text-sm font-semibold text-[#1a1a2e]">
                          {course.isFree ? 'Free' : `$${course.price}`}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/courses/${course._id}`}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#0f3460] hover:text-white transition"
                          >
                            <FiEye size={14} />
                          </Link>
                          <Link
                            href={`/dashboard/teacher/courses/${course._id}/edit`}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#e94560] hover:text-white transition"
                          >
                            <FiEdit size={14} />
                          </Link>
                          <button
                            onClick={() => handleToggleStatus(course._id)}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#0f3460] hover:text-white transition"
                            title={
                              course.status === 'published'
                                ? 'Unpublish'
                                : 'Publish'
                            }
                          >
                            {course.status === 'published' ? (
                              <FiToggleRight size={14} />
                            ) : (
                              <FiToggleLeft size={14} />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(course._id)}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
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