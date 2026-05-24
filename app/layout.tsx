import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ironsauto - Used Cars Leicester | Second Hand Car Dealership UK",
    template: "%s | Ironsauto"
  },
  description: "Buy quality used cars in Leicester. Competitive prices, finance options & inspected vehicles. Ironsauto's second hand car collection. UK delivery.",
  keywords: [
    "used cars Leicester",
    "second hand cars Leicester",
    "car dealership Leicester",
    "buy used cars",
    "car finance UK",
    "inspected vehicles",
    "quality used cars",
    "second hand car sales",
    "affordable vehicles",
    "reliable cars UK",
    "Ironsauto",
    "Leicester garage",
    "used car dealers",
    "vehicle financing",
    "pre-owned cars"
  ],
  authors: [{ name: "Ironsauto" }],
  creator: "Ironsauto",
  publisher: "Ironsauto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ironsauto.co.uk'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ironsauto - Used Cars Leicester | Second Hand Car Dealership UK",
    description: "Buy quality used cars in Leicester & across the UK. Ironsauto: second hand vehicles, competitive prices, car finance. Inspected cars, UK-wide delivery.",
    url: 'https://ironsauto.co.uk',
    siteName: 'Ironsauto',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/IRONSAUTO.png',
        width: 1200,
        height: 630,
        alt: 'Ironsauto Leicester - Quality Used Cars Dealership',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Used Cars Leicester | Ironsauto Second Hand Car Dealership",
    description: "Buy quality used cars in Leicester & UK. Ironsauto: competitive prices, car finance, inspected vehicles. UK-wide delivery available.",
    images: ['/IRONSAUTO.png'], // Same image as OpenGraph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer/>
        <WhatsAppButton />
      </body>           
    </html>
  );
}