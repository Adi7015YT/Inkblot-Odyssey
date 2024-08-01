// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = () => {
  const handleLogout = async () => {
    await auth.signOut();
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {auth.currentUser ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
