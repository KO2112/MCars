"use client";

import { Shield, Award, Settings, Users, Clock, CheckCircle, MapPin, HeartHandshake } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">About IronsAuto</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect vehicle since 2010
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Company Story */}
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Leicester Premier Auto Dealership
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              At IronsAuto, we believe that buying a car should be one of lifes great experiences. Since our foundation in 2010, we have helped thousands of customers find their perfect vehicle, combining exceptional customer service with an outstanding selection of quality cars.
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
              Based in Leicester, our state-of-the-art showroom features a handpicked selection of premium vehicles. Our expert team is passionate about cars and committed to providing honest, professional advice to help you make the right choice for your needs and budget.
            </p>

            {/* Mission Statement */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded shadow-sm mb-8">
              <h4 className="font-semibold text-gray-900 mb-2">Our Mission</h4>
              <p className="text-gray-700 italic">
                To provide our customers with the highest quality vehicles and service, ensuring complete satisfaction and building long-lasting relationships based on trust and integrity.
              </p>
            </div>

            {/* Core Values */}
            <h4 className="font-semibold text-gray-900 mb-4 text-xl">Our Core Values</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Shield className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Quality Assurance</h4>
                  <p className="text-gray-600 text-sm">All our vehicles undergo rigorous inspection before sale</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Award className="text-amber-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Award-Winning Service</h4>
                  <p className="text-gray-600 text-sm">Multi-year recipient of Dealership Excellence Award</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Settings className="text-green-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Expert Technicians</h4>
                  <p className="text-gray-600 text-sm">Factory-trained specialists for comprehensive servicing</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <HeartHandshake className="text-purple-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Community Focus</h4>
                  <p className="text-gray-600 text-sm">Proud to support local charities and events</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Testimonial */}
          <div className="lg:col-span-5">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="inline-block bg-blue-100 p-3 rounded-full mb-4">
                  <Clock className="text-blue-600" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="inline-block bg-green-100 p-3 rounded-full mb-4">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">2,500+</div>
                <div className="text-sm text-gray-600">Cars Sold</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="inline-block bg-amber-100 p-3 rounded-full mb-4">
                  <Users className="text-amber-600" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                <div className="text-sm text-gray-600">Satisfied Customers</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="inline-block bg-purple-100 p-3 rounded-full mb-4">
                  <MapPin className="text-purple-600" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">1</div>
                <div className="text-sm text-gray-600">Prime Location</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
              <svg className="w-12 h-12 text-white opacity-20 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-white/90 italic mb-4 leading-relaxed">
                The team at IronsAuto made buying my new car such a pleasant experience. Their knowledge, patience and no-pressure approach was exactly what I was looking for. I could not be happier with my purchase!
              </p>
              <div className="font-semibold">Sarah Thompson</div>
              <div className="text-white/70 text-sm">Loyal Customer since 2018</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}