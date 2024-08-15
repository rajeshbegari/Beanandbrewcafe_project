// src/components/GetToken.js
import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import auth from Firebase configuration
import { signInWithEmailAndPassword } from 'firebase/auth';

const GetToken = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInAndGetToken = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      console.log('Token:', token);
      return token;
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInAndGetToken();
  };

  return (
    <div>
      <h2>Get Firebase Token</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Get Token</button>
      </form>
    </div>
  );
};

export default GetToken;