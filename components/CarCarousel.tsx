"use client"

import type React from "react"
import { useKeenSlider } from "keen-slider/react"
import { useEffect, useState } from "react"
import { db } from "../firebase/firebase" // Firebase setup
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Camera, ArrowRight, Gauge, CarIcon, MapPin, CarFront, Fuel } from "lucide-react"

interface CarProps {
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
  const [cars, setCars] = useState<CarProps[]>([])
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
        const carsList: CarProps[] = []

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data) {
            const car: CarProps = {
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
    ],
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
      <section className="max-w-[2000px] mx-auto py-16 bg-gray-50 w-full">
        {" "}
        {/* Adjust max-width as per your section import */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Our Latest Arrivals <span className="text-blue-600">Are Here</span>
          </h2>
          <p className="mt-2 text-lg text-gray-600">Discover your next dream car.</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <CarIcon size={48} className="text-blue-600 mb-4 animate-bounce" />
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
      <section className="max-w-[2000px] mx-auto py-16 bg-gray-50 w-full">
        {" "}
        {/* Adjust max-width as per your section import */}
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
              <Link
                href={`/newcars/${car.id}`}
                className="block h-full transition-transform duration-300 hover:scale-[1.01]"
              >
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
                        <span className="text-gray-500">No image available</span>
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
                        <span className="text-sm">{Number(car.mileage).toLocaleString()} mi</span>
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
                        <span className="text-sm capitalize">{car.transmission}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <CarFront className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">{car.engineSize}L</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Fuel className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
                        <span className="text-sm capitalize">{car.fuelType}</span>
                      </div>
                    </div>

                    {/* Features - Flexible */}
                    <div className="flex-1 min-h-0 mb-4">
                      {car.features && car.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {car.features.slice(0, 3).map((feature, index) => {
                            const colors = [
                              "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
                              "bg-gradient-to-r from-blue-600 to-blue-700 text-white",
                              "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white",
                              "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white",
                              "bg-gradient-to-r from-sky-500 to-sky-600 text-white",
                              "bg-gradient-to-r from-blue-400 to-blue-500 text-white",
                              "bg-gradient-to-r from-slate-600 to-slate-700 text-white",
                            ]
                            return (
                              <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${colors[index % colors.length]} shadow-sm`}
                              >
                                {feature}
                              </span>
                            )
                          })}
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