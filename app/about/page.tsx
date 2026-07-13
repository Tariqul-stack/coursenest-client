'use client';

import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiZap, FiUsers } from 'react-icons/fi';

const values = [
  {
    icon: FiTarget,
    title: 'Our Mission',
    description:
      'To democratize education by making world-class learning accessible to everyone, regardless of location or background.',
  },
  {
    icon: FiHeart,
    title: 'Our Passion',
    description:
      'We are passionate about connecting curious learners with expert teachers who love sharing their knowledge.',
  },
  {
    icon: FiZap,
    title: 'Our Vision',
    description:
      'A world where anyone can learn anything from the best minds in the world — affordably and effectively.',
  },
  {
    icon: FiUsers,
    title: 'Our Community',
    description:
      'We have built a thriving community of 50,000+ students and 300+ mentors who learn and grow together.',
  },
];

const team = [
  {
    name: 'Alex Morgan',
    role: 'Founder & CEO',
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: 'Former software engineer with 10+ years of experience in EdTech.',
  },
  {
    name: 'Sarah Kim',
    role: 'Head of Content',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Curriculum designer who has helped 100,000+ students learn online.',
  },
  {
    name: 'David Okafor',
    role: 'Lead Engineer',
    avatar: 'https://i.pravatar.cc/150?img=13',
    bio: 'Full-stack developer passionate about building scalable learning platforms.',
  },
  {
    name: 'Mia Chen',
    role: 'Head of Design',
    avatar: 'https://i.pravatar.cc/150?img=14',
    bio: 'UX designer focused on creating intuitive and beautiful learning experiences.',
  },
];

const AboutPage = () => {
  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#e94560] bg-opacity-20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              We Believe Learning
              <span className="text-[#e94560]"> Changes Lives</span>
            </h1>
            <p className="text-gray-300 mt-6 text-lg leading-relaxed max-w-2xl mx-auto">
              CourseNest was founded with a simple idea — great education should
              not be limited to those who can afford expensive universities. We
              built a platform where the best teachers in the world can reach
              anyone, anywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#e94560] font-semibold text-sm uppercase tracking-wider">
              What Drives Us
            </span>
            <h2 className="text-3xl font-bold text-[#1a1a2e] mt-2">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="w-14 h-14 bg-[#fff0f3] rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <value.icon size={24} color="#e94560" />
                </div>
                <h3 className="font-bold text-[#1a1a2e] mb-3">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[#e94560] font-semibold text-sm uppercase tracking-wider">
              The People Behind CourseNest
            </span>
            <h2 className="text-3xl font-bold text-[#1a1a2e] mt-2">
              Meet Our Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#f0f0f0] rounded-2xl p-6 text-center hover:shadow-md transition"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow"
                />
                <h3 className="font-bold text-[#1a1a2e]">{member.name}</h3>
                <p className="text-[#e94560] text-sm font-semibold mt-1">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
<section className="py-20 bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] relative overflow-hidden">
  <div className="absolute top-0 left-0 w-64 h-64 bg-[#e94560] opacity-10 rounded-full blur-3xl" />
  <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0f3460] opacity-30 rounded-full blur-3xl" />
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-12">
      <span className="text-[#e94560] font-semibold text-sm uppercase tracking-wider">
        By The Numbers
      </span>
      <h2 className="text-3xl font-bold text-white mt-2">
        CourseNest in Numbers
      </h2>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { value: '2021', label: 'Year Founded', icon: '🚀' },
        { value: '50K+', label: 'Active Students', icon: '👨‍🎓' },
        { value: '300+', label: 'Expert Mentors', icon: '👨‍🏫' },
        { value: '1,200+', label: 'Courses Available', icon: '📚' },
      ].map((stat) => (
        <div
          key={stat.label}
          className="text-center rounded-2xl p-8"
          style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div className="text-4xl mb-3">{stat.icon}</div>
          <p className="text-4xl font-bold text-[#e94560]">{stat.value}</p>
          <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default AboutPage;