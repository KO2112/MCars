import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // Import Firebase Storage

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDnfQA7HKv38dUjV3GyQoVkJOU7Kq5WqLc",
  authDomain: "mcars-546ff.firebaseapp.com",
  projectId: "mcars-546ff",
  storageBucket: "mcars-546ff.firebasestorage.app",
  messagingSenderId: "683879598241",
  appId: "1:404603535310:web:38b1c4ab8d5ed33d2db325"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Firebase Authentication
const db = getFirestore(app);  // Initialize Firestore
const storage = getStorage(app);  // Initialize Firebase Storage

// Export auth, db, and storage
export { auth, db, storage };
