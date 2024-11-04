import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Clock, Users, MapPin, CheckCircle,
  BookOpen, Target, GraduationCap, Code,
  ArrowRight,
  X,
  User,
  Mail,
  Phone,
  Book
} from 'lucide-react';
// Import course images
import frontendImg from '../../assets/Images/frontend.jpg'
import backendImg from '../../assets/Images/frontend.jpg'
import englishImg from '../../assets/Images/english.jpg'
import pythonImg from '../../assets/Images/python.jpg'
// Provided course data
const CourseEnrollmentModal = ({ isOpen, onClose, courseName }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md transform transition-all animate-slideUp">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
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
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
            {/* Personal Information */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Educational Background */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Educational Qualification</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Book className="h-5 w-5 text-gray-400" />
                </div>
                <select 
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">Select your qualification</option>
                  <option value="high_school">High School</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                required
                id="terms"
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the terms and conditions and authorize the institute to contact me regarding the course
              </label>
            </div>

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
const courses = [
  {
    id: 1,
    title: "Front-end Development",
    description: "Master modern front-end technologies including HTML5, CSS3, JavaScript, and React.js. Includes a 3-month internship opportunity with industry partners.",
    image: frontendImg,
    category: "Development",
    duration: "3 Months",
    totalDuration: "6 Months",
    batchSize: "30 students",
    mode: "Hybrid",
    certification: "Industry Certified",
    hasInternship: true,
    highlights: [
      "HTML5 & CSS3",
      "JavaScript & React.js",
      "Responsive Design",
      "3 Months Internship"
    ]
  },
  {
    id: 2,
    title: "Back-end Development",
    description: "Comprehensive back-end development course covering Node.js, databases, and server architecture. Includes hands-on projects and internship.",
    image: backendImg,
    category: "Development",
    duration: "3 Months",
    totalDuration: "6 Months",
    batchSize: "30 students",
    mode: "Hybrid",
    certification: "Industry Certified",
    hasInternship: true,
    highlights: [
      "Node.js",
      "Database Management",
      "API Development",
      "3 Months Internship"
    ]
  },
  {
    id: 3,
    title: "English Proficiency Course",
    description: "Intensive English language program focusing on communication, presentation, and business English skills.",
    image: englishImg,
    category: "Language",
    duration: "1 Month",
    totalDuration: "1 Month",
    batchSize: "25 students",
    mode: "Online Live",
    certification: "Proficiency Certificate",
    hasInternship: false,
    highlights: [
      "Business Communication",
      "Presentation Skills",
      "Interview Preparation",
      "Professional Writing"
    ]
  },
  {
    id: 4,
    title: "Python Programming",
    description: "Comprehensive Python programming course with focus on real-world applications, data structures, and algorithms. Includes internship placement.",
    image: pythonImg,
    category: "Programming",
    duration: "3 Months",
    totalDuration: "6 Months",
    batchSize: "30 students",
    mode: "Hybrid",
    certification: "Industry Certified",
    hasInternship: true,
    highlights: [
      "Python Fundamentals",
      "Data Structures",
      "Web Development",
      "3 Months Internship"
    ]
  }
];

const CourseDetails = () => {
  const { courseId } = useParams();
  const [activeSection, setActiveSection] = useState('curriculum');
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  // Find course by ID
  const course = courses.find((course) => course.id === Number(courseId));

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Course Not Found</h1>
          <p className="text-gray-600 mt-2">The requested course could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm font-medium">{course.category}</span>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm font-medium">{course.mode}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-blue-100 text-lg mb-8">{course.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>{course.batchSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>{course.mode}</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors" onClick={() => setShowEnrollModal(true)}>
                Enroll Now
              </button>
            </div>
            <div className="relative bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              {/* Course Image */}
              <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-xl mb-6" />
              <h3 className="text-xl font-semibold mb-4">Course Highlights</h3>
              <div className="space-y-3">
                {course.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CourseEnrollmentModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        courseName={course.title}
      />
      {/* Additional Sections */}
      {/* Add logic for curriculum and other sections */}
    </div>
  );
};

export default CourseDetails;
