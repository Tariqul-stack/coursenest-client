'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiAward, FiDownload, FiShare2 } from 'react-icons/fi';
import axiosInstance from '@/lib/axios';

interface CertificateData {
  studentName: string;
  courseTitle: string;
  instructorName: string;
  certificateId: string;
  completedAt: string;
}

export default function CertificatePage() {
  const { id } = useParams();
  const [data, setData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await axiosInstance.get(`/enrollments/certificate/${id}`);
        setData(res.data.certificate);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#e94560]">404</h1>
          <p className="text-gray-500 mt-2">Certificate not found</p>
          <Link
            href="/"
            className="inline-block mt-4 bg-[#e94560] text-white px-6 py-3 rounded-xl font-semibold text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Actions */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold hover:border-[#e94560] hover:text-[#e94560] transition"
          >
            <FiDownload size={14} /> Download
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied!');
            }}
            className="flex items-center gap-2 bg-[#e94560] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition"
          >
            <FiShare2 size={14} /> Share
          </button>
        </div>

        {/* Certificate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden print:shadow-none"
          id="certificate"
        >
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] py-8 px-12 text-center">
            <Link href="/" className="text-3xl font-bold text-[#e94560]">
              Course<span className="text-white">Nest</span>
            </Link>
            <p className="text-gray-400 text-sm mt-1">
              Learn anything. Teach everything.
            </p>
          </div>

          {/* Certificate Body */}
          <div className="px-12 py-14 text-center border-8 border-[#f0f0f0] mx-6 my-8 rounded-2xl relative">
            {/* Corner Decorations */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-[#e94560] rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-[#e94560] rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-[#e94560] rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-[#e94560] rounded-br-lg" />

            {/* Award Icon */}
            <div className="w-20 h-20 bg-[#fff0f3] rounded-full flex items-center justify-center mx-auto mb-6">
              <FiAward size={40} color="#e94560" />
            </div>

            <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">
              Certificate of Completion
            </p>
            <p className="text-gray-500 text-base mb-6">
              This is to certify that
            </p>

            <h1 className="text-4xl font-bold text-[#1a1a2e] mb-6 font-serif">
              {data?.studentName}
            </h1>

            <p className="text-gray-500 text-base mb-3">
              has successfully completed the course
            </p>

            <h2 className="text-2xl font-bold text-[#0f3460] mb-8 max-w-lg mx-auto">
              {data?.courseTitle}
            </h2>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="w-3 h-3 bg-[#e94560] rounded-full" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Footer Info */}
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Instructor
                </p>
                <p className="font-bold text-[#1a1a2e] text-sm">
                  {data?.instructorName}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Date Issued
                </p>
                <p className="font-bold text-[#1a1a2e] text-sm">
                  {data?.completedAt
                    ? new Date(data.completedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })
                    : ''}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Certificate ID
                </p>
                <p className="font-bold text-[#e94560] text-sm">
                  {data?.certificateId}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="bg-[#f0f0f0] px-12 py-4 text-center">
            <p className="text-xs text-gray-400">
              Verify this certificate at{' '}
              <span className="text-[#e94560] font-semibold">
                coursenest.com/certificate/{data?.certificateId}
              </span>
            </p>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/dashboard/student"
            className="text-sm text-gray-500 hover:text-[#e94560] transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}