"use client"

import { useState, useEffect, useMemo } from "react"
import { db } from "../firebase/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import Link from "next/link"
import { Search, Filter, ChevronDown, Sliders, MapPin, Calendar, Gauge, Fuel } from "lucide-react"

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
  images: string[]
  image?: string
  features: string[]
  createdAt?: string
}

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    transmission: "",
    fuelType: "",
  })

  // Fetch car data from Firestore
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsQuery = query(collection(db, "cars"), orderBy("createdAt", "desc"))
        const querySnapshot = await getDocs(carsQuery)
        const carList: Car[] = []

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
              createdAt: data.createdAt,
            }
            carList.push(car)
          }
        })

        setCars(carList)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cars: ", error)
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  // Filter and sort cars
  const filteredAndSortedCars = useMemo(() => {
    // First filter by search term
    let result = cars.filter(
      (car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    // Then apply additional filters
    if (filters.transmission) {
      result = result.filter((car) => car.transmission === filters.transmission)
    }

    if (filters.fuelType) {
      result = result.filter((car) => car.fuelType === filters.fuelType)
    }

    // Then sort
    return result.sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return Number(a.price) - Number(b.price)
        case "price-high":
          return Number(b.price) - Number(a.price)
        case "mileage-low":
          return Number(a.mileage) - Number(b.mileage)
        default: // newest
          return 0 // Assuming they're already sorted by createdAt from the query
      }
    })
  }, [cars, searchTerm, sortOption, filters])

  // Get unique values for filter options
  const transmissionOptions = useMemo(() => {
    const options = new Set(cars.map((car) => car.transmission))
    return Array.from(options).filter(Boolean)
  }, [cars])

  const fuelTypeOptions = useMemo(() => {
    const options = new Set(cars.map((car) => car.fuelType))
    return Array.from(options).filter(Boolean)
  }, [cars])

  // Function to get a random color for feature tags
  const getFeatureTagColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-yellow-100 text-yellow-800",
      "bg-indigo-100 text-indigo-800",
      "bg-teal-100 text-teal-800",
      "bg-cyan-100 text-cyan-800",
    ]
    return colors[index % colors.length]
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl text-gray-700 font-medium">Loading our vehicle collection...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      

      {/* Search and Filter Bar */}
      <div className="bg-white shadow-md py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by model, features or keywords..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Sort */}
            <div className="flex-shrink-0 w-full md:w-48">
              <div className="relative">
                <select
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="mileage-low">Lowest Mileage</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {/* Transmission Filter */}
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  id="transmission"
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.transmission}
                  onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                >
                  <option value="">All Transmissions</option>
                  {transmissionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.fuelType}
                  onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    setFilters({
                      transmission: "",
                      fuelType: "",
                    })
                    setSearchTerm("")
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredAndSortedCars.length} {filteredAndSortedCars.length === 1 ? "vehicle" : "vehicles"} available
          </h2>
          <div className="text-sm text-gray-500 flex items-center">
            <Sliders className="h-4 w-4 mr-1" />
            Sorted by:{" "}
            {sortOption === "newest"
              ? "Newest First"
              : sortOption === "price-low"
                ? "Price: Low to High"
                : sortOption === "price-high"
                  ? "Price: High to Low"
                  : "Lowest Mileage"}
          </div>
        </div>
      </div>

      {/* Car Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {filteredAndSortedCars.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No vehicles found</h3>
            <p className="text-gray-600 mb-6">
              We could not find any vehicles matching your search criteria. Try adjusting your filters or search term.
            </p>
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {
                setFilters({
                  transmission: "",
                  fuelType: "",
                })
                setSearchTerm("")
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedCars.map((car) => (
              <Link href={`/newcars/${car.id}`} key={car.id} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  {/* Car Image */}
                  <div className="relative h-56 overflow-hidden">
                    {car.images && car.images.length > 0 ? (
                      <img
                        src={car.images[0] || "/placeholder.svg"}
                        alt={car.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}

                    {/* Price Tag */}
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-2 font-bold text-lg">
                      £{Number(car.price).toLocaleString()}
                    </div>

                    {/* Multiple Images Badge */}
                    {car.images && car.images.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                          />
                        </svg>
                        {car.images.length} photos
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {car.title}
                    </h3>

                    {/* Location and Year (placeholder) */}
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                      <span className="text-sm">Leicester</span>
                      
                    </div>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-4 border-t border-b border-gray-100 py-4">
                      <div className="flex items-center text-gray-700">
                        <Gauge className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm">{Number(car.mileage).toLocaleString()} miles</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 text-blue-600"
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span className="text-sm">{car.engineSize}L</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Fuel className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-sm capitalize">{car.fuelType}</span>
                      </div>
                    </div>

                    {/* Feature Tags - Now with colorful backgrounds */}
                    {car.features && car.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {car.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getFeatureTagColor(index)}`}
                          >
                            {feature}
                          </span>
                        ))}
                        {car.features.length > 3 && (
                          <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-gray-200 text-gray-800">
                            +{car.features.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* View Details Button */}
                    <div className="mt-auto">
                      <div className="w-full py-2 bg-blue-600 text-white text-center font-medium rounded-md group-hover:bg-blue-700 transition-colors">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cars
