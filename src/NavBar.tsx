import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

