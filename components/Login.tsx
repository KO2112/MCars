"use client"; // Ensures this is a client-side component

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation"; // Change import to 'next/navigation' instead of 'next/router'
import { FirebaseError } from "firebase/app"; // Import FirebaseError

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false); // Track if it's client-side

  const router = useRouter(); // Place useRouter at the top so we can use it throughout the component

  useEffect(() => {
    setIsClient(true); // Set true once the component is mounted client-side
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors before attempting to sign in
    setError("");

    try {
      // Attempt to sign in with Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Check if login was successful
      if (userCredential?.user) {
        setError(""); // Clear any errors before redirect
        router.push("/"); // Redirect to home page after successful login
      } else {
        setError("Failed to sign in. Please check your credentials.");
      }
    } catch (error: unknown) {
      // Perform type narrowing on the error variable
      if (error instanceof FirebaseError) {
        // If it's a FirebaseError, handle it
        if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
          setError("Failed to sign in. Please check your credentials.");
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
      } else {
        // If it's not a FirebaseError, show a generic message
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  if (!isClient) return null; // Return null until it's mounted on the client

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
