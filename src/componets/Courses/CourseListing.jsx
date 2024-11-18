import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Users,
  Clock,
  Grid,
  List,
  Filter,
  Building,
  BookOpen,
  Code,
  GraduationCap,
  X,
  Mail,
  Phone,
  User,
  Book
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios'
// Import course images
import frontendImg from '../../assets/Images/frontend.jpg'
import backendImg from '../../assets/Images/frontend.jpg'
import englishImg from '../../assets/Images/english.jpg'
import pythonImg from '../../assets/Images/python.jpg'
import Lottie from 'lottie-react';
import wait from '../../assets/lottiejson/wait.json'
import complete from '../../assets/lottiejson/complete.json'
// Course Data
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

// Enrollment Modal Component
const EnrollmentModal = ({ isOpen, onClose, courseName }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [error, setError] = useState("");
  const [formState, setFormState] = useState("idle"); // idle, submitting, success

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setEducation("");
    setError("");
    setFormState("idle");
  };
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !phone || !education) {
      setError("All fields are required");
      return;
    }
    setFormState("submitting");
    const enrollmentData = {
      name,
      email,
      phone,
      education,
      featuredCourse: courseName,
    };
    const prodUrl = "https://skillonx-server.onrender.com"
    const devUrl = "http://localhost:5000"
    try {
      const response = await axios.post("https://skillonx-server.onrender.com/createprofessionalcourse", enrollmentData);
      console.log("Enrollment Successful:", response.data);
      setFormState("success");
      setTimeout(() => {
        resetForm()
        onClose();
      }, 2000); // Close the modal after submission
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setError("An error occurred while enrolling. Please try again.");
      setFormState("idle");

    }
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
          {formState === "submitting" && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50">
              <div className="w-48 h-48">
                <Lottie animationData={wait} loop />
              </div>
              <p className="text-lg font-medium text-gray-700 mt-4">Submitting your enrollment...</p>
            </div>
          )}

          {formState === "success" && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50">
              <div className="w-48 h-48">
                <Lottie animationData={complete} loop={false} />
              </div>
              <p className="text-lg font-medium text-gray-700 mt-4">Enrollment Successful!</p>
            </div>
          )}

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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* Personal Information */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone}
                  placeholder="Enter your phone number"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            {/* Workshop Details */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Workshop Name</label>
              <input
                type="text"
                value={courseName}
                disabled
                className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-100 focus:outline-none"
              />
            </div>
            {/* Educational Background */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Educational Qualification</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Book className="h-5 w-5 text-gray-400" />
                </div>
                <select

                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white"
                  value={education}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                  onChange={(e) => setEducation(e.target.value)}
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

// Filter Component
const CourseFilter = ({ label, options, value, onChange }) => {
  return (
    <div className="relative">
      <select
        className="appearance-none w-full bg-white border border-primary/20 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-font"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course, isListView }) => {
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`bg-white rounded-xl shadow-lg overflow-hidden ${isListView ? "flex" : "flex flex-col"
          }`}
      >
        <div className={`relative ${isListView ? "w-1/3" : "w-full"}`}>
          <img
            src={course.image}
            alt={course.title}
            className={`object-cover ${isListView ? "h-full" : "h-52 w-full"}`}
          />
          {course.hasInternship && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              + Internship
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-primary/10 text-custom px-3 py-1 rounded-full text-sm">
              {course.category}
            </span>
            <span className="bg-secondary/20 text-font px-3 py-1 rounded-full text-sm">
              {course.duration}
            </span>
          </div>

          <h3 className="font-bold text-xl mb-2 text-font">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{course.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{course.totalDuration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{course.batchSize}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span>{course.mode}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>{course.certification}</span>
            </div>
          </div>

          {/* Course Highlights */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Course Highlights:</h4>
            <ul className="grid grid-cols-2 gap-2">
              {course.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-3 h-3 mr-2 text-custom" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto flex gap-3">
            <button
              onClick={() => setShowEnrollModal(true)}
              className="flex-1 bg-custom text-white active:scale-95 transition-all
              duration-300 px-8 py-3 rounded-lg font-semibold hover:bg-gradient-to-br hover:from-custom hover:via-primary"
            >
              Enroll Now
            </button>
            <button onClick={() => navigate(`/courses/${course.id}`)} className="flex-1 bg-custom text-white active:scale-95 transition-all duration-300 px-8 py-3 rounded-lg font-semibold hover:bg-gradient-to-br hover:from-custom hover:via-primary">
              Learn More
            </button>
          </div>
        </div>
      </motion.div>

      <EnrollmentModal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        courseName={course.title}
      />
    </>
  );
};

// Main Component
const CourseListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [isListView, setIsListView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth < 768) setIsListView(false); // Automatically switch to grid view on mobile
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Filter Options
  const filterOptions = {
    categories: ["Development", "Language", "Programming"],
    durations: ["1 Month", "3 Months", "6 Months"],
  };

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "" || course.category === category) &&
      (duration === "" || course.duration === duration)
    );
  });

  return (
    <div className="min-h-screen relative overflow-hidden py-12 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-blue-500/[0.03] bg-[size:20px]" />
      </div>

      {/* Content container */}
      <div className="relative container mx-auto px-4 md:w-[75vw]">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Professional Courses
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Launch your career with industry-focused professional courses
        </p>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 bg-gradient-to-tr from-custom to-primary active:scale-90 text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200"
            >
              <Filter className="h-5 w-5" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <CourseFilter
                  label="Category"
                  options={filterOptions.categories}
                  value={category}
                  onChange={setCategory}
                />
                <CourseFilter
                  label="Duration"
                  options={filterOptions.durations}
                  value={duration}
                  onChange={setDuration}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Toggle and Results Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-font">
            Available Courses ({filteredCourses.length})
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsListView(false)}
              className={`p-2 rounded-lg ${!isListView ? "bg-custom text-white" : "bg-gray-200"
                }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            {isDesktop && (
              <button
                onClick={() => setIsListView(true)}
                className={`p-2 rounded-lg ${isListView ? "bg-primary text-white" : "bg-gray-200"}`}
              >
                <List className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Course Cards */}
        <motion.div
          layout
          className={`grid gap-6 ${isListView
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            }`}
        >
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isListView={isListView}
            />
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredCourses.length === 0 && (
          <div className="text-center text-gray-600 mt-12">
            <p className="text-lg">No courses found matching your criteria.</p>
            <p className="mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseListing;
