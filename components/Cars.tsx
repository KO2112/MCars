"use client"; // Ensures this component is rendered on the client-side

import { useState, useEffect } from "react";
import { db } from "../lib/firebase"; // Firebase setup
import { collection, getDocs } from "firebase/firestore"; // Firebase function to get data
import Link from "next/link"; // For navigation


// Updated Car interface with images array
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
  images: string[]; // Array of image URLs
  image?: string;   // Optional for backward compatibility
}

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch car data from Firestore on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
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
              // Handle both new format (images array) and old format (single image)
              images: data.images || (data.image ? [data.image] : []),
              image: data.image || "",
            };
            carList.push(car);
          }
        });

        setCars(carList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars: ", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse text-xl text-gray-600">Loading vehicles...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-2">Our Vehicle Collection</h1>
      <p className="text-gray-600 text-center mb-12">Discover your perfect ride from our premium selection</p>
      
      {cars.length === 0 ? (
        <div className="text-center text-xl text-gray-600 py-20">
          <p>No vehicles currently available in our inventory.</p>
          <p className="mt-4">Please check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <Link href={`/newcars/${car.id}`} key={car.id}>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Car Image with Gradient Overlay */}
                <div className="relative h-64 w-full overflow-hidden">
                  {car.images && car.images.length > 0 ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      <img
                        src={car.images[0]}
                        alt={car.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500">No image available</span>
                    </div>
                  )}
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-gray-900 font-semibold shadow-md z-20">
                    £{Number(car.price).toLocaleString()}
                  </div>
                  
                  {/* Multiple Images Badge */}
                  {car.images && car.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-md text-xs font-medium text-gray-800 z-20 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                      </svg>
                      {car.images.length} photos
                    </div>
                  )}
                </div>
                
                {/* Car Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{car.title}</h3>
                  
                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {car.engineSize}L
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {Number(car.mileage).toLocaleString()} km
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      {car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                      {car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}
                    </div>
                  </div>
                  
                  {/* Feature Tags */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {car.doors} Doors
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                      {car.color}
                    </span>
                  </div>
                </div>
                
                {/* View Details Button */}
                <div className="px-6 pb-6">
                  <div className="w-full py-2 bg-indigo-600 text-white text-center font-medium rounded-md hover:bg-indigo-700 transition">
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;