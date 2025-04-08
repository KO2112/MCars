"use client";

import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase"; // Firebase setup
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

// Car interface matching your existing model
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

export default function CarCarousel() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Fetch featured cars from Firestore
  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        // Get the most recently added cars (assumed to be featured)
        // Adjust the query as needed to match your "featured" criteria
        const carsQuery = query(
          collection(db, "cars"),
          orderBy("createdAt", "desc"), // If you have a createdAt field
          limit(8) // Show up to 8 cars in the carousel
        );
        
        const querySnapshot = await getDocs(carsQuery);
        const carsList: Car[] = [];

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
              // Handle both formats of images
              images: data.images || (data.image ? [data.image] : []),
              image: data.image || "",
            };
            carsList.push(car);
          }
        });

        setCars(carsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured cars:", error);
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  // Initialize slider once cars are loaded
  useEffect(() => {
    if (!loading && cars.length > 0) {
      setLoaded(true);
    }
  }, [cars, loading]);
  
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: () => {
        // Responsive slides per view
        if (typeof window !== "undefined") {
          if (window.innerWidth < 640) return 1;
          if (window.innerWidth < 1024) return 2;
          if (window.innerWidth < 1280) return 3;
          return 4;
        }
        return 4;
      },
      spacing: 16,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Auto-slide functionality
  useEffect(() => {
    if (!instanceRef.current || cars.length <= 0) return;
    
    const intervalId = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [instanceRef, cars]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    instanceRef.current?.prev();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    instanceRef.current?.next();
  };

  if (loading) {
    return (
      <div className="relative py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-black mb-8">Featured Vehicles</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-xl text-gray-600">Loading featured vehicles...</div>
        </div>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="relative py-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-black mb-8">Featured Vehicles</h2>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No featured vehicles available at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Vehicles</h2>
      
      <div ref={sliderRef} className="keen-slider overflow-hidden rounded-lg">
        {cars.map((car) => (
          <div key={car.id} className="keen-slider__slide">
            <Link href={`/newcars/${car.id}`}>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                {/* Car Image with Gradient Overlay */}
                <div className="relative h-48 md:h-56 lg:h-64 w-full overflow-hidden">
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
                      <Camera size={14} className="mr-1" />
                      {car.images.length} photos
                    </div>
                  )}
                </div>
                
                {/* Car Details */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{car.title}</h3>
                  
                  {/* Key Specs */}
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {car.engineSize}L
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {Number(car.mileage).toLocaleString()} km
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                      {car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                      </svg>
                      {car.fuelType.charAt(0).toUpperCase() + car.fuelType.slice(1)}
                    </div>
                  </div>
                  
                  {/* Feature Tags */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {car.doors} Doors
                    </span>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                      {car.color}
                    </span>
                  </div>
                </div>
                
                {/* View Details Button */}
                <div className="px-4 pb-4">
                  <div className="w-full py-2 bg-indigo-600 text-white text-center font-medium rounded-md hover:bg-indigo-700 transition">
                    View Details
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Navigation Controls */}
      {loaded && cars.length > 0 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white ml-2 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white mr-2 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Pagination Dots */}
      {loaded && cars.length > 0 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(cars.length).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === idx ? "bg-indigo-600 w-4" : "bg-gray-300"
              } transition-all`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}