"use client";

import { Phone, Mail, Facebook, Instagram, Twitter, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        {/* Footer Top Section with Logo and Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">IRONSAUTO</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner for quality used cars in Leicester since 2015.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="/cars" className="text-gray-400 hover:text-white transition-colors">Cars</a>
              </li>
              
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>



          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-400 mr-2" />
                <a href="tel:+447476866745" className="text-gray-400 hover:text-white transition-colors">
                  +44 7476 866745
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-400 mr-2" />
                <a href="mailto:info@ironsauto.co.uk" className="text-gray-400 hover:text-white transition-colors">
                  info@ironsauto.co.uk
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-indigo-400 mr-2 mt-1" />
                <p className="text-gray-400">
                  101-103 Margaret Road
                  Leicester, LE5 5FW
                  <br />
                  LE5 5FW, United Kingdom
                </p>
              </div>
            </div>
          </div>
        </div>

        

        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MACars. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}