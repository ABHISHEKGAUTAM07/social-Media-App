import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        imageUrl,
        createdAt: serverTimestamp(),
        userId: user.uid,
        userEmail: user.email,
      });

      alert('Post created successfully!');
      navigate('/view-posts');
    } catch (err) {
      alert('Error creating post: ' + err.message);
    } finally {
      setLoading(false); // ✅ ensures button resets
    }
  };

  return (
    <div className="container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <input
          type="text"
          placeholder="Paste image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Posting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
