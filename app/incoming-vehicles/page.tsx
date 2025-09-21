"use client";

import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { MapPin, Gauge, Fuel, Camera, CarFront } from "lucide-react";

interface Car {
  id: string;
  title: string;
  price: string;
  mileage: string;
  transmission: string;
  color: string;
  engineSize: string;
  fuelType: string;
  doors: string;
  images: string[];
  image?: string;
  features: string[];
  createdAt?: string;
  make?: string;
}

const IncomingVehicles = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch incoming cars data from Firestore
  useEffect(() => {
    const fetchIncomingCars = async () => {
      try {
        const carsQuery = query(
          collection(db, "cars"),
          where("isIncoming", "==", true)
        );
        const querySnapshot = await getDocs(carsQuery);
        const carList: Car[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (data) {
            const car: Car = {
              id: doc.id,
              title: data.title || "",
              price: data.price || "",
              mileage: data.mileage || "",
              transmission: data.transmission || "",
              color: data.color || "",
              engineSize: data.engineSize || "",
              fuelType: data.fuelType || "",
              doors: data.doors || "",
              images: data.images || (data.image ? [data.image] : []),
              image: data.image || "",
              features: data.features || [],
              createdAt: data.createdAt,
              make: data.make || "",
            };
            carList.push(car);
          }
        });

        // Sort by createdAt in JavaScript since we can't use composite index
        carList.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
          return 0;
        });

        setCars(carList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching incoming cars: ", error);
        setLoading(false);
      }
    };

    fetchIncomingCars();
  }, []);

  const getFeatureTagColor = (index: number) => {
    const colors = [
      "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white",
      "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white",
      "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
      "bg-gradient-to-r from-sky-500 to-sky-600 text-white",
      "bg-gradient-to-r from-blue-400 to-blue-500 text-white",
      "bg-gradient-to-r from-slate-600 to-slate-700 text-white",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex justify-center items-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-transparent border-t-blue-500 border-r-blue-600 rounded-full animate-spin mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-blue-700 border-l-blue-800 rounded-full animate-spin animate-reverse"></div>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Loading Incoming Vehicles
          </div>
          <div className="text-gray-600 mt-2">
            Curating the finest selection for you...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-800">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Incoming Vehicles
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover exceptional vehicles arriving soon to our showroom
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {cars.length} Incoming{" "}
              {cars.length === 1 ? "Vehicle" : "Vehicles"}
            </h2>
            <p className="text-gray-600">
              Premium vehicles arriving soon to our showroom
            </p>
          </div>
        </div>

        {/* Car Grid */}
        {cars.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No Incoming Vehicles Found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We don&apos;t have any vehicles marked as incoming at the
                moment. Check back soon for exciting new arrivals!
              </p>
              <Link
                href="/cars"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-xl hover:from-blue-600 hover:to-blue-900 transition-all duration-200 shadow-lg"
              >
                View Available Cars
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Link href={`/newcars/${car.id}`} key={car.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl shadow-lg h-[550px] flex flex-col">
                  {/* Image Section - Fixed Height */}
                  <div className="relative h-64 flex-shrink-0 overflow-hidden">
                    {car.images && car.images.length > 0 ? (
                      <img
                        src={car.images[0] || "/placeholder.svg"}
                        alt={car.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-500">
                          No image available
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      £{Number(car.price).toLocaleString()}
                    </div>

                    {/* Photo Count */}
                    {car.images && car.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <Camera className="h-4 w-4 mr-1" />
                        {car.images.length}
                      </div>
                    )}
                  </div>

                  {/* Content - Flexible Height */}
                  <div className="p-6 flex-1 flex flex-col min-h-0">
                    {/* Title with line clamping */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {car.title}
                    </h3>

                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">Leicester Showroom</span>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-700">
                        <Gauge className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">
                          {Number(car.mileage).toLocaleString()} mi
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                        <span className="text-sm capitalize">
                          {car.transmission}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <CarFront className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">{car.engineSize}L</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Fuel className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                        <span className="text-sm capitalize">
                          {car.fuelType}
                        </span>
                      </div>
                    </div>

                    {/* Features - Flexible */}
                    <div className="flex-1 min-h-0 mb-4">
                      {car.features && car.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {car.features.slice(0, 3).map((feature, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getFeatureTagColor(index)} shadow-sm`}
                            >
                              {feature}
                            </span>
                          ))}
                          {car.features.length > 3 && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                              +{car.features.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* CTA Button - Always at bottom */}
                    <div className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl text-center flex-shrink-0">
                      View Details & Book Test Drive
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Questions? We are Here to Help
          </h2>
          <p className="text-gray-600">
            Everything you need to know about our incoming vehicles
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              question: "How do I express interest in an incoming vehicle?",
              answer:
                "Simply click on any incoming vehicle to view details and contact us to express your interest. We'll notify you as soon as it arrives.",
            },
            {
              question: "When will these vehicles be available?",
              answer:
                "These vehicles are currently in transit or being prepared for arrival. Contact us for specific arrival dates and availability.",
            },
            {
              question: "Can I reserve an incoming vehicle?",
              answer:
                "Yes, you can express interest and we'll give you priority access once the vehicle arrives at our showroom.",
            },
            {
              question: "Will the price change when the vehicle arrives?",
              answer:
                "Prices are subject to market conditions, but we'll honor the displayed price for interested customers.",
            },
            {
              question: "What if the vehicle doesn't arrive as expected?",
              answer:
                "While we do our best to ensure accurate information, delays can occur. We'll keep you updated on any changes.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 transition-colors shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncomingVehicles;
