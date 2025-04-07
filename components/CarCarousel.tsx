"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useEffect } from "react";

// Example mock data with images, year, mileage, and transmission
const mockCars = [
  {
    id: 1,
    title: "2022 BMW M3",
    price: "$68,000",
    year: "2022",
    mileage: "25,000 miles",
    transmission: "Automatic",
    image: "/m3.jpg",
  },
  {
    id: 2,
    title: "2023 Tesla Model S",
    price: "$89,000",
    year: "2023",
    mileage: "15,000 miles",
    transmission: "Automatic",
    image: "/m3.jpg",
  },
  {
    id: 3,
    title: "2021 Audi A6",
    price: "$48,500",
    year: "2021",
    mileage: "35,000 miles",
    transmission: "Automatic",
    image: "/m3.jpg",
  },
  {
    id: 4,
    title: "2022 Mercedes C-Class",
    price: "$55,000",
    year: "2022",
    mileage: "20,000 miles",
    transmission: "Automatic",
    image: "/m3.jpg",
  },
  {
    id: 5,
    title: "2020 Ford Mustang",
    price: "$35,000",
    year: "2020",
    mileage: "40,000 miles",
    transmission: "Manual",
    image: "/m3.jpg",
  },
  {
    id: 6,
    title: "2021 Honda Accord",
    price: "$28,000",
    year: "2021",
    mileage: "30,000 miles",
    transmission: "Automatic",
    image: "/m3.jpg",
  },
  {
    id: 7,
    title: "2023 Porsche 911",
    price: "$120,000",
    year: "2023",
    mileage: "10,000 miles",
    transmission: "Automatic",
    image: "/m3.jpg",
  },
  {
    id: 8,
    title: "2021 Chevrolet Camaro",
    price: "$40,000",
    year: "2021",
    mileage: "25,000 miles",
    transmission: "Manual",
    image: "/m3.jpg",
  },
];

export default function CarCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap", // Smooth transition
    slides: {
      perView: 4, // Show 4 cars at once
      spacing: 15, // Space between slides
    },
    rtl: false, // Slide left to right
  });

  // Set up auto slide every 3 seconds
  useEffect(() => {
    if (instanceRef.current) {
      const intervalId = setInterval(() => {
        // Make sure instanceRef.current is not null
        if (instanceRef.current) {
          instanceRef.current.next(); // Move to next slide
        }
      }, 3000); // Slide every 3 seconds

      return () => clearInterval(intervalId); // Clear the interval on cleanup
    }
  }, [instanceRef]); // Dependency array ensures this runs only once

  return (
    <div className="mt-6 px-4">
      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {mockCars.map((car) => (
          <div
            key={car.id}
            className="keen-slider__slide bg-white rounded-xl shadow-lg p-4"
          >
            <div className="w-full h-60 relative"> {/* Increased the height for bigger images */}
              <Image
                src={car.image}
                alt={car.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <h3 className="mt-3 text-lg font-semibold">{car.title}</h3>
            <p className="text-gray-600">{car.price}</p>
            <div className="mt-3 space-x-2">
              <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                {car.year}
              </span>
              <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                {car.mileage}
              </span>
              <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                {car.transmission}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
