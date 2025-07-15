// src/components/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import confetti from 'canvas-confetti';
// import './AdminLogin.css';  // import the animation styles

const AdminLogin = () => {
  const [username, setUsername]     = useState('');
  const [password, setPassword]     = useState('');
  const [error, setError]           = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome]   = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/admin/login', { username, password })
      .then((response) => {
        // store token
        localStorage.setItem('token', response.data.token);

        // confetti
        confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });

        // show welcome modal
        setShowWelcome(true);
      })
      .catch((err) => {
        console.error('Login failed:', err);
        setError(err.response?.data?.message || 'Login failed');
      });
  };

  // once the welcome modal is shown, redirect after 3s
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        window.location.href = '/admin';
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginForm}>
        <h2>Admin Login</h2>
        {error && <p style={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleLogin}>
          <div>
            <label style={styles.label}>Username:</label>
            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={styles.passwordField}>
            <label style={styles.label}>Password:</label>
            <input
              style={styles.input}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(v => !v)}
              style={styles.eyeIcon}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>
      </div>

      {/* Welcome Modal */}
      <Modal show={showWelcome} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center">
          <h4>🎉 Welcome back!</h4>
          <p>We're glad to see you again.</p>
          <img
            src="/images/mickey.gif"
            alt="Welcome cartoon"
            className="thankyou-cartoon"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

const styles = {
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  loginForm: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  passwordField: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: '10px',
    top: '35px',
    cursor: 'pointer',
    fontSize: '20px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '20px',
  },
};

export default AdminLogin;
