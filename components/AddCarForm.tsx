"use client"; // Ensures this component is rendered on the client-side

import { useState } from "react";
import { db } from "../lib/firebase"; // Firebase setup
import { collection, addDoc } from "firebase/firestore"; // Firebase functions for adding data
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Add these imports
import Image from "next/image"; // Import next/image for image optimization





const AddCarForm = () => {
  const [carData, setCarData] = useState({
    title: "",
    price: "",
    mileage: "",
    transmission: "",
    color: "",
    engineSize: "",
    fuelType: "",
    doors: "",
    image: null as string | null,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the actual file
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImageFile(file); // Store the actual file
      setCarData({ ...carData, image: URL.createObjectURL(file) }); // Set preview URL
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;
      
      // Upload image to Firebase Storage if there is an image file
      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `car-images/${Date.now()}-${imageFile.name}`);
        
        // Upload the file
        const snapshot = await uploadBytes(storageRef, imageFile);
        
        // Get the download URL
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Add the car data to Firestore with the actual image URL from Storage
      const docRef = await addDoc(collection(db, "cars"), {
        title: carData.title,
        price: carData.price,
        mileage: carData.mileage,
        transmission: carData.transmission,
        color: carData.color,
        engineSize: carData.engineSize,
        fuelType: carData.fuelType,
        doors: carData.doors,
        image: imageUrl, // Use the Firebase Storage URL
      });

      console.log("Document written with ID: ", docRef.id);
      
      // Reset form
      setCarData({
        title: "",
        price: "",
        mileage: "",
        transmission: "",
        color: "",
        engineSize: "",
        fuelType: "",
        doors: "",
        image: null,
      });
      setImageFile(null);
      
      alert("Car added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding car. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center">Add New Car</h2>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Car Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={carData.title}
          onChange={handleInputChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price (£)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={carData.price}
          onChange={handleInputChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Mileage */}
      <div>
        <label htmlFor="mileage" className="block text-sm font-medium text-gray-700">
          Mileage (in km)
        </label>
        <input
          type="number"
          id="mileage"
          name="mileage"
          value={carData.mileage}
          onChange={handleInputChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Transmission */}
      <div>
        <label htmlFor="transmission" className="block text-sm font-medium text-gray-700">
          Transmission
        </label>
        <select
          id="transmission"
          name="transmission"
          value={carData.transmission}
          onChange={handleSelectChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Transmission</option>
          <option value="manual">Manual</option>
          <option value="automatic">Automatic</option>
        </select>
      </div>

      {/* Color */}
      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">
          Car Color
        </label>
        <input
          type="text"
          id="color"
          name="color"
          value={carData.color}
          onChange={handleInputChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Engine Size */}
      <div>
        <label htmlFor="engineSize" className="block text-sm font-medium text-gray-700">
          Engine Size (in liters)
        </label>
        <input
          type="text"
          id="engineSize"
          name="engineSize"
          value={carData.engineSize}
          onChange={handleInputChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Fuel Type */}
      <div>
        <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
          Fuel Type
        </label>
        <select
          id="fuelType"
          name="fuelType"
          value={carData.fuelType}
          onChange={handleSelectChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
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
        <label htmlFor="doors" className="block text-sm font-medium text-gray-700">
          Number of Doors
        </label>
        <input
          type="number"
          id="doors"
          name="doors"
          value={carData.doors}
          onChange={handleInputChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Car Image */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Car Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
        />
        {carData.image && (
          <div className="mt-4">
            <Image 
              src={carData.image} 
              alt="Car" 
              className="max-w-full h-auto rounded-md" 
              width={500}
              height={300}
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 ${isSubmitting ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold rounded-md transition duration-300`}
      >
        {isSubmitting ? 'Adding Car...' : 'Add Car'}
      </button>

      {/* Go Back Button */}
      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => window.location.href = '/'} // Redirect to the main page
        className="w-full py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-300 mt-4"
      >
        Go Back to Main Page
      </button>
    </form>
  );
};

export default AddCarForm;