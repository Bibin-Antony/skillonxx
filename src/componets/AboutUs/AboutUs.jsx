import React, { useEffect, useRef, Suspense } from "react";

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

const AboutUs = () => {
  useEffect(() => {
    // Smooth scroll polyfill
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        {/* Critical components loaded immediately */}
        <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
          <AboutUsHero />
        </Suspense>

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