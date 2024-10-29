import React, { useEffect, useRef, Suspense } from "react";
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
        <Suspense fallback={
          <div className="h-32 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
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
;
    window.scrollTo({ top: 0});

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        {/* Critical components loaded immediately */}
        <Suspense fallback={<div className="h-16 bg-white" />}>
          <Navbar />
        </Suspense>

        <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
          <HeroPage />
        </Suspense>
        {/* <BreadCrumb/> */}
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

        {/* <LazySection>
          <TestimonialsSection />
        </LazySection> */}

        

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
