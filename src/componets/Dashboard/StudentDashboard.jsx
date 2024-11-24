// import React, { useEffect } from 'react';
// import { useDashboard } from '../../assets/dashboard/context/DashboardContext';

// const StudentDashboard = () => {
//   const { state, actions } = useDashboard();

//   // Load data only once when component mounts
//   useEffect(() => {
//     if (!state.dataLoaded) {  // Add a check to prevent unnecessary loads
//       actions.loadDashboardData();
//     }
//   }, []); // Empty dependency array to run only once

//   if (state.isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Student Info Section */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Welcome back, {state.studentInfo.name}!
//           </h1>
//           <p className="text-gray-600">{state.studentInfo.university}</p>
//         </div>

//         {/* Skills Section */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Skills</h2>
//           <div className="space-y-4">
//             {state.skills.items.map((skill, index) => (
//               <div key={index}>
//                 <div className="flex items-center justify-between text-sm mb-1">
//                   <span className="font-medium text-gray-700">{skill.name}</span>
//                   <span className="text-gray-600">{skill.progress}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className={`${skill.color} rounded-full h-2`}
//                     style={{ width: `${skill.progress}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;
import { useEffect, useState } from 'react'
import { Bell, Book, Calendar, ChevronDown, FileText, GraduationCap, LayoutDashboard, LogOut, MessageSquare, Settings, User, Users, Menu, X } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { authService } from '../../services/authServices';
import userImg from '../../assets/user/avatar-1.svg'
import Navbar from '../home/Navbar'
import Footer from '../home/Footer'
import axios from 'axios'
import WorkshopMaterials from './WorkshopMaterials';

// Custom Button component
// Custom Button component with dark theme
const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "bg-transparent border border-gray-700 text-gray-300 hover:bg-gray-800",
    ghost: "hover:bg-gray-800 hover:text-gray-300",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-2 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Progress component with dark theme
