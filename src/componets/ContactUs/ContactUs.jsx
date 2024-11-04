import React, { useEffect, useRef, Suspense } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../common/BreadCrumb";

// Lazy load components
const Footer = React.lazy(() => import("../home/Footer"));
const ContactHero = React.lazy(() => import("./ContactHero"));
const QuickContactOptions = React.lazy(() => import("./QuickContactOptions"));

// Intersection Observer for lazy loading
const LazySection = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {isVisible ? (
        <Suspense
          fallback={
            <div className="h-32 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          {children}
        </Suspense>
      ) : (
        <div className="h-32" /> // Placeholder height
      )}
    </div>
  );
};

const Contact = () => {
  useEffect(() => {
    // Smooth scroll polyfill
    window.scrollTo({ top: 0 });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Local Business schema markup with contact information
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SkillonX",
    "description": "Professional skill development and training institute in Mysore",
    "url": "https://www.skillonx.com",
    "logo": "https://www.skillonx.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bogadi",
      "addressLocality": "Mysore",
      "addressRegion": "Karnataka",
      "postalCode": "570026",
      "addressCountry": "India"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "YOUR_LATITUDE",
      "longitude": "YOUR_LONGITUDE"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "admissions",
        "telephone": "[Your Phone Number]",
        "email": "admissions@skillonx.com",
        "availableLanguage": ["English", "Kannada", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "corporate training",
        "telephone": "[Your Corporate Phone Number]",
        "email": "corporate@skillonx.com"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <div className="relative">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Contact SkillonX | Professional Training Institute in Mysore</title>
        <meta 
          name="title" 
          content="Contact SkillonX | Professional Training Institute in Mysore" 
        />
        <meta 
          name="description" 
          content="Get in touch with SkillonX for professional training courses, corporate workshops, and career guidance. Visit our training center in Bogadi, Mysore or contact us online." 
        />
        <meta 
          name="keywords" 
          content="contact skillonx, training institute mysore, professional courses contact, skill development center mysore, corporate training contact, course admission mysore" 
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.skillonx.com/contact" />
        <meta 
          property="og:title" 
          content="Contact SkillonX | Professional Training Institute in Mysore" 
        />
        <meta 
          property="og:description" 
          content="Connect with SkillonX for professional training and career guidance. Visit us in Bogadi, Mysore." 
        />
        <meta property="og:image" content="https://www.skillonx.com/contact-og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.skillonx.com/contact" />
        <meta 
          property="twitter:title" 
          content="Contact SkillonX | Training Institute Mysore" 
        />
        <meta 
          property="twitter:description" 
          content="Connect with SkillonX for professional training and career guidance. Visit us in Bogadi, Mysore." 
        />
        <meta property="twitter:image" content="https://www.skillonx.com/contact-twitter-image.jpg" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.skillonx.com/contact" />
        <meta name="coverage" content="Local" />
        <meta name="revisit-after" content="3 days" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />

        {/* Schema.org markup for local business */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="relative">
        {/* Critical components loaded immediately */}
        <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
          <ContactHero />
        </Suspense>
        <Breadcrumb/>
        
        {/* Contact options lazy loaded */}
        <LazySection>
          <QuickContactOptions />
        </LazySection>
      </div>
    </div>
  );
};

export default Contact;