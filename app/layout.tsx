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
    default: "Ironsauto - Premium Used Cars & Car Dealership UK",
    template: "%s | Ironsauto"
  },
  description: "Discover quality used cars at Iron auto. Wide selection of inspected vehicles, competitive prices, and excellent customer service. Your trusted car dealership in the UK.",
  keywords: [
    "used cars",
    "car dealership", 
    "second hand cars",
    "quality cars",
    "UK cars",
    "car sales",
    "vehicle finance",
    "Iron auto",
    "affordable cars",
    "inspected vehicles"
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
    title: "Ironsauto - Premium Used Cars & Car Dealership UK",
    description: "Discover quality used cars at Ironsauto. Wide selection of inspected vehicles, competitive prices, and excellent customer service.",
    url: 'https://ironsauto.co.uk',
    siteName: 'Ironsauto',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: '/IRONSAUTO.png', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'Ironsauto - Quality Used Cars',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ironsauto - Premium Used Cars & Car Dealership UK",
    description: "Discover quality used cars at Ironsauto. Wide selection of inspected vehicles, competitive prices, and excellent customer service.",
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