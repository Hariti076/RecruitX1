import { Link } from 'react-router-dom';

function Footer() {
  function goToJobs(e) {
    e.preventDefault();
    const section = document.getElementById('jobs-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.location.href = '/#jobs-section';
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>RecruitX</h3>
          <p>India's #1 job portal for students and fresh graduates. Find your dream opportunity today.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#jobs-section" onClick={goToJobs}>Browse Jobs</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#jobs-section" onClick={goToJobs}>FAQ</a></li>
            <li><a href="#jobs-section" onClick={goToJobs}>Contact Us</a></li>
            <li><a href="#jobs-section" onClick={goToJobs}>Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li><i className="fas fa-envelope"></i> student@recruitx.com</li>
            <li><i className="fas fa-phone"></i> +91 9876543210</li>
            <li><i className="fas fa-map-marker-alt"></i> Bangalore, India</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 RecruitX. All rights reserved. Made with ❤️ for students</p>
      </div>
    </footer>
  );
}

export default Footer;
