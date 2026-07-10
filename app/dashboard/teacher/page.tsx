'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const TeacherDashboard = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.push('/login');
    if (user && user.role !== 'teacher' && user.role !== 'admin') {
      router.push('/unauthorized');
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1a1a2e]">
          Welcome, {user?.name}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Teacher Dashboard</p>
      </div>
    </div>
  );
};

export default TeacherDashboard;