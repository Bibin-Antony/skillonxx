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
import { Bell, Book, Calendar, ChevronDown, FileText, GraduationCap, LayoutDashboard, LogOut, MessageSquare, Settings, User, Users, Menu, X, PersonStanding, BookOpenCheck } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { authService } from '../../services/authServices';
import userImg from '../../assets/user/avatar-1.svg'
import Navbar from '../home/Navbar'
import Footer from '../home/Footer'
import NotificationButton from './NotificationButton';
import axios from 'axios'
// Custom Button component
const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-gray-800 text-gray-100 hover:bg-gray-700",
    outline: "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800",
    ghost: "text-gray-300 hover:bg-gray-800 hover:text-gray-100",
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

// Custom Progress component
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
  <div className={`bg-gray-800 rounded-lg shadow-lg border border-gray-700 ${className}`} {...props}>
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

function UniversityDashboard() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    workshops: {
      total: 0,
      registrations: {
        total: 0,
        byStatus: {
          registered: 0,
          attended: 0,
          completed: 0,
          cancelled: 0
        }
      }
    },
    assessments: {
      total: 0,
      submissions: 0
    },
    students: {
      total: 0
    }
  });
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token')
  useEffect(() => {
    const uniId = auth.user._id
    // console.log(uniId)
    const fetchDashboardData = async () => {
      setIsLoading(true);
      // console.log('request fetching')
      try {
        const response = await axios.get(
          `https://skillonx-server.onrender.com/university/dashboard/${uniId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // console.log(response.data.data)
        setDashboardData(response.data.data);


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

  const courses = [
    { id: 1, name: 'Introduction to Computer Science', progress: 75 },
    { id: 2, name: 'Data Structures and Algorithms', progress: 60 },
    { id: 3, name: 'Web Development Fundamentals', progress: 90 },
    { id: 4, name: 'Machine Learning Basics', progress: 40 },
  ]

  const workshops = [
    { id: 1, name: 'Python for Data Science', date: '2024-03-15' },
    { id: 2, name: 'React.js Workshop', date: '2024-03-22' },
    { id: 3, name: 'Cloud Computing Essentials', date: '2024-04-05' },
  ]

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
        w-64 p-4 shadow-sm bg-gray-800 mt-16 md:mt-0 border-r border-gray-700
      `}>
        <div className="flex items-center gap-2 mb-8">
          {sidebarOpen ? (
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          ) : (
            <>
              <div className="bg-teal-500 text-white p-2 rounded">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-100">Dashboard</span>
            </>
          )}
        </div>

        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </a>
          {/* <Link to="/university-dashboard/courses-page" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <Book className="h-5 w-5" />
            Courses
          </Link> */}
          <Link to="/university-dashboard/workshops-page" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <Calendar className="h-5 w-5" />
            Workshops
          </Link>
          <Link to="/university-dashboard/assessment-page" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <BookOpenCheck className="h-5 w-5" />
            Assessment
          </Link>
          <Link to="/university-dashboard/students" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
            <PersonStanding className="h-5 w-5" />
            Students
          </Link>
          <Link to="/university-dashboard/profile" className="flex items-center gap-2 text-gray-300 px-4 py-2 rounded hover:bg-gray-700">
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
        <header className="bg-gray-800 p-4 shadow-sm border-b border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 text-gray-300 hover:text-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-xl md:text-2xl font-bold text-gray-100">University Dashboard</h1>
            <div className="flex items-center gap-4">
              <NotificationButton />
              <Link to="/university-dashboard/profile">
                <img
                  src={userImg}
                  alt="Avatar"
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-700"
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
                <CardTitle className="text-sm font-medium text-gray-400">Total Assessments</CardTitle>
                <BookOpenCheck className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  {dashboardData.assessments.total}
                </div>
                <p className="text-xs text-gray-400">
                  {dashboardData.assessments.submissions} submissions
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Active Workshops</CardTitle>
                <Calendar className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  {dashboardData.workshops.total}
                </div>
                <p className="text-xs">
                  <span className="text-teal-400">
                    {dashboardData.workshops.registrations.byStatus.registered || 0}
                  </span>
                  <span className="text-gray-400"> active registrations</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Students</CardTitle>
                <Users className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-100">
                  {dashboardData.students.total}
                </div>

              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Workshop Stats</CardTitle>
                <Users className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Attended</span>
                    <span className="text-teal-400">
                      {dashboardData.workshops.registrations.byStatus.attended || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Completed</span>
                    <span className="text-green-400">
                      {dashboardData.workshops.registrations.byStatus.completed || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Cancelled</span>
                    <span className="text-red-400">
                      {dashboardData.workshops.registrations.byStatus.cancelled || 0}
                    </span>
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

          {/* Courses and Workshops Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
            {/* Applied Courses Card */}


            {/* Workshops Card */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.workshops?.recentWorkshops?.map((workshop) => (
                    <div key={workshop.id} className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-300">{workshop.title}</span>
                        <span className="text-xs text-gray-400">Duration: {workshop.duration}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(workshop.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.students?.recentStudents?.map((student) => (
                    <div key={student.id} className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-300">{student.name}</span>
                        <span className="text-xs text-gray-400">Duration: {student.email}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(student.joinedDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tests Card */}
          {/* Recent Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Workshop Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData.recentActivity?.registrations?.map((registration, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-300">{registration.studentName}</span>
                      <span className="text-xs text-gray-400">{registration.workshopTitle}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${registration.status === 'registered' ? 'bg-blue-500/20 text-blue-400' :
                          registration.status === 'attended' ? 'bg-teal-500/20 text-teal-400' :
                            registration.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              'bg-red-500/20 text-red-400'
                        }`}>
                        {registration.status}
                      </span>
                      <span className="text-sm text-gray-400">
                        {new Date(registration.registrationDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scrollbar Style */}
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

export default UniversityDashboard