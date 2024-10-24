import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Code, Brain, Target, Rocket } from 'lucide-react';
import './App.css';
import Home from './componets/home/Home';
import Courses from './componets/Courses/Courses';
import Workshops from './componets/Workshops/Workshops';
import Internship from './componets/Internship/Internship';
import AboutUs from './componets/AboutUs/AboutUs';
import ContactUs from './componets/ContactUs/ContactUs';

// Animated Background Component
const AnimatedBackground = () => {
  const icons = [Code, Brain, Target, Rocket];
  
  return (
    <div className="animated-background">
      {[...Array(20)].map((_, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div
            key={i}
            className="floating-item"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Icon />
          </div>
        );
      })}
    </div>
  );
};

// Layout Component to wrap all routes
const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/Workshops" element={<Workshops />} />
          <Route path="/Internship" element={<Internship />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;