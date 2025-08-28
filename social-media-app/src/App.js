import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreatePost from './components/CreatePost';
import PostFeed from './components/PostFeed';
import MyPosts from './components/MyPosts'; // ✅ Import
function Home() {
  return (
    <div className="container">
      <h2>Welcome to SocialApp</h2>
      <p>Connect with the world and share your thoughts!</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<PostFeed />} />
        <Route path="/my-posts" element={<MyPosts />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
