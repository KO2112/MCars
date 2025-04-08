
import Banner from "@/components/Banner";
import CarCarousel from "@/components/CarCarousel";
import Cu from "@/components/Cu";

export default function HomePage() {
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Include the Navbar at the top */}
      

      {/* Banner Section */}
      <Banner />

      {/* Featured Cars Section */}
      <section className="max-w-7xl mx-auto py-2">
        
        <CarCarousel />
      </section>
      <Cu/>
    </main>
  );
}
