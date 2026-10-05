import axios from 'axios';

// Local Vite proxies /api to the Express server. On Vercel, /api is the same site.
export const API_URL = '/api';

// Token saved at login is sent with protected requests
export function authHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

export async function getJobs(search = '', location = '', type = '') {
  const response = await axios.get(`${API_URL}/jobs`, {
    params: { search, location, type }
  });
  return response.data;
}
