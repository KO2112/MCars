// components/StructuredData.tsx
import React from 'react';

const StructuredData: React.FC = () => {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": "Ironsauto",
    "description": "Premium used car dealership offering quality inspected vehicles with excellent customer service in the UK.",
    "url": "https://ironsauto.co.uk",
    "logo": "IRONSAUTO.png", // Replace with actual logo URL
    "image": "IRONSAUTO.jpg", // Replace with actual image URL
    "telephone": "+447467866745",
    "email": "info@ironsauto.co.uk", // Replace with actual email
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "101-103 Margaret Rd, Leicester LE5 5FW", // Replace with actual address
      "addressLocality": "Your City",
      "addressRegion": "Leicestershire", 
      "postalCode": "LE5 5FW",
      "addressCountry": "GB"
    },
    
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-17:00",
      "Su 10:00-16:00"
    ],
    "priceRange": "££",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Bank Transfer"],
    "currenciesAccepted": "GBP",
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "serviceType": [
      "Used Car Sales",
      "Car Financing",
      "Vehicle Inspection",
      "Car Consultation"
    ],
    "sameAs": [
      // Add your social media URLs here
      // "https://www.facebook.com/ironsauto",
      // "https://www.instagram.com/ironsauto",
      // "https://www.twitter.com/ironsauto"
    ]
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ironsauto",
    "url": "https://ironsauto.co.uk",
    "description": "Premium used car dealership offering quality inspected vehicles with excellent customer service in the UK.",
    "publisher": {
      "@type": "Organization",
      "name": "Ironsauto"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ironsauto.co.uk/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ironsauto.co.uk/#business",
    "name": "Ironsauto",
    "description": "Your trusted local car dealership specializing in quality used vehicles.",
    "url": "https://ironsauto.co.uk",
    "telephone": "+447467866745",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "101-103 Margaret Rd, Leicester LE5 5FW", // Replace with actual address
      "addressLocality": "Leicestershire",
      "addressRegion": "Leicester",
      "postalCode": "LE5 5FW", 
      "addressCountry": "GB"
    },
    
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday", 
        "opens": "10:00",
        "closes": "16:00"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
};

export default StructuredData;