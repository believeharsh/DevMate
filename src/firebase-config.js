import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCOPQv2RYxsQbgSoLYj-zcrvoDkEYegn9Q",
  authDomain: "DevMate.firebaseapp.com",
  projectId: "DevMate",
  storageBucket: "DevMate.firebasestorage.app",
  messagingSenderId: "130738325645",
  appId: "1:130738325645:web:73373b7ef12607ce65bac4",
  measurementId: "G-RGRG52QBTK"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app); // ✅ Initialize Auth
const db = getFirestore(app); // ✅ Optional: Initialize Firestore

export { auth, db, analytics }; // ✅ Export them for use
