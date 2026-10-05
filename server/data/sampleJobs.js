const { careerPage } = require('./careerLinks');

// Fixed sample jobs. Used only when the database has no full job records yet.
const sampleJobs = [
  {
    title: 'Software Engineer',
    company: 'Google',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹15-25 LPA',
    eligibility: 'B.Tech/B.E. in CSE/IT',
    description: 'Looking for passionate software engineers to join the Google team.',
    lastDate: '2026-12-15',
    applyLink: careerPage('Google')
  },
  {
    title: 'Frontend Developer',
    company: 'Microsoft',
    location: 'Hyderabad',
    type: 'Full-time',
    salary: '₹12-18 LPA',
    eligibility: 'B.Tech/B.E. in CSE/IT/ECE',
    description: 'Build user interfaces for Microsoft products used by students and teams.',
    lastDate: '2026-11-30',
    applyLink: careerPage('Microsoft')
  },
  {
    title: 'Data Analyst',
    company: 'TCS',
    location: 'Mumbai',
    type: 'Full-time',
    salary: '₹6-10 LPA',
    eligibility: 'Any Graduate with relevant skills',
    description: 'Analyze business data and prepare simple reports for the TCS team.',
    lastDate: '2026-11-20',
    applyLink: careerPage('TCS')
  },
  {
    title: 'Backend Intern',
    company: 'Flipkart',
    location: 'Bangalore',
    type: 'Internship',
    salary: '₹25,000 / month',
    eligibility: 'Final year students can apply',
    description: 'Internship on APIs and databases for the Flipkart engineering team.',
    lastDate: '2026-10-31',
    applyLink: careerPage('Flipkart')
  },
  {
    title: 'QA Tester',
    company: 'Wipro',
    location: 'Hyderabad',
    type: 'Full-time',
    salary: '₹5-8 LPA',
    eligibility: 'BCA/B.Sc Computer Science',
    description: 'Test web applications and report bugs before release.',
    lastDate: '2026-12-01',
    applyLink: careerPage('Wipro')
  },
  {
    title: 'Part Time Content Writer',
    company: 'Swiggy',
    location: 'Remote',
    type: 'Part-time',
    salary: '₹20,000 / month',
    eligibility: 'Freshers welcome',
    description: 'Write short job and product descriptions that students can understand.',
    lastDate: '2026-11-15',
    applyLink: careerPage('Swiggy')
  },
  {
    title: 'Cloud Support Engineer',
    company: 'Amazon',
    location: 'Delhi',
    type: 'Full-time',
    salary: '₹10-16 LPA',
    eligibility: 'B.Tech/B.E. in CSE/IT/ECE',
    description: 'Help customers run applications on the cloud.',
    lastDate: '2026-12-10',
    applyLink: careerPage('Amazon')
  },
  {
    title: 'UI Designer',
    company: 'Adobe',
    location: 'Remote',
    type: 'Remote',
    salary: '₹8-14 LPA',
    eligibility: 'Any Graduate with relevant skills',
    description: 'Design simple and clear screens for student-facing products.',
    lastDate: '2026-11-25',
    applyLink: careerPage('Adobe')
  }
];

module.exports = sampleJobs;
