"use client"

import { useState, useRef, useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import useAuth from "../hooks/useAuth"
import Link from "next/link"
import { Phone, Mail, Menu, X } from "lucide-react"

export default function Navbar() {
  const { user } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleSignOut = async () => {
    await signOut(auth)
    setMobileMenuOpen(false)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [mobileMenuOpen])

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      {/* Main Navbar with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-20">
            {/* Logo - Left */}
            <div className="flex-shrink-0 relative z-10">
              <Link href="/">
                <img src="/IRONSAUTO.png" alt="IronsAuto Logo" className="h-12 md:h-14 w-auto" />
              </Link>
            </div>

            {/* Navigation Links - Center */}
            <div className="hidden md:flex flex-grow items-center justify-center space-x-8">
              <Link
                href="/cars"
                className="text-white hover:text-blue-100 font-medium text-lg py-2 relative group transition-colors duration-200"
              >
                Cars
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-blue-100 font-medium text-lg py-2 relative group transition-colors duration-200"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/About"
                className="text-white hover:text-blue-100 font-medium text-lg py-2 relative group transition-colors duration-200"
              >
                About us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>

              {/* Conditionally render Add Car link if the user is signed in */}
              {user && (
                <Link
                  href="/add-car"
                  className="text-white hover:text-blue-100 font-medium text-lg py-2 relative group transition-colors duration-200"
                >
                  Add Car
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              )}
            </div>

            {/* Contact Info - Right */}
            <div className="hidden md:flex items-center space-x-6 text-white ml-auto">
              <a href="tel:+447476866745" className="flex items-center hover:text-blue-100 transition-colors">
                <Phone size={18} className="mr-2" />
                <span className="font-medium">+44 7476 866745</span>
              </a>
              <div className="h-6 w-px bg-blue-300/50"></div>
              <a href="mailto:info@ironsauto.co.uk" className="flex items-center hover:text-blue-100 transition-colors">
                <Mail size={18} className="mr-2" />
                <span className="font-medium">info@ironsauto.co.uk</span>
              </a>

              {/* Sign Out Button - Only if user is logged in */}
              {user && (
                <button
                  onClick={handleSignOut}
                  className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors ml-4"
                >
                  Sign Out
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center ml-auto">
              {/* Mobile Contact Icons */}
              <a href="tel:+447476866745" className="text-white p-2 mr-1">
                <Phone size={20} />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white focus:outline-none"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white shadow-xl overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/cars"
              className="text-gray-800 hover:text-blue-600 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Cars
            </Link>

            <Link
              href="/contact"
              className="text-gray-800 hover:text-blue-600 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact
            </Link>

            <Link
              href="/About"
              className="text-gray-800 hover:text-blue-600 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About Us
            </Link>

            {user && (
              <Link
                href="/add-car"
                className="text-gray-800 hover:text-blue-600 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-3 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Car
              </Link>
            )}

            {/* Contact Info in Mobile Menu */}
            <div className="border-t border-gray-100 pt-4 mt-2">
              <div className="text-sm text-gray-500 mb-2 px-4">Contact Us</div>
              <a
                href="tel:+447476866745"
                className="text-gray-800 hover:text-blue-600 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center"
              >
                <Phone size={16} className="mr-3 text-blue-500" />
                +44 7476 866745
              </a>
              <a
                href="mailto:info@ironsauto.co.uk"
                className="text-gray-800 hover:text-blue-600 py-3 px-4 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center"
              >
                <Mail size={16} className="mr-3 text-blue-500" />
                info@ironsauto.co.uk
              </a>
            </div>

            {/* Sign Out Button - Only if user is logged in */}
            {user && (
              <div className="border-t border-gray-100 pt-4 mt-2 px-4">
                <button
                  onClick={handleSignOut}
                  className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
