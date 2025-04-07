"use client"; // Ensures this component is rendered on the client-side

import { useState } from "react";
import { db, storage } from "../lib/firebase"; // Import Firebase Storage
import { collection, addDoc } from "firebase/firestore"; // Firebase functions for adding data
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage functions
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
    setCarData({ ...carData, image: file ? URL.createObjectURL(file) : null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (carData.image) {
      try {
        // Upload the image to Firebase Storage
        const imageRef = ref(storage, `cars/${carData.title}/${Date.now()}`);
        const file = carData.image ? await fetch(carData.image).then(res => res.blob()) : null;

        if (file) {
          await uploadBytes(imageRef, file);

          // Get the download URL of the uploaded image
          const downloadURL = await getDownloadURL(imageRef);

          // Add the car data to Firestore, including the image URL
          const docRef = await addDoc(collection(db, "cars"), {
            title: carData.title,
            price: carData.price,
            mileage: carData.mileage,
            transmission: carData.transmission,
            color: carData.color,
            engineSize: carData.engineSize,
            fuelType: carData.fuelType,
            doors: carData.doors,
            image: downloadURL, // Store the image URL from Firebase Storage
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
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
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

      {/* Other form fields for price, mileage, etc. */}
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
        </select>
      </div>
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
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Car
      </button>
    </form>
  );
};

export default AddCarForm;
