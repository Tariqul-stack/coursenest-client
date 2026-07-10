import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CourseNest — Learn anything. Teach everything.',
  description: 'Online course platform for students and teachers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f0f0f0] min-h-screen`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}