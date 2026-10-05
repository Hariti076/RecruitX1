import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, authHeader } from '../api';

const emptyForm = {
  title: '',
  company: '',
  location: '',
  type: 'Full-time',
  salary: '',
  eligibility: '',
  description: '',
  lastDate: '',
  applyLink: ''
};

function AddJob({ user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${API_URL}/jobs`, form, { headers: authHeader() });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not add job');
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2>Admin only</h2>
          <p>Students apply for jobs. Only the admin can add a job.</p>
          <Link className="btn btn-primary" to="/">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <form className="auth-card wide" onSubmit={handleSubmit}>
        <h2>Add Job</h2>
        <p>Saved in MongoDB and shown on the jobs page.</p>

        {error && <p className="error">{error}</p>}

        <label>Job Title</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Software Engineer" required />

        <label>Company</label>
        <input name="company" value={form.company} onChange={handleChange} placeholder="Infosys" required />

        <label>Location</label>
        <input name="location" value={form.location} onChange={handleChange} placeholder="Hyderabad" required />

        <label>Job Type</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        <label>Salary</label>
        <input name="salary" value={form.salary} onChange={handleChange} placeholder="₹6-10 LPA" />

        <label>Eligibility</label>
        <input name="eligibility" value={form.eligibility} onChange={handleChange} placeholder="B.Tech CSE/IT" />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short role description" />

        <label>Last date to apply</label>
        <input type="date" name="lastDate" value={form.lastDate} onChange={handleChange} />

        <label>Company career page</label>
        <input name="applyLink" value={form.applyLink} onChange={handleChange} placeholder="https://company.com/careers" />

        <button className="btn btn-primary" type="submit">Save Job</button>
      </form>
    </div>
  );
}

export default AddJob;
