'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiStar, FiUsers, FiBookOpen, FiArrowLeft } from 'react-icons/fi';
import axiosInstance from '@/lib/axios';
import { ICourse } from '@/types';
import CourseCard from '@/components/courses/CourseCard';
import CourseCardSkeleton from '@/components/courses/CourseCardSkeleton';

interface InstructorData {
  _id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export default function InstructorProfilePage() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState<InstructorData | null>(null);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/courses?instructorId=${id}&limit=20`);
        setCourses(res.data.courses);
        if (res.data.courses.length > 0) {
          const instr = res.data.courses[0].instructor;
          if (typeof instr === 'object') setInstructor(instr as InstructorData);
        }
      } catch (error) {
        console.error('Failed to fetch instructor data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const totalStudents = courses.reduce((acc, c) => acc + c.totalEnrollments, 0);
  const avgRating =
    courses.length > 0
      ? (courses.reduce((acc, c) => acc + c.averageRating, 0) / courses.length).toFixed(1)
      : '0';

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition"
          >
            <FiArrowLeft /> Back to Courses
          </Link>

          {loading ? (
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-700 rounded-full animate-pulse" />
              <div>
                <div className="h-6 bg-gray-700 rounded w-48 mb-3 animate-pulse" />
                <div className="h-4 bg-gray-700 rounded w-64 animate-pulse" />
              </div>
            </div>
          ) : instructor ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#e94560]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">
                    {instructor.name}
                  </h1>
                  <span className="bg-[#e94560] text-white text-xs font-bold px-3 py-1 rounded-full">
                    Mentor
                  </span>
                </div>
                {instructor.bio && (
                  <p className="text-gray-300 max-w-2xl">{instructor.bio}</p>
                )}

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <FiBookOpen size={16} className="text-[#e94560]" />
                    <span>{courses.length} Courses</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <FiUsers size={16} className="text-[#e94560]" />
                    <span>{totalStudents.toLocaleString()} Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <FiStar size={16} className="text-yellow-400" />
                    <span>{avgRating} Avg Rating</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <p className="text-gray-400">Instructor not found</p>
          )}
        </div>
      </div>

      {/* Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[#1a1a2e] mb-8">
          Courses by {instructor?.name || 'Instructor'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? [...Array(4)].map((_, i) => <CourseCardSkeleton key={i} />)
            : courses.length > 0
            ? courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))
            : (
              <div className="col-span-4 text-center py-16">
                <p className="text-gray-400">
                  No published courses yet.
                </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}