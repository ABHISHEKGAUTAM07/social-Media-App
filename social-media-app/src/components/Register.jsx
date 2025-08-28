import '../style.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

// 🌄 Background image applied here (from public folder)
const pageStyle = {
  backgroundImage: "url('/bg.jpg')", // Image must be in public/bg.jpg
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully!");
      navigate('/login'); // Redirect to login
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={pageStyle}>
      <div className="container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="app-title">Connect with the world</h1>
        <h2 style={{ textAlign: "center", color: "#333" }}>Register</h2>
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
        <button onClick={handleRegister}>Register</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
