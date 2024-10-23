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
import Navbar from "../home/Navbar";
import BusinessPartners from "./BusinessPartners";
import Footer from "../home/Footer";
import AboutUsHero from "./AboutUsHero";
import OurApproach from "./OurApproach";
import OurApproachSection from "./OurApproachSection";

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
        <AboutUsHero />
        <BusinessPartners />
        <OurApproach />
        <OurApproachSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
