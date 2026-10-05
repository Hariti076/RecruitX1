import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL, authHeader, getJobs } from '../api';

function Dashboard({ user }) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        setError('Could not load dashboard data.');
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!user) return;

    async function loadApplications() {
      try {
        const response = await axios.get(`${API_URL}/applications`, { headers: authHeader() });
        setApplications(response.data);
      } catch (err) {
        setError('Could not load your applications.');
      }
    }
    loadApplications();
  }, [user]);

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Login required</h2>
          <p>Dashboard is available after login.</p>
          <Link className="btn btn-primary" to="/login">Go to Login</Link>
        </div>
      </div>
    );
  }

  const companies = [...new Set(jobs.map((job) => job.company))];

  return (
    <div className="dashboard">
      <h2>Hello, {user.name}</h2>
      <p className="muted">{user.email}</p>
      {error && <p className="error">{error}</p>}

      <div className="dash-stats">
        <div className="stat-item">
          <div className="stat-number">{jobs.length}</div>
          <div className="stat-label">Jobs in database</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{companies.length}</div>
          <div className="stat-label">Companies</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{applications.length}</div>
          <div className="stat-label">My applications</div>
        </div>
      </div>

      <h3>My applications</h3>
      {applications.length === 0 ? (
        <p className="empty">You have not applied yet. Open Jobs and click Apply.</p>
      ) : (
        <ul className="apply-list">
          {applications.map((item) => (
            <li key={item._id}>
              <strong>{item.job ? item.job.title : 'Job removed'}</strong>
              {item.job && (
                <span> — {item.job.company}, {item.job.location}</span>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="dash-actions">
        <Link className="btn btn-primary" to="/">View Jobs</Link>
        {user.role === 'admin' && (
          <Link className="btn btn-primary" to="/add-job">Add Job</Link>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
