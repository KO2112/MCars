// components/AboutUs.tsx
"use client";

import { Shield, Award, Users, Clock, CheckCircle, MapPin, HeartHandshake } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="py-20 px-4 bg-gray-50 relative overflow-hidden"> {/* Light gray background */}
      {/* Subtle, soft background element - consistent with WhyChooseUs */}
      <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Our Story, Our Passion</p>
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Driving Excellence Since <span className="text-blue-700">2010</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            At IRONSAUTO, we do not just sell cars; we build relationships. Learn about our journey and what makes us unique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Company Story */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-600 pb-2 inline-block">
              Leicester's Premier Auto Dealership
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              At IronsAuto, we believe that buying a car should be one of lifes great experiences. Since our foundation in 2010, we have helped thousands of customers find their perfect vehicle, combining exceptional customer service with an outstanding selection of quality cars.
            </p>

            <p className="text-gray-700 mb-8 leading-relaxed text-lg">
              Based in Leicester, our state-of-the-art showroom features a handpicked selection of premium vehicles. Our expert team is passionate about cars and committed to providing honest, professional advice to help you make the right choice for your needs and budget.
            </p>

            {/* Core Values Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                { icon: Shield, color: "blue", title: "Quality Assurance", description: "Every vehicle undergoes rigorous multi-point inspection." },
                { icon: Award, color: "amber", title: "Award-Winning Service", description: "Recognized for excellence in customer satisfaction." },
                { icon: Users, color: "green", title: "Expert Team", description: "Passionate and knowledgeable specialists at your service." },
                { icon: HeartHandshake, color: "purple", title: "Community Focused", description: "Proudly supporting local initiatives and charities." },
              ].map((item, i) => (
                <div key={i} className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className={`bg-${item.color}-100 p-3 rounded-full mr-4 shrink-0`}>
                    <item.icon className={`text-${item.color}-600`} size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">{item.title}</h4>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image & Key Stats */}
          <div className="flex flex-col gap-6">
            {/* Image Placeholder */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl group transform hover:scale-[1.01] transition-transform duration-300">
              <img
                src="/images/showroom-exterior.jpg" // Replace with a compelling image
                alt="IronsAuto Showroom"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-3xl font-bold mb-2">Our Modern Showroom</h3>
                  <p className="text-gray-300">Experience our vehicles in a comfortable and welcoming environment.</p>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <Clock className="mx-auto mb-4" size={36} />
                <div className="text-4xl font-extrabold mb-2">15+</div>
                <div className="text-lg opacity-90">Years Experience</div>
              </div>

              <div className="bg-green-600 text-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <CheckCircle className="mx-auto mb-4" size={36} />
                <div className="text-4xl font-extrabold mb-2">2,500+</div>
                <div className="text-lg opacity-90">Cars Sold</div>
              </div>

              <div className="bg-amber-600 text-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <Users className="mx-auto mb-4" size={36} />
                <div className="text-4xl font-extrabold mb-2">98%</div>
                <div className="text-lg opacity-90">Satisfied Customers</div>
              </div>

              <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                <MapPin className="mx-auto mb-4" size={36} />
                <div className="text-4xl font-extrabold mb-2">1</div>
                <div className="text-lg opacity-90">Prime Location</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}