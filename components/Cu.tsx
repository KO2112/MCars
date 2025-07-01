// components/ContactUsSection.tsx
"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactUsSection() {
  return (
    <section className="relative py-16 px-4 bg-gray-900 text-white overflow-hidden"> {/* Reduced vertical padding */}
      {/* Background overlay/gradient for depth - consistent with WhyChooseUs and AboutUs */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950 opacity-90 z-0"></div>
      
      {/* Dynamic background element - consistent with WhyChooseUs and AboutUs */}
      {/* Moved slightly to avoid overlapping header on smaller sections, adjusted size/opacity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-blue-700 blur-[120px] opacity-15 rounded-full z-0 animate-pulse-slow"></div>

      <div className="max-w-5xl mx-auto relative z-10"> {/* Slightly reduced max-width */}
        <div className="text-center mb-12"> {/* Reduced bottom margin */}
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Get in Touch</p> {/* Reduced bottom margin */}
          <h2 className="text-4xl font-bold text-white leading-tight mb-3"> {/* Smaller font size, reduced bottom margin */}
            Have Questions? <span className="text-blue-500">We are Here to Help.</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-xl mx-auto"> {/* Smaller font size, reduced max-width */}
            Whether you are curious about a car, need assistance, or just want to chat, reaching us is easy.
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10 border border-gray-700"> {/* Smaller padding, less rounded */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Tighter gap */}
            {/* Phone Contact */}
            <a
              href="tel:+447467866745"
              className="group flex flex-col items-center p-5 bg-gray-700 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-700/50 border border-gray-600" /* Smaller padding, less aggressive hover */
            >
              <div className="bg-blue-600 p-3 rounded-full mb-3 transition-all duration-300 group-hover:bg-blue-500 group-hover:scale-105"> {/* Smaller icon circle */}
                <Phone className="h-6 w-6 text-white" strokeWidth={2} /> {/* Smaller icon size */}
              </div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Call Us Directly</p> {/* Smaller text */}
              <h3 className="text-xl font-bold text-white mb-1">+44 7467 866745</h3> {/* Smaller text */}
              <span className="text-blue-400 font-semibold text-xs flex items-center"> {/* Smaller text */}
                Get Instant Support
              </span>
            </a>

            {/* Email Contact */}
            <a
              href="mailto:info@ironsauto.co.uk"
              className="group flex flex-col items-center p-5 bg-gray-700 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-700/50 border border-gray-600"
            >
              <div className="bg-green-600 p-3 rounded-full mb-3 transition-all duration-300 group-hover:bg-green-500 group-hover:scale-105">
                <Mail className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Send Us an Email</p>
              <h3 className="text-xl font-bold text-white mb-1">info@ironsauto.co.uk</h3>
              <span className="text-green-400 font-semibold text-xs flex items-center">
                We Reply Promptly
              </span>
            </a>

            {/* Visit Us Card */}
            <a
              href="/contact#location"
              className="group flex flex-col items-center p-5 bg-gray-700 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-700/50 border border-gray-600"
            >
              <div className="bg-purple-600 p-3 rounded-full mb-3 transition-all duration-300 group-hover:bg-purple-500 group-hover:scale-105">
                <MapPin className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Visit Our Showroom</p>
              <h3 className="text-xl font-bold text-white mb-1">Leicester, UK</h3>
              <span className="text-purple-400 font-semibold text-xs flex items-center">
                Find Directions
              </span>
            </a>
          </div>
          
          <div className="mt-10 text-center"> {/* Reduced top margin */}
            <h4 className="text-xl font-bold text-white mb-3">Opening Hours</h4> {/* Smaller text */}
            <p className="text-gray-300 text-base mb-1"> {/* Smaller text, reduced margin */}
              **Monday - Friday:** 9:00 AM - 6:00 PM
            </p>
            <p className="text-gray-300 text-base"> {/* Smaller text */}
              **Saturday:** 10:00 AM - 4:00 PM | **Sunday:** Closed
            </p>
            <p className="text-gray-500 text-sm mt-3"> {/* Reduced top margin */}
              *Appointments outside these hours may be available upon request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Custom animation for pulse-slow (if not already defined in your global CSS or Tailwind config)
// @keyframes pulse-slow {
//   0%, 100% {
//     transform: scale(0.95) translate(-50%, -50%);
//     opacity: 0.2;
//   }
//   50% {
//     transform: scale(1.05) translate(-50%, -50%);
//     opacity: 0.3;
//   }
// }
// .animate-pulse-slow {
//   animation: pulse-slow 8s infinite ease-in-out;
// }