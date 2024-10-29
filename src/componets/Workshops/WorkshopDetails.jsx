import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Clock, Users, MapPin, CheckCircle,
  BookOpen, Target, ChevronDown, ChevronUp, ArrowRight, Search,
  Grid,
  List,
  Filter,
  Building,
  Code,
  GraduationCap,
  X,
  Mail,
  Phone,
  User,
  Book,
} from 'lucide-react';

import wevdevelopment from '../../assets/Images/wevdevelopment.jpg'
import advreact from '../../assets/Images/Advance-React.jpg'
import englishcomm from '../../assets/Images/english-comm.jpg'
import uiux from '../../assets/Images/ui-ux.jpg'
import frontenddev from '../../assets/Images/frontenddev.jpg'
import github from '../../assets/Images/github.jpg'
import technical from '../../assets/Images/technical.jpg'
import careerdev from '../../assets/Images/careerdev.jpg'
import fullstack from '../../assets/Images/fullstack.jpg'
import responsiveweb from '../../assets/Images/responsiveweb.jpg'
// Sample workshop data (similar structure as course data)
const WorkshopEnrollmentModal = ({  onClose, workshopName }) => {
    
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />
  
        {/* Modal */}
        <div className="relative w-full max-w-md transform transition-all animate-slideUp">
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
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
                    <h3 className="text-xl font-semibold text-gray-900">Workshop Enrollment</h3>
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
            <form className="px-6 pb-6 space-y-5">
              {/* Personal Information */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name of the person or organization</label>
                <div className="relative">
                  <User className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute inset-y-0 left-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
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
                  <Phone className="absolute inset-y-0 left-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
  
              {/* Workshop Details */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Workshop Name</label>
                <input
                  type="text"
                  value={workshopName}
                  disabled
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-100 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Preferred Batch Size</label>
                <input
                  type="number"
                  placeholder="Enter batch size"
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Preferred Mode</label>
                <select 
                  required
                  className="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white"
                >
                  <option value="">Select mode</option>
                  <option value="on_campus">On Campus</option>
                  <option value="online_live">Online Live</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
  
              {/* Schedule Preferences */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                <input
                  type="date"
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Preferred Time Slot</label>
                <input
                  type="time"
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Alternative Date (optional)</label>
                <input
                  type="date"
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Alternative Time Slot (optional)</label>
                <input
                  type="time"
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
  
              {/* Additional Information */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Institution/Organization Name</label>
                <input
                  type="text"
                  placeholder="Enter institution name"
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Department/Team Size</label>
                <input
                  type="number"
                  placeholder="Enter team size"
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Any Specific Requirements</label>
                <textarea
                  placeholder="Enter specific requirements"
                  className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                ></textarea>
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
                  I agree to the terms and conditions and authorize the institute to contact me regarding the workshop.
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
                  Schedule Workshop
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
const workshops = [
    {
      id: 1,
      title: "Modern Web Development Fundamentals",
      description:
        "A comprehensive workshop covering HTML5, CSS3, and JavaScript basics. Students will build responsive websites and learn modern web development practices.",
      image: wevdevelopment,
      category: "Web Development",
      level: "Beginner",
      duration: "3 Days",
      batchSize: "30-40 students",
      mode: "On Campus",
      highlights: [
        "HTML5 & CSS3 fundamentals",
        "JavaScript basics",
        "Responsive design principles",
        "Real-world project development",
      ],
    },
    {
      id: 2,
      title: "Advanced React.js Development",
      description:
        "Deep dive into modern React.js development. Learn component architecture, hooks, state management, and build full-featured applications.",
      image: advreact,
      category: "Web Development",
      level: "Advanced",
      duration: "4 Days",
      batchSize: "25-30 students",
      mode: "Hybrid",
      highlights: [
        "Modern React concepts",
        "Component architecture",
        "State management",
        "Production-ready development",
      ],
    },
    {
      id: 3,
      title: "Professional English Communication",
      description:
        "Enhance English communication skills with focus on professional contexts, presentations, and business communication.",
      image: englishcomm,
      category: "English Communication",
      level: "Intermediate",
      duration: "2 Days",
      batchSize: "25-30 students",
      mode: "On Campus",
      highlights: [
        "Business communication",
        "Presentation skills",
        "Email writing",
        "Interview preparation",
      ],
    },
    {
      id: 4,
      title: "UI/UX Design Workshop",
      description:
        "Master the fundamentals of UI/UX design, including user research, wireframing, prototyping, and modern design principles.",
      image: uiux,
      category: "UI/UX Design",
      level: "Beginner",
      duration: "3 Days",
      batchSize: "25-30 students",
      mode: "Hybrid",
      highlights: [
        "Design principles",
        "User research methods",
        "Prototyping tools",
        "Design thinking",
      ],
    },
    {
      id: 5,
      title: "Frontend Development with JavaScript",
      description:
        "Comprehensive JavaScript training focusing on modern ES6+ features, DOM manipulation, and building interactive web applications.",
      image: frontenddev,
      category: "Web Development",
      level: "Intermediate",
      duration: "3 Days",
      batchSize: "30-35 students",
      mode: "On Campus",
      highlights: [
        "ES6+ features",
        "DOM manipulation",
        "Async programming",
        "Project development",
      ],
    },
    {
      id: 6,
      title: "Git & Version Control Essentials",
      description:
        "Learn professional version control with Git, including branching strategies, collaboration workflows, and best practices.",
      image: github,
      category: "Version Control",
      level: "Beginner",
      duration: "1 Day",
      batchSize: "30-40 students",
      mode: "Online Live",
      highlights: [
        "Git fundamentals",
        "Branching strategies",
        "Collaboration workflows",
        "Best practices",
      ],
    },
    {
      id: 7,
      title: "Technical Writing Workshop",
      description:
        "Develop technical writing skills for documentation, reports, and professional communication in the tech industry.",
      image: technical,
      category: "English Communication",
      level: "Intermediate",
      duration: "2 Days",
      batchSize: "25-30 students",
      mode: "Hybrid",
      highlights: [
        "Documentation skills",
        "Report writing",
        "API documentation",
        "Style guides",
      ],
    },
    {
      id: 8,
      title: "Career Development & Industry Readiness",
      description:
        "Prepare students for industry with resume building, interview preparation, and professional networking skills.",
      image: careerdev,
      category: "Career Development",
      level: "Beginner",
      duration: "2 Days",
      batchSize: "30-40 students",
      mode: "On Campus",
      highlights: [
        "Resume building",
        "Interview skills",
        "LinkedIn optimization",
        "Industry awareness",
      ],
    },
    {
      id: 9,
      title: "Full Stack Development Overview",
      description:
        "Introduction to full stack development covering both frontend and backend technologies with practical examples.",
      image: fullstack,
      category: "Web Development",
      level: "Intermediate",
      duration: "5 Days",
      batchSize: "25-30 students",
      mode: "Hybrid",
      highlights: [
        "Frontend technologies",
        "Backend basics",
        "Database fundamentals",
        "Full stack projects",
      ],
    },
    {
      id: 10,
      title: "Responsive Web Design Masterclass",
      description:
        "Master the art of creating responsive websites using modern CSS frameworks and design principles.",
      image: responsiveweb,
      category: "Web Development",
      level: "Intermediate",
      duration: "2 Days",
      batchSize: "30-35 students",
      mode: "On Campus",
      highlights: [
        "CSS frameworks",
        "Mobile-first design",
        "Responsive layouts",
        "CSS Grid & Flexbox",
      ],
    },
  ];

const WorkshopDetails = () => {
  const { workshopId } = useParams(); // Get workshop ID from URL
  const [activeSection, setActiveSection] = useState('curriculum');
  const [isModalVisible, setModalVisible] = useState(false);
  const workshop = workshops.find((w) => w.id === parseInt(workshopId, 10));


//   const workshop = workshopData[workshopId];

  if (!workshop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Workshop Not Found</h1>
          <p className="text-gray-600 mt-2">The requested workshop could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm font-medium">{workshop.category}</span>
              <h1 className="text-4xl font-bold mb-4">{workshop.title}</h1>
              <p className="text-blue-100 text-lg mb-8">{workshop.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /><span>{workshop.duration}</span></div>
                <div className="flex items-center gap-2"><Users className="w-5 h-5 text-blue-400" /><span>{workshop.batchSize}</span></div>
                <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-400" /><span>{workshop.mode}</span></div>
              </div>
              <button
                onClick={() => setModalVisible(true)}

                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
              >
                Schedule Now
              </button>
            </div>

            {/* <div className="relative">
              <img src={workshop.image} alt={workshop.title} className="rounded-lg shadow-lg" />
            </div> */}
            <div className="w-full h-80 max-h-80 overflow-hidden rounded-lg shadow-lg">
              <img
                src={workshop.image}
                alt={workshop.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-semibold mb-6">Workshop Highlights</h3>
        <div className="grid grid-cols-2 gap-6">
          {workshop.highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {isModalVisible && (
        <WorkshopEnrollmentModal
          onClose={() => setModalVisible(false)}
          workshopName={workshop.title}
        />
      )}
     
    </div>
  );
};

export default WorkshopDetails;
