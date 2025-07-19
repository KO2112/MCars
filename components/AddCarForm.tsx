"use client"; // Ensures this component is rendered on the client-side

import type React from "react";

import { useState } from "react";
import { db } from "../firebase/firebase"; // Firebase setup
import { collection, addDoc } from "firebase/firestore"; // Firebase functions for adding data
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage
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
    description: "",
    features: [] as string[],
    make: "",
    status: "Available Now", // Add status field
  });

  const [featureInput, setFeatureInput] = useState("");

  const [imageFiles, setImageFiles] = useState<File[]>([]); // Store multiple image files
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Store multiple preview URLs
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Convert FileList to Array
      const newFiles = Array.from(e.target.files);

      // Create preview URLs for all newly selected files
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      // Append new files and previews to existing arrays
      setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }

    // Reset the file input value so the same file can be selected again if needed
    if (e.target instanceof HTMLInputElement) {
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    // Remove the image at the specified index
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(newPreviews[index]);

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleAddFeature = () => {
    if (featureInput.trim() === "") return;

    setCarData({
      ...carData,
      features: [...carData.features, featureInput.trim()],
    });
    setFeatureInput("");
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    setCarData({
      ...carData,
      features: carData.features.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one image is selected
    if (imageFiles.length === 0) {
      alert("Please select at least one image for the car.");
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrls: string[] = [];

      // Upload all images to Firebase Storage
      if (imageFiles.length > 0) {
        const storage = getStorage();

        // Upload each file and get its download URL
        for (const file of imageFiles) {
          const storageRef = ref(
            storage,
            `car-images/${Date.now()}-${file.name}`
          );
          const snapshot = await uploadBytes(storageRef, file);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadUrl);
        }
      }

      // Add the car data to Firestore with all image URLs
      const docRef = await addDoc(collection(db, "cars"), {
        ...carData,
        images: imageUrls, // Store array of image URLs
        createdAt: new Date(), // Add timestamp
        status: carData.status || "Available Now", // Ensure status is set
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
        description: "",
        features: [],
        make: "",
        status: "Available Now", // Add status field to reset
      });

      // Revoke all object URLs to prevent memory leaks
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      setImageFiles([]);
      setImagePreviews([]);

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
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
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

      {/* Make */}
      <div>
        <label
          htmlFor="make"
          className="block text-sm font-medium text-gray-700"
        >
          Car Make
        </label>
        <input
          type="text"
          id="make"
          name="make"
          value={carData.make}
          onChange={handleInputChange}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          placeholder="e.g., BMW, Mercedes, Audi"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="mileage"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="transmission"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="engineSize"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="fuelType"
          className="block text-sm font-medium text-gray-700"
        >
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
        <label
          htmlFor="doors"
          className="block text-sm font-medium text-gray-700"
        >
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

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Car Description
        </label>
        <textarea
          id="description"
          name="description"
          value={carData.description}
          onChange={handleInputChange}
          rows={4}
          className="mt-1 w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter a detailed description of the vehicle..."
        />
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vehicle Features
        </label>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-md"
            placeholder="e.g., Full MOT, ULEZ Compliant, Bluetooth"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Add
          </button>
        </div>

        {/* Display added features */}
        {carData.features.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">Added features:</p>
            <div className="flex flex-wrap gap-2">
              {carData.features.map((feature, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-1.5 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Car Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Car Images
        </label>

        {/* Add Image Button (styled as a button but uses file input) */}
        <div className="flex flex-wrap gap-4 items-center">
          <label className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300">
            <span>Add Image</span>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" // Hide the actual input
            />
          </label>

          {/* Image count display */}
          {imageFiles.length > 0 && (
            <span className="text-sm text-gray-600">
              {imageFiles.length} {imageFiles.length === 1 ? "image" : "images"}{" "}
              selected
            </span>
          )}
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview || "/placeholder.svg"}
                  alt={`Car image ${index + 1}`}
                  className="w-full rounded-md object-cover h-40"
                  width={200}
                  height={150}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 ${isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"} text-white font-semibold rounded-md transition duration-300`}
      >
        {isSubmitting ? "Adding Car..." : "Add Car"}
      </button>

      {/* Go Back Button */}
      <button
        type="button"
        disabled={isSubmitting}
        onClick={() => (window.location.href = "/")} // Redirect to the main page
        className="w-full py-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-300 mt-4"
      >
        Go Back to Main Page
      </button>
    </form>
  );
};

export default AddCarForm;

