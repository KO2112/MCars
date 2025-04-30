"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { db, storage } from "../../../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import useAuth from "../../../hooks/useAuth";
import Link from "next/link";

export default function EditCar() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [carData, setCarData] = useState({
    title: "",
    price: "",
    mileage: "",
    transmission: "",
    color: "",
    engineSize: "",
    fuelType: "",
    doors: "",
    images: [] as string[]
  });
  const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);

  useEffect(() => {
    // Mark authentication as checked once we have the user state
    setAuthChecked(true);
    
    // If no user after checking, show the sign-in UI (handled in render)
    if (!user) return;

    // Only fetch car data if we have an ID and the user is authenticated
    if (id && user) {
      const fetchCarDetails = async () => {
        try {
          const docRef = doc(db, "cars", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Check if the car belongs to the current user
            if (data.userId && data.userId !== user.uid) {
              alert("You don't have permission to edit this car listing");
              router.push("/");
              return;
            }
            
            setCarData({
              title: data.title || "",
              price: data.price || "",
              mileage: data.mileage || "",
              transmission: data.transmission || "",
              color: data.color || "",
              engineSize: data.engineSize || "",
              fuelType: data.fuelType || "",
              doors: data.doors || "",
              images: data.images || []
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
    }
  }, [id, router, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Append to existing imageFiles rather than replacing them
      setImageFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
    }
  };
  
  const handleDeleteImage = (index: number) => {
    setImagesToDelete(prev => [...prev, index]);
  };
  
  const removeSelectedFile = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Create a copy of the car data to update
      const updatedData = { ...carData };
      
      // Filter out images marked for deletion
      if (imagesToDelete.length > 0) {
        updatedData.images = carData.images.filter((_, index) => !imagesToDelete.includes(index));
      }
      
      // Upload new images if any are selected
      if (imageFiles.length > 0) {
        const newImageUrls = [];
        
        for (const file of imageFiles) {
          const storageRef = ref(storage, `car-images/${Date.now()}-${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          newImageUrls.push(downloadUrl);
        }
        
        // Append new images to the filtered images array
        updatedData.images = [...updatedData.images, ...newImageUrls];
      }

      // Update the document in Firestore
      await updateDoc(doc(db, "cars", id), updatedData);
      
      alert("Car updated successfully!");
      router.push(`/newcars/${id}`); // Redirect to car details page
    } catch (error) {
      console.error("Error updating car:", error);
      alert("Failed to update car. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Show loading state before we've checked authentication or while car data is being fetched
  if (!authChecked || (loading && user)) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse text-xl">
          {!authChecked ? "Checking authentication..." : "Loading vehicle details..."}
        </div>
      </div>
    );
  }

  // If not authenticated, show sign-in options
  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="text-xl mb-4">Please sign in to edit this vehicle</div>
        <div className="flex space-x-4">
          <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Sign In
          </Link>
          <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <Link href={`/newcars/${id}`} className="inline-flex items-center text-indigo-600 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to vehicle details
      </Link>
      
      <h1 className="text-2xl font-bold mb-6">Edit Vehicle</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Car Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={carData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price (£)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={carData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Two column layout for smaller fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Mileage */}
          <div>
            <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-1">
              Mileage (km)
            </label>
            <input
              type="number"
              id="mileage"
              name="mileage"
              value={carData.mileage}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Transmission */}
          <div>
            <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-1">
              Transmission
            </label>
            <select
              id="transmission"
              name="transmission"
              value={carData.transmission}
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Transmission</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>

          {/* Color */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={carData.color}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Engine Size */}
          <div>
            <label htmlFor="engineSize" className="block text-sm font-medium text-gray-700 mb-1">
              Engine Size (L)
            </label>
            <input
              type="text"
              id="engineSize"
              name="engineSize"
              value={carData.engineSize}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>

          {/* Fuel Type */}
          <div>
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={carData.fuelType}
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Doors */}
          <div>
            <label htmlFor="doors" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Doors
            </label>
            <input
              type="number"
              id="doors"
              name="doors"
              value={carData.doors}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        {/* Current Images */}
        {carData.images.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Current Images</h3>
            <div className="grid grid-cols-3 gap-2">
              {carData.images.map((img, index) => (
                <div key={index} className={`relative h-20 bg-gray-100 rounded ${imagesToDelete.includes(index) ? 'opacity-40' : ''}`}>
                  <img 
                    src={img} 
                    alt={`Car image ${index + 1}`} 
                    className="h-full w-full object-cover rounded" 
                  />
                  {!imagesToDelete.includes(index) ? (
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      title="Delete image"
                    >
                      ×
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setImagesToDelete(prev => prev.filter(i => i !== index))}
                      className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-green-600"
                      title="Restore image"
                    >
                      ↺
                    </button>
                  )}
                </div>
              ))}
            </div>
            {imagesToDelete.length > 0 && (
              <p className="text-sm text-red-500 mt-2">
                {imagesToDelete.length} image(s) marked for deletion. Changes will be applied when you save.
              </p>
            )}
          </div>
        )}

        {/* Add more images */}
        <div className="mb-6">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
            Add More Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            accept="image/*"
            multiple
          />
          <p className="text-sm text-gray-500 mt-1">
            New images will be added to the existing ones. You can add multiple batches of images.
          </p>
          
          {/* Selected New Images Preview */}
          {imageFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">New Images to Upload ({imageFiles.length})</h3>
              <div className="grid grid-cols-3 gap-2">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative h-20 bg-gray-100 rounded">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`New image ${index + 1}`} 
                      className="h-full w-full object-cover rounded" 
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      title="Remove from upload"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link
            href={`/newcars/${id}`}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${saving ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}