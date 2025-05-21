"use client"

import type React from "react"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useState } from "react"
import { db } from "../firebase/firebase" // Firebase setup
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Camera, ArrowRight, FuelIcon, Gauge, ArrowUpDown, Car, Zap } from "lucide-react"

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
        const carsQuery = query(
          collection(db, "cars"),
          orderBy("createdAt", "desc"), // Assuming 'createdAt' field for latest cars
          limit(8), // Limit to 8 cars for the carousel
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
              images: data.images || (data.image ? [data.image] : []),
              image: data.image || "",
              features: data.features || [],
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

  // Initialize slider once cars are loaded and available
  useEffect(() => {
    if (!loading && cars.length > 0) {
      setLoaded(true)
    }
  }, [cars, loading])

  // KeenSlider setup
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slides: {
        perView: () => {
          // Responsive slides per view
          if (typeof window !== "undefined") {
            if (window.innerWidth < 640) return 1 // 1 slide on small screens (e.g., mobile)
            if (window.innerWidth < 1024) return 2 // 2 slides on medium screens (e.g., tablet)
            if (window.innerWidth < 1280) return 3 // 3 slides on large screens (e.g., small desktop)
            return 4 // 4 slides on extra-large screens (e.g., large desktop)
          }
          return 4 // Default to 4
        },
        spacing: 24, // Increased spacing for better visual separation between cards
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [
      // Add plugins here if needed, e.g.,
      // (slider) => {
      //   slider.on("dragStarted", () => clearInterval(intervalId));
      //   slider.on("dragEnded", () => startAutoSlide());
      // }
    ]
  )

  // Auto-slide functionality
  useEffect(() => {
    if (!instanceRef.current || cars.length <= 0) return

    const intervalId = setInterval(() => {
      instanceRef.current?.next()
    }, 5000) // Auto-slides every 5 seconds

    return () => clearInterval(intervalId) // Clear interval on component unmount
  }, [instanceRef, cars])

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    instanceRef.current?.prev()
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    instanceRef.current?.next()
  }

  // Loading State
  if (loading) {
    return (
      <section className="max-w-[2000px] mx-auto py-16 bg-gray-50 w-full"> {/* Adjust max-width as per your section import */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Our Latest Arrivals <span className="text-blue-600">Are Here</span>
          </h2>
          <p className="mt-2 text-lg text-gray-600">Discover your next dream car.</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <Car size={48} className="text-blue-600 mb-4 animate-bounce" />
            <div className="text-xl font-medium text-gray-600">Loading amazing vehicles...</div>
            <div className="text-sm text-gray-400 mt-2">Just a moment, your ride is on its way!</div>
          </div>
        </div>
      </section>
    )
  }

  // No Cars Available State
  if (cars.length === 0) {
    return (
      <section className="max-w-[2000px] mx-auto py-16 bg-gray-50 w-full"> {/* Adjust max-width as per your section import */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Our Latest Arrivals <span className="text-blue-600">Are Here</span>
          </h2>
          <p className="mt-2 text-lg text-gray-600">Discover your next dream car.</p>
        </div>
        <div className="text-center py-16 bg-white rounded-xl shadow-lg mx-4 border border-gray-100">
          <p className="text-gray-600 text-lg font-medium">
            <span className="text-blue-500 font-bold">Oops!</span> No vehicles available at this time.
          </p>
          <p className="text-gray-500 mt-2">Please check back soon or explore our other sections!</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Contact Us
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-[2000px] mx-auto py-16 bg-gradient-to-br from-blue-50 to-indigo-100 w-full overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Our Latest Arrivals <span className="text-blue-600">Are Here</span>
          </h2>
          <p className="mt-2 text-lg text-gray-600">Discover your next dream car from our curated selection.</p>
        </div>
        {/* View All Vehicles Button */}
        <Link
          href="/cars"
          className="mt-6 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center group transform hover:-translate-y-1"
        >
          View all vehicles
          <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full px-4 sm:px-6 lg:px-8">
        <div ref={sliderRef} className="keen-slider">
          {cars.map((car) => (
            <div key={car.id} className="keen-slider__slide">
              <Link href={`/newcars/${car.id}`} className="block h-full transition-transform duration-300 hover:scale-[1.01]">
                <div className="bg-white rounded-xl overflow-hidden shadow-xl transition-all duration-300 h-full flex flex-col group border border-gray-100 hover:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300/50">
                  {/* Car Image */}
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    {car.images && car.images.length > 0 ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img
                          src={car.images[0] || "/placeholder.svg"}
                          alt={car.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500 text-sm">No image available</span>
                      </div>
                    )}

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 bg-blue-700 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg z-20">
                      £{Number(car.price).toLocaleString()}
                    </div>

                    {/* Photo Count Badge */}
                    {car.images && car.images.length > 1 && (
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center z-20">
                        <Camera size={14} className="mr-1.5" />
                        {car.images.length} Photos
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Car Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
                      {car.title}
                    </h3>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-4 text-sm font-medium">
                      <div className="flex items-center text-gray-700">
                        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-blue-100 rounded-full mr-2">
                          <FuelIcon size={14} className="text-blue-600" />
                        </span>
                        {car.fuelType}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-blue-100 rounded-full mr-2">
                          <Gauge size={14} className="text-blue-600" />
                        </span>
                        {Number(car.mileage).toLocaleString()} mi
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-blue-100 rounded-full mr-2">
                          <ArrowUpDown size={14} className="text-blue-600" />
                        </span>
                        {car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-blue-100 rounded-full mr-2">
                          <Car size={14} className="text-blue-600" />
                        </span>
                        {car.doors} Doors
                      </div>
                    </div>

                    {/* Feature Tags */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                      {car.features && car.features.length > 0 ? (
                        car.features.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 transition-colors duration-200 hover:bg-blue-100"
                          >
                            <Zap size={10} className="inline-block mr-1" />
                            {feature}
                          </span>
                        ))
                      ) : (
                        <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          Ready to drive!
                        </span>
                      )}

                      {car.features && car.features.length > 2 && (
                        <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{car.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="p-6 pt-0">
                    <div
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold rounded-lg transition-all duration-300 flex items-center justify-center group-hover:shadow-lg"
                    >
                      View Details
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform" />
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
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:bg-gray-50 z-10 focus:outline-none border border-gray-200 transition-all duration-300 text-blue-600 hover:text-blue-800 hidden md:block group hover:scale-110 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:bg-gray-50 z-10 focus:outline-none border border-gray-200 transition-all duration-300 text-blue-600 hover:text-blue-800 hidden md:block group hover:scale-110 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </div>

      {/* Pagination Dots */}
      {loaded && cars.length > 0 && (
        <div className="flex justify-center gap-2 mt-10">
          {[...Array(Math.min(cars.length, 8)).keys()].map((idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400 w-3"
              } hover:scale-110 active:scale-90`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}