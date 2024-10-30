import React, { useEffect, useRef, Suspense } from "react";
import { Helmet } from "react-helmet";
import BreadCrumb from '../common/BreadCrumb'

// Lazy load components
const CreativeCourseHero = React.lazy(() => import("./CreativeCourseHero"));
const BrowseCategories = React.lazy(() => import("./BrowseCategories"));
const FeaturedCourses = React.lazy(() => import("../home/FeaturedCourses"));
const CTASectionCourses = React.lazy(() => import("./CTASectionCourses"));
const CourseListing = React.lazy(() => import("./CourseListing"));

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

const Courses = () => {
  useEffect(() => {
    // Smooth scroll polyfill
    window.scrollTo({ top: 0});

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Course catalog schema markup
  const coursesCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Course",
        "position": 1,
        "name": "Web Development Course",
        "description": "Comprehensive web development training with front-end and back-end technologies",
        "provider": {
          "@type": "Organization",
          "name": "SkillonX",
          "sameAs": "https://www.skillonx.com"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "onsite",
          "locationCreated": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Mysore",
              "addressRegion": "Karnataka",
              "addressCountry": "India"
            }
          }
        }
      },
      {
        "@type": "Course",
        "position": 2,
        "name": "UI/UX Design Course",
        "description": "Professional UI/UX design training with industry projects and internship",
        "provider": {
          "@type": "Organization",
          "name": "SkillonX",
          "sameAs": "https://www.skillonx.com"
        }
      }
      // Add more courses as needed
    ]
  };

  return (
    <div className="relative">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Professional Training Courses in Mysore | Web Development, UI/UX, Digital Marketing | SkillonX</title>
        <meta 
          name="title" 
          content="Professional Training Courses in Mysore | Web Development, UI/UX, Digital Marketing | SkillonX" 
        />
        <meta 
          name="description" 
          content="Explore our industry-focused professional courses in web development, UI/UX design, graphics, and digital marketing. Get hands-on experience with real projects and guaranteed internship opportunities in Mysore." 
        />
        <meta 
          name="keywords" 
          content="web development course mysore, UI UX design course, digital marketing training, graphics design course, professional certification, coding bootcamp mysore, skill development courses, internship programs" 
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.skillonx.com/courses" />
        <meta 
          property="og:title" 
          content="Professional Training Courses | Skillonx Mysore" 
        />
        <meta 
          property="og:description" 
          content="Discover industry-focused professional courses with guaranteed internships. Transform your career with SkillonX." 
        />
        <meta property="og:image" content="https://www.skillonx.com/courses-og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.skillonx.com/courses" />
        <meta 
          property="twitter:title" 
          content="Professional Training Courses | Skillonx Mysore" 
        />
        <meta 
          property="twitter:description" 
          content="Discover industry-focused professional courses with guaranteed internships. Transform your career with SkillonX." 
        />
        <meta property="twitter:image" content="https://www.skillonx.com/courses-twitter-image.jpg" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://www.skillonx.com/courses" />
        <meta name="classification" content="Education" />
        <meta name="pagename" content="SkillonX Training Courses" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />

        {/* Schema.org markup for courses */}
        <script type="application/ld+json">
          {JSON.stringify(coursesCatalogSchema)}
        </script>
      </Helmet>

      <div className="relative">
        {/* Critical components loaded immediately */}
        <Suspense fallback={<div className="h-screen animate-pulse bg-gray-100" />}>
          <CreativeCourseHero />
        </Suspense>
        <BreadCrumb/>
        
        {/* Other sections lazy loaded as user scrolls */}
        <LazySection>
          <FeaturedCourses />
        </LazySection>

        <LazySection>
          <CourseListing />
        </LazySection>

        <LazySection>
          <CTASectionCourses />
        </LazySection>

        {/* <LazySection>
          <BrowseCategories />
        </LazySection> */}
      </div>
    </div>
  );
};

export default Courses;