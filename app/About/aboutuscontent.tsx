"use client";

import { MapPin, Phone, Mail, Users, Award, Clock, ShieldCheck } from "lucide-react";

export default function AboutUsContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About IRONSAUTO</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner for quality used vehicles in Leicester since 2015.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="mb-20">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="text-gray-600 space-y-4">
              <p>
                IRONSAUTO was founded with a simple mission: to provide quality used vehicles at 
                competitive prices with exceptional customer service. What started as a small 
                family business has grown into one of Leicester most trusted auto dealers.
              </p>
              <p>
                With over a decade of experience in the automotive industry, our team brings 
                expertise and passion to every interaction. We understand that buying a car is 
                a significant decision, which is why we strive to make the process transparent, 
                stress-free, and enjoyable.
              </p>
              <p>
                Our carefully curated selection of vehicles undergoes rigorous inspection and 
                preparation before being offered to our customers. We stand behind every vehicle 
                we sell, ensuring you drive away with confidence in your purchase.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Integrity */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <ShieldCheck className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
            <p className="text-gray-600">
              We believe in complete transparency throughout the entire car buying process. 
              No hidden fees, no surprises - just honest information about every vehicle.
            </p>
          </div>

          {/* Customer Focus */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Users className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Focus</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We take the time to understand your needs 
              and preferences to help you find the perfect vehicle for your lifestyle and budget.
            </p>
          </div>

          {/* Quality */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="rounded-full bg-indigo-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
              <Award className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
            <p className="text-gray-600">
              Every vehicle in our inventory is thoroughly inspected and prepared to meet 
              our high standards. We only sell cars we would be proud to recommend to our own family.
            </p>
          </div>
        </div>
      </div>

      {/* Visit Us Section */}
      <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden mb-20">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-gray-600">
                We invite you to visit our showroom to explore our selection of quality used vehicles. 
                Our friendly team is ready to assist you and answer any questions you may have.
              </p>
              
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-indigo-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      101-103 Margaret Road<br />
                      Leicester, LE5 5FW<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-indigo-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">
                      <a href="tel:+447476866745" className="hover:text-indigo-600 transition-colors">
                        +44 7476 866745
                      </a>
                    </p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-indigo-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:info@ironsauto.co.uk" className="hover:text-indigo-600 transition-colors">
                        info@ironsauto.co.uk
                      </a>
                    </p>
                  </div>
                </div>
                
                {/* Hours */}
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-indigo-600 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}