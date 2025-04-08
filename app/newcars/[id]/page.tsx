"use client";

import { useState, useEffect } from "react";
import { db, storage } from "../../../lib/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

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

  useEffect(() => {
    if (!id) return;

    const fetchCarDetails = async () => {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCar({
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
          });
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
                <p className="mt-2 text-black text-base">It features a {car.engineSize}L {car.fuelType} engine with {car.transmission} transmission. With only {Number(car.mileage).toLocaleString()} kilometers on the odometer, this {car.color} vehicle provides an excellent driving experience.</p>
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
                  <span className="font-medium text-black text-base">{Number(car.mileage).toLocaleString()} km</span>
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
            
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-black mb-4">Interested in this vehicle?</h2>
              <p className="text-black mb-6 text-base">Contact us directly using the information below:</p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:makgun.uk@gmail.com" className="text-indigo-600 hover:text-indigo-800 text-base">
                    makgun.uk@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+447476866745" className="text-indigo-600 hover:text-indigo-800 text-base">
                    +44 7476 866745
                  </a>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-black text-base">We are available to answer your questions and arrange test drives.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}