// components/WhyChooseUs.tsx
"use client";

import { Star, MapPin, Truck, Wallet, ShieldCheck, Handshake } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Star,
      color: "amber", // Softer amber for reviews
      title: "Trusted by Reviews",
      description: "Our commitment to excellence shines through in our customer feedback. See why buyers consistently rate us 5-stars.",
    },
    {
      icon: MapPin,
      color: "blue", // Your primary brand blue
      title: "Prime Leicester Location",
      description: "Easily access our modern showroom in Leicester, with convenient parking and public transport links.",
    },
    {
      icon: Truck,
      color: "green", // Softer green for direct drive-away
      title: "Instant Drive-Away",
      description: "Found your perfect car? Drive it home today! Our efficient process ensures quick and easy collection.",
    },
    {
      icon: Wallet,
      color: "purple", // Softer purple for transparent pricing
      title: "Transparent Pricing",
      description: "No hidden fees, no haggling. Just straightforward, competitive pricing from the start.",
    },
    {
      icon: ShieldCheck,
      color: "red", // A clear, confident red for quality
      title: "Quality Assured Vehicles",
      description: "Every car undergoes rigorous multi-point inspections for peace of mind and long-term reliability.",
    },
    {
      icon: Handshake,
      color: "cyan", // A friendly cyan for support
      title: "Dedicated Customer Support",
      description: "Our friendly experts are here to guide you, offering personalized advice and seamless service.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative"> {/* Clean white background */}
      {/* Subtle, soft background element - removed the techy blur */}
      <div className="absolute inset-0 bg-[radial-gradient(#f0f0f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Your Journey, Our Commitment</p>
          <h2 className="text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
            Why Choose <span className="text-blue-700">IRONSAUTO?</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Experience the IRONSAUTO difference. We are dedicated to delivering not just cars, but complete satisfaction.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted to 3 columns for 6 features */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-xl p-8 shadow-lg border border-gray-100 flex flex-col items-start transition-all duration-300 transform hover:scale-102 hover:shadow-xl hover:border-blue-500"
            >
              <div
                className={`flex items-center justify-center p-4 rounded-full mb-6 
                bg-${feature.color}-100 text-${feature.color}-600 group-hover:bg-${feature.color}-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-110`}
              >
                <feature.icon size={32} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{feature.title}</h3>
              <p className="text-gray-700 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}