"use client"

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react"
import { db, storage } from "../../../firebase/firebase"
import { doc, getDoc, deleteDoc } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"
import { sendContactEmail } from "../../../lib/resend"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import useAuth from "../../../hooks/useAuth"
import { ChevronLeft, ChevronRight, Maximize2, ArrowLeft, Edit, Trash2, CheckCircle, AlertCircle } from "lucide-react"

// Car interface matching our data structure
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
  description: string
  features: string[]
}

export default function CarDetails() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const { user } = useAuth()

  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [showFullGallery, setShowFullGallery] = useState(false)

  // Contact form states - Updated to match the working contact page
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  useEffect(() => {
    if (!id) return

    const fetchCarDetails = async () => {
      try {
        const docRef = doc(db, "cars", id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          const carData = {
            id: docSnap.id,
            title: data.title || "",
            price: data.price || "",
            mileage: data.mileage || "",
            transmission: data.transmission || "",
            color: data.color || "",
            engineSize: data.engineSize || "",
            fuelType: data.fuelType || "",
            doors: data.doors || "",
            images: data.images || (data.image ? [data.image] : []),
            description: data.description || "",
            features: data.features || [],
          }

          setCar(carData)

          // Update the subject with the car title
          setFormData((prev) => ({
            ...prev,
            subject: `Inquiry about ${carData.title}`,
          }))
        } else {
          console.log("No such document!")
          router.push("/")
        }
      } catch (error) {
        console.error("Error fetching car details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [id, router])

  // Contact form handlers - Updated to match the working contact page
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email using Resend API
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      })

      if (result.success) {
        setFormStatus({
          submitted: true,
          error: false,
          message: "Thank you! Your message has been sent successfully.",
        })

        // Reset form after successful submission
        setFormData((prev) => ({
          ...prev,
          name: "",
          email: "",
          phone: "",
          message: "",
          // Keep the subject as is since it's related to the car
          subject: prev.subject,
        }))
      } else {
        setFormStatus({
          submitted: false,
          error: true,
          message: "There was an error sending your message. Please try again later.",
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus({
        submitted: false,
        error: true,
        message: "There was an error sending your message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Function to delete car and associated images
  const handleDeleteCar = async () => {
    if (!car || !window.confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) {
      return
    }

    setDeleting(true)

    try {
      // Delete all images from storage
      await Promise.all(
        car.images.map(async (imageUrl) => {
          try {
            // Extract the file path from the URL
            const filePathMatch = imageUrl.match(/\/o\/(.+)\?alt=/)
            if (filePathMatch && filePathMatch[1]) {
              const filePath = decodeURIComponent(filePathMatch[1])
              const imageRef = ref(storage, filePath)
              await deleteObject(imageRef)
            }
          } catch (error) {
            console.error("Error deleting image:", error)
          }
        }),
      )

      // Delete the car document from Firestore
      await deleteDoc(doc(db, "cars", car.id))

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Error deleting car:", error)
      alert("Failed to delete vehicle. Please try again.")
      setDeleting(false)
    }
  }

  // Function to handle image navigation
  const changeImage = (index: number) => {
    setActiveImage(index)
  }

  // Function to navigate to next/prev image
  const navigateImage = (direction: "next" | "prev") => {
    if (!car?.images.length) return

    if (direction === "next") {
      setActiveImage((prev) => (prev + 1) % car.images.length)
    } else {
      setActiveImage((prev) => (prev - 1 + car.images.length) % car.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-xl text-gray-700 font-medium">Loading vehicle details...</div>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white">
        <div className="text-2xl font-bold text-gray-800 mb-4">Vehicle not found</div>
        <Link href="/cars" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Return to vehicle listings
        </Link>
      </div>
    )
  }

  // Full screen gallery modal
  const GalleryModal = () => (
    <div className="fixed inset-0 z-50 bg-black flex justify-center items-center p-4">
      <button
        onClick={() => setShowFullGallery(false)}
        className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 focus:outline-none z-50"
        aria-label="Close gallery"
      >
        ×
      </button>

      <div className="w-full max-w-7xl">
        {/* Main Image */}
        <div className="relative h-[600px] md:h-[85vh] w-full mb-4">
          <img
            src={car.images[activeImage] || "/placeholder.svg"}
            alt={car.title}
            className="w-full h-full object-contain"
          />

          {/* Navigation Arrows */}
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:outline-none"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:outline-none"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm font-medium">
            {activeImage + 1} / {car.images.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex overflow-x-auto gap-3 py-3 px-2 hide-scrollbar">
          {car.images.map((img, index) => (
            <div
              key={index}
              onClick={() => changeImage(index)}
              className={`flex-shrink-0 w-28 h-20 cursor-pointer transition-all duration-200 ${
                activeImage === index
                  ? "ring-2 ring-blue-600 scale-105 z-10"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`${car.title} - image ${index + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white min-h-screen">
      {/* Show gallery modal if enabled */}
      {showFullGallery && <GalleryModal />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/cars" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to vehicles
          </Link>

          {/* Admin controls - Only visible for signed in users */}
          {user && (
            <div className="flex space-x-3">
              <Link
                href={`/edit-car/${car.id}`}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={handleDeleteCar}
                disabled={deleting}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="mb-8">
          {/* Vehicle Title and Price */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{car.title}</h1>
            <div className="mt-2 md:mt-0">
              <div className="text-4xl font-bold text-blue-600">£{Number(car.price).toLocaleString()}</div>
            </div>
          </div>

          {/* Main Image Gallery - LARGE as requested */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Main Featured Image - Made much larger */}
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] w-full">
              <img
                src={car.images[activeImage] || "/placeholder.svg"}
                alt={car.title}
                className="w-full h-full object-cover"
              />

              {/* Expand button */}
              <button
                onClick={() => setShowFullGallery(true)}
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-md shadow-md transition-colors flex items-center"
              >
                <Maximize2 className="h-5 w-5 mr-2" />
                View Gallery
              </button>

              {/* Navigation Arrows - Only visible if more than one image */}
              {car.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage("prev")}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigateImage("next")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery - Only show if more than one image */}
            {car.images.length > 1 && (
              <div className="flex overflow-x-auto gap-2 p-4 hide-scrollbar">
                {car.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => changeImage(index)}
                    className={`flex-shrink-0 w-24 h-16 cursor-pointer rounded overflow-hidden transition-all duration-200 ${
                      activeImage === index
                        ? "ring-2 ring-blue-600 scale-105"
                        : "opacity-70 hover:opacity-100 hover:scale-105"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${car.title} - image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details */}
          <div className="lg:col-span-2">
            {/* Vehicle Specifications */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Engine Size</span>
                  <span className="font-semibold text-gray-900">{car.engineSize}L</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Fuel Type</span>
                  <span className="font-semibold text-gray-900 capitalize">{car.fuelType}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Mileage</span>
                  <span className="font-semibold text-gray-900">{Number(car.mileage).toLocaleString()} miles</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Transmission</span>
                  <span className="font-semibold text-gray-900 capitalize">{car.transmission}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Color</span>
                  <span className="font-semibold text-gray-900 capitalize">{car.color}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Doors</span>
                  <span className="font-semibold text-gray-900">{car.doors}</span>
                </div>
              </div>
            </div>

            {/* Vehicle Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Description</h2>
              <div className="prose max-w-none">
                {car.description ? (
                  <div className="text-gray-700 text-base whitespace-pre-line leading-relaxed">{car.description}</div>
                ) : (
                  <>
                    <p className="text-gray-700 text-base">
                      This {car.title} is in excellent condition and ready for its new owner.
                    </p>
                    <p className="mt-4 text-gray-700 text-base">
                      It features a {car.engineSize}L {car.fuelType} engine with {car.transmission} transmission. With
                      only {Number(car.mileage).toLocaleString()} miles on the odometer, this {car.color} vehicle
                      provides an excellent driving experience.
                    </p>
                    <p className="mt-4 text-gray-700 text-base">
                      Contact us today to schedule a test drive and experience this amazing vehicle for yourself!
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Vehicle Features - Only show if there are features */}
            {car.features && car.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Vehicle Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interested in this vehicle?</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below and we will get back to you as soon as possible.
              </p>

              {formStatus.submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Thank You!</h3>
                    <p className="text-green-700">
                      Your inquiry has been sent successfully. Our team will contact you shortly.
                    </p>
                    <button
                      onClick={() => setFormStatus({ submitted: false, error: false, message: "" })}
                      className="mt-3 text-sm font-medium text-green-700 hover:text-green-900"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formStatus.error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-red-800">Error</h3>
                        <p className="text-red-700">{formStatus.message}</p>
                      </div>
                    </div>
                  )}

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Smith"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+44 7123 456789"
                    />
                  </div>

                  {/* Subject Field - Pre-filled but editable */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject*
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="I'm interested in scheduling a test drive for this vehicle..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center justify-center w-full px-4 py-3 border border-transparent rounded-md font-medium text-white transition-colors ${
                        isSubmitting
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      }`}
                    >
                      {isSubmitting ? "Sending..." : "Send Inquiry"}
                      {!isSubmitting && <ChevronRight className="w-4 h-4 ml-2" />}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
