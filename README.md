# RecruitX — Student Job Portal

> **One platform. Every opportunity. Built for students.**

RecruitX is a full-stack job portal built for students and fresh graduates. Job listings from companies are kept in one place. A student can register, search and filter jobs, and click **Apply**, which opens the company's official career page and saves the application on the student's dashboard. An admin adds and removes listings. Everything is stored in MongoDB.

**Live demo:** [recruit-x1.vercel.app](https://recruitx1-two.vercel.app/)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)

---

## Project Details

| | |
|---|---|
| Course | Full Stack Development Lab (PVP23) |
| Faculty | Sushumna Ma'am |

## Team Members

| # | Name |
|---|------|
| 1 | P. Hariti |
| 2 | P. Himabindu |
| 3 | P. Siri |
| 4 | P. Supriya |

---

## Overview

### The problem

Students find openings on many different websites and notice company career pages late. There is no single place that shows the role, salary, eligibility and last date together, and nothing that remembers which jobs they already applied for.

### Our solution

RecruitX keeps every listing in one place and shows the details that matter to a student: role, company, location, job type, salary, eligibility, a short description and the last date to apply. When a student clicks **Apply**, the company's own career page opens in a new tab and the application is saved on the student's dashboard, so nothing is forgotten.

### Who uses it

| User | What they do |
|------|--------------|
| **Visitor** | Browses and searches jobs without logging in |
| **Student** | Registers, logs in, applies to jobs and checks the dashboard |
| **Admin** | Adds new listings and deletes old ones. Students cannot post jobs |

### A student's journey

1. Opens the home page and searches by job title or company, or filters by job type and location.
2. Reads the job card: salary, eligibility, description and last date.
3. Clicks **Apply**. If not logged in, the student is sent to the login page first and the job is saved after login.
4. The company's career page opens in a new tab and the application is saved.
5. Opens the **Dashboard** to see every job applied for.

### The admin's journey

1. Logs in with the admin account.
2. Opens **Add Job**, fills in the details and saves. The job is stored in MongoDB and appears on the home page.
3. Uses the **Delete** button on a job card to remove a listing.

---

## Features

| Feature | Description |
|---------|-------------|
| Job listings | Job cards loaded from MongoDB |
| Search | Search by job title or company |
| Filters | Filter by job type (Full-time, Part-time, Internship, Remote) and location |
| Popular searches | One-click shortcuts on the home page |
| Full details | Role, company, location, salary, eligibility, description and last date |
| Apply | Opens the company career page in a new tab and saves the application |
| No duplicate applications | The server rejects a second application to the same job |
| Dashboard | Shows the logged-in user's applications and totals |
| Admin panel | Add a job or delete a job (admin only) |
| Login and register | Email and password, checked on the server |
| Protected routes | Add and delete are blocked for anyone who is not the admin |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, React Router, Axios, Vite |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Authentication | JWT, passwords hashed with bcrypt |
| Hosting | Vercel (site and API), MongoDB Atlas (database) |

---

## Pages

| Page | Route | What it shows |
|------|-------|---------------|
| Home | `/` | Hero section with search bar, popular searches, job and company counts, type and location filters, and the job cards |
| Register | `/register` | Name, email and password form to create a student account |
| Login | `/login` | Email and password form. On success the JWT is saved and the user goes to the dashboard |
| Dashboard | `/dashboard` | Greeting, totals (jobs, companies, my applications) and the list of jobs applied for |
| Add Job | `/add-job` | Admin only. Form for title, company, location, type, salary, eligibility, description, last date and career page link |

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
2. Express matches the URL and the HTTP method.
3. Middleware runs first. `logger` logs every request, `auth` checks the JWT, and `admin` checks the role for add and delete.
4. The controller reads or writes MongoDB through Mongoose.
5. The page shows the JSON that comes back.

**Login flow:** the server checks the email and password and returns a JWT. React stores it in `localStorage` and sends it as `Authorization: Bearer <token>` on protected requests. The token expires after 1 day.

## Security

- Passwords are hashed with bcrypt before they are saved. Plain text is never stored.
- Protected routes need a valid JWT. Add and delete job also need the `admin` role.
- Secrets (`MONGO_URI`, `JWT_SECRET`) live in environment variables. `.env` is listed in `.gitignore`, so it is not pushed to GitHub.
- New accounts are always created as `student`. The admin account is created by the server.

---

## Database Collections

| Collection | Fields |
|------------|--------|
| `users` | `name`, `email` (unique), `password` (hash), `role` (`student` or `admin`) |
| `jobs` | `title`, `company`, `location`, `type`, `salary`, `eligibility`, `description`, `lastDate`, `applyLink` |
| `applications` | `user` (reference to users), `job` (reference to jobs), timestamps |

On the first start the server adds 8 sample jobs and creates the admin account.

## REST APIs

All routes start with `/api`.

| Method | URL | Who can call it | What it does |
|--------|-----|-----------------|--------------|
| POST | `/api/register` | Anyone | Create a student account |
| POST | `/api/login` | Anyone | Check email and password, return a JWT |
| GET | `/api/jobs` | Anyone | Read jobs. Optional `?search=`, `?location=`, `?type=` |
| POST | `/api/jobs` | Admin | Insert a job |
| DELETE | `/api/jobs/:id` | Admin | Remove a job |
| POST | `/api/applications` | Logged-in user | Save an application (`{ "jobId": "..." }`) |
| GET | `/api/applications` | Logged-in user | Read the user's own applications |

Status codes used: `200` OK, `201` created, `400` bad input, `401` not logged in or wrong password, `403` not an admin, `404` not found, `500` server error.

---

## Run Locally

You need **Node.js** and **MongoDB** running on `mongodb://127.0.0.1:27017` (or a MongoDB Atlas connection string).

**1. Backend**

```bash
cd server
npm install
cp .env.example .env      # on Windows: copy .env.example .env
npm start
```

**2. Frontend** (in a second terminal)

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173**. The API runs at **http://localhost:5000**. In development, Vite forwards `/api` requests to the server, so no extra setup is needed.

**Environment variables** (`server/.env`)

| Name | Example | Purpose |
|------|---------|---------|
| `PORT` | `5000` | Port for the API (local only) |
| `MONGO_URI` | `mongodb://127.0.0.1:27017/recruitx_lite` | MongoDB connection string |
| `JWT_SECRET` | any long secret word | Used to sign tokens |

## Demo Accounts

| Account | Email | Password | Can do |
|---------|-------|----------|--------|
| Student | register on the site | chosen at register | Search, apply, view dashboard |
| Admin | `admin@recruitx.com` | `admin123` | Add and delete jobs |

These are demo credentials for evaluation only. Change them before using the project for anything real.

---

## Deploy on Vercel

The site and the API are deployed together from this one repository. The file `vercel.json` tells Vercel how:

```json
{
  "services": {
    "client": { "root": "client", "framework": "vite" },
    "server": { "root": "server", "framework": "express", "entrypoint": "server.js" }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": { "service": "server" } },
    { "source": "/(.*)",     "destination": { "service": "client" } }
  ]
}
```

- `client` is built with Vite and serves the React app.
- `server` runs the Express API from `server/server.js`.
- Requests to `/api/...` go to the server and everything else goes to the React app. Because both live on one domain, the React code calls the API with the plain path `/api` and needs no URL setting.

### Step 1: Create the database on MongoDB Atlas

1. Create a free account and a free **M0** cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. **Database Access:** add a database user with a username and password.
3. **Network Access:** add the IP address `0.0.0.0/0` (allow from anywhere). Vercel's IP addresses are not fixed, so a single IP will not work.
4. Click **Connect > Drivers** and copy the connection string. Replace `<password>` with your password and add the database name before the `?`:

   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/recruitx?retryWrites=true&w=majority
   ```

   If the password has special characters such as `@` or `#`, URL-encode them.

### Step 2: Push the code to GitHub

```bash
git add .
git commit -m "Ready to deploy"
git push origin main
```

Check that `.env` is **not** in the repository (it is already in `.gitignore`).

### Step 3: Import the project in Vercel

1. Log in at [vercel.com](https://vercel.com) with GitHub and click **Add New > Project**.
2. Import the `RecruitX1` repository.
3. Keep the **Root Directory** as the repository root. Do not select `client` or `server`.
4. If Vercel does not detect two services, open **Settings > Build and Deployment** and set the **Framework Preset** to **Services**.

### Step 4: Add environment variables

In **Settings > Environment Variables** add these for Production (and Preview):

| Name | Value |
|------|-------|
| `MONGO_URI` | Your Atlas connection string from Step 1 |
| `JWT_SECRET` | Any long random secret word |

You do not need `PORT` on Vercel.

### Step 5: Deploy

Click **Deploy**. When it finishes, open the URL Vercel gives you. The first request connects to MongoDB, adds the sample jobs and creates the admin account, so it can take a few seconds.

To redeploy later, push to `main`. After changing an environment variable, redeploy from the **Deployments** tab, because new values apply only to new deployments.

### Step 6: Test the live site

- [ ] The home page shows job cards.
- [ ] Register a student, log in, click **Apply** and see the job on the Dashboard.
- [ ] Log in as admin, add a job and see it on the home page, then delete it.
- [ ] Refresh the browser on `/dashboard` and check that the page still loads.

### Deploy with the Vercel CLI (optional)

```bash
npm install -g vercel
vercel login
vercel          # preview deployment
vercel --prod   # production deployment
```

### Troubleshooting

| Problem | Likely cause and fix |
|---------|----------------------|
| "Database connection failed" | `MONGO_URI` is missing or wrong, or Atlas Network Access does not allow `0.0.0.0/0`. Fix it and redeploy |
| "Could not load jobs" | The API is not reachable. Open `/api/jobs` on your site and check the error |
| Login says "Invalid token" after a deploy | `JWT_SECRET` was changed. Log out and log in again |
| Data goes into the wrong database | The connection string has no database name. Add `/recruitx` before the `?` |
| Build fails | Check the Root Directory (repository root) and the Services framework preset |

---

## Lab Coverage (PVP23 Full Stack Development-2, 23SO8554)

This project is the **Experiment 12 capstone**. It reuses the ideas from the earlier experiments:

| Exp | Topic | Where in this project |
|-----|-------|-----------------------|
| 1 | Express: routing, HTTP methods, middleware | `server/routes`, `GET` / `POST` / `DELETE`, `logger.js`, `auth.js`, `admin.js` |
| 1 | Route and query parameters | `DELETE /api/jobs/:id`, `GET /api/jobs?search=&location=&type=` |
| 3 | Authentication | Register, login, bcrypt, JWT (`authController.js`, `auth.js`) |
| 4 | React: JSX, function components | Every file in `client/src` |
| 5 | Props, state, events | `JobCard` (props), `useState` in the pages, `onClick` / `onChange` / `onSubmit` |
| 6 | Conditional rendering, lists, forms | `Navbar` (login state), `Jobs` (`map` with `key`), Login, Register and Add Job forms |
| 7 | React Router | `App.jsx`: Home, Login, Register, Dashboard, Add Job |
| 8 | Hooks, sharing data | `useState`, `useEffect`; the `user` state in `App.jsx` is passed to pages as props |
| 11 | Express + Mongoose CRUD, SPA with REST APIs | `models/`, `controllers/`, React with Axios |
| 12 | Capstone: React, Node, Express, MongoDB | The whole project |

---

## Folder Structure

```
RecruitX/
├── vercel.json            Vercel setup (client + server)
├── client/                React frontend
│   └── src/
│       ├── pages/         Jobs (home), Login, Register, Dashboard, AddJob
│       ├── components/    Navbar, JobCard, Footer
│       ├── api.js         API URL and token header
│       ├── App.jsx        Routes and login state
│       └── main.jsx       Entry point
└── server/                Express + MongoDB
    ├── server.js          Starts the app, connects to MongoDB, adds sample data
    ├── models/            User, Job, Application
    ├── routes/            authRoutes, jobRoutes, applicationRoutes
    ├── controllers/       authController, jobController, applicationController
    ├── middleware/        logger, auth, admin
    └── data/              sampleJobs, careerLinks
```

---

## Future Scope

- Edit an existing job (an update route for the admin)
- Hide jobs after their last date
- Resume upload with each application
- Email alerts for new jobs

---

**RecruitX — Bridging students and opportunities, one click at a time.**
