'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import Link from 'next/link';

const categories = [
  'Web Development', 'UI/UX Design', 'Data Science',
  'Digital Marketing', 'Mobile Development',
  'Cybersecurity', 'Business', 'Photography',
];

const levels = ['Beginner', 'Intermediate', 'Advanced'];

interface Lesson {
  lessonId: string;
  title: string;
  videoUrl: string;
  duration: number;
  order: number;
  isFreePreview: boolean;
}

interface Module {
  moduleId: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

export default function AddCoursePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    thumbnail: '',
    price: 0,
    category: 'Web Development',
    level: 'Beginner',
    tags: [] as string[],
  });

  const [curriculum, setCurriculum] = useState<Module[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'teacher' && user.role !== 'admin') {
      router.push('/unauthorized');
    }
  }, [user, loading]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const addModule = () => {
    const newModule: Module = {
      moduleId: `mod-${Date.now()}`,
      title: `Module ${curriculum.length + 1}`,
      order: curriculum.length + 1,
      lessons: [],
    };
    setCurriculum([...curriculum, newModule]);
  };

  const updateModuleTitle = (moduleId: string, title: string) => {
    setCurriculum(curriculum.map((m) =>
      m.moduleId === moduleId ? { ...m, title } : m
    ));
  };

  const removeModule = (moduleId: string) => {
    setCurriculum(curriculum.filter((m) => m.moduleId !== moduleId));
  };

  const addLesson = (moduleId: string) => {
    setCurriculum(curriculum.map((m) => {
      if (m.moduleId !== moduleId) return m;
      const newLesson: Lesson = {
        lessonId: `les-${Date.now()}`,
        title: `Lesson ${m.lessons.length + 1}`,
        videoUrl: '',
        duration: 0,
        order: m.lessons.length + 1,
        isFreePreview: false,
      };
      return { ...m, lessons: [...m.lessons, newLesson] };
    }));
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    field: string,
    value: string | number | boolean
  ) => {
    setCurriculum(curriculum.map((m) => {
      if (m.moduleId !== moduleId) return m;
      return {
        ...m,
        lessons: m.lessons.map((l) =>
          l.lessonId === lessonId ? { ...l, [field]: value } : l
        ),
      };
    }));
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setCurriculum(curriculum.map((m) => {
      if (m.moduleId !== moduleId) return m;
      return { ...m, lessons: m.lessons.filter((l) => l.lessonId !== lessonId) };
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription || !formData.thumbnail) {
      toast.error('Please fill all required fields');
      return;
    }
    try {
      setSubmitting(true);
      const payload = { ...formData, curriculum };
      await axiosInstance.post('/courses', payload);
      toast.success('Course created successfully!');
      router.push('/dashboard/teacher');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f0f0f0] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard/teacher"
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-gray-50 transition"
          >
            <FiArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">
              Create New Course
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Fill in the details to publish your course
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-6">
              Basic Information
            </h2>
            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Complete React Developer Course"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Short Description * (max 200 chars)
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  maxLength={200}
                  placeholder="Brief description shown on course card"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {formData.shortDescription.length}/200
                </p>
              </div>

              {/* Full Description */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Detailed course overview, what students will learn..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] resize-none"
                />
              </div>

              {/* Thumbnail */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Thumbnail URL *
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://i.ibb.co/your-image.jpg"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                />
                {formData.thumbnail && (
                  <img
                    src={formData.thumbnail}
                    alt="preview"
                    className="mt-3 w-full h-40 object-cover rounded-xl"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                )}
              </div>

              {/* Category + Level + Price */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Level *
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                  >
                    {levels.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Price (USD) — 0 = Free
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min={0}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                  />
                </div>
              </div>

              {/* Tags */}
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
                    placeholder="Add a tag and press Enter"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-[#0f3460] text-white rounded-xl text-sm font-semibold hover:bg-opacity-90 transition"
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
            </div>
          </motion.div>

          {/* Curriculum Builder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#1a1a2e]">
                Curriculum
              </h2>
              <button
                type="button"
                onClick={addModule}
                className="flex items-center gap-2 bg-[#0f3460] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-opacity-90 transition"
              >
                <FiPlus /> Add Module
              </button>
            </div>

            {curriculum.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
                <p className="text-gray-400 text-sm">
                  No modules yet. Click Add Module to start building your curriculum.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {curriculum.map((mod, modIndex) => (
                  <div
                    key={mod.moduleId}
                    className="border border-gray-100 rounded-2xl overflow-hidden"
                  >
                    {/* Module Header */}
                    <div className="flex items-center gap-3 bg-gray-50 px-5 py-4">
                      <span className="w-7 h-7 bg-[#e94560] text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                        {modIndex + 1}
                      </span>
                      <input
                        type="text"
                        value={mod.title}
                        onChange={(e) =>
                          updateModuleTitle(mod.moduleId, e.target.value)
                        }
                        className="flex-1 bg-transparent font-semibold text-[#1a1a2e] text-sm focus:outline-none"
                        placeholder="Module title"
                      />
                      <button
                        type="button"
                        onClick={() => addLesson(mod.moduleId)}
                        className="text-xs text-[#0f3460] font-semibold hover:text-[#e94560] transition"
                      >
                        + Lesson
                      </button>
                      <button
                        type="button"
                        onClick={() => removeModule(mod.moduleId)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>

                    {/* Lessons */}
                    {mod.lessons.length > 0 && (
                      <div className="divide-y divide-gray-50 px-5">
                        {mod.lessons.map((lesson, lesIndex) => (
                          <div key={lesson.lessonId} className="py-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs text-gray-400 w-6">
                                {lesIndex + 1}.
                              </span>
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) =>
                                  updateLesson(
                                    mod.moduleId,
                                    lesson.lessonId,
                                    'title',
                                    e.target.value
                                  )
                                }
                                placeholder="Lesson title"
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  removeLesson(mod.moduleId, lesson.lessonId)
                                }
                                className="text-gray-400 hover:text-red-500 transition"
                              >
                                <FiTrash2 size={13} />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ml-6">
                              <input
                                type="url"
                                value={lesson.videoUrl}
                                onChange={(e) =>
                                  updateLesson(
                                    mod.moduleId,
                                    lesson.lessonId,
                                    'videoUrl',
                                    e.target.value
                                  )
                                }
                                placeholder="Video URL (YouTube)"
                                className="col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                              />
                              <input
                                type="number"
                                value={lesson.duration}
                                onChange={(e) =>
                                  updateLesson(
                                    mod.moduleId,
                                    lesson.lessonId,
                                    'duration',
                                    Number(e.target.value)
                                  )
                                }
                                placeholder="Duration (mins)"
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560]"
                              />
                            </div>
                            <div className="flex items-center gap-2 ml-6 mt-2">
                              <input
                                type="checkbox"
                                id={`preview-${lesson.lessonId}`}
                                checked={lesson.isFreePreview}
                                onChange={(e) =>
                                  updateLesson(
                                    mod.moduleId,
                                    lesson.lessonId,
                                    'isFreePreview',
                                    e.target.checked
                                  )
                                }
                                className="accent-[#e94560]"
                              />
                              <label
                                htmlFor={`preview-${lesson.lessonId}`}
                                className="text-xs text-gray-500"
                              >
                                Free Preview
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Submit */}
          <div className="flex items-center gap-4 pb-8">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#e94560] text-white py-4 rounded-xl font-bold text-base hover:bg-opacity-90 transition disabled:opacity-60"
            >
              {submitting ? 'Creating Course...' : 'Create Course'}
            </button>
            <Link
              href="/dashboard/teacher"
              className="px-6 py-4 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:border-gray-300 transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}