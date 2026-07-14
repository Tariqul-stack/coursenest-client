export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'teacher' | 'admin';
  bio: string;
  enrolledCourses: string[];
  createdAt: string;
}

export interface ILesson {
  lessonId: string;
  title: string;
  videoUrl: string;
  duration: number;
  order: number;
  isFreePreview: boolean;
}

export interface IModule {
  moduleId: string;
  title: string;
  order: number;
  lessons: ILesson[];
}

export interface ICourse {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  price: number;
  isFree: boolean;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  instructor: IUser | string;
  curriculum: IModule[];
  status: 'draft' | 'published';
  totalEnrollments: number;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
}

export interface IEnrollment {
  _id: string;
  student: IUser;
  course: ICourse;
  enrolledAt: string;
  paymentStatus: 'free' | 'paid';
  completedLessons: string[];
  progressPercent: number;
  certificateIssued: boolean;
  certificateId?: string;
}

export interface IReview {
  _id: string;
  student: IUser;
  course: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IQAPost {
  _id: string;
  author: IUser;
  course?: string;
  title: string;
  description: string;
  tags: string[];
  status: 'open' | 'resolved';
  views: number;
  createdAt: string;
}

export interface IQAAnswer {
  _id: string;
  post: string;
  author: IUser;
  authorRole: string;
  content: string;
  isAccepted: boolean;
  createdAt: string;
}

export interface ITransaction {
  _id: string;
  student: IUser;
  course: ICourse;
  instructor: IUser;
  amount: number;
  stripePaymentIntentId: string;
  status: 'succeeded' | 'failed' | 'refunded';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: IUser;
}