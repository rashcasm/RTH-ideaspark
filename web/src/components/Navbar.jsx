import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('http://localhost:5000/user-role', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email }),
        });
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    if (user) {
      fetchUserRole();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  return (
    <nav className="navbar">
      {/* Company Logo and Name */}
      <div className="navbar-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Company Logo" className="logo" />
        <span className="company-name">Idea Spark</span>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/idea-submission">Submit Idea</Link></li>
        <li><Link to="/idea-bot">Idea-Bot 🤖</Link></li>
        {role === 'admin' && (
          <li><Link to="/idea-verification">Verify Idea</Link></li>
        )}
        <li><Link to="/find-mentor">Find Mentor</Link></li>
        {user ? (
          <>
            <li><button onClick={handleProfileClick}>Welcome, {user.name}</button></li>
            <li><button onClick={handleLogout}>Logout</button></li>
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
};

export default Navbar;