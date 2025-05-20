"use client"

import type React from "react"

import { useKeenSlider } from "keen-slider/react"
import { useEffect, useState } from "react"
import { db } from "../firebase/firebase" // Firebase setup
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Camera, ArrowRight } from "lucide-react"
import { FuelIcon, Gauge, ArrowUpDown, Car } from "lucide-react"

// Updated Car interface with features array
interface Car {
  id: string
  title: string
  price: string
  mileage: string
  transmission: string
  color: string
  engineSize: string
  fuelType: string
  doors: string
  images: string[] // Array of image URLs
  image?: string // Optional for backward compatibility
  features: string[] // Array of feature strings
}

export default function CarCarousel() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // Fetch featured cars from Firestore
  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        // Get the most recently added cars (assumed to be featured)
        // Adjust the query as needed to match your "featured" criteria
        const carsQuery = query(
          collection(db, "cars"),
          orderBy("createdAt", "desc"), // If you have a createdAt field
          limit(8), // Show up to 8 cars in the carousel
        )

        const querySnapshot = await getDocs(carsQuery)
        const carsList: Car[] = []

        querySnapshot.forEach((doc) => {
          const data = doc.data()

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
              features: data.features || [], // Get features array from database
            }
            carsList.push(car)
          }
        })

        setCars(carsList)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching featured cars:", error)
        setLoading(false)
      }
    }

    fetchFeaturedCars()
  }, [])

  // Initialize slider once cars are loaded
  useEffect(() => {
    if (!loading && cars.length > 0) {
      setLoaded(true)
    }
  }, [cars, loading])

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: () => {
        // Responsive slides per view - back to 4 as requested
        if (typeof window !== "undefined") {
          if (window.innerWidth < 640) return 1
          if (window.innerWidth < 1024) return 2
          if (window.innerWidth < 1280) return 3
          return 4 // Show 4 cars at larger screens as requested
        }
        return 4
      },
      spacing: 16, // Reduced spacing to fit 4 cards
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  // Auto-slide functionality
  useEffect(() => {
    if (!instanceRef.current || cars.length <= 0) return

    const intervalId = setInterval(() => {
      instanceRef.current?.next()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [instanceRef, cars])

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    instanceRef.current?.prev()
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    instanceRef.current?.next()
  }

  if (loading) {
    return (
      <div className="py-16 bg-gray-50 w-full">
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl font-bold text-gray-800">Latest Arrivals</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-xl text-gray-600">Loading latest vehicles...</div>
          </div>
        </div>
      </div>
    )
  }

  if (cars.length === 0) {
    return (
      <div className="py-16 bg-gray-50 w-full">
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl font-bold text-gray-800">Latest Arrivals</h2>
        </div>
        <div className="text-center py-16 bg-white rounded-lg shadow-sm mx-4">
          <p className="text-gray-600">No vehicles available at this time.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 bg-gray-50 w-full">
      {/* Section Header - Full width with padding on sides */}
      <div className="flex justify-between items-center mb-8 px-4 sm:px-6 lg:px-8 max-w-[2000px] mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Latest Arrivals</h2>
        </div>
        {/* Improved button design */}
        <Link
          href="/cars"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-md shadow-sm transition-all duration-300 flex items-center group"
        >
          View all vehicles
          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Carousel - Full width */}
      <div className="relative w-full">
        <div ref={sliderRef} className="keen-slider">
          {cars.map((car) => (
            <div key={car.id} className="keen-slider__slide">
              <Link href={`/newcars/${car.id}`} className="block h-full mx-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col group border border-gray-100 hover:border-blue-200">
                  {/* Car Image */}
                  <div className="relative h-72 overflow-hidden">
                    {car.images && car.images.length > 0 ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                        <img
                          src={car.images[0] || "/placeholder.svg"}
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
                    <div className="absolute top-3 right-3 bg-blue-700 text-white px-3 py-1 rounded-md font-semibold shadow-sm z-20">
                      £{Number(car.price).toLocaleString()}
                    </div>

                    {/* Photo Count Badge */}
                    {car.images && car.images.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs font-medium flex items-center z-20">
                        <Camera size={12} className="mr-1" />
                        {car.images.length}
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Car Title */}
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {car.title}
                    </h3>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="flex items-center text-gray-600">
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-50 rounded-full mr-2">
                          <FuelIcon size={12} className="text-blue-600" />
                        </span>
                        {car.engineSize}L {car.fuelType}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-50 rounded-full mr-2">
                          <Gauge size={12} className="text-blue-600" />
                        </span>
                        {Number(car.mileage).toLocaleString()} miles
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-50 rounded-full mr-2">
                          <ArrowUpDown size={12} className="text-blue-600" />
                        </span>
                        {car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-50 rounded-full mr-2">
                          <Car size={12} className="text-blue-600" />
                        </span>
                        {car.doors} door {car.color}
                      </div>
                    </div>

                    {/* Feature Tags */}
                    <div className="mt-auto pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                      {car.features && car.features.length > 0 ? (
                        car.features.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                          >
                            {feature}
                          </span>
                        ))
                      ) : (
                        <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                          Available now
                        </span>
                      )}

                      {car.features && car.features.length > 2 && (
                        <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          +{car.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="px-4 pb-4">
                    <div className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded transition-all duration-300 flex items-center justify-center group-hover:shadow-md">
                      View Details
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Controls - Positioned at the edges */}
        {loaded && cars.length > 0 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 z-10 focus:outline-none border border-gray-200 transition-transform duration-300 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} className="text-blue-600" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 z-10 focus:outline-none border border-gray-200 transition-transform duration-300 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight size={24} className="text-blue-600" />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {loaded && cars.length > 0 && (
        <div className="flex justify-center gap-1 mt-6">
          {[...Array(Math.min(cars.length, 8)).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
