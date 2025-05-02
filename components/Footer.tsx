"use client";

import Link from "next/link";
import { Phone, Mail, Facebook, Instagram, Twitter, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">IRONSAUTO</h2>
            <p className="text-gray-300">
              Your trusted partner for quality used cars in Leicester since 2015.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-blue-400">
                <Facebook size={20} />
              </Link>
              <Link href="https://instagram.com" className="hover:text-pink-400">
                <Instagram size={20} />
              </Link>
              <Link href="https://twitter.com" className="hover:text-blue-300">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-gray-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cars" className="hover:text-gray-300 transition">
                  Cars
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <Phone size={16} />
                <span>+44 7476 866745</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@ironsauto.co.uk</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} />
                <span>
                  101-103 Margaret Road
                  <br />
                  Leicester, LE5 5FW
                  <br />
                  United Kingdom
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} IronsAuto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}