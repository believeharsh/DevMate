import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCOPQv2RYxsQbgSoLYj-zcrvoDkEYegn9Q",
  authDomain: "devtime-companion.firebaseapp.com",
  projectId: "devtime-companion",
  storageBucket: "devtime-companion.firebasestorage.app",
  messagingSenderId: "130738325645",
  appId: "1:130738325645:web:73373b7ef12607ce65bac4",
  measurementId: "G-RGRG52QBTK"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app); 
const db = getFirestore(app)


export { auth, db, analytics }; 
