import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import emailjs from 'emailjs-com';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, resetPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const generateRandomPassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);

      // Generate a random password
      const newPassword = generateRandomPassword();

      // Send the new password via email
      emailjs.send('service_ybddwyq', 'template_gmviodu', {
        user_email: email,
        new_password: newPassword,
      }, '5sALWkTGXY6_9jrdY')
      .then((result) => {
          console.log(result.text);
          alert('Password reset email sent. Please check your inbox.');
      }, (error) => {
          console.log(error.text);
      });

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="dropdown-form">
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
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <form onSubmit={handleResetPassword}>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default LoginForm;