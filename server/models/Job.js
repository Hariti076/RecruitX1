const mongoose = require('mongoose');

// Collection name in MongoDB will be "jobs"
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, default: 'Full-time' },
    salary: { type: String, default: '' },
    eligibility: { type: String, default: '' },
    description: { type: String, default: '' },
    lastDate: { type: String, default: '' },
    applyLink: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
