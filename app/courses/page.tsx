'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import axiosInstance from '@/lib/axios';
import { ICourse } from '@/types';
import CourseCard from '@/components/courses/CourseCard';
import CourseCardSkeleton from '@/components/courses/CourseCardSkeleton';

const categories = [
  'All',
  'Web Development',
  'UI/UX Design',
  'Data Science',
  'Digital Marketing',
  'Mobile Development',
  'Cybersecurity',
  'Business',
  'Photography',
];

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
];

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: '',
    category: searchParams.get('category') || 'All',
    level: 'All',
    sort: 'newest',
    minPrice: '',
    maxPrice: '',
  });

  const fetchCourses = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params: any = {
        page,
        limit: 8,
        sort: filters.sort,
      };
      if (filters.search) params.search = filters.search;
      if (filters.category !== 'All') params.category = filters.category;
      if (filters.level !== 'All') params.level = filters.level;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;

      const res = await axiosInstance.get('/courses', { params });
      setCourses(res.data.courses);
      setTotalPages(res.data.pagination.pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCourses(1);
  }, [fetchCourses]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      level: 'All',
      sort: 'newest',
      minPrice: '',
      maxPrice: '',
    });
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.level !== 'All' ||
    filters.search !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '';

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Browse <span className="text-[#e94560]">All Courses</span>
          </h1>
          <p className="text-gray-300 mb-8">
            Explore 1,200+ courses from expert instructors
          </p>
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search courses, topics, or instructors..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] bg-white shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#1a1a2e]">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#e94560] font-semibold flex items-center gap-1"
                  >
                    <FiX size={12} /> Clear All
                  </button>
                )}
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Category
                </h4>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange('category', cat)}
                      className={`text-left text-sm px-3 py-2 rounded-xl transition ${
                        filters.category === cat
                          ? 'bg-[#e94560] text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Level
                </h4>
                <div className="flex flex-col gap-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => handleFilterChange('level', level)}
                      className={`text-left text-sm px-3 py-2 rounded-xl transition ${
                        filters.level === level
                          ? 'bg-[#0f3460] text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Price Range (USD)
                </h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange('minPrice', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange('maxPrice', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm"
                >
                  <FiFilter size={14} /> Filters
                </button>
                <p className="text-gray-500 text-sm">
                  {loading ? 'Loading...' : `${courses.length} courses found`}
                </p>
              </div>

              {/* Sort */}
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] shadow-sm"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading
                ? [...Array(6)].map((_, i) => <CourseCardSkeleton key={i} />)
                : courses.length > 0
                ? courses.map((course, index) => (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CourseCard course={course} />
                    </motion.div>
                  ))
                : (
                  <div className="col-span-3 text-center py-20">
                    <p className="text-gray-400 text-lg">
                      No courses found matching your filters.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 bg-[#e94560] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => fetchCourses(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium disabled:opacity-40 hover:border-[#e94560] transition"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => fetchCourses(i + 1)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold transition ${
                      currentPage === i + 1
                        ? 'bg-[#e94560] text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-[#e94560]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => fetchCourses(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium disabled:opacity-40 hover:border-[#e94560] transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}