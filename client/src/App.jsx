import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import AddJob from './pages/AddJob';
import Dashboard from './pages/Dashboard';

function App() {
  // Shared login state. Passed to pages as props.
  const [user, setUser] = useState(null);

  // Restore the user after a page refresh
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/" element={<Jobs user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-job" element={<AddJob user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
