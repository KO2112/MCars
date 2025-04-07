// components/Navbar.tsx
"use client";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import useAuth from "../hooks/useAuth"; // Import the custom hook
import Link from "next/link"; // Use Next.js Link for routing

export default function Navbar() {
  const { user } = useAuth(); // Get the current user from the custom hook

  const handleSignOut = async () => {
    await signOut(auth); // Sign out the user
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo or Brand Name */}
        <div className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-200 transition duration-300 ease-in-out">
            Premium Auto Deals
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {/* Link to the Cars page */}
          <Link href="/cars" className="hover:text-gray-200 transition duration-300 ease-in-out text-lg">
            Cars
          </Link>
          <Link href="/about" className="hover:text-gray-200 transition duration-300 ease-in-out text-lg">
            About
          </Link>
          <Link href="/warranty" className="hover:text-gray-200 transition duration-300 ease-in-out text-lg">
            Warranty
          </Link>
          <Link href="/contact" className="hover:text-gray-200 transition duration-300 ease-in-out text-lg">
            Contact Us
          </Link>

          {/* Conditionally render Add Car link if the user is signed in */}
          {user && (
            <Link href="/add-car" className="hover:text-gray-200 transition duration-300 ease-in-out text-lg">
              Add Car
            </Link>
          )}

          {/* Sign out or sign in button */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="text-lg text-red-500 hover:text-red-700 transition duration-300"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/loginn" className="hover:text-gray-200 transition duration-300 ease-in-out text-lg">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            type="button"
            className="text-white focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
