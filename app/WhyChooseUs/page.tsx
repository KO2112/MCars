// app/page.tsx (or wherever your main page is located)
import CarCarousel from '../../components/CarCarousel';
import WhyChooseUs from '../../components/WhyChooseUs';
// Import other components...

export default function Home() {
  return (
    <main>
      {/* Hero section or other content */}
      
      {/* Latest Arrivals Carousel */}
      <CarCarousel />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
      {/* Other sections */}
    </main>
  );
}