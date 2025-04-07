"use client"; // Ensures this component is rendered on the client-side

import { useState, useEffect } from "react";
import { db } from "../lib/firebase"; // Firebase setup
import { collection, getDocs } from "firebase/firestore"; // Firebase function to get data

// Updated Car interface with 'id' property
interface Car {
  id: string; // Add id field to match Firestore document ID
  title: string;
  price: string;
  mileage: string;
  transmission: string;
  color: string;
  engineSize: string;
  fuelType: string;
  doors: string;
  image: string;
}

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);

  // Fetch car data from Firestore on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carList: Car[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Ensure the data exists and matches the Car type
          if (data) {
            const car: Car = {
              id: doc.id, // This is now allowed because 'id' is part of the Car interface
              title: data.title || "", // Provide fallback values
              price: data.price || "",
              mileage: data.mileage || "",
              transmission: data.transmission || "",
              color: data.color || "",
              engineSize: data.engineSize || "",
              fuelType: data.fuelType || "",
              doors: data.doors || "",
              image: data.image || "",
            };
            carList.push(car);
          }
        });

        setCars(carList); // Update state with car data
      } catch (error) {
        console.error("Error fetching cars: ", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {cars.length === 0 ? (
        <div className="col-span-full text-center text-lg text-gray-600">No cars available</div>
      ) : (
        cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-60 relative">
              <img
                src={car.image}
                alt={car.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{car.title}</h3>
              <p className="text-gray-600">{car.price} (£)</p>

              <div className="mt-3 space-x-2">
                <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {car.engineSize}L
                </span>
                <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  {car.fuelType}
                </span>
                <span className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                  {car.color}
                </span>
              </div>

              <div className="mt-3 space-x-2">
                <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  {car.doors} Doors
                </span>
                <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                  {car.transmission}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cars;
