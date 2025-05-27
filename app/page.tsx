import type { Metadata } from "next";
import Banner from "@/components/Banner";
import CarCarousel from "@/components/CarCarousel";
import Cu from "@/components/Cu";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/Aboutus";

export const metadata: Metadata = {
  title: "Premium Used Cars & Dealership - Iron auto UK",
  description: "Find your perfect used car at Iron auto. Quality vehicles, competitive prices, financing options available. Browse our collection of reliable second-hand cars.",
  keywords: [
    "used cars UK",
    "second hand cars", 
    "car dealership",
    "quality used vehicles",
    "car finance",
    "inspected cars",
    "affordable cars",
    "reliable vehicles",
    "Ironsauto"
  ],
  openGraph: {
    title: "Premium Used Cars & Car Dealership - Ironsauto UK",
    description: "Find your perfect used car at Ironsauto. Quality inspected vehicles, competitive prices, financing options available.",
    type: "website",
    url: "https://ironsauto.co.uk",
    images: [
      {
        url: "/IRONSAUTO.png", // Add specific homepage image
        width: 1200,
        height: 630,
        alt: "Ironsauto Car Showroom - Quality Used Cars"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Used Cars & Car Dealership - Ironsauto UK", 
    description: "Find your perfect used car at Ironsauto. Quality inspected vehicles, competitive prices, financing options available.",
    images: ["/IRONSAUTO.png"]
  },
  alternates: {
    canonical: "https://ironsauto.co.uk"
  }
};

export default function HomePage() {
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Add structured data for homepage specific content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Ironsauto - Premium Used Cars Homepage",
            "description": "Discover quality used cars at Ironsauto. Browse our collection of inspected vehicles with competitive prices and excellent customer service.",
            "url": "https://ironsauto.co.uk",
            "mainEntity": {
              "@type": "ItemList",
              "name": "Featured Used Cars",
              "description": "Hand-picked selection of quality used vehicles available at Ironsauto",
              "numberOfItems": "50+" // Update based on your actual inventory
            },
            "breadcrumb": {
              "@type": "BreadcrumbList", 
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://ironsauto.co.uk"
                }
              ]
            }
          })
        }}
      />

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