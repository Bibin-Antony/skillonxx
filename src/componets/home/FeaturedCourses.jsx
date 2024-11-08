import React, { useState } from "react";
import {
  Users,
  Calendar,
  ArrowRight,
  Clock,
  BookOpen,
  Trophy,
  Tag,
   X, Mail, Phone, User, GraduationCap,Book
} from "lucide-react";
import axios from 'axios'

import frontend from "../../assets/Images/frontend.jpg";
import python from "../../assets/Images/python.jpg";
import english from "../../assets/Images/english.jpg";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import lottieAnim from '../../assets/lottiejson/lottieanima.json'
const courses = [
  {
    id: 1,
    title: "Front End Development Bootcamp", 
    description: "Master modern front-end development with React and contemporary web technologies",
    startDate: "2024-11-01",
    maxStudents: 10,
    enrolledStudents: 6,
    status: "Filling Fast",
    duration: "12 weeks",
    image: frontend,
    highlights: ["React Development", "Industry Projects", "Portfolio Building"]
   },
  {
    id: 2,
    title: "Python Programming",
    description: "Learn Python fundamentals, data structures, OOP, and build real-world applications",
    startDate: "2024-10-25",
    maxStudents: 10,
    enrolledStudents: 4,
    status: "Starting Soon",
    duration: "16 weeks",
    image: python,
    highlights: ["Core Python", "Web Development", "Automation Scripts"]
  },
  {
    id: 3,
    title: "English Language Mastery",
    description: "Master business English and professional communication skills",
    startDate: "2024-11-15",
    maxStudents: 10,
    enrolledStudents: 0,
    status: "Open for Enrollment",
    duration: "3 weeks",
    image: english,
    highlights: ["Business Communication", "IELTS Preparation", "Interview Skills"]
   },
];
const FeaturedCoursesEnrollmentModal = ({ isVisible, onClose, courseName }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false); // Add loading state

  if (!isVisible) return null;
  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !education) {
      setError("All fields are required");
      return;
    }
    setLoading(true)
    const enrollmentData = {
      name,
      email,
      phone,
      education,
      featuredCourse: courseName,
    };
    const devUrl = "https://skillonx-website.onrender.com"
    try {
      const response = await axios.post(`${devUrl}/createenrollment`, enrollmentData);
      console.log("Enrollment Successful:", response.data);
      onClose();  // Close modal after submission
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setError("An error occurred while enrolling. Please try again.");
    }
  };
  return (
    <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-[1040]" onClick={onClose} />

      {/* Modal with margin from top and bottom padding for better visibility */}
      <div className="relative w-full max-w-md mt-12 mb-8 transform transition-all animate-slideUp z-[1051]">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto">
          {/* Decorative header background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 opacity-10" />

          {/* Header */}
          <div className="relative px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Course Enrollment</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Fill in your details to enroll</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="px-6 pb-8 space-y-5">
            {/* Name Field */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="relative">
                <User className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  onChange={(e)=>{
                    setEmail(e.target.value)
                    setError("")
                  }}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input
                  type="tel"
                  value={phone}
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  onChange={(e) =>{ setPhone(e.target.value)
                    setError("")
                  }
                  }
                />
              </div>
            </div>

            {/* Education Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <div className="relative">
                <Book className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input
                  type="text"
                  value={education}
                  placeholder="Enter your education level"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  onChange={(e) => {
                    setEducation(e.target.value)
                    setError("")
                  }}
                />
              </div>
            </div>

            {/* Featured Course Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Featured Course</label>
              <input
                type="text"
                value={courseName}
                disabled
                className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                
                id="terms"
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the terms and conditions and authorize the institute to contact me regarding the course.
              </label>
            </div>
            {/* Repeat similar input fields for Email, Phone, and Education */}
            {/* Loading Animation */}
            {/* {loading && (
              <div className="flex justify-center py-4">
                <DotLottieReact src={lottieAnim} loop autoplay   style={{ width: 100, height: 100 }}
 />
              </div>
            )} */}
            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Enroll Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const FeaturedCourses = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getEnrollmentStatus = (enrolled, max) => {
    const percentageFilled = (enrolled / max) * 100;
    return {
      width: `${percentageFilled}%`,
      color:
        percentageFilled > 80
          ? "bg-gradient-to-r from-red-500 to-red-600"
          : percentageFilled > 50
          ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
          : "bg-gradient-to-r from-green-500 to-green-600",
    };
  };
  const handleEnrollClick = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setModalVisible(true);
  };
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pattern-grid opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b "></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t "></div>

      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Featured Courses
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your career with our industry-aligned courses. Learn from
            experts and build real-world projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const enrollmentStatus = getEnrollmentStatus(
              course.enrolledStudents,
              course.maxStudents
            );

            return (
              <div
                key={course.id}
                className="group relative bg-white rounded-2xl shadow-blue-300/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden ">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-lg">
                      {course.status}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Highlights */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      <span>Starts {formatDate(course.startDate)}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="flex items-center">
                          <Users className="w-5 h-5 mr-2 text-blue-600" />
                          <span className="text-sm">
                            {course.enrolledStudents} / {course.maxStudents}{" "}
                            enrolled
                          </span>
                        </span>
                        <span className="text-sm font-medium text-blue-600">
                          {Math.round(
                            (course.enrolledStudents / course.maxStudents) * 100
                          )}
                          % filled
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${enrollmentStatus.color}`}
                          style={{
                            width: enrollmentStatus.width,
                            transition: "width 1s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 flex items-center justify-center group" onClick={() => handleEnrollClick(course.title)}>
                    <span>Enroll Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
          <FeaturedCoursesEnrollmentModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        courseName={selectedCourse}
      />
        </div>

        <div className="text-center mt-16">
        <button 
          onClick={() => window.location.href = '/courses'}
          className="group relative px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-blue-600"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl transition-all duration-300"></div>
          <span className="relative flex items-center justify-center gap-2 text-white">
            Explore All Courses
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCourses;
