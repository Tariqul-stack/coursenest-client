# CourseNest 🎓

> **Learn anything. Teach everything.**

A full-stack EdTech SaaS platform where Teachers create and sell courses, Students enroll and learn, and a Community Q&A system connects learners with expert mentors.

---

## 🌐 Live Links

| Service | URL |
|---|---|
| 🖥️ Client (Frontend) | https://coursenest-client.vercel.app |
| ⚙️ Server (Backend) | https://coursenest-server.vercel.app |
| 📁 Client Repository | https://github.com/Tariqul-stack/coursenest-client |
| 📁 Server Repository | https://github.com/Tariqul-stack/coursenest-server |

---

## 📌 Project Overview

CourseNest is a modern EdTech platform that connects students with expert instructors. Students can browse, enroll in, and complete courses while earning certificates. Teachers can create and publish courses with a full curriculum builder. A built-in Community Q&A system allows students to post problems and receive expert mentor responses.

---

## 👥 User Roles & Capabilities

### 👤 Student
- Register and login with email/password
- Browse and search courses by category, level, and price
- Enroll in free courses instantly
- Purchase paid courses
- Track course progress lesson by lesson
- Post questions in Community Q&A
- Comment and reply on Q&A threads
- Mark answers as accepted
- Write course reviews (enrolled students only)
- Download certificate on course completion
- View enrolled courses and certificates in dashboard

### 👨‍🏫 Teacher / Mentor
- Create, publish, edit, and delete courses
- Build course curriculum with modules and lessons
- Set courses as Free or Paid
- Upload course thumbnails
- Answer student Q&A posts with Mentor badge
- View earnings dashboard with revenue charts
- View enrolled students per course
- Toggle course status (Published / Draft)

### 🔐 Admin
- Manage all users — change roles, delete accounts
- Manage all courses — publish, unpublish, delete
- View all platform transactions
- Access full analytics dashboard:
  - Total users, teachers, students
  - Monthly revenue chart
  - Enrollments by category
  - Top courses and teachers

---

## ✨ Key Features

- 🔐 **JWT Authentication** — secure login with 7-day token expiry
- 👥 **Role-Based Access Control** — Student, Teacher, Admin dashboards
- 📚 **Course Management** — full curriculum builder with modules and lessons
- 💬 **Community Q&A** — mentor-badged answers, accepted answer system
- ⭐ **Review System** — enrolled students only, edit and delete own reviews
- 📊 **Analytics Dashboard** — Recharts bar, line, and pie charts
- 🏆 **Certificate Generation** — unique ID on 100% course completion
- 💀 **Skeleton Loaders** — smooth loading states
- 📱 **Fully Responsive** — mobile, tablet, and desktop

---

## 🛠️ Tech Stack

### Frontend
| Package | Purpose |
|---|---|
| Next.js 14 (App Router) | Frontend framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Axios | HTTP client |
| Recharts | Analytics charts |
| React Hot Toast | Notifications |
| React Icons | Icon library |

### Backend
| Package | Purpose |
|---|---|
| Express.js | Backend framework |
| TypeScript | Type safety |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Bcryptjs | Password hashing |
| UUID | Certificate ID generation |

### Services
| Service | Purpose |
|---|---|
| MongoDB Atlas | Cloud database |
| Vercel | Deployment |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the Repositories
```bash
git clone https://github.com/Tariqul-stack/coursenest-client.git
git clone https://github.com/Tariqul-stack/coursenest-server.git
```

### 2. Server Setup
```bash
cd coursenest-server
npm install
```

Create `.env` file:
```
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/courseNest-db
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

Seed the database:
```bash
npx tsx src/seed.ts
```

Start the server:
```bash
npm run dev
```

Server runs on: `http://localhost:8000`

### 3. Client Setup
```bash
cd coursenest-client
npm install
```

Create `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the client:
```bash
npm run dev
```

Client runs on: `http://localhost:3000`

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@coursenest.com | admin123 |
| Teacher | teacher@coursenest.com | admin123 |
| Student | student@coursenest.com | admin123 |

---

## 📁 Project Structure

### Client (Next.js App Router)
```
coursenest-client/
├── app/
│   ├── (auth)/login/
│   ├── (auth)/register/
│   ├── about/
│   ├── community/
│   ├── contact/
│   ├── courses/[id]/
│   ├── dashboard/
│   │   ├── admin/
│   │   ├── student/
│   │   └── teacher/courses/
│   └── instructors/[id]/
├── components/
│   ├── courses/
│   ├── home/
│   ├── layout/
│   └── shared/
├── hooks/
├── lib/
└── types/
```

### Server (Express.js)
```
coursenest-server/
└── src/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── lib/
    ├── seed.ts
    └── index.ts
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/auth/me | Auth |

### Courses
| Method | Endpoint | Access |
|---|---|---|
| GET | /api/courses | Public |
| GET | /api/courses/:id | Public |
| POST | /api/courses | Teacher |
| PUT | /api/courses/:id | Teacher |
| DELETE | /api/courses/:id | Teacher/Admin |
| PATCH | /api/courses/:id/status | Teacher/Admin |

### Enrollments
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/enrollments | Student |
| POST | /api/enrollments/paid | Student |
| GET | /api/enrollments/my | Student |
| PATCH | /api/enrollments/:id/progress | Student |

### Reviews
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/reviews | Enrolled Student |
| GET | /api/reviews/course/:id | Public |
| PUT | /api/reviews/:id | Author |
| DELETE | /api/reviews/:id | Author/Admin |

### Community Q&A
| Method | Endpoint | Access |
|---|---|---|
| GET | /api/qa | Public |
| POST | /api/qa | Auth |
| GET | /api/qa/:id | Public |
| POST | /api/qa/:id/answers | Auth |
| PATCH | /api/qa/:id/answers/:aid/accept | Post Author |

### Admin
| Method | Endpoint | Access |
|---|---|---|
| GET | /api/admin/users | Admin |
| PATCH | /api/admin/users/:id/role | Admin |
| DELETE | /api/admin/users/:id | Admin |

---

## 🌍 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Vercel |
| Database | MongoDB Atlas |