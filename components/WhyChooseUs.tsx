// components/WhyChooseUs.tsx
"use client";

import { MapPin, Star, Truck, PoundSterling } from "lucide-react";


export default function WhyChooseUs() {
  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MACars</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the top reasons to buy your next car from MACars
          </p>
        </div>

        {/* Feature Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Reviews Box */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col h-full">
            <div className="rounded-full bg-amber-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Star className="text-amber-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Reviews</h3>
            <p className="text-gray-600 flex-grow">
              We pride ourselves on our high standard of customer service. But do not just take our word for it, read our customer reviews.
            </p>
            
          </div>

          {/* Our Location Box */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col h-full">
            <div className="rounded-full bg-blue-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Location</h3>
            <p className="text-gray-600 flex-grow">
              Visit our convenient showroom located in the heart of Leicester. Easy to access with ample parking and close to public transport links.
            </p>
            
          </div>

          {/* Instant Drive-away Box */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col h-full">
            <div className="rounded-full bg-green-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Truck className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Drive-away</h3>
            <p className="text-gray-600 flex-grow">
              Complete your purchase in just a few hours; our cars are ready for immediate collection.
            </p>
            
          </div>

          {/* Transparent Pricing Box */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col h-full">
            <div className="rounded-full bg-purple-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <PoundSterling className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent Pricing</h3>
            <p className="text-gray-600 flex-grow">
              Enjoy our lowest prices without any awkward negotiations, high mark-ups, or pressure to buy.
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
}