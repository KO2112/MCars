import type { Metadata } from "next";
import Banner from "@/components/Banner";
import CarCarousel from "@/components/CarCarousel";
import Cu from "@/components/Cu";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutUs from "@/components/Aboutus";

export const metadata: Metadata = {
  title: "Used Cars Leicester & Leicestershire | Car Dealer East Midlands | IRONS AUTO",
  description:
    "Trusted used car dealership in Leicester. Quality second hand cars for sale across Leicestershire, the East Midlands & UK. Warranty, part exchange & UK-wide delivery.",
  keywords: [
    // Leicester (primary)
    "used cars Leicester",
    "second hand cars Leicester",
    "car dealership Leicester",
    "used car dealers Leicester",
    "buy used cars Leicester",
    "used car finance Leicester",
    "cars for sale Leicester",
    // Leicestershire
    "used cars Leicestershire",
    "second hand cars Leicestershire",
    "car dealers Leicestershire",
    "cars for sale Leicestershire",
    // Midlands
    "used cars Midlands",
    "used cars East Midlands",
    "car dealership East Midlands",
    "second hand cars Midlands",
    // UK
    "used cars UK",
    "second hand cars UK",
    "used cars for sale UK",
    "quality used vehicles UK",
    "UK car delivery",
    // Brand & intent
    "IRONS AUTO Leicester",
    "part exchange Leicester",
    "used cars with warranty Leicester",
    "inspected used vehicles",
    "affordable used cars",
  ],
  openGraph: {
    title: "Used Cars Leicester & Leicestershire | IRONS AUTO — East Midlands Car Dealer",
    description:
      "Quality used cars for sale in Leicester. Serving Leicestershire, the East Midlands and the whole of the UK. Inspected vehicles, warranty, part exchange & delivery.",
    type: "website",
    url: "https://ironsauto.co.uk",
    locale: "en_GB",
    images: [
      {
        url: "/IRONSAUTO.png",
        width: 1200,
        height: 630,
        alt: "IRONS AUTO — Used Car Dealership in Leicester, Leicestershire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Used Cars Leicester & Leicestershire | IRONS AUTO",
    description:
      "Quality used cars for sale in Leicester & across the East Midlands. Warranty, part exchange & UK-wide delivery.",
    images: ["/IRONSAUTO.png"],
  },
  alternates: {
    canonical: "https://ironsauto.co.uk",
  },
};

export default function HomePage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Local business structured data — AutoDealer with full NAP & service area */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            "@id": "https://ironsauto.co.uk/#dealer",
            name: "IRONS AUTO",
            alternateName: "Ironsauto",
            description:
              "Independent used car dealership in Leicester selling quality inspected second hand cars across Leicestershire, the East Midlands and the UK. Warranty, part exchange and nationwide delivery available.",
            url: "https://ironsauto.co.uk",
            logo: "https://ironsauto.co.uk/IRONSAUTO.png",
            image: "https://ironsauto.co.uk/IRONSAUTO.png",
            telephone: "+447407403676",
            email: "info@ironsauto.co.uk",
            priceRange: "££",
            currenciesAccepted: "GBP",
            address: {
              "@type": "PostalAddress",
              streetAddress: "101-103 Margaret Road",
              addressLocality: "Leicester",
              addressRegion: "Leicestershire",
              postalCode: "LE5 5FW",
              addressCountry: "GB",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 52.6369,
              longitude: -1.0847,
            },
            areaServed: [
              { "@type": "City", name: "Leicester" },
              { "@type": "AdministrativeArea", name: "Leicestershire" },
              { "@type": "AdministrativeArea", name: "East Midlands" },
              { "@type": "Country", name: "United Kingdom" },
            ],
            makesOffer: {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Quality used cars",
                description:
                  "Inspected second hand vehicles with warranty, part exchange and UK-wide delivery",
              },
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Used cars for sale in Leicester",
              url: "https://ironsauto.co.uk/cars",
            },
          }),
        }}
      />

      {/* Hero */}
      <Banner />

      {/* Featured stock */}
      <section
        aria-label="Latest used cars for sale in Leicester"
        className="max-w-400 mx-auto py-2"
      >
        <CarCarousel />
      </section>

      <AboutUs />
      <WhyChooseUs />
      <Cu />

      {/* Local SEO content — crawlable text targeting Leicester / Leicestershire / Midlands / UK */}
      <section
        aria-label="About our used car dealership in Leicester"
        className="bg-white border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-3">
              IRONS AUTO &middot; Leicester, LE5
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Used car dealership in Leicester, serving Leicestershire and the
              East Midlands
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Quality used cars in Leicester
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our showroom on Margaret Road, Leicester stocks a hand-picked
                range of second hand cars. Every vehicle is inspected and
                prepared before it goes on sale, and comes with a warranty of
                up to 12 months for complete peace of mind.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                Serving Leicestershire &amp; the Midlands
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We welcome customers from across Leicestershire and the East
                Midlands — including Loughborough, Hinckley, Market Harborough,
                Coalville and Melton Mowbray. Part exchange is accepted, with
                fair valuations on your current car.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">
                UK-wide delivery available
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Buying from further afield? We arrange delivery of used cars
                anywhere in the UK. Browse our current stock online, enquire
                about any vehicle, and we&apos;ll handle the rest — from
                viewing and test drive to handover.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}