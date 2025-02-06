import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import CoursesPages from './componets/Dashboard/CoursesPages'
import WorkshopsPage from './componets/Dashboard/WorkshopsPage'
import WorkshopManagement from "./componets/Dashboard/WorkshopManagement";
import BackToTopButton from './componets/common/BackToTop'
import StuProfilePage from "./componets/Dashboard/StuProfilePage";
import UniversityDashboard from "./componets/Dashboard/UniversityDashboard";
import {AuthProvider} from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectRoute'
import NotFound from "./error/NotFound";
import CreateWorkshopPage from "./componets/Dashboard/CreateWorkshopPages";
import CreateAssessment from "./componets/Dashboard/CreateAssessment";
import AssessmentsQuestion from './componets/Dashboard/AssessmentsQuestion'
import TestPage from "./componets/Dashboard/AssessmentsPage";
import GiveAssessment from './componets/Dashboard/GiveAssessment'
import AllStudents from "./componets/Dashboard/AllStudents";
import AdminDashboard from "./componets/Dashboard/AdminDashboard";
import AdminLogin from './componets/admin/AdminLogin'
import AdminUniversities from "./componets/Dashboard/admindash/AdminUniversities";
import AdminStudents from "./componets/Dashboard/admindash/AdminStudents";
import AdminAssessment from "./componets/Dashboard/admindash/AdminAssessment";
import UniProfilePage from "./componets/Dashboard/UniProfilePage";
import ForgotPassword from "./componets/LoginSignup/ForgetPassword";
import AddCourses from "./componets/Dashboard/AddCourses";
import VerifyEmail from "./componets/LoginSignup/VerifyEmail";
import StudentDetails from "./componets/Dashboard/admindash/StudentDetails";
import CheckCourse from './componets/Dashboard/admindash/CheckCourse'
import CheckRank from "./componets/Dashboard/CheckRank";
import StudentDetail from "./componets/Dashboard/StudentDetail";
import HackathonPage from "./hackthon/HackathonPage";
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
  const location = useLocation();
  
  // Check if the current route is a dashboard route
  const isDashboardRoute = 
    location.pathname.startsWith('/student-dashboard') ||
    location.pathname.startsWith('/university-dashboard') ||
    location.pathname.startsWith('/admin');
    return (
      <>
        {!isDashboardRoute && <Navbar />}
        <div className="relative min-h-screen">
          <AnimatedBackground />
          {children}
          <BackToTopButton/>
        </div>
        {!isDashboardRoute && <Footer />}
      </>
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
      <AuthProvider>
      
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
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
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
            <Route path="/verification-email" element={<VerifyEmail/>}/>
            <Route path="/verification-email/:code/:email" element={<VerifyEmail />} />

            {/* Hackthon */}
            <Route path='/hackthon' element={<HackathonPage />} />


            {/* <Route path="/coursespage" element={<CoursesPages/>}/>
            <Route path="/workshoppages" element={<WorkshopsPage/>}/>
            <Route path="/assesment" element={<AssessmentPage/>}/>
            <Route path="/profile-page" element={<ProfilePage/>} /> */}
            {/* <Route path="/university-dashboard" element={<UniversityDashboard/>}/> */}
            {/* Student Dashboard Routes */}
            <Route path="/manage-system-access" element={<AdminLogin />} />

            <Route 
    path="/admin/*" 
    element={
      <ProtectedRoute allowedUserTypes={['admin']}>
        <DashboardLayout>
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="universities" element={<AdminUniversities/>} />
            <Route path="students" element={<AdminStudents/>} />
            <Route path="students/:studentId" element={<StudentDetails/>}/>
            <Route path="assessments" element={<AdminAssessment/>} />
            <Route path="add-course" element={<AddCourses/>} />    
            <Route path='check-course' element={<CheckCourse/>}/>

            {/* Other admin routes */}
          </Routes>
        </DashboardLayout>
      </ProtectedRoute>
    } 
  />
              
            <Route 
                path="/student-dashboard/*" 
                element={
                  <ProtectedRoute allowedUserTypes={['student']}>
                    <DashboardLayout>
                      <Routes>
                        <Route index element={<StudentDashboard />} />
                        <Route path="courses-page" element={<CoursesPages />} />
                        <Route path="courses-page/add-course" element={<AddCourses/>} />    

                        <Route path="workshops-page" element={<WorkshopsPage />} />
                        <Route path="test" element={<TestPage />} />
                        <Route path="check-assessment" element={<GiveAssessment/>}/>
                        <Route path="profile" element={<StuProfilePage />} />
                        
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />       
              {/* University Dashboard Routes */}
              <Route 
                path="/university-dashboard/*" 
                element={
                  <ProtectedRoute allowedUserTypes={['university']}>
                    <DashboardLayout>
                      <Routes>
                        <Route index element={<UniversityDashboard />} />
                        <Route path="courses-page" element={<CoursesPages />} />
                        <Route path="workshops-page" element={<WorkshopManagement />} />  {/* Renamed from WorkshopManagement */}
                        <Route path="workshops-page/create-workshop" element={<CreateWorkshopPage />} />    
                        <Route path="workshops-page/create-assessment/:workshopId" element={<AssessmentsQuestion/>} />    

                        <Route path="assessment-page" element={<CreateAssessment/>}/>
                        <Route path="students" element={<AllStudents/>}/>
                        <Route path='check-rank' element={<CheckRank/>}/>
                        <Route path="student-detail/:studentId" element={<StudentDetail/>} />
                         {/* <Route path="assessment-page/" element={<AssessmentsQuestion/>}/> */}
                        <Route path="profile" element={<UniProfilePage />} />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                } 
              />
          
               <Route path="*" element={<NotFound />} />

            {/* Dashboard Routes - Wrapped with DashboardLayout
            <Route path='/student-dashboard/*' element={
              <DashboardLayout>
                <Routes>
                  <Route index element={<StudentDashboard />} />           
                </Routes>
              </DashboardLayout>
            } /> */}
          </Routes>
        </Suspense>
      </Layout>
      
      </AuthProvider>
    </Router>
  );
};

export default App;