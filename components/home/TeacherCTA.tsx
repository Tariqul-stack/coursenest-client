'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiDollarSign, FiUsers, FiBarChart2, FiArrowRight } from 'react-icons/fi';

const benefits = [
  {
    icon: FiDollarSign,
    title: 'Set Your Own Price',
    description: 'You decide what your knowledge is worth. Free or paid — your choice.',
  },
  {
    icon: FiUsers,
    title: 'Reach Thousands',
    description: 'Access our growing community of 50,000+ eager learners worldwide.',
  },
  {
    icon: FiBarChart2,
    title: 'Track Your Growth',
    description: 'Full analytics dashboard — enrollments, revenue, and student progress.',
  },
];

const TeacherCTA = () => {
  return (
    <section className="py-20 bg-[#f0f0f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] rounded-3xl p-10 sm:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e94560] opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0f3460] opacity-20 rounded-full blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="inline-block bg-[#e94560] text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                For Educators
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Share Your Knowledge.{' '}
                <span className="text-[#e94560]">Earn While You Teach.</span>
              </h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                Join 300+ expert mentors already earning on CourseNest. Create
                your first course today and start building your passive income stream.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-[#e94560] text-white px-8 py-4 rounded-xl font-semibold hover:bg-opacity-90 transition mt-8"
              >
                Start Teaching Today <FiArrowRight />
              </Link>
            </div>

            {/* Right — Benefits */}
            <div className="flex flex-col gap-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  className="flex items-center gap-4 rounded-2xl p-5"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#e94560]">
                    <benefit.icon size={22} color="white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{benefit.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeacherCTA;