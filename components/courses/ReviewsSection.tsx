'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiStar, FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import axiosInstance from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';

interface Review {
  _id: string;
  rating: number;
  comment: string;
  student: { _id: string; name: string; avatar: string };
  createdAt: string;
}

const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange?: (val: number) => void;
}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? 'cursor-pointer' : 'cursor-default'}
        >
          <FaStar
            size={onChange ? 22 : 14}
            color={
              star <= (hover || value) ? '#f59e0b' : '#e5e7eb'
            }
          />
        </button>
      ))}
    </div>
  );
};

export default function ReviewsSection({
  courseId,
  isEnrolled,
}: {
  courseId: string;
  isEnrolled: boolean;
}) {
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [form, setForm] = useState({ rating: 5, comment: '' });
  const [editForm, setEditForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(`/reviews/course/${courseId}`);
      setReviews(res.data.reviews);
      if (user) {
        const mine = res.data.reviews.find(
          (r: Review) => r.student._id === user._id
        );
        if (mine) setHasReviewed(true);
      }
    } catch {
      console.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.comment.trim()) {
      toast.error('Please write a comment');
      return;
    }
    try {
      setSubmitting(true);
      const res = await axiosInstance.post('/reviews', {
        courseId,
        rating: form.rating,
        comment: form.comment,
      });
      setReviews([res.data.review, ...reviews]);
      setHasReviewed(true);
      setForm({ rating: 5, comment: '' });
      toast.success('Review posted!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to post review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/reviews/${id}`, editForm);
      setReviews(reviews.map((r) => (r._id === id ? res.data.review : r)));
      setEditingId(null);
      toast.success('Review updated!');
    } catch {
      toast.error('Failed to update review');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    try {
      await axiosInstance.delete(`/reviews/${id}`);
      setReviews(reviews.filter((r) => r._id !== id));
      setHasReviewed(false);
      toast.success('Review deleted');
    } catch {
      toast.error('Failed to delete review');
    }
  };

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : '0';

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1a1a2e]">
          Student Reviews
        </h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <FiStar className="text-yellow-400" />
            <span className="font-bold text-[#1a1a2e]">{avgRating}</span>
            <span className="text-gray-400 text-sm">
              ({reviews.length} reviews)
            </span>
          </div>
        )}
      </div>

      {/* Write Review Form */}
      {isAuthenticated && isEnrolled && !hasReviewed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#f0f0f0] rounded-2xl p-6 mb-6"
        >
          <h3 className="font-bold text-[#1a1a2e] mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 block mb-2">
                Your Rating
              </label>
              <StarRating
                value={form.rating}
                onChange={(val) => setForm({ ...form, rating: val })}
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 block mb-2">
                Your Review
              </label>
              <textarea
                value={form.comment}
                onChange={(e) =>
                  setForm({ ...form, comment: e.target.value })
                }
                rows={4}
                maxLength={500}
                placeholder="Share your experience with this course..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] resize-none"
              />
              <p className="text-xs text-gray-400 text-right mt-1">
                {form.comment.length}/500
              </p>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#e94560] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-opacity-90 transition disabled:opacity-60"
            >
              {submitting ? 'Posting...' : 'Post Review'}
            </button>
          </form>
        </motion.div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-400">
            No reviews yet.
            {isEnrolled
              ? ' Be the first to review!'
              : ' Enroll to leave a review.'}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-4 pb-5 border-b border-gray-50 last:border-0"
            >
              <img
                src={review.student.avatar}
                alt={review.student.name}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#1a1a2e] text-sm">
                      {review.student.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating value={review.rating} />
                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  </div>

                  {/* Edit/Delete — own review */}
                  {user && user._id === review.student._id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(review._id);
                          setEditForm({
                            rating: review.rating,
                            comment: review.comment,
                          });
                        }}
                        className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-[#0f3460] hover:text-white transition"
                      >
                        <FiEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {editingId === review._id ? (
                  <div className="mt-3 space-y-3">
                    <StarRating
                      value={editForm.rating}
                      onChange={(val) =>
                        setEditForm({ ...editForm, rating: val })
                      }
                    />
                    <textarea
                      value={editForm.comment}
                      onChange={(e) =>
                        setEditForm({ ...editForm, comment: e.target.value })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(review._id)}
                        className="bg-[#e94560] text-white px-4 py-2 rounded-xl text-xs font-semibold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {review.comment}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}