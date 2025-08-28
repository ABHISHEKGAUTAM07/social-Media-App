import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
        <span>SocialApp</span>
      </div>

      <ul className="navbar-links">
        <li className={isActive('/')}>
          <Link to="/">Home</Link>
        </li>
        <li className={isActive('/register')}>
          <Link to="/register">Register</Link>
        </li>
        <li className={isActive('/login')}>
          <Link to="/login">Login</Link>
        </li>
        <li className={isActive('/dashboard')}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={isActive('/create-post')}>
          <Link to="/create-post">Create Post</Link>
        </li>
        <li className={isActive('/posts')}>
          <Link to="/posts">View Posts</Link>
        </li>
        <li className={isActive('/my-posts')}>
          <Link to="/my-posts">My Posts</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
