import React, { useEffect } from "react";
import {
  Code,
  Book,
  Laptop,
  Compass,
  Lightbulb,
  Palette,
  Video,
  Briefcase,
} from "lucide-react";
// import CreativeCourseHero from './CreativeCourseHero';
import Navbar from "../home/navbar";

import Footer from "../home/Footer";
import ContactHero from "./ContactHero";
import QuickContactOptions from "./QuickContactOptions";

// Course-themed icons
const COURSE_ICONS = [
  Code,
  Book,
  Laptop,
  Compass,
  Lightbulb,
  Palette,
  Video,
  Briefcase,
];

const AnimatedBackground = () => {
  return (
    <div className="animated-background courses-theme">
      {[...Array(24)].map((_, i) => {
        const Icon = COURSE_ICONS[i % COURSE_ICONS.length];
        return (
          <div
            key={i}
            className="floating-item"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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

const Courses = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component is mounted
  }, []);

  return (
    <div className="relative">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        <ContactHero />
        <QuickContactOptions />
        <Footer />
      </div>
    </div>
  );
};

export default Courses;
