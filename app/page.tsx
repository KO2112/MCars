
import Banner from "@/components/Banner";
import CarCarousel from "@/components/CarCarousel";
import Cu from "@/components/Cu";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/Aboutus";

export default function HomePage() {
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Include the Navbar at the top */}
      

      {/* Banner Section */}
      <Banner />

      {/* Featured Cars Section */}
      <section className="max-w-400 mx-auto py-2">
        
        <CarCarousel />
      </section>
      <AboutUs/>
      <WhyChooseUs/>   
      
      <Cu/>   
      
      
      </main>
  );
}
