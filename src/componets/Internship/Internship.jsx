import React, { useEffect, useRef, Suspense } from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from '../common/BreadCrumb'

// Lazy load components
const Navbar = React.lazy(() => import("../home/Navbar"));
const Footer = React.lazy(() => import("../home/Footer"));
const InternshipHero = React.lazy(() => import("./InternshipHero"));
const TrackComparison = React.lazy(() => import("./TrackComparison"));
const ApplicationProcess = React.lazy(() => import("./ApplicationProcess"));
const CurrentOpenings = React.lazy(() => import("./CurrentOpenings"));
const CTASection = React.lazy(() => import("./CTASection"));

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

const Internship = () => {
  useEffect(() => {
    // Smooth scroll polyfill
    window.scrollTo({ top: 0});

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Internship Program schema markup
  const internshipProgramSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "SkillonX Professional Internship Program",
    "description": "Industry-focused internship program with real project experience in web development, UI/UX design, and digital marketing",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "SkillonX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mysore",
        "addressRegion": "Karnataka",
        "addressCountry": "India"
      }
    },
    "timeToComplete": "P3M",
    "occupationalCategory": "Software Development, UI/UX Design, Digital Marketing",
    "programType": "Internship Program",
    "offers": {
      "@type": "Offer",
      "category": "Internship",
      "availability": "https://schema.org/InStock"
    },
    "hasCourse": [
      {
        "@type": "Course",
        "name": "Web Development Internship",
        "description": "3-6 month internship program in full-stack web development"
      },
      {
        "@type": "Course",
        "name": "UI/UX Design Internship",
        "description": "3-6 month internship program in UI/UX design"
      },
      {
        "@type": "Course",
        "name": "Digital Marketing Internship",
        "description": "3-6 month internship program in digital marketing"
      }
    ]
  };

  // Job Posting schema for internship positions
  const internshipJobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": "Professional Internship Opportunities",
    "description": "Join SkillonX's professional internship program to gain hands-on experience in web development, UI/UX design, or digital marketing.",
    "datePosted": new Date().toISOString(),
    "validThrough": new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
    "employmentType": "INTERN",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "SkillonX",
      "sameAs": "https://www.skillonx.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mysore",
        "addressRegion": "Karnataka",
        "addressCountry": "India"
      }
    },
    "educationalRequirements": "Currently pursuing or recently graduated in relevant field",
    "experienceRequirements": "No prior experience required",
    "skills": "Programming, Design Thinking, Digital Marketing",
    "industry": "Information Technology"
  };

  return (
    <div className="relative">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Professional Internship Program in Mysore | SkillonX</title>
        <meta 
          name="title" 
          content="Professional Internship Program in Mysore | Web Development, UI/UX, Digital Marketing | SkillonX" 
        />
        <meta 
          name="description" 
          content="Join SkillonX's 3-6 month internship program in Mysore. Gain real industry experience in web development, UI/UX design, and digital marketing. Structured learning path with mentorship." 
        />
        <meta 
          name="keywords" 
          content="internship mysore, web development internship, UI UX design internship, digital marketing internship, IT internship mysore, professional training, industry projects, skill development internship" 
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.skillonx.com/internship" />
        <meta 
          property="og:title" 
          content="Professional Internship Program | SkillonX Mysore" 
        />
        <meta 
          property="og:description" 
          content="Launch your career with our professional internship program. Get hands-on experience in web development, UI/UX design, or digital marketing." 
        />
        <meta property="og:image" content="https://www.skillonx.com/internship-og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.skillonx.com/internship" />
        <meta 
          property="twitter:title" 
          content="Professional Internship Program | SkillonX Mysore" 
        />
        <meta 
          property="twitter:description" 
          content="Launch your career with our professional internship program. Get hands-on experience in web development, UI/UX design, or digital marketing." 
        />
        <meta property="twitter:image" content="https://www.skillonx.com/internship-twitter-image.jpg" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.skillonx.com/internship" />
        <meta name="classification" content="Education, Internship" />
        <meta name="target" content="Students, Fresh Graduates, Professionals" />
        <meta name="coverage" content="India" />
        <meta name="revisit-after" content="3 days" />

        {/* Schema.org markup for internship program and job postings */}
        <script type="application/ld+json">
          {JSON.stringify(internshipProgramSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(internshipJobPostingSchema)}
        </script>
      </Helmet>

      <div className="relative">
        {/* Critical components loaded immediately */}
        <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
          <InternshipHero />
        </Suspense>
        <BreadCrumb/>
        
        {/* Other sections lazy loaded as user scrolls */}
        <LazySection>
          <TrackComparison />
        </LazySection>

        <LazySection>
          <ApplicationProcess />
        </LazySection>

        <LazySection>
          <CurrentOpenings />
        </LazySection>

        <LazySection>
          <CTASection />
        </LazySection>
      </div>
    </div>
  );
};

export default Internship;