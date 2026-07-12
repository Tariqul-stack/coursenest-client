'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Student',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'CourseNest completely changed my career. I went from knowing nothing about web development to landing a full-stack developer job in just 6 months. The mentors are incredibly supportive.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Teacher',
    avatar: 'https://i.pravatar.cc/150?img=3',
    rating: 5,
    text: 'As an instructor, CourseNest gives me all the tools I need to create engaging courses. The analytics dashboard helps me understand my students and improve my content continuously.',
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Student',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'The community Q&A feature is what sets CourseNest apart. Whenever I get stuck, a mentor responds within hours. It feels like having a personal tutor available 24/7.',
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Teacher',
    avatar: 'https://i.pravatar.cc/150?img=7',
    rating: 5,
    text: 'I have been teaching on multiple platforms but CourseNest offers the best revenue sharing and the most engaged student community. My courses consistently get 5-star reviews.',
  },
  {
    id: 5,
    name: 'Emily Davis',
    role: 'Student',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    text: 'I earned three certificates on CourseNest and each one helped me negotiate a higher salary. The courses are practical, up-to-date, and taught by real industry professionals.',
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const getVisible = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      indices.push((current + i + testimonials.length) % testimonials.length);
    }
    return indices;
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#e94560] font-semibold text-sm uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mt-2">
            What Our Learners Say
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Thousands of students and teachers love CourseNest
          </p>
        </motion.div>

        {/* Desktop — 3 cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {getVisible().map((idx, position) => (
            <motion.div
              key={testimonials[idx].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
             className={`rounded-2xl p-8 flex flex-col gap-4 transition-all duration-300 ${
  position === 1
    ? 'scale-105 shadow-xl bg-[#1a1a2e] text-white'
    : 'bg-[#f0f0f0] shadow-sm'
}`}
            >
              {/* Stars */}
              <div className="flex gap-1">
            {[...Array(testimonials[idx].rating)].map((_, i) => (
          <FaStar
      key={i}
      size={14}
      color={position === 1 ? '#e94560' : '#f59e0b'}
    />
  ))}
</div>

              {/* Text */}
              <p className={`text-sm leading-relaxed flex-1 ${
            position === 1 ? 'text-gray-300' : 'text-gray-600'
            }`}>
                {testimonials[idx].text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200 border-opacity-20">
                <img
                  src={testimonials[idx].avatar}
                  alt={testimonials[idx].name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p
                    className={`font-semibold text-sm ${
                      position === 1 ? 'text-white' : 'text-[#1a1a2e]'
                    }`}
                  >
                    {testimonials[idx].name}
                  </p>
                  <p
                    className={`text-xs ${
                      position === 1 ? 'text-[#e94560]' : 'text-gray-400'
                    }`}
                  >
                    {testimonials[idx].role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile — single card */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1a1a2e] rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <FaStar key={i} size={14} color="#e94560" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {testimonials[current].text}
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-700">
                <img
                  src={testimonials[current].avatar}
                  alt={testimonials[current].name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-sm text-white">
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs text-[#e94560]">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#e94560] hover:text-[#e94560] transition"
          >
            <FiChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === current
                    ? 'w-6 h-2.5 bg-[#e94560]'
                    : 'w-2.5 h-2.5 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#e94560] hover:text-[#e94560] transition"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;