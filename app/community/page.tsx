'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiSearch, FiPlus, FiEye, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import axiosInstance from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';

interface QAPost {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'open' | 'resolved';
  views: number;
  author: { name: string; avatar: string; role: string };
  createdAt: string;
}

export default function CommunityPage() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<QAPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [search, statusFilter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params: any = { limit: 20 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await axiosInstance.get('/qa', { params });
      setPosts(res.data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#0f3460] to-[#1a1a2e] py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Community <span className="text-[#e94560]">Q&A</span>
          </h1>
          <p className="text-gray-300 mb-8">
            Ask questions, get answers from expert mentors
          </p>
          <div className="flex gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] bg-white shadow-lg"
              />
            </div>
            {isAuthenticated && (
              <Link
                href="/community/ask"
                className="flex items-center gap-2 bg-[#e94560] text-white px-5 py-4 rounded-2xl font-semibold text-sm hover:bg-opacity-90 transition whitespace-nowrap"
              >
                <FiPlus /> Ask Question
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Tabs */}
        <div className="flex gap-3 mb-6">
          {[
            { value: '', label: 'All Questions' },
            { value: 'open', label: 'Open' },
            { value: 'resolved', label: 'Resolved' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                statusFilter === tab.value
                  ? 'bg-[#e94560] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <FiMessageSquare size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400">No questions yet. Be the first to ask!</p>
            {isAuthenticated && (
              <Link
                href="/community/ask"
                className="inline-block mt-4 bg-[#e94560] text-white px-6 py-3 rounded-xl text-sm font-semibold"
              >
                Ask a Question
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/community/${post._id}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {post.status === 'resolved' ? (
                            <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                              <FiCheckCircle size={10} /> Resolved
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-[#e94560] bg-red-50 px-2 py-0.5 rounded-full">
                              Open
                            </span>
                          )}
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-bold text-[#1a1a2e] group-hover:text-[#e94560] transition line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-gray-500">
                          {post.author.name}
                        </span>
                        {post.author.role === 'teacher' && (
                          <span className="text-xs bg-[#0f3460] text-white px-2 py-0.5 rounded-full">
                            Mentor
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <FiEye size={11} /> {post.views}
                        </span>
                        <span>
                          {new Date(post.createdAt).toLocaleDateString('en-GB')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}