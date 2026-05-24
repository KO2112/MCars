import type { Metadata } from "next";
import Banner from "@/components/Banner";
import CarCarousel from "@/components/CarCarousel";
import Cu from "@/components/Cu";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/Aboutus";

export const metadata: Metadata = {
  title: "Used Cars Leicester | Second Hand Cars UK | Ironsauto",
  description: "Buy quality used cars in Leicester. Competitive prices, finance options & inspected vehicles. Ironsauto's second hand car collection. UK delivery.",
  keywords: [
    "used cars Leicester",
    "second hand cars Leicester",
    "car dealership Leicester",
    "buy used cars Leicester",
    "second hand car sales Leicester",
    "used car finance Leicester",
    "affordable used cars",
    "inspected vehicles Leicester",
    "reliable second hand cars UK",
    "car dealership UK",
    "vehicle finance options",
    "used car dealers Leicester",
    "quality used vehicles",
    "Ironsauto Leicester",
    "buy cars online Leicester"
  ],
  openGraph: {
    title: "Used Cars Leicester & UK | Ironsauto Second Hand Car Dealership",
    description: "Buy quality used cars in Leicester & across the UK. Ironsauto: second hand vehicles, competitive prices, car finance. Inspected cars, UK-wide delivery.",
    type: "website",
    url: "https://ironsauto.co.uk",
    images: [
      {
        url: "/IRONSAUTO.png",
        width: 1200,
        height: 630,
        alt: "Ironsauto Leicester - Quality Used Cars Dealership"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Cars Leicester | Ironsauto Second Hand Car Dealership", 
    description: "Buy quality used cars in Leicester & UK. Ironsauto: competitive prices, car finance, inspected vehicles. UK-wide delivery available.",
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