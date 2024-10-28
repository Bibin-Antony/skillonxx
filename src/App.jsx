import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Code, Brain, Target, Rocket } from "lucide-react";
import "./App.css";
import Navbar from "./componets/home/navbar";
import Footer from "./componets/home/Footer";
import BreadCrumb from './componets/common/BreadCrumb'

// Lazy load components
const Home = React.lazy(() => import("./componets/home/Home"));
const Courses = React.lazy(() => import("./componets/Courses/Courses"));
const Workshops = React.lazy(() => import("./componets/Workshops/Workshops"));
const Internship = React.lazy(() => import("./componets/Internship/Internship"));
const AboutUs = React.lazy(() => import("./componets/AboutUs/AboutUs"));
const ContactUs = React.lazy(() => import("./componets/ContactUs/ContactUs"));
const LoginPage = React.lazy(() => import("./componets/LoginSignup/LoginPage"));
const SignupPage = React.lazy(() => import("./componets/LoginSignup/SignupPage"));


// Loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
      {/* <BreadCrumb/> */}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/Workshops" element={<Workshops />} />
            <Route path="/Internship" element={<Internship />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignupPage" element={<SignupPage />} />
          </Routes>
        </Suspense>
      </Layout>
      <Footer />
    </Router>
  );
};

export default App;