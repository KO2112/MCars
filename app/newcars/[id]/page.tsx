"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { db, storage } from "../../../../lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { sendContactEmail } from "../../lib/resend"; // Make sure this import matches your project structure
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import useAuth from "../../../hooks/useAuth"; // Import the custom hook

// Car interface matching our data structure
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
}

// This component should be placed in app/cars/[id]/page.tsx
export default function CarDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user } = useAuth(); // Get current user from your existing auth system

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  
  // Contact form states
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: `Inquiry about ${car?.title || 'vehicle'}`,
    message: '',
  });

  useEffect(() => {
    if (!id) return;

    const fetchCarDetails = async () => {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
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
            images: data.images || (data.image ? [data.image] : [])
          };
          
          setCar(carData);
          
          // Update the subject with the car title
          setFormData(prev => ({
            ...prev,
            subject: `Inquiry about ${carData.title}`
          }));
        } else {
          console.log("No such document!");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id, router]);

  // Contact form handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using Resend API
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      
      if (result.success) {
        setFormStatus({ 
          submitted: true, 
          error: false, 
          message: 'Thank you! Your message has been sent successfully.' 
        });
        
        // Reset form after successful submission
        setFormData(prev => ({
          ...prev,
          name: '',
          email: '',
          phone: '',
          message: '',
        }));
      } else {
        setFormStatus({ 
          submitted: false, 
          error: true, 
          message: 'There was an error sending your message. Please try again later.' 
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ 
        submitted: false, 
        error: true, 
        message: 'There was an error sending your message. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to delete car and associated images
  const handleDeleteCar = async () => {
    if (!car || !window.confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) {
      return;
    }
    
    setDeleting(true);
    
    try {
      // Delete all images from storage
      await Promise.all(car.images.map(async (imageUrl) => {
        try {
          // Extract the file path from the URL
          const filePathMatch = imageUrl.match(/\/o\/(.+)\?alt=/);
          if (filePathMatch && filePathMatch[1]) {
            const filePath = decodeURIComponent(filePathMatch[1]);
            const imageRef = ref(storage, filePath);
            await deleteObject(imageRef);
          }
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }));
      
      // Delete the car document from Firestore
      await deleteDoc(doc(db, "cars", car.id));
      
      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Failed to delete vehicle. Please try again.");
      setDeleting(false);
    }
  };

  // Function to handle image navigation
  const changeImage = (index: number) => {
    setActiveImage(index);
  };

  // Function to navigate to next/prev image
  const navigateImage = (direction: "next" | "prev") => {
    if (!car?.images.length) return;
    
    if (direction === "next") {
      setActiveImage((prev) => (prev + 1) % car.images.length);
    } else {
      setActiveImage((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse text-xl text-black">Loading vehicle details...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-xl text-black mb-4">Vehicle not found</div>
        <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Return to vehicle listings
        </Link>
      </div>
    );
  }

  // Full screen gallery modal
  const GalleryModal = () => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center p-4">
      <button 
        onClick={() => setShowFullGallery(false)}
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
      >
        ×
      </button>
      
      <div className="w-full max-w-6xl">
        {/* Main Image */}
        <div className="relative h-96 md:h-[70vh] w-full mb-4">
          <img
            src={car.images[activeImage]}
            alt={car.title}
            className="w-full h-full object-contain"
          />
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => navigateImage("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => navigateImage("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md">
            {activeImage + 1} / {car.images.length}
          </div>
        </div>
        
        {/* Thumbnails */}
        <div className="flex overflow-x-auto gap-2 py-2 hide-scrollbar">
          {car.images.map((img, index) => (
            <div 
              key={index}
              onClick={() => changeImage(index)}
              className={`flex-shrink-0 w-24 h-16 cursor-pointer ${activeImage === index ? 'ring-2 ring-indigo-500' : ''}`}
            >
              <img 
                src={img} 
                alt={`${car.title} - image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Show gallery modal if enabled */}
      {showFullGallery && <GalleryModal />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/cars" className="inline-flex items-center text-indigo-600 hover:text-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to vehicles
          </Link>
          {/* Edit Button - Only visible for signed in users */}
          {user && (
            <Link
              href={`/edit-car/${car.id}`}
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300 mr-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Vehicle
            </Link>
          )}
          {/* Delete Button - Only visible for signed in users */}
          {user && (
            <button
              onClick={handleDeleteCar}
              disabled={deleting}
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
            >
              {deleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Vehicle
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Vehicle Title and Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-black">{car.title}</h1>
          <div className="mt-2 md:mt-0">
            <div className="text-4xl font-bold text-indigo-600">£{Number(car.price).toLocaleString()}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery - Left Side (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Main Featured Image */}
              <div className="relative h-64 sm:h-96">
                <img
                  src={car.images[activeImage] || '/placeholder-car.jpg'}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Expand button */}
                <button 
                  onClick={() => setShowFullGallery(true)}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                  </svg>
                </button>
                
                {/* Navigation Arrows - Only visible if more than one image */}
                {car.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => navigateImage("prev")}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => navigateImage("next")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery - Only show if more than one image */}
              {car.images.length > 1 && (
                <div className="flex overflow-x-auto gap-3 p-4 hide-scrollbar">
                  {car.images.map((img, index) => (
                    <div 
                      key={index}
                      onClick={() => changeImage(index)}
                      className={`flex-shrink-0 w-24 h-16 cursor-pointer rounded ${activeImage === index ? 'ring-2 ring-indigo-500' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <img 
                        src={img} 
                        alt={`${car.title} - image ${index + 1}`} 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Vehicle Description Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-2xl font-bold text-black mb-4">Vehicle Description</h2>
              <div className="prose max-w-none">
                <p className="text-black text-base">This {car.title} is in excellent condition and ready for its new owner.</p>
                <p className="mt-2 text-black text-base">It features a {car.engineSize}L {car.fuelType} engine with {car.transmission} transmission. With only {Number(car.mileage).toLocaleString()} Miles on the odometer, this {car.color} vehicle provides an excellent driving experience.</p>
                <p className="mt-2 text-black text-base">Contact us today to schedule a test drive and experience this amazing vehicle for yourself!</p>
              </div>
            </div>
          </div>
          
          {/* Vehicle Specifications - Right Side (1/3 width on large screens) */}
          <div className="lg:col-span-1">
            {/* Key Details Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-black mb-4">Vehicle Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black text-base">Engine Size</span>
                  <span className="font-medium text-black text-base">{car.engineSize}L</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-black text-base">Fuel Type</span>
                  <span className="font-medium capitalize text-black text-base">{car.fuelType}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-black text-base">Mileage</span>
                  <span className="font-medium text-black text-base">{Number(car.mileage).toLocaleString()} Miles</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-black text-base">Transmission</span>
                  <span className="font-medium capitalize text-black text-base">{car.transmission}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-black text-base">Color</span>
                  <span className="font-medium capitalize text-black text-base">{car.color}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                
                <div className="flex items-center justify-between">
                  <span className="text-black text-base">Doors</span>
                  <span className="font-medium text-black text-base">{car.doors}</span>
                </div>
              </div>
            </div>
            
            {/* Contact Form - Replacing the previous "Interested in this vehicle?" section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-black mb-4">Interested in this vehicle?</h2>
              
              {formStatus.submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-green-800">Thank You!</h3>
                    <p className="text-green-700">
                      Your inquiry has been sent successfully. Our team will contact you shortly.
                    </p>
                    <button 
                      onClick={() => setFormStatus({ submitted: false, error: false, message: '' })}
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="+44 7123 456789"
                    />
                  </div>
                  
                  {/* Subject Field - Pre-filled but editable */}
                  <input
                    type="hidden"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                  />
                  
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="I'm interested in scheduling a test drive for this vehicle..."
                    ></textarea>
                  </div>
                  
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md font-medium text-white transition-colors ${
                        isSubmitting 
                          ? 'bg-indigo-400 cursor-not-allowed' 
                          : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      }`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                      {!isSubmitting && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              )}
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  We'll get back to you as soon as possible.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}