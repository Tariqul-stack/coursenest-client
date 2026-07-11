'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBookOpen, FiAward, FiPlusCircle, FiUpload, FiDollarSign } from 'react-icons/fi';

const studentSteps = [
  {
    icon: FiSearch,
    step: '01',
    title: 'Find a Course',
    description:
      'Browse hundreds of courses by category, level, or instructor. Use filters to find exactly what you need.',
  },
  {
    icon: FiBookOpen,
    step: '02',
    title: 'Enroll & Learn',
    description:
      'Enroll for free or purchase a course. Learn at your own pace with lifetime access to all content.',
  },
  {
    icon: FiAward,
    step: '03',
    title: 'Get Certified',
    description:
      'Complete the course and earn a verified certificate to showcase your new skills to employers.',
  },
];

const teacherSteps = [
  {
    icon: FiPlusCircle,
    step: '01',
    title: 'Create Your Course',
    description:
      'Build your curriculum with modules and lessons. Add videos, set pricing, and define your target audience.',
  },
  {
    icon: FiUpload,
    step: '02',
    title: 'Publish & Share',
    description:
      'Publish your course to thousands of eager learners. Our platform handles payments and delivery.',
  },
  {
    icon: FiDollarSign,
    step: '03',
    title: 'Earn & Grow',
    description:
      'Get paid for every enrollment. Track your earnings and student progress from your dashboard.',
  },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const steps = activeTab === 'student' ? studentSteps : teacherSteps;

  return (
    <section className="py-20 bg-[#f0f0f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-[#e94560] font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mt-2">
            How It Works
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Whether you are here to learn or teach, getting started is easy
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-1.5 flex gap-2 shadow-sm">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'student'
                  ? 'bg-[#e94560] text-white shadow'
                  : 'text-gray-500 hover:text-[#1a1a2e]'
              }`}
            >
              For Students
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === 'teacher'
                  ? 'bg-[#0f3460] text-white shadow'
                  : 'text-gray-500 hover:text-[#1a1a2e]'
              }`}
            >
              For Teachers
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gray-200 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative z-10 bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
            >
              {/* Step Number */}
              <span className="text-xs font-bold text-gray-300 tracking-widest">
                STEP {step.step}
              </span>

              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mt-3 mb-5 ${
                  activeTab === 'student'
                    ? 'bg-[#e94560]'
                    : 'bg-[#0f3460]'
                }`}
              >
                <step.icon size={28} color="white" />
              </div>

              <h3 className="text-lg font-bold text-[#1a1a2e]">
                {step.title}
              </h3>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;