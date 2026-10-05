const Application = require('../models/Application');
const Job = require('../models/Job');

// POST /api/applications   body: { jobId }
async function applyForJob(req, res) {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: 'Job id is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const already = await Application.findOne({ user: req.user.id, job: jobId });
    if (already) {
      return res.status(400).json({ message: 'You already applied for this job' });
    }

    const application = await Application.create({
      user: req.user.id,
      job: jobId
    });

    res.status(201).json({ message: 'Applied successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// GET /api/applications
async function getMyApplications(req, res) {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate('job')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { applyForJob, getMyApplications };
