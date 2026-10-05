import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, authHeader } from '../api';

function Login({ setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pendingJobId = location.state?.jobId;
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/login`, form);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      // If Apply was clicked before login, save that job on the dashboard now.
      if (pendingJobId) {
        try {
          await axios.post(
            `${API_URL}/applications`,
            { jobId: pendingJobId },
            { headers: authHeader() }
          );
        } catch (applyError) {
          // Already applied is fine. Still open the dashboard.
        }
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>
          {pendingJobId
            ? 'Login to save this application on your dashboard. The company page opens in a new tab.'
            : 'Use the email and password you registered with.'}
        </p>

        {error && <p className="error">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="student@college.com"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />

        <button className="btn btn-primary" type="submit">Login</button>
        <p className="switch-link">
          New user? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
