import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        navigate('/login');
      })
      .catch((error) => {
        alert("Error logging out: " + error.message);
      });
  };

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'posts'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(userPosts);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="container">
      <h2>👋 Welcome to your Dashboard!</h2>
      <p><strong>Email:</strong> {user?.email}</p>

      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
        Logout
      </button>

      <h3>📝 My Posts</h3>
      {posts.length === 0 ? (
        <p>You haven’t posted anything yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <h4>{post.title}</h4>
            <p>{post.content}</p>
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                className="post-img"
                style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
