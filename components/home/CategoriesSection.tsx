'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiCode,
  FiLayout,
  FiDatabase,
  FiTrendingUp,
  FiSmartphone,
  FiShield,
  FiBriefcase,
  FiCamera,
} from 'react-icons/fi';

const categories = [
  {
    icon: FiCode,
    name: 'Web Development',
    courses: 42,
    color: '#e94560',
    bg: '#fff0f3',
  },
  {
    icon: FiLayout,
    name: 'UI/UX Design',
    courses: 28,
    color: '#0f3460',
    bg: '#f0f4ff',
  },
  {
    icon: FiDatabase,
    name: 'Data Science',
    courses: 35,
    color: '#e94560',
    bg: '#fff0f3',
  },
  {
    icon: FiTrendingUp,
    name: 'Digital Marketing',
    courses: 19,
    color: '#0f3460',
    bg: '#f0f4ff',
  },
  {
    icon: FiSmartphone,
    name: 'Mobile Development',
    courses: 24,
    color: '#e94560',
    bg: '#fff0f3',
  },
  {
    icon: FiShield,
    name: 'Cybersecurity',
    courses: 16,
    color: '#0f3460',
    bg: '#f0f4ff',
  },
  {
    icon: FiBriefcase,
    name: 'Business',
    courses: 31,
    color: '#e94560',
    bg: '#fff0f3',
  },
  {
    icon: FiCamera,
    name: 'Photography',
    courses: 14,
    color: '#0f3460',
    bg: '#f0f4ff',
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#e94560] font-semibold text-sm uppercase tracking-wider">
            What do you want to learn?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mt-2">
            Explore by Category
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Choose from hundreds of courses across our most popular categories
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link
                href={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-transparent hover:border-[#e94560] transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: cat.bg }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: cat.color }}
                >
                  <cat.icon size={24} color="white" />
                </div>
                <h3 className="font-semibold text-[#1a1a2e] text-sm">
                  {cat.name}
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  {cat.courses} Courses
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;