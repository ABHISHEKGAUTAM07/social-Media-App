// src/components/MyPosts.jsx
import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

function MyPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'posts'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <h2>My Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" className="post-img" />}
        </div>
      ))}
    </div>
  );
}

export default MyPosts;
