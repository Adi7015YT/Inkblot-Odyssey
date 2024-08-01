// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    auth.signInWithPopup(googleProvider)
      .then((result) => {
        console.log(result);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
