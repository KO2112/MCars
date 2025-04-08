"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import useAuth from "../hooks/useAuth";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await signOut(auth);
    setMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-900">MA<span className="text-blue-600">Cars</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/cars" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
              Cars
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
              Contact
            </Link>

            {/* Conditionally render Add Car link if the user is signed in */}
            {user && (
              <Link href="/add-car" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">
                Add Car
              </Link>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:block">
            {user ? (
              <button
                onClick={handleSignOut}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/loginn"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white shadow-lg overflow-hidden transition-all duration-300"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              <Link
                href="/cars"
                className="text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cars
              </Link>
              
              <Link
                href="/contact"
                className="text-gray-900 py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>

              {user && (
                <Link
                  href="/add-car"
                  className="text-gray-900 py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Car
                </Link>
              )}

              {/* Auth Button - Mobile */}
              <div className="py-3">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/loginn"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-center transition-colors duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}