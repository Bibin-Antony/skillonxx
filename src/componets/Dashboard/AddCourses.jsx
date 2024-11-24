import React, { useEffect } from 'react';
import { Clock, Users, Monitor, Award, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import frontendImg from '../../assets/Images/frontend.jpg'
import backendImg from '../../assets/Images/frontend.jpg'
import englishImg from '../../assets/Images/english.jpg'
import pythonImg from '../../assets/Images/python.jpg'
import axios from 'axios'
import { useAuth } from '../../auth/AuthContext';
import { authService } from '../../services/authServices';
const AddCourses = () => {
  const { auth } = useAuth()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Front-end Development",
      description: "Master modern front-end technologies including HTML5, CSS3, JavaScript, and React.js.",
      image: frontendImg,
      category: "Development",
      duration: "3 Months",
      mode: "Hybrid",
      hasInternship: true,
    },
    {
      id: 2,
      title: "Back-end Development",
      description: "Comprehensive back-end development course covering Node.js, databases, and server architecture.",
      image: backendImg,
      category: "Development",
      duration: "3 Months",
      mode: "Hybrid",
      hasInternship: true,
    },
    {
      id: 3,
      title: "English Proficiency Course",
      description: "Intensive English language program focusing on communication and presentation skills.",
      image: englishImg,
      category: "Language",
      duration: "1 Month",
      mode: "Online Live",
      hasInternship: false,
    },
    {
      id: 4,
      title: "Python Programming",
      description: "Comprehensive Python programming course with focus on real-world applications.",
      image: pythonImg,
      category: "Programming",
      duration: "3 Months",
      mode: "Hybrid",
      hasInternship: true,
    }
  ];
  // useEffect(() => {
  //   console.log(auth.user._id)
  // })
  const studentId = auth.user._id
  const handleApplyCourse = async (course) => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      // console.log(course)
      // Send course details directly
      const response = await axios.post('https://skillonx-server.onrender.com/course-requests/submit', {
        title: course.title,
        description: course.description,
        category: course.category,
        duration: course.duration,
        mode: course.mode,
        hasInternship: course.hasInternship,
        studentId: studentId
      });

      // console.log(response.data)
      // // Store pending course info in localStorage
      // const pendingCourses = JSON.parse(localStorage.getItem('pendingCourses') || '[]');
      // pendingCourses.push({
      //   courseId,
      //   appliedAt: new Date().toISOString(),
      //   status: 'pending'
      // });
      // localStorage.setItem('pendingCourses', JSON.stringify(pendingCourses));

      // Redirect to courses page
      navigate('/student-dashboard/courses-page');
    } catch (error) {
      console.error('Error applying for course:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-100">Available Courses</h1>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <button
          onClick={() => navigate('/student-dashboard/courses-page')}
          className="inline-flex items-center text-gray-300 hover:text-gray-100 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="text-sm">Back to My Courses</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-all duration-300 group"
            >
              <div className="aspect-video relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-gray-900/80 text-teal-400 rounded-full text-xs">
                    {course.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-100 mb-1 truncate">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-teal-500" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Monitor className="w-3 h-3 mr-1 text-teal-500" />
                    {course.mode}
                  </div>
                </div>

                <button
                  onClick={() => handleApplyCourse(course)}
                  disabled={isLoading}
                  className={`w-full bg-gray-700 hover:bg-teal-500 text-gray-100 py-2 px-3 rounded text-sm transition-colors duration-200 flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {isLoading ? 'Processing...' : 'Apply Now'}
                  {!isLoading && (
                    <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AddCourses;