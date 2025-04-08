"use client";

import { Phone, Mail } from "lucide-react";

export default function ContactUsSection() {
  return (
    <div className="relative py-1 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-black mb-8">Contact Us</h2>
      
      <div className="bg-white rounded-xl overflow-hidden shadow-lg mx-auto">
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600">
              We are here to help with any questions about our vehicles.
              Feel free to reach out using the contact details below.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email Contact */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <Mail className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Email Address</p>
                <a href="mailto:makgun.uk@gmail.com" className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                  makgun.uk@gmail.com
                </a>
              </div>
            </div>
            
            {/* Phone Contact */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <Phone className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                <a href="tel:+447476866745" className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                  +44 7476 866745
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Our team is available Monday through Friday, 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}