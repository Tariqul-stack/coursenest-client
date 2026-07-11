'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';

export default function AskQuestionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
  });

  useEffect(() => {
    if (loading) return;
    if (!user) router.push('/login');
  }, [user, loading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error('Please fill all required fields');
      return;
    }
    try {
      setSubmitting(true);
      const res = await axiosInstance.post('/qa', formData);
      toast.success('Question posted successfully!');
      router.push(`/community/${res.data.post._id}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to post question');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/community"
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm"
          >
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">
              Ask a Question
            </h1>
            <p className="text-gray-500 text-sm">
              Get help from our expert mentors
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Question Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. How do I center a div in CSS?"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Describe your problem *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                placeholder="Explain your problem in detail. Include what you have tried so far..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="e.g. react, css, javascript"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-3 bg-[#0f3460] text-white rounded-xl text-sm font-semibold"
                >
                  Add
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 bg-[#f0f0f0] text-gray-600 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-400 hover:text-red-500 ml-1"
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#e94560] text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition disabled:opacity-60"
            >
              {submitting ? 'Posting...' : 'Post Question'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}