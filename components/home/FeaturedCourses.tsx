'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import axiosInstance from '@/lib/axios';
import { ICourse } from '@/types';
import CourseCard from '@/components/courses/CourseCard';
import CourseCardSkeleton from '@/components/courses/CourseCardSkeleton';

const FeaturedCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosInstance.get('/courses?limit=8&sort=popular');
        setCourses(res.data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <section className="py-20 bg-[#f0f0f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="text-[#e94560] font-semibold text-sm uppercase tracking-wider">
              Hand-picked for you
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mt-2">
              Top Rated Courses
            </h2>
            <p className="text-gray-500 mt-2">
              Learn from the best instructors in their fields
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2 text-[#e94560] font-semibold hover:gap-3 transition-all text-sm shrink-0"
          >
            Browse All Courses <FiArrowRight />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? [...Array(8)].map((_, i) => <CourseCardSkeleton key={i} />)
            : courses.length > 0
            ? courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))
            : (
              <div className="col-span-4 text-center py-16">
                <p className="text-gray-400 text-lg">
                  No courses available yet. Check back soon!
                </p>
                <Link
                  href="/dashboard/teacher/courses/add"
                  className="inline-block mt-4 bg-[#e94560] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-opacity-90 transition"
                >
                  Add First Course
                </Link>
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;