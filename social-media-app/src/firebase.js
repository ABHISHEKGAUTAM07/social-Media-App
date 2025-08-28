// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAzjhhr9vPeMLPAJBx0tBUqAqrnl5bujEA",
  authDomain: "social-media-app-1f14c.firebaseapp.com",
  projectId: "social-media-app-1f14c",
  storageBucket: "social-media-app-1f14c.appspot.com",
  messagingSenderId: "885012442089",
  appId: "1:885012442089:web:29b5361de2efc06786f978"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Setup Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Export for use in other files
export { auth, db, storage };

