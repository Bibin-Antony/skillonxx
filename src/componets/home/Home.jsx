import React, { useEffect, useRef, Suspense } from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from "../common/BreadCrumb";

// Lazy load components with prefetching
const Navbar = React.lazy(() => import("./Navbar.jsx"));
const HeroPage = React.lazy(() => import("./HeroPage.jsx"));
const FeaturedCourses = React.lazy(() => import("./FeaturedCourses.jsx"));
const HowItWorks = React.lazy(() => import("./HowItWorks.jsx"));
const CTASection = React.lazy(() => import("./CTASection.jsx"));
const BenefitsSection = React.lazy(() => import("./BenefitsSection.jsx"));
const TestimonialsSection = React.lazy(() => import("./TestimonialsSection.jsx"));
const FAQSection = React.lazy(() => import("./FAQSection.jsx"));
const Footer = React.lazy(() => import("./Footer.jsx"));
const OurTeamSection = React.lazy(() => import("./OurTeamSection.jsx"));

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

const Home = () => {
  useEffect(() => {
    // Smooth scroll polyfill
    window.scrollTo({ top: 0 });

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Schema markup for the organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SkillonX",
    "description": "Professional skill development institute offering courses in web development, UI/UX design, graphics, and digital marketing with guaranteed internships.",
    "url": "https://www.skillonx.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mysore",
      "addressRegion": "Karnataka",
      "addressCountry": "India"
    }
  };

  return (
    <div className="relative">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>SkillonX - Professional Skill Development & Training Institute in Mysore</title>
        <meta name="title" content="SkillonX - Professional Skill Development & Training Institute in Mysore" />
        <meta 
          name="description" 
          content="Transform your career with industry-focused courses in web development, UI/UX design, graphics, and digital marketing. Featuring guaranteed internships and hands-on projects in Mysore." 
        />
        <meta 
          name="keywords" 
          content="skill development, web development course, UI UX design, digital marketing training, internship program mysore, professional certification, coding bootcamp mysore" 
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.skillonx.com/" />
        <meta property="og:title" content="SkillonX - Professional Skill Development & Training Institute in Mysore" />
        <meta 
          property="og:description" 
          content="Transform your career with industry-focused courses in web development, UI/UX design, graphics, and digital marketing. Featuring guaranteed internships and hands-on projects." 
        />
        <meta property="og:image" content="https://www.skillonx.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.skillonx.com/" />
        <meta property="twitter:title" content="SkillonX - Professional Training Institute" />
        <meta 
          property="twitter:description" 
          content="Join SkillonX for industry-focused professional training with guaranteed internships." 
        />
        <meta property="twitter:image" content="https://www.skillonx.com/twitter-image.jpg" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="SkillonX" />
        <link rel="canonical" href="https://www.skillonx.com/" />
        
        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div className="relative">
        {/* Critical components loaded immediately */}
        <Suspense fallback={<div className="h-16 bg-white" />}>
          <Navbar />
        </Suspense>

        <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
          <HeroPage />
        </Suspense>

        {/* Other sections lazy loaded as user scrolls */}
        <LazySection>
          <HowItWorks />
        </LazySection>

        <LazySection>
          <BenefitsSection />
        </LazySection>

        <LazySection>
          <CTASection />
        </LazySection>

        <LazySection>
          <OurTeamSection />
        </LazySection>

        <LazySection>
          <FeaturedCourses />
        </LazySection>

        <LazySection>
          <FAQSection />
        </LazySection>

        <LazySection>
          {/* <Footer /> */}
        </LazySection>
      </div>
    </div>
  );
};

export default Home;