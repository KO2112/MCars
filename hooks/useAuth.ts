import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the logged-in user
    });

    return unsubscribe; // Cleanup listener when the component is unmounted
  }, []);

  return { user };
};

export default useAuth;
