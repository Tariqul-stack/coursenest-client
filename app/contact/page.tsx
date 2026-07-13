'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiMail, FiMapPin, FiPhone, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const contactInfo = [
  { icon: FiMapPin, title: 'Our Office', details: '123 Learning Street, Dhaka, Bangladesh' },
  { icon: FiMail, title: 'Email Us', details: 'support@coursenest.com' },
  { icon: FiPhone, title: 'Call Us', details: '+880 1234 567890' },
];

const socials = [
  { icon: FaFacebookF, href: 'https://facebook.com' },
  { icon: FaTwitter, href: 'https://twitter.com' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com' },
  { icon: FaYoutube, href: 'https://youtube.com' },
];

const hours = [
  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', time: 'Closed' },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-[#e94560] text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            Get In Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              We Would Love to <span className="text-[#e94560]">Hear From You</span>
            </h1>
            <p className="text-gray-300 mt-5 text-lg max-w-2xl mx-auto">
              Have a question or suggestion? Our support team is ready to help you.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-[#fff0f3] rounded-xl flex items-center justify-center shrink-0">
                    <info.icon size={20} color="#e94560" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a2e] text-sm">{info.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{info.details}</p>
                  </div>
                </motion.div>
              ))}

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[#1a1a2e] mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socials.map((s, idx) => (
                    <a key={idx} href={s.href} target="_blank" rel="noreferrer"
                      className="w-10 h-10 bg-[#f0f0f0] rounded-xl flex items-center justify-center hover:bg-[#e94560] hover:text-white text-gray-500 transition">
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-[#1a1a2e] rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Support Hours</h3>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex justify-between text-sm">
                      <span className="text-gray-400">{h.day}</span>
                      <span className="text-[#e94560] font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm"
            >
              <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Send Us a Message</h2>
              <p className="text-gray-400 text-sm mb-8">We will get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Full Name *</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Email Address *</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Subject</label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    placeholder="Tell us more about your query..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] resize-none" />
                </div>

                <button type="submit" disabled={loading}
                  className="flex items-center justify-center gap-2 w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition disabled:opacity-60">
                  {loading ? 'Sending...' : <><FiSend size={16} /> Send Message</>}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}