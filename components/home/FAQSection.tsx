'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Link from 'next/link';

const faqs = [
  {
    question: 'How do I enroll in a course?',
    answer:
      'Simply browse our course catalog, click on the course you want, and hit the Enroll button. Free courses are instantly accessible. For paid courses, you will be directed to our secure Stripe payment page.',
  },
  {
    question: 'Are the certificates recognized by employers?',
    answer:
      'Our certificates come with a unique verification ID that employers can verify online. Many of our students have successfully used CourseNest certificates to land jobs and promotions at top companies.',
  },
  {
    question: 'Can I access courses on mobile devices?',
    answer:
      'Yes! CourseNest is fully responsive and works seamlessly on all devices — smartphones, tablets, and desktops. Learn anytime, anywhere at your own pace.',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept all major credit and debit cards through our secure Stripe payment gateway. All transactions are encrypted and your payment information is never stored on our servers.',
  },
  {
    question: 'How do I become a teacher on CourseNest?',
    answer:
      'Register for an account and select the Teacher role. Once registered, you can immediately start creating courses from your dashboard. There is no approval process — just create and publish.',
  },
  {
    question: 'What is the Community Q&A feature?',
    answer:
      'The Community Q&A is where students post questions or problems they face while learning. Teachers and mentors respond with detailed answers, and mentor replies are highlighted with a special badge so you know you are getting expert advice.',
  },
  {
    question: 'Can I get a refund if I am not satisfied?',
    answer:
      'We offer a 7-day money-back guarantee on all paid courses. If you are not satisfied with a course, contact our support team within 7 days of purchase and we will process your refund promptly.',
  },
  {
    question: 'How much do teachers earn on CourseNest?',
    answer:
      'Teachers keep 80% of their course revenue. Our top instructors earn thousands of dollars monthly. You set your own price and earn every time a student enrolls in your course.',
  },
];

const FAQItem = ({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`rounded-2xl border-2 transition-all duration-300 ${
        isOpen
          ? 'border-[#e94560] bg-white shadow-md'
          : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span
          className={`font-semibold text-sm sm:text-base pr-4 ${
            isOpen ? 'text-[#e94560]' : 'text-[#1a1a2e]'
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
            isOpen ? 'bg-[#e94560] text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isOpen ? <FiMinus size={16} /> : <FiPlus size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#e94560] font-semibold text-sm uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Everything you need to know about CourseNest
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12 p-8 bg-[#f0f0f0] rounded-2xl"
        >
          <p className="text-gray-600 font-medium">
            Still have questions?
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Our support team is ready to help you
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 bg-[#e94560] text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition text-sm"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;