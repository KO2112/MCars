import Navbar from "@/components/Navbar";  // Make sure to adjust the import path if necessary
import Banner from "@/components/Banner";
import CarCarousel from "@/components/CarCarousel";

export default function HomePage() {
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Include the Navbar at the top */}
      <Navbar />

      {/* Banner Section */}
      <Banner />

      {/* Featured Cars Section */}
      <section className="max-w-7xl mx-auto py-10">
        <h2 className="text-2xl font-bold text-center mb-6">
        Our Latest Offers
        </h2>
        <CarCarousel />
      </section>
    </main>
  );
}
