const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const logger = require('./middleware/logger');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const Job = require('./models/Job');
const User = require('./models/User');
const sampleJobs = require('./data/sampleJobs');
const { careerPage } = require('./data/careerLinks');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

// Built-in middleware: lets Express read JSON sent by React
app.use(express.json());

// Lets the React app (port 5173) call this API (port 5000)
app.use(cors());

// Our own middleware: logs every request in the terminal
app.use(logger);

// On Vercel the function may receive /jobs instead of /api/jobs.
if (process.env.VERCEL) {
  app.use((req, res, next) => {
    if (!req.url.startsWith('/api')) {
      const path = req.url.startsWith('/') ? req.url : `/${req.url}`;
      req.url = path === '/' ? '/api' : `/api${path}`;
    }
    next();
  });
}

app.get('/', (req, res) => {
  res.send('RecruitX API is running');
});

let dbReady;

function connectDB() {
  if (!process.env.MONGO_URI) {
    return Promise.reject(new Error('MONGO_URI is missing'));
  }

  if (!dbReady) {
    dbReady = mongoose.connect(process.env.MONGO_URI).then(async () => {
      console.log('MongoDB connected');

    // Replace the short demo jobs with full job cards (salary, eligibility, etc.)
    const fullJob = await Job.findOne({ salary: { $exists: true, $ne: '' } });
    if (!fullJob) {
      await Job.deleteMany({});
      await Job.insertMany(sampleJobs);
      console.log('Sample jobs inserted');
    }

    // Older jobs have no company career link. Fill that in so Apply can open it.
    const jobsWithoutLink = await Job.find({ $or: [{ applyLink: { $exists: false } }, { applyLink: '' }] });
    for (const job of jobsWithoutLink) {
      job.applyLink = careerPage(job.company);
      await job.save();
    }
    if (jobsWithoutLink.length > 0) {
      console.log('Company career links added');
    }

    // One admin account can post jobs. Students only apply.
    const adminEmail = 'admin@recruitx.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created');
    }

    }).catch((error) => {
      dbReady = null;
      throw error;
    });
  }

  return dbReady;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

app.use('/api', authRoutes);
app.use('/api', applicationRoutes);
app.use('/api/jobs', jobRoutes);

function start() {
  connectDB()
    .then(() => {
      const port = process.env.PORT || 5000;
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      console.log('Could not start server. Is MongoDB running?');
      console.log(error.message);
    });
}

// Vercel runs this file as a function. Locally we start the port ourselves.
if (!process.env.VERCEL) {
  start();
}

module.exports = app;
