import Link from 'next/link';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-[#e94560]">
              Course<span className="text-white">Nest</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Learn anything. Teach everything. The platform where knowledge meets opportunity.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-[#0f3460] rounded-full flex items-center justify-center hover:bg-[#e94560] transition">
                <FaFacebookF size={14} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-[#0f3460] rounded-full flex items-center justify-center hover:bg-[#e94560] transition">
                <FaTwitter size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-[#0f3460] rounded-full flex items-center justify-center hover:bg-[#e94560] transition">
                <FaLinkedinIn size={14} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 bg-[#0f3460] rounded-full flex items-center justify-center hover:bg-[#e94560] transition">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/courses', label: 'Browse Courses' },
                { href: '/community', label: 'Community Q&A' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#e94560] transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Top Categories</h3>
            <ul className="space-y-2">
              {['Web Development', 'UI/UX Design', 'Data Science', 'Digital Marketing', 'Mobile Development', 'Cybersecurity'].map((cat) => (
                <li key={cat}>
                  <Link href={`/courses?category=${cat}`} className="text-sm text-gray-400 hover:text-[#e94560] transition">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="mt-0.5 text-[#e94560] shrink-0" />
                123 Learning Street, Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="text-[#e94560] shrink-0" />
                +880 1234 567890
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="text-[#e94560] shrink-0" />
                support@coursenest.com
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CourseNest. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#e94560] transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-[#e94560] transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;