'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiUsers, FiBookOpen, FiAward, FiDollarSign } from 'react-icons/fi';

const stats = [
  {
    icon: FiUsers,
    value: 50000,
    suffix: '+',
    label: 'Active Students',
    color: '#e94560',
  },
  {
    icon: FiBookOpen,
    value: 1200,
    suffix: '+',
    label: 'Courses Available',
    color: '#ffffff',
  },
  {
    icon: FiAward,
    value: 300,
    suffix: '+',
    label: 'Expert Mentors',
    color: '#e94560',
  },
  {
    icon: FiDollarSign,
    value: 2,
    suffix: 'M+ Earned',
    label: 'By Our Teachers',
    color: '#ffffff',
  },
];

const CountUp = ({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [start, value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e]"
    >
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
            Our Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Platform Statistics
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Numbers that speak for themselves
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10 rounded-2xl p-8 text-center hover:bg-opacity-10 transition"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: stat.color + '20' }}
              >
                <stat.icon size={26} color={stat.color} />
              </div>

              {/* Count */}
              <p className="text-4xl font-bold text-white">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  start={isInView}
                />
              </p>

              {/* Label */}
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;