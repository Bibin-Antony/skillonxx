import React, { useEffect, useRef, Suspense } from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from '../common/BreadCrumb'

// Lazy load components
const Navbar = React.lazy(() => import("../home/Navbar"));
const WorkshopHero = React.lazy(() => import("./WorkshopHero"));
const WorkshopListing = React.lazy(() => import("./WorkshopListing"));
const WorkshopProcess = React.lazy(() => import("./WorkshopProcess"));
const WorkshopBenefits = React.lazy(() => import("./WorkshopBenefits"));
const Footer = React.lazy(() => import("../home/Footer"));

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

const Workshop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0});

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Workshop Events schema markup
  const workshopEventsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Web Development Workshop",
        "description": "Intensive hands-on workshop covering modern web development technologies and practices",
        "provider": {
          "@type": "Organization",
          "name": "SkillonX",
          "sameAs": "https://www.skillonx.com"
        },
        "educationalLevel": "Beginner to Advanced",
        "audience": {
          "@type": "Audience",
          "audienceType": "College Students and IT Professionals"
        }
      },
      {
        "@type": "Course",
        "name": "UI/UX Design Workshop",
        "description": "Comprehensive workshop on UI/UX design principles and practices",
        "provider": {
          "@type": "Organization",
          "name": "SkillonX"
        }
      },
      {
        "@type": "Course",
        "name": "Digital Marketing Workshop",
        "description": "Practical workshop on digital marketing strategies and implementation",
        "provider": {
          "@type": "Organization",
          "name": "SkillonX"
        }
      }
    ]
  };

  // Corporate Training schema
  const corporateTrainingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Corporate Training Workshops",
    "serviceType": "Professional Training",
    "provider": {
      "@type": "Organization",
      "name": "SkillonX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mysore",
        "addressRegion": "Karnataka",
        "addressCountry": "India"
      }
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    },
    "areaServed": {
      "@type": "State",
      "name": "Karnataka"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Corporate Training Programs",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Technical Workshops",
          "description": "Customized technical training for corporate teams"
        },
        {
          "@type": "OfferCatalog",
          "name": "Skill Development Programs",
          "description": "Professional skill enhancement workshops"
        }
      ]
    }
  };

  return (
    <div className="relative">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Professional Workshops & Corporate Training | SkillonX Mysore</title>
        <meta 
          name="title" 
          content="Professional Workshops & Corporate Training | SkillonX Mysore" 
        />
        <meta 
          name="description" 
          content="Join SkillonX's intensive workshops and corporate training programs in web development, UI/UX design, and digital marketing. Customized training solutions for colleges and companies in Mysore." 
        />
        <meta 
          name="keywords" 
          content="corporate training mysore, technical workshops, professional development, skill enhancement programs, college workshops, corporate workshops mysore, technical training, web development workshop, UI UX workshop" 
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.skillonx.com/workshops" />
        <meta 
          property="og:title" 
          content="Professional Workshops & Corporate Training | SkillonX" 
        />
        <meta 
          property="og:description" 
          content="Transform your team with our professional workshops and corporate training programs. Customized solutions for colleges and companies." 
        />
        <meta property="og:image" content="https://www.skillonx.com/workshop-og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.skillonx.com/workshops" />
        <meta 
          property="twitter:title" 
          content="Professional Workshops & Training | SkillonX" 
        />
        <meta 
          property="twitter:description" 
          content="Transform your team with our professional workshops and corporate training programs." 
        />
        <meta property="twitter:image" content="https://www.skillonx.com/workshop-twitter-image.jpg" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.skillonx.com/workshops" />
        <meta name="classification" content="Education, Professional Training" />
        <meta name="target" content="Corporations, Educational Institutions" />
        <meta name="coverage" content="Karnataka" />
        <meta name="revisit-after" content="7 days" />
        <meta name="category" content="Professional Training" />

        {/* Schema.org markup for workshops and training */}
        <script type="application/ld+json">
          {JSON.stringify(workshopEventsSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(corporateTrainingSchema)}
        </script>
      </Helmet>

      <div className="relative">
        {/* Critical components loaded immediately */}
        <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
          <WorkshopHero />
        </Suspense>
        <BreadCrumb/>
        
        {/* Other sections lazy loaded as user scrolls */}
        <LazySection>
          <WorkshopListing />
        </LazySection>

        <LazySection>
          <WorkshopProcess />
        </LazySection>

        <LazySection>
          <WorkshopBenefits />
        </LazySection>
      </div>
    </div>
  );
};

export default Workshop;