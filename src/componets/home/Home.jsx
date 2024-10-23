import React, { useEffect } from "react";
import {
  Code,
  Brain,
  Target,
  Rocket,
  Laptop,
  Database,
  Cloud,
  Workflow,
} from "lucide-react";
import Navbar from "./navbar";
import HeroPage from "./Heropage";
import FeaturedCourses from "./FeaturedCourses";
import TechPartnersSlider from "./TechPartnersSlider";
import HowItWorks from "./HowItWorks";
import CTASection from "./CTASection";
import BenefitsSection from "./BenefitsSection";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import OurTeamSection from "./OurTeamSection";

// More varied icons for a tech education theme
const TECH_ICONS = [
  Code,
  Brain,
  Target,
  Rocket,
  Laptop,
  Database,
  Cloud,
  Workflow,
];

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      {[...Array(24)].map((_, i) => {
        const Icon = TECH_ICONS[i % TECH_ICONS.length];
        return (
          <div
            key={i}
            className="floating-item"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              // Using CSS variables for dynamic positioning and animation
              "--float-offset": `${Math.random() * 20}px`,
              "--animation-delay": `${Math.random() * 5}s`,
              "--rotation": `${Math.random() * 360}deg`,
            }}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component is mounted
  }, []);
  return (
    <div className="relative">
      {/* Animated Background stays fixed while content scrolls */}
      <AnimatedBackground />

      {/* Main content container with proper z-index */}
      <div className="relative z-10">
        <Navbar />
        <HeroPage />
        <TechPartnersSlider />
        <HowItWorks />
        <BenefitsSection />
        <OurTeamSection />
        <FeaturedCourses />
        <TestimonialsSection />
        <CTASection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
