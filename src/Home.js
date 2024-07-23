// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h2>Home</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