const Progress = ({ value, className, ...props }) => {
  return (
    <div className={`w-full bg-gray-700 rounded-full h-2.5 ${className}`} {...props}>
      <div
        className="bg-teal-500 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

// Custom Card components with dark theme
const Card = ({ children, className, ...props }) => (
  <div className={`bg-gray-800 shadow-sm rounded-lg ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`px-6 pb-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h3 className={`text-lg font-medium text-gray-100 ${className}`} {...props}>
    {children}
  </h3>
);

function StudentDashboard() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    coursesApplied: [],
    workshopsApplied: [],
    testsCompleted: [],
    assessmentsCompleted: [],
    progressData: [],
    upcomingTests: [],
    courseRequestDetails: [], // Add this to initial state
    workshop: []

  });
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token')

  useEffect(() => {
    const studentId = auth.user._id
    // console.log(studentId)
    const fetchDashboardData = async () => {
      setIsLoading(true);
      // console.log('request fetching')
      try {
        const response = await axios.get(
          `https://skillonx-server.onrender.com/student/dashboard/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // console.log(response.data.data)
        setDashboardData(response.data.data);
        // console.log(dashboardData)
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };


    fetchDashboardData();

  }, [auth.user?._id, auth.token]);
  const chartData = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 40 },
    { name: 'Mar', value: 35 },
    { name: 'Apr', value: 50 },
    { name: 'May', value: 45 },
    { name: 'Jun', value: 60 },
    { name: 'Jul', value: 65 },
    { name: 'Aug', value: 75 },
    { name: 'Sep', value: 70 },
    { name: 'Oct', value: 80 },
    { name: 'Nov', value: 85 },
    { name: 'Dec', value: 90 },
  ]



  const calculateOverallProgress = (dashboardData) => {
    // If no workshops or no assessments, return 0
    if (!dashboardData.workshop || dashboardData.workshop.length === 0) {
      return 0;
    }

    let totalExpectedAssessments = 0;
    let totalWorkshops = dashboardData.workshop.length;

    // Calculate total expected assessments based on registered workshops
    dashboardData.workshop.forEach(workshop => {
      const durationDays = parseInt(workshop.duration);
      if (!isNaN(durationDays)) {
        totalExpectedAssessments += durationDays;
      }
    });

    // Get the total completed assessments
    const completedAssessments = dashboardData.assessmentCount || 0;

    // If there are registered workshops but no expected assessments, return 100%
    if (totalWorkshops > 0 && totalExpectedAssessments === 0) {
      return 100;
    }

    // Calculate progress percentage based on completed vs expected assessments
    const progressPercentage = (completedAssessments / totalExpectedAssessments) * 100;

    // Round to nearest integer and cap at 100%
    return Math.min(Math.round(progressPercentage), 100);
  };
  const overallProgress = calculateOverallProgress(dashboardData);
  // const workshopDetails = getWorkshopProgressDetails(dashboardData);


  const upcomingTests = [
    { id: 1, name: 'Midterm Exam: Computer Networks', date: '2024-03-20' },
    { id: 2, name: 'Final Project Presentation: Web Development', date: '2024-04-10' },
    { id: 3, name: 'Quiz: Database Management Systems', date: '2024-03-25' },
  ]
  const handleLogout = async () => {
    try {
      await authService.logout();
      logout(); // Clear local auth state
      navigate('/LoginPage'); // Redirect to login page
    } catch (error) {
      // console.error('Logout error:', error);
      // Still logout even if the server request fails
      logout();
      navigate('/LoginPage');
    }
  };
  return (
    <div className="flex flex-col h-screen  bg-gray-900 text-gray-100 md:flex-row">

      {/* <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-md shadow-lg"
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button> */}
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 p-4 shadow-sm bg-gray-800 mt-16 md:mt-0
      `}>
        <div className="flex items-center gap-2 mb-8">
          {sidebarOpen ? (
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2"
            >
              <X className="h-6 w-6" />
            </button>
          ) : (
            <>
              <div className="bg-teal-500 text-white p-2 rounded">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-100">StudentDashboard</span>
            </>
          )}
        </div>

        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </a>
          <Link to="/student-dashboard/courses-page" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <Book className="h-5 w-5" />
            Courses
          </Link>
          <Link to="/student-dashboard/workshops-page" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <Calendar className="h-5 w-5" />
            Workshops
          </Link>
          <Link to="/student-dashboard/test" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <FileText className="h-5 w-5" />
            Tests
          </Link>
          <Link to="/student-dashboard/check-assessment" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <FileText className="h-5 w-5" />
            Assessment
          </Link>
          <Link to="/student-dashboard/profile" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <Settings className="h-5 w-5" />
            Settings
          </Link>

        </nav>

        <Button
          className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700 mt-auto absolute bottom-4 left-4"
          variant="ghost"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Log out
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto hide-scrollbar  ">
        <header className="bg-gray-800 p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 bg-gray-700 rounded-md text-gray-300"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-xl md:text-2xl font-bold text-gray-100">Student Dashboard</h1>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <Link to="/student-dashboard/profile">
                <img
                  src={userImg}
                  alt="Avatar"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
              </Link>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Courses Applied</CardTitle>
                <Book className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  {dashboardData.courseRequestCounts?.total || 0}
                </div>
                <p className="text-xs">
                  <span className="text-green-400">{dashboardData.courseRequestCounts?.approved || 0} approved</span>
                  {' • '}
                  <span className="text-yellow-400">{dashboardData.courseRequestCounts?.pending || 0} pending</span>
                  {' • '}
                  <span className="text-red-400">{dashboardData.courseRequestCounts?.rejected || 0} rejected</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Workshops Applied</CardTitle>
                <Calendar className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  {dashboardData.workshopCount || 0}
                </div>
                <p className="text-xs text-gray-400">
                  Total workshops registered
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Assessment Completed</CardTitle>
                <FileText className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  {dashboardData.assessmentCount || 0}
                </div>
                <p className="text-xs text-gray-400">
                  Total assessments taken
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Overall Progress</CardTitle>
                <Users className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">{overallProgress}%</div>
                <Progress value={overallProgress} className="mt-2" />
                <div className="mt-2 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Workshops Registered: {dashboardData.workshop?.length || 0}</span>
                    <span>Assessments Completed: {dashboardData.assessmentCount || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle>Learning Progress</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    This Year <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px] sm:h-[400px]">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Area type="monotone" dataKey="value" stroke="#14B8A6" fill="#14B8A6" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Courses and Workshops */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Applied Courses</CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardData.courseRequestDetails.length===0?(
                    <div>There are no courses you've applied for</div>
                ):(
                  <div className="space-y-4">
                  {dashboardData.courseRequestDetails.map((course) => (
                    <div key={course.id} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-300">{course.title}</span>
                        <span className="text-sm text-gray-400">{course.requestDate}</span>
                      </div>
                      {/* <Progress value={course.progress} className="w-full" /> */}
                    </div>
                  ))}
                </div>

                )}
                
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Applied Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.workshop.map((workshop) => (
                    <div key={workshop.id} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{workshop.title}</span>
                      <span className="text-sm text-gray-400">{workshop.duration}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Applied Workshops</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dashboardData.workshop.map((workshop) => (
                  <div key={workshop._id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{workshop.title}</span>
                      <span className="text-sm text-gray-400">{workshop.duration}</span>
                    </div>

                    {/* Add the WorkshopMaterials component here */}
                    <WorkshopMaterials
                      workshop={workshop}
                      token={token} // Pass the auth token from localStorage
                      studentId={auth.user._id}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tests */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">{test.name}</span>
                    <span className="text-sm text-gray-400">{test.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Style to hide scrollbar */}
          <style>
            {`
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }

              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
        </main>
      </div>
    </div>

  )
}

export default StudentDashboard