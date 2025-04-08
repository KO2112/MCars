"use client";

import { useState } from "react";
import { Mail, Phone } from "lucide-react";

export default function ContactUs() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "support@premiumautodeals.com";
  const phone = "(123) 456-7890";

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-xl mx-auto">
            We're here to answer any questions about our premium vehicles
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-blue-700" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Email Us</h2>
            </div>
            <p className="text-gray-600 mb-6">
              For inquiries about vehicles, financing options, or general questions
            </p>
            <div className="flex flex-col space-y-3">
              <div className="group bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <a href={`mailto:${email}`} className="text-blue-700 hover:text-blue-900 font-medium">
                  {email}
                </a>
                <button 
                  onClick={() => copyToClipboard(email, 'email')}
                  className="bg-white p-2 rounded-md shadow-sm hover:bg-blue-100 transition-colors"
                >
                  {copiedEmail ? (
                    <span className="text-green-600 text-sm font-medium">Copied!</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-indigo-700" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Call Us</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Speak directly with our sales team for immediate assistance
            </p>
            <div className="flex flex-col space-y-3">
              <div className="group bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <a href={`tel:${phone}`} className="text-indigo-700 hover:text-indigo-900 font-medium">
                  {phone}
                </a>
                <button 
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="bg-white p-2 rounded-md shadow-sm hover:bg-indigo-100 transition-colors"
                >
                  {copiedPhone ? (
                    <span className="text-green-600 text-sm font-medium">Copied!</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Business Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-3 px-4 bg-white rounded-md shadow-sm">
              <span className="font-medium text-gray-700">Monday - Friday</span>
              <span className="text-gray-600">9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex justify-between py-3 px-4 bg-white rounded-md shadow-sm">
              <span className="font-medium text-gray-700">Saturday</span>
              <span className="text-gray-600">10:00 AM - 5:00 PM</span>
            </div>
            <div className="flex justify-between py-3 px-4 bg-white rounded-md shadow-sm md:col-span-2">
              <span className="font-medium text-gray-700">Sunday</span>
              <span className="text-gray-600">Closed</span>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            We typically respond to inquiries within 24 hours during business days.
          </p>
        </div>
      </div>
    </div>
  );
}