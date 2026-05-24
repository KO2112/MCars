// components/StructuredData.tsx
import React from 'react';

const StructuredData: React.FC = () => {
  // Organization Schema (Automotive Business)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": "Ironsauto",
    "description": "Premium used car dealership offering quality inspected vehicles with excellent customer service in Leicester and across the UK.",
    "url": "https://ironsauto.co.uk",
    "logo": "https://ironsauto.co.uk/IRONSAUTO.png",
    "image": "https://ironsauto.co.uk/IRONSAUTO.jpg",
    "telephone": "+447407403676",
    "email": "info@ironsauto.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "101-103 Margaret Rd",
      "addressLocality": "Leicester",
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
    "areaServed": [
      {
        "@type": "City",
        "name": "Leicester"
      },
      {
        "@type": "Region",
        "name": "Leicestershire"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      }
    ],
    "serviceType": [
      "Used Car Sales",
      "Car Financing",
      "Vehicle Inspection",
      "Car Consultation",
      "Second Hand Car Sales"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "150"
    },
    "sameAs": []
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ironsauto",
    "url": "https://ironsauto.co.uk",
    "description": "Premium used car dealership offering quality inspected vehicles in Leicester and across the UK.",
    "publisher": {
      "@type": "Organization",
      "name": "Ironsauto"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://ironsauto.co.uk/cars?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Local Business Schema (More specific for Leicester)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ironsauto.co.uk/#business",
    "name": "Ironsauto - Leicester Used Car Dealership",
    "description": "Your trusted local car dealership in Leicester specializing in quality used vehicles and second hand cars across the UK.",
    "url": "https://ironsauto.co.uk",
    "telephone": "+447407403676",
    "email": "info@ironsauto.co.uk",
    "priceRange": "£",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "101-103 Margaret Rd",
      "addressLocality": "Leicester",
      "addressRegion": "Leicestershire",
      "postalCode": "LE5 5FW", 
      "addressCountry": "GB"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "52.6369",
      "longitude": "-1.1398"
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
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "150"
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ironsauto.co.uk"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Used Cars",
        "item": "https://ironsauto.co.uk/cars"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Incoming Vehicles",
        "item": "https://ironsauto.co.uk/incoming-vehicles"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About Us",
        "item": "https://ironsauto.co.uk/About"
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
};

export default StructuredData;