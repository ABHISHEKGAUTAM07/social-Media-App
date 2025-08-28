import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
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
      <h2>Latest Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to share something!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt="Post"
                className="post-img"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  marginTop: '10px'
                }}
              />
            )}

            <p style={{ fontSize: '13px', color: '#666', marginTop: '10px' }}>
              Posted by: {post.userEmail}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default PostFeed;
