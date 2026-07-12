'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import axiosInstance from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';
import { AuthResponse } from '@/types';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      setLoading(true);
      const res = await axiosInstance.post<AuthResponse>('/auth/login', formData);
      login(res.data.token, res.data.user);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'student' | 'teacher' | 'admin') => {
    const credentials = {
      student: { email: 'student@coursenest.com', password: 'admin123' },
      teacher: { email: 'teacher@coursenest.com', password: 'admin123' },
      admin: { email: 'admin@coursenest.com', password: 'admin123' },
    };
    try {
      setLoading(true);
      const res = await axiosInstance.post<AuthResponse>('/auth/login', credentials[role]);
      login(res.data.token, res.data.user);
      toast.success(`Logged in as ${role}!`);
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-[#e94560]">
              Course<span className="text-[#1a1a2e]">Nest</span>
            </Link>
            <h1 className="text-2xl font-bold text-[#1a1a2e] mt-4">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Login to continue your learning journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e94560] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR TRY DEMO</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Demo Buttons */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('student')}
              disabled={loading}
              className="py-2 px-3 border-2 border-[#0f3460] text-[#0f3460] rounded-xl text-xs font-semibold hover:bg-[#0f3460] hover:text-white transition disabled:opacity-60"
            >
              Student
            </button>
            <button
              onClick={() => handleDemoLogin('teacher')}
              disabled={loading}
              className="py-2 px-3 border-2 border-[#e94560] text-[#e94560] rounded-xl text-xs font-semibold hover:bg-[#e94560] hover:text-white transition disabled:opacity-60"
            >
              Teacher
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
              className="py-2 px-3 border-2 border-[#1a1a2e] text-[#1a1a2e] rounded-xl text-xs font-semibold hover:bg-[#1a1a2e] hover:text-white transition disabled:opacity-60"
            >
              Admin
            </button>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-[#e94560] font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
           {/* Demo Note */}
          <p className="text-center text-xs text-gray-400 mt-4"          > Demo accounts are pre-seeded. Use the buttons above to quick login.
          </p>
        </div>
      </div>
     </div>
  );
};

export default LoginPage;