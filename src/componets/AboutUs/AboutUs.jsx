import React, { useEffect, useRef, Suspense } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../common/BreadCrumb";

// Lazy load components
const BusinessPartners = React.lazy(() => import("./BusinessPartners"));
const AboutUsHero = React.lazy(() => import("./AboutUsHero"));
const OurApproach = React.lazy(() => import("./OurApproach"));
const OurApproachSection = React.lazy(() => import("./OurApproachSection"));

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

const AboutUs = () => {
  useEffect(() => {
    // Smooth scroll polyfill
    window.scrollTo({ top: 0});

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Organization schema markup with detailed information
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SkillonX",
    "description": "SkillonX is a leading skill development institute in Mysore, offering professional training in web development, UI/UX design, and digital marketing with guaranteed internship programs.",
    "foundingDate": "YYYY", // Replace with actual founding year
    "url": "https://www.skillonx.com",
    "logo": "https://www.skillonx.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bogadi",
      "addressLocality": "Mysore",
      "addressRegion": "Karnataka",
      "addressCountry": "India"
    },
    "memberOf": {
      "@type": "Organization",
      "name": "Education and Training Sector"
    },
    "knowsAbout": [
      "Web Development Training",
      "UI/UX Design Education",
      "Digital Marketing Skills",
      "Professional Skill Development",
      "Industry Internships"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional certification"
      }
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "SkillonX Education Group"
    },
    "sameAs": [
      "https://www.facebook.com/skillonx",
      "https://twitter.com/skillonx",
      "https://www.linkedin.com/company/skillonx",
      "https://www.instagram.com/skillonx"
    ]
  };

  return (
    <div className="relative">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>About SkillonX | Leading Professional Training Institute in Mysore</title>
        <meta 
          name="title" 
          content="About SkillonX | Leading Professional Training Institute in Mysore" 
        />
        <meta 
          name="description" 
          content="Discover SkillonX's journey in transforming careers through professional training and skill development. Learn about our approach, success stories, and industry partnerships." 
        />
        <meta 
          name="keywords" 
          content="skillonx about, professional training institute mysore, skill development center, IT training institute, career transformation, industry partnerships, training approach, mysore education" 
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.skillonx.com/about" />
        <meta 
          property="og:title" 
          content="About SkillonX | Professional Training Excellence" 
        />
        <meta 
          property="og:description" 
          content="Leading professional training institute in Mysore offering industry-focused courses with guaranteed internships. Transform your career with SkillonX." 
        />
        <meta property="og:image" content="https://www.skillonx.com/about-og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.skillonx.com/about" />
        <meta 
          property="twitter:title" 
          content="About SkillonX | Professional Training Excellence" 
        />
        <meta 
          property="twitter:description" 
          content="Leading professional training institute in Mysore offering industry-focused courses with guaranteed internships." 
        />
        <meta property="twitter:image" content="https://www.skillonx.com/about-twitter-image.jpg" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.skillonx.com/about" />
        <meta name="author" content="SkillonX" />
        <meta name="coverage" content="Worldwide" />
        <meta name="subject" content="Professional Training and Education" />
        <meta name="copyright" content="SkillonX" />
        <meta name="revisit-after" content="7 days" />

        {/* Schema.org markup for organization */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div className="relative">
        {/* Critical components loaded immediately */}
        <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
          <AboutUsHero />
        </Suspense>
        <Breadcrumb/>
        
        {/* Other sections lazy loaded as user scrolls */}
        <LazySection>
          <BusinessPartners />
        </LazySection>

        <LazySection>
          <OurApproach />
        </LazySection>

        <LazySection>
          <OurApproachSection />
        </LazySection>
      </div>
    </div>
  );
};

export default AboutUs;