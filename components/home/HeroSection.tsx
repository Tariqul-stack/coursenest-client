'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

const stats = [
  { value: '50K+', label: 'Active Students' },
  { value: '1,200+', label: 'Courses' },
  { value: '300+', label: 'Expert Mentors' },
  { value: '4.8★', label: 'Avg Rating' },
];

const floatingCards = [
  { title: 'Web Development', students: '12,400 students', color: '#e94560' },
  { title: 'UI/UX Design', students: '8,200 students', color: '#0f3460' },
  { title: 'Data Science', students: '9,800 students', color: '#1a1a2e' },
];

const HeroSection = () => {
  return (
    <section className="min-h-[70vh] bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] flex flex-col justify-center relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#e94560] opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#0f3460] opacity-20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-[#e94560] bg-opacity-20 text-[#e94560] text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              🚀 The Future of Online Learning
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Learn Without
              <span className="text-[#e94560]"> Limits</span>
            </h1>
            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              Discover world-class courses from expert mentors. Learn at your
              own pace, get certified, and transform your career today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/courses"
                className="flex items-center gap-2 bg-[#e94560] text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition"
              >
                Browse Courses <FiArrowRight />
              </Link>
              <Link
                href="/register?role=teacher"
                className="flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#1a1a2e] transition"
              >
                <FiPlay size={16} /> Become a Teacher
              </Link>
            </div>
          </motion.div>

          {/* Right — Floating Cards */}
          <div className="hidden lg:flex flex-col gap-4 items-end">
            {floatingCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="animate-float bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-5 w-72"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div
                  className="w-10 h-10 rounded-xl mb-3"
                  style={{ backgroundColor: card.color }}
                />
                <h3 className="text-white font-semibold">{card.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{card.students}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white border-opacity-10"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-[#e94560]">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div className="w-px h-8 bg-white opacity-30" />
        <div className="w-2 h-2 bg-[#e94560] rounded-full animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;