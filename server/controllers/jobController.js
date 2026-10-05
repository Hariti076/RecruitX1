const Job = require('../models/Job');
const { careerPage } = require('../data/careerLinks');

// GET /api/jobs?search=developer&location=Hyderabad&type=Internship
async function getJobs(req, res) {
  try {
    const { search, location, type } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }
    if (type) {
      filter.type = type;
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// POST /api/jobs
async function addJob(req, res) {
  try {
    const { title, company, location, type, salary, eligibility, description, lastDate, applyLink } = req.body;

    if (!title || !company || !location) {
      return res.status(400).json({ message: 'Title, company and location are required' });
    }

    const job = await Job.create({
      title,
      company,
      location,
      type: type || 'Full-time',
      salary: salary || '',
      eligibility: eligibility || '',
      description: description || '',
      lastDate: lastDate || '',
      applyLink: applyLink || careerPage(company)
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// DELETE /api/jobs/:id
async function deleteJob(req, res) {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Invalid job id' });
  }
}

module.exports = { getJobs, addJob, deleteJob };
