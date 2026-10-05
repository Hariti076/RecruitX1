import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, authHeader } from '../api';
import JobCard from '../components/JobCard';

function Jobs({ user }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [totals, setTotals] = useState({ jobs: 0, companies: 0 });

  async function fetchJobs(searchText = '', locationText = '', typeText = '') {
    try {
      const response = await axios.get(`${API_URL}/jobs`, {
        params: { search: searchText, location: locationText, type: typeText }
      });
      setJobs(response.data);
      setMessage('');
      if (!searchText && !locationText && !typeText) {
        const companies = new Set(response.data.map((job) => job.company));
        setTotals({ jobs: response.data.length, companies: companies.size });
      }
    } catch (error) {
      setMessage('Could not load jobs. Start MongoDB and the server first.');
    }
  }

  async function fetchApplications() {
    if (!user) {
      setAppliedIds([]);
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/applications`, { headers: authHeader() });
      const ids = response.data.map((item) => item.job && item.job._id).filter(Boolean);
      setAppliedIds(ids);
    } catch (error) {
      setAppliedIds([]);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [user]);

  function scrollToJobs() {
    document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchJobs(search, location, type);
    scrollToJobs();
  }

  function handleFilterSearch(e) {
    const value = e.target.value;
    setSearch(value);
    fetchJobs(value, location, type);
  }

  function quickSearch(term) {
    const typeMatch = term === 'Internship' ? 'Internship' : term === 'Remote' ? 'Remote' : '';
    const locationMatch = term === 'Remote' || term === 'Work From Home' ? 'Remote' : '';
    setSearch(term);
    setType(typeMatch);
    setLocation(locationMatch);
    fetchJobs(term, locationMatch, typeMatch);
    scrollToJobs();
  }

  function handleTypeChange(e) {
    const value = e.target.value;
    setType(value);
    fetchJobs(search, location, value);
  }

  function handleLocationChange(e) {
    const value = e.target.value;
    setLocation(value);
    fetchJobs(search, value, type);
  }

  async function handleApply(job) {
    // Company career page opens from the link. This part saves it on the dashboard.
    if (!user) {
      navigate('/login', { state: { jobId: job._id } });
      return;
    }

    if (appliedIds.includes(job._id)) {
      return;
    }

    try {
      await axios.post(`${API_URL}/applications`, { jobId: job._id }, { headers: authHeader() });
      setAppliedIds([...appliedIds, job._id]);
      setMessage('Saved on your dashboard. The company job portal opened in a new tab.');
    } catch (error) {
      const text = error.response?.data?.message || '';
      if (text.toLowerCase().includes('already')) {
        setAppliedIds([...appliedIds, job._id]);
        return;
      }
      setMessage(text || 'Could not apply');
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm('Delete this job?');
    if (!ok) return;

    try {
      await axios.delete(`${API_URL}/jobs/${id}`, { headers: authHeader() });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      setMessage(error.response?.data?.message || 'Delete failed. Please login.');
    }
  }

  return (
    <div>
      <div className="hero">
        <div className="hero-content">
          <h1>Find <span>Internships & Jobs</span> for Students</h1>
          <p>Thousands of opportunities waiting for you. Start your career journey today!</p>

          <form className="search-box" onSubmit={handleSearch}>
            <div className="search-input">
              <i className="fas fa-search"></i>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search internships, jobs..."
              />
            </div>
            <div className="search-input">
              <i className="fas fa-map-marker-alt"></i>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location (or Remote)"
              />
            </div>
            <button className="btn btn-primary search-btn" type="submit">Search</button>
          </form>

          <div className="popular-searches">
            <span>Popular:</span>
            <button type="button" onClick={() => quickSearch('Internship')}>Internship</button>
            <button type="button" onClick={() => quickSearch('Part Time')}>Part Time</button>
            <button type="button" onClick={() => quickSearch('Remote')}>Remote</button>
            <button type="button" onClick={() => quickSearch('Fresh Graduate')}>Fresh Graduate</button>
            <button type="button" onClick={() => quickSearch('Work From Home')}>Work From Home</button>
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-number">{totals.jobs}+</div>
          <div className="stat-label">Jobs Available</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{totals.companies}+</div>
          <div className="stat-label">Companies</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Active Students</div>
        </div>
      </div>

      <section id="jobs-section" className="jobs-section">
        <div className="jobs-header">
          <h2><i className="fas fa-briefcase"></i>Available Jobs</h2>
          <div className="jobs-filters">
            <input
              className="filter-select filter-search"
              type="text"
              value={search}
              onChange={handleFilterSearch}
              placeholder="Search jobs..."
            />
            <select className="filter-select" value={type} onChange={handleTypeChange}>
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
            <select
              className="filter-select"
              value={['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Remote'].includes(location) ? location : ''}
              onChange={handleLocationChange}
            >
              <option value="">All Locations</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        {message && <p className="info center">{message}</p>}

        {jobs.length === 0 ? (
          <p className="empty">No jobs found.</p>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                user={user}
                applied={appliedIds.includes(job._id)}
                onApply={handleApply}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Jobs;
