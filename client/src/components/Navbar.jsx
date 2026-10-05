import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === '/';

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  }

  function goToJobs(e) {
    e.preventDefault();
    if (!onHome) {
      navigate('/');
      setTimeout(() => {
        document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }
    document.getElementById('jobs-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RecruitX</Link>
      </div>
      <ul className="nav-menu">
        <li><Link to="/" className={onHome ? 'active' : ''}>Home</Link></li>
        <li><a href="#jobs-section" onClick={goToJobs}>Jobs</a></li>
        {user && user.role === 'admin' && (
          <li><Link to="/add-job">Add Job</Link></li>
        )}
        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              <button className="link-btn" onClick={handleLogout}>
                Logout ({user.name})
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
