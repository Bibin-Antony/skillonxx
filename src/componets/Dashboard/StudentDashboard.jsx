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
import React from 'react'
import { Bell, Book, Calendar, ChevronDown, FileText, GraduationCap, LayoutDashboard, LogOut, MessageSquare, Settings, User, Users } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import userImg from '../../assets/user/avatar-1.svg'
import Navbar from '../home/Navbar'
import Footer from '../home/Footer'
// Custom Button component
const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-700",
    outline: "bg-transparent border border-slate-200 hover:bg-slate-100",
    ghost: "hover:bg-slate-100 hover:text-slate-900 ",
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
    <div className={`w-full bg-slate-200 rounded-full h-2.5 ${className}`} {...props}>
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

// Custom Card components
const Card = ({ children, className, ...props }) => (
  <div className={`bg-white shadow-sm rounded-lg ${className}`} {...props}>
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
  <h3 className={`text-lg font-medium ${className}`} {...props}>
    {children}
  </h3>
);

function StudentDashboard() {
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

  return (
    <div className="flex h-screen pt-16 bg-gray-300">
      <Navbar/>
      {/* Sidebar */}
      <div className="w-64  p-4 shadow-sm bg-gray-200">
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-blue-600 text-white p-2 rounded">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">StudentDashboard</span>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </a>
          <Link to="/coursespage" className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded hover:bg-gray-50">
            <Book className="h-5 w-5" />
            Courses
          </Link>
          <Link to="/workshoppages" className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded hover:bg-gray-50">
            <Calendar className="h-5 w-5" />
            Workshops
          </Link>
          <Link to="/assesment" className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded hover:bg-gray-50">
            <FileText className="h-5 w-5" />
            Tests
          </Link>
          
          <Link to="/profile" className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded hover:bg-gray-50">
            <User className="h-5 w-5" />
            Profile
          </Link>
          <a href="#" className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded hover:bg-gray-50">
            <Settings className="h-5 w-5" />
            Settings
          </a>
        </nav>

        <Button className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded hover:bg-gray-50 mt-auto absolute bottom-4 left-4" variant="ghost">
          <LogOut className="h-5 w-5" />
          Log out
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto hide-scrollbar  ">
        <header className="bg-gray-200 p-4 shadow-sm flex items-center justify-between">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <div className="flex items-center gap-4">
            {/* <div className="relative">
              <input
                type="search"
                placeholder="Search courses, workshops..."
                className="w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div> */}
            {/* <Button variant="ghost">
              <Bell className="h-5 w-5" />
            </Button> */}
            <Link to="/profile">
            <img
              src={userImg}
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
            </Link>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Courses Applied</CardTitle>
                <Book className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-green-600">
                  +2 <span className="text-gray-600">from last semester</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Workshops Applied</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-green-600">
                  +1 <span className="text-gray-600">from last month</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Tests Completed</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-orange-600">
                  2 <span className="text-gray-600">pending</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Overall Progress</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <Progress value={78} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Progress Chart */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Learning Progress</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    This Year <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Courses and Workshops */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Applied Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{course.name}</span>
                        <span className="text-sm text-gray-500">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Applied Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workshops.map((workshop) => (
                    <div key={workshop.id} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{workshop.name}</span>
                      <span className="text-sm text-gray-500">{workshop.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tests */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{test.name}</span>
                    <span className="text-sm text-gray-500">{test.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
           {/* Style to hide scrollbar */}
        <style>
          {`
            .hide-scrollbar {
              -ms-overflow-style: none; /* Internet Explorer 10+ */
              scrollbar-width: none; /* Firefox */
            }

            .hide-scrollbar::-webkit-scrollbar {
              display: none; /* Safari and Chrome */
            }
          `}
        </style>
        </main>
      </div>
    </div>
    
  )
}

export default StudentDashboard