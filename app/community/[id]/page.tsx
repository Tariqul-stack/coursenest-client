'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiEye, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import axiosInstance from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';

interface QAPost {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'open' | 'resolved';
  views: number;
  author: { _id: string; name: string; avatar: string; role: string };
  createdAt: string;
}

interface QAAnswer {
  _id: string;
  content: string;
  authorRole: string;
  isAccepted: boolean;
  author: { _id: string; name: string; avatar: string; role: string };
  createdAt: string;
}

export default function QADetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState<QAPost | null>(null);
  const [answers, setAnswers] = useState<QAAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axiosInstance.get(`/qa/${id}`);
      setPost(res.data.post);
      setAnswers(res.data.answers);
    } catch {
      toast.error('Post not found');
      router.push('/community');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) { toast.error('Please login'); return; }
    if (!answer.trim()) { toast.error('Answer cannot be empty'); return; }
    try {
      setSubmitting(true);
      const res = await axiosInstance.post(`/qa/${id}/answers`, { content: answer });
      setAnswers([...answers, res.data.answer]);
      setAnswer('');
      toast.success('Answer posted!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to post answer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAccept = async (answerId: string) => {
    try {
      await axiosInstance.patch(`/qa/${id}/answers/${answerId}/accept`);
      setAnswers(answers.map((a) => ({ ...a, isAccepted: a._id === answerId })));
      if (post) setPost({ ...post, status: 'resolved' });
      toast.success('Answer marked as accepted!');
    } catch {
      toast.error('Failed to accept answer');
    }
  };

  const handleDeleteAnswer = async (answerId: string) => {
    try {
      await axiosInstance.delete(`/qa/${id}/answers/${answerId}`);
      setAnswers(answers.filter((a) => a._id !== answerId));
      toast.success('Answer deleted');
    } catch {
      toast.error('Failed to delete answer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="bg-[#f0f0f0] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1a1a2e] text-sm mb-6 transition"
        >
          <FiArrowLeft /> Back to Community
        </Link>

        {/* Post */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex flex-wrap gap-2">
              {post.status === 'resolved' ? (
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  <FiCheckCircle size={12} /> Resolved
                </span>
              ) : (
                <span className="text-xs font-semibold text-[#e94560] bg-red-50 px-3 py-1 rounded-full">
                  Open
                </span>
              )}
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
              <FiEye size={12} /> {post.views} views
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#1a1a2e] mb-4">
            {post.title}
          </h1>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {post.description}
          </p>

          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-[#1a1a2e] text-sm">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>
        </div>

        {/* Answers */}
        <h2 className="text-lg font-bold text-[#1a1a2e] mb-4">
          {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
        </h2>

        <div className="space-y-4 mb-8">
          {answers.map((ans, index) => (
            <motion.div
              key={ans._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-6 shadow-sm border-2 ${
                ans.isAccepted ? 'border-green-400' : 'border-transparent'
              }`}
            >
              {ans.isAccepted && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-semibold mb-3">
                  <FiCheckCircle /> Accepted Answer
                </div>
              )}
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {ans.content}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={ans.author.avatar}
                    alt={ans.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#1a1a2e] text-sm">
                        {ans.author.name}
                      </p>
                      {(ans.authorRole === 'teacher' || ans.authorRole === 'admin') && (
                        <span className="text-xs bg-[#0f3460] text-white px-2 py-0.5 rounded-full">
                          Mentor
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(ans.createdAt).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {user && post.author._id === user._id && !ans.isAccepted && (
                    <button
                      onClick={() => handleAccept(ans._id)}
                      className="text-xs bg-green-100 text-green-600 px-3 py-1.5 rounded-xl font-semibold hover:bg-green-200 transition"
                    >
                      Accept
                    </button>
                  )}
                  {user && (ans.author._id === user._id || user.role === 'admin') && (
                    <button
                      onClick={() => handleDeleteAnswer(ans._id)}
                      className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Answer Form */}
        {isAuthenticated ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#1a1a2e] mb-4">
              Your Answer
            </h3>
            <form onSubmit={handleAnswer} className="space-y-4">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={6}
                placeholder="Write a detailed answer to help the student..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] resize-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#e94560] text-white px-8 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
              >
                {submitting ? 'Posting...' : 'Post Answer'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
            <p className="text-gray-500 mb-4">
              Please login to post an answer
            </p>
            <Link
              href="/login"
              className="bg-[#e94560] text-white px-6 py-3 rounded-xl font-semibold text-sm"
            >
              Login to Answer
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}