'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  FiUsers, FiBookOpen, FiDollarSign,
  FiTrendingUp, FiTrash2, FiEdit,
} from 'react-icons/fi';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';

const COLORS = ['#e94560', '#0f3460', '#1a1a2e', '#f59e0b', '#10b981'];

const monthlyRevenue = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 1900 },
  { month: 'Mar', revenue: 1500 },
  { month: 'Apr', revenue: 2800 },
  { month: 'May', revenue: 2200 },
  { month: 'Jun', revenue: 3100 },
  { month: 'Jul', revenue: 2700 },
  { month: 'Aug', revenue: 3500 },
  { month: 'Sep', revenue: 3200 },
  { month: 'Oct', revenue: 4100 },
  { month: 'Nov', revenue: 3800 },
  { month: 'Dec', revenue: 4500 },
];

const categoryData = [
  { name: 'Web Dev', value: 42 },
  { name: 'Design', value: 28 },
  { name: 'Data Science', value: 35 },
  { name: 'Marketing', value: 19 },
  { name: 'Business', value: 31 },
];

interface IUserRow {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<IUserRow[]>([]);
  const [fetching, setFetching] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTeachers: 0,
    totalStudents: 0,
    totalCourses: 0,
  });

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push('/login'); return; }
    if (user.role !== 'admin') { router.push('/unauthorized'); return; }
    fetchData();
  }, [user, loading]);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get('/admin/users');
      const allUsers: IUserRow[] = res.data.users;
      setUsers(allUsers.slice(0, 8));
      setStats({
        totalUsers: allUsers.length,
        totalTeachers: allUsers.filter((u) => u.role === 'teacher').length,
        totalStudents: allUsers.filter((u) => u.role === 'student').length,
        totalCourses: 0,
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axiosInstance.patch(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(users.map((u) =>
        u._id === userId ? { ...u, role: newRole } : u
      ));
      toast.success('Role updated successfully');
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await axiosInstance.delete(`/admin/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
      toast.success('User deleted successfully');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#e94560] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#f0f0f0] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-[#1a1a2e]">
            Admin Dashboard 
          </h1>
          <p className="text-gray-500 mt-1">
            Platform overview and management
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            {
              icon: FiUsers,
              label: 'Total Users',
              value: stats.totalUsers,
              color: '#e94560',
              bg: '#fff0f3',
            },
            {
              icon: FiTrendingUp,
              label: 'Teachers',
              value: stats.totalTeachers,
              color: '#0f3460',
              bg: '#f0f4ff',
            },
            {
              icon: FiUsers,
              label: 'Students',
              value: stats.totalStudents,
              color: '#e94560',
              bg: '#fff0f3',
            },
            {
              icon: FiDollarSign,
              label: 'Revenue',
              value: '$4,500',
              color: '#0f3460',
              bg: '#f0f4ff',
            },
          ].map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: kpi.bg }}
              >
                <kpi.icon size={22} color={kpi.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a2e]">
                  {kpi.value}
                </p>
                <p className="text-gray-500 text-xs mt-0.5">{kpi.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Line Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-6">
              Monthly Revenue
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#e94560"
                  strokeWidth={3}
                  dot={{ fill: '#e94560', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1a2e] mb-6">
              Courses by Category
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Enrollments Bar Chart */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-lg font-bold text-[#1a1a2e] mb-6">
            Enrollments by Category
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="value" fill="#0f3460" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Manage Users Table */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-lg font-bold text-[#1a1a2e] mb-6">
            Manage Users
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {['User', 'Email', 'Role', 'Joined', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-400 uppercase pb-3 pr-4"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50 transition">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <span className="font-semibold text-[#1a1a2e] text-sm">
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-gray-500 text-sm">{u.email}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <select
                        value={u.role}
                        onChange={(e) =>
                          handleRoleChange(u._id, e.target.value)
                        }
                        className={`text-xs font-semibold px-3 py-1 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[#e94560] ${
                          u.role === 'admin'
                            ? 'bg-red-100 text-red-600'
                            : u.role === 'teacher'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-green-100 text-green-600'
                        }`}
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-gray-400 text-sm">
                        {new Date(u.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}