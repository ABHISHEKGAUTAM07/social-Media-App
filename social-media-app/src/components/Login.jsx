import '../style.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

// 🌄 Apply full-page background from public/bg.jpg
const pageStyle = {
  backgroundImage: "url('/bg.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div style={pageStyle}>
      <div className="container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="app-title">Connect with the world</h1>
        <h2 style={{ textAlign: "center", color: "#333" }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
