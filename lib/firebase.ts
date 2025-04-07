import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Import Firebase Storage

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCTQf0ET3LcDdqRa__9V6KdCQa9oNALTcY",
  authDomain: "mcars-d8e7a.firebaseapp.com",
  projectId: "mcars-d8e7a",
  storageBucket: "mcars-d8e7a.appspot.com",
  messagingSenderId: "404603535310",
  appId: "1:404603535310:web:38b1c4ab8d5ed33d2db325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Firebase Authentication
const db = getFirestore(app);  // Initialize Firestore
const storage = getStorage(app);  // Initialize Firebase Storage

// Export auth, db, and storage
export { auth, db, storage };
