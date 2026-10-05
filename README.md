# RecruitX — Student Job Portal

> **One platform. Every opportunity. Built for students.**

Full stack job portal for the Full Stack Development Lab. Students search and apply. The admin adds and removes listings. Every listing is stored in MongoDB.

---

## Project Details

| | |
|---|---|
| Course | Full Stack Development Lab (PVP23) |
| Faculty | Sirisha Ma'am |

---

## Team Members

| # | Name |
|---|------|
| 1 | P. Sathyanarayana |
| 2 | P. Hashika |
| 3 | P. Navya |
| 4 | P. Vasu |
| 5 | P. Hariti |
| 6 | P. Himabindu |

---

## About the Project

**RecruitX** is a student job portal. Listings from companies are kept in one place, with the role, company, location, salary, eligibility, a short description, and the last date to apply.

A student registers, logs in, searches, and clicks **Apply**. That opens the company's official career page and saves the application on the student's dashboard.

Students do not post jobs. An admin account adds and deletes listings.

---

## What RecruitX Does

| Feature | Description |
|---------|-------------|
| Job listings | Cards loaded from MongoDB |
| Search | Search by job title or company |
| Filters | Filter by job type and location |
| Full details | Role, salary, eligibility, description, and deadline |
| Apply | Opens the company career page and saves the application |
| Dashboard | The logged-in student sees the jobs they applied for |
| Admin | Add a job or delete a job |
| Login and register | Email and password, checked on the server |

---

## Pages

### Home
Search bar, popular searches, job and company counts, and the job cards.

### Register and Login
A student creates an account and logs in. The password is stored as a hash, not plain text.

### Dashboard
Shows the jobs that student applied for.

### Add Job
Visible only after the admin logs in. The new job is saved in MongoDB and appears on the home page.

---

## Job Card

```
┌─────────────────────────────────────┐
│  Software Engineer      [Full-time] │
│  Google                             │
│  Bangalore          ₹15–25 LPA      │
│                                     │
│  Eligibility: B.Tech/B.E. in CSE/IT │
│                                     │
│  Looking for passionate software    │
│  engineers to join the Google team  │
│                                     │
│  [APPLY]              Last: date    │
└─────────────────────────────────────┘
```

---

## How It Works

```
React page  →  Express route  →  middleware  →  controller  →  MongoDB
```

1. The React app calls the API with Axios.
2. Express matches the URL and HTTP method.
3. Middleware logs the request. Add and delete also check that the user is the admin.
4. The controller reads or writes MongoDB through Mongoose.
5. The page shows the JSON that comes back.

Login returns a JWT. React stores it in `localStorage` and sends it as `Authorization: Bearer <token>`.

---

## How to Run

You need **Node.js** and **MongoDB** on `mongodb://127.0.0.1:27017`.

```bash
cd server
npm install
npm start
```

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173**. The API runs at **http://localhost:5000**.

Copy `server/.env.example` to `server/.env` if that file is missing.

| Account | Email | Password | Can do |
|---------|-------|----------|--------|
| Student | register on the site | chosen at register | Search and apply |
| Admin | admin@recruitx.com | admin123 | Add and delete jobs |

---

## REST APIs

| Method | URL | Who can call it | What it does |
|--------|-----|-----------------|--------------|
| POST | `/api/register` | Anyone | Create a student |
| POST | `/api/login` | Anyone | Check email and password, return a JWT |
| GET | `/api/jobs` | Anyone | Read jobs. `?search=`, `?location=`, `?type=` |
| POST | `/api/jobs` | Admin | Insert a job |
| DELETE | `/api/jobs/:id` | Admin | Remove a job |
| POST | `/api/applications` | Logged-in student | Save an application |
| GET | `/api/applications` | Logged-in student | Read that student's applications |

---

## Lab Coverage

| Topic | Where |
|-------|--------|
| Express routing | `server/routes` |
| Route parameter | `DELETE /api/jobs/:id` |
| Query parameter | `GET /api/jobs?search=&location=&type=` |
| Middleware | `logger.js`, `auth.js`, `admin.js` |
| GET, POST, DELETE | Jobs and applications |
| Authentication | Register, login, JWT |
| MongoDB | `users`, `jobs`, `applications` |
| React components and hooks | `client/src` |
| React Router | Home, Login, Register, Dashboard, Add Job |

---

## Folder Structure

```
RecruitX/
├── client/          React frontend
│   └── src/
│       ├── pages/        Home, Login, Register, Dashboard, Add Job
│       └── components/   Navbar, JobCard, Footer
└── server/          Express + MongoDB
    ├── models/
    ├── routes/
    ├── controllers/
    └── middleware/
```

---

## Acknowledgements

We sincerely thank **Sirisha Ma'am** for her guidance and support throughout this project.

**RecruitX — Bridging students and opportunities, one click at a time.**
