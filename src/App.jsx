import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Code, Brain, Target, Rocket } from "lucide-react";
import "./App.css";
import { Toaster } from 'react-hot-toast';
import { DashboardProvider } from './assets/dashboard/context/DashboardContext';

// Import components
import Navbar from "./componets/home/Navbar";
import Footer from "./componets/home/Footer";
import BreadCrumb from './componets/common/BreadCrumb';
import CourseDetails from "./componets/Courses/CourseDetails";
import WorkshopDetails from "./componets/Workshops/WorkshopDetails";

// Lazy load components
const Home = React.lazy(() => import("./componets/home/Home"));
const Courses = React.lazy(() => import("./componets/Courses/Courses"));
const Workshops = React.lazy(() => import("./componets/Workshops/Workshops"));
const Internship = React.lazy(() => import("./componets/Internship/Internship"));
const AboutUs = React.lazy(() => import("./componets/AboutUs/AboutUs"));
const ContactUs = React.lazy(() => import("./componets/ContactUs/ContactUs"));
const LoginPage = React.lazy(() => import("./componets/LoginSignup/LoginPage"));
const SignupPage = React.lazy(() => import("./componets/LoginSignup/SignupPage"));
const SurveyStartPageOff = React.lazy(() => import("./componets/offline/SurveryStartPageOff"));
const SurveyStartPageOn = React.lazy(() => import("./componets/online/SurveryStartPageOn"));
const SurveyFormOn = React.lazy(() => import('./componets/online/SurveyFormOn'));
const ResumePageOn = React.lazy(() => import('./componets/online/ResumePageOn'));
const FinalPageOn = React.lazy(() => import('./componets/online/FinalPageOn'));
const SurveyFormOff = React.lazy(() => import('./componets/offline/SurveyFormOff'));
const ResumePageOff = React.lazy(() => import('./componets/offline/ResumePageOff'));
const FinalPageOff = React.lazy(() => import('./componets/offline/FinalPageOff'));
const TermsAndConditions = React.lazy(() => import('./componets/Conditions/TermsAndConditions'));
const StudentDashboard = React.lazy(() => import('./componets/Dashboard/StudentDashboard'));

// Dashboard-related lazy-loaded components
// const WorkshopProgressCard = React.lazy(() => import('./assets/dashboard/learning/WorkshopProgressCard'));
// const AssessmentPage = React.lazy(() => import('./assets/dashboard/learning/AssessmentPage'));

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
      {children}
    </div>
  );
};

// Dashboard Layout Component
const DashboardLayout = ({ children }) => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4CAF50',
                secondary: '#ffffff',
              },
            },
            error: {
              duration: 4000,
              theme: {
                primary: '#F44336',
                secondary: '#ffffff',
              },
            },
          }} 
        />
      </div>
    </DashboardProvider>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/Workshops" element={<Workshops />} />
            <Route path="/workshops/:workshopId" element={<WorkshopDetails />} />
            <Route path="/Internship" element={<Internship />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignupPage" element={<SignupPage />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            
            {/* Survey Routes */}
            <Route path='/SurveyStartPage/online' element={<SurveyStartPageOn />} />
            <Route path='/SurveyForm/online' element={<SurveyFormOn />} />
            <Route path='/ResumePage/online' element={<ResumePageOn />} />
            <Route path='/FinalPage/online' element={<FinalPageOn />} />
            <Route path='/SurveyStartPage/offline' element={<SurveyStartPageOff />} />
            <Route path='/SurveyForm/offline' element={<SurveyFormOff />} />
            <Route path='/ResumePage/offline' element={<ResumePageOff />} />
            <Route path='/FinalPage/offline' element={<FinalPageOff />} />
            <Route path='/termsAndConditions' element={<TermsAndConditions />} />

            {/* Dashboard Routes - Wrapped with DashboardLayout */}
            <Route path='/dashboard/*' element={
              <DashboardLayout>
                <Routes>
                  <Route index element={<StudentDashboard />} />
                  {/* <Route path="workshops" element={<WorkshopProgressCard />} />
                  <Route path="assessment" element={<AssessmentPage />} /> */}
                </Routes>
              </DashboardLayout>
            } />
          </Routes>
        </Suspense>
      </Layout>
      <Footer />
    </Router>
  );
};

export default App;
