import React, { useState } from 'react';
import { Plus, Search, Calendar, Users, Clock, Signal, ArrowLeft, CheckCircle, X,MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
// Import your workshop images
import wevdevelopment from '../../assets/Images/wevdevelopment.jpg';
import advreact from '../../assets/Images/Advance-React.jpg';
import englishcomm from '../../assets/Images/english-comm.jpg';
import uiux from '../../assets/Images/ui-ux.jpg';
import frontenddev from '../../assets/Images/frontenddev.jpg';
import github from '../../assets/Images/github.jpg';
import technical from '../../assets/Images/technical.jpg';
import careerdev from '../../assets/Images/careerdev.jpg';
import fullstack from '../../assets/Images/fullstack.jpg';
import responsiveweb from '../../assets/Images/responsiveweb.jpg';
import python from "../../assets/Images/python.jpg";
import aptitude from '../../assets/Images/aptitude.webp'

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
    title: "Basic React.js Development",
    description:
      "Deep dive into modern React.js development. Learn component architecture, hooks, state management, and build full-featured applications.",
    image: advreact,
    category: "Web Development",
    level: "Advanced",
    duration: "4 Days",
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
    duration: "3 Days",
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
    mode: "On Campus",
    highlights: [
      "CSS frameworks",
      "Mobile-first design",
      "Responsive layouts",
      "CSS Grid & Flexbox",
    ],
  },
  {
    id: 11,
    title: "Aptitude Mastery Workshop",
    description:
      "Sharpen your problem-solving and logical reasoning skills with a comprehensive workshop on aptitude techniques and strategies.",
    image: aptitude,
    category: "Aptitude",
    level: "Beginner",
    duration: "3 Days",
    mode: "On Campus",
    highlights: [
      "Quantitative Aptitude",
      "Logical Reasoning",
      "Data Interpretation",
      "Verbal Ability",
      "Mock Tests & Analysis",
    ],
  },
  {
    id: 12,
    title: "Python Programming Bootcamp",
    description:
      "Dive into the world of Python programming and learn to build versatile applications with hands-on coding experience and real-world projects.",
    image: python,
    category: "Programming",
    level: "Beginner",
    duration: "3 Days", mode: "On Campus",
    highlights: [
      "Python fundamentals",
      "Data structures",
      "Object-Oriented Programming",
      "File handling and modules",
      "Project-based learning",
    ],
  }

];
const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-teal-500 text-white hover:bg-teal-600",
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
const CreateWorkshopPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    batchSize: '',
    location: '',
    startDate: '' // Add startDate to form data
  });
  const universityId = auth.user._id; // Replace with actual university ID
  // console.log(universityId) // Replace with actual university ID

  const categories = ['All', ...new Set(workshops.map(w => w.category))];
  const levels = ['All', ...new Set(workshops.map(w => w.level))];

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || workshop.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || workshop.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });
  const devUrl = 'http://localhost:5000'
  const prodUrl = 'https://skillonx-server.onrender.com'

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!formData.batchSize || formData.batchSize <= 0) {
      alert("Please enter a valid batch size!");
      return;
    }
     // Validate start date is not in the past
     const selectedDate = new Date(formData.startDate);
     const today = new Date();
     today.setHours(0, 0, 0, 0);
     
     if (selectedDate < today) {
       alert("Workshop start date cannot be in the past!");
       return;
     }
    try {
      const response = await fetch(`${prodUrl}/workshops/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...selectedWorkshop,
          universityId,
          workshopPassword: formData.password,
          batchSize: parseInt(formData.batchSize),
          location: formData.location,
          startDate: formData.startDate
        })
      });

      if (response.ok) {
        setShowPasswordForm(false);
        setShowSuccess(true);
        setFormData({ 
          password: '', 
          confirmPassword: '', 
          batchSize: '',
          location: '',
          startDate: ''
        });
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/university-dashboard/workshops-page');
        }, 2000);
      } else {
        throw new Error('Failed to add workshop');
      }
    } catch (error) {
      console.error('Failed to add workshop:', error);
    }
  };
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleAddWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    setShowPasswordForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Password Form Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-100">Set Workshop Details</h3>
              <button
                onClick={() => setShowPasswordForm(false)}
                className="text-gray-400 hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Batch Size
                  </label>
                  <input
                    type="number"
                    value={formData.batchSize}
                    onChange={(e) => setFormData({ ...formData, batchSize: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter maximum batch size"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Workshop Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter workshop location"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      min={getMinDate()}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Workshop Password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setShowPasswordForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Workshop
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto p-6">
        {showSuccess && (
          <div className="mb-6 bg-gray-800 border border-teal-500 rounded-lg p-4 animate-in fade-in slide-in-from-top-5">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-teal-500 mr-2" />
              <span className="text-gray-100">Workshop successfully added to your university!</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <Link
            to="/university-dashboard/workshops-page"
            className="inline-flex items-center text-teal-500 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Workshop Management
          </Link>
          <h1 className="text-2xl font-bold text-gray-100">Create New Workshop</h1>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search workshops..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <div key={workshop.id} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-gray-900/90 text-teal-500 px-3 py-1 rounded-full text-sm">
                    {workshop.level}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">{workshop.title}</h3>
                  <span className="bg-teal-500/10 text-teal-500 px-3 py-1 rounded-full text-sm">
                    {workshop.category}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {workshop.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-2 text-teal-500" />
                    {workshop.duration}
                  </div>

                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2 text-teal-500" />
                    {workshop.mode}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Signal className="w-4 h-4 mr-2 text-teal-500" />
                    {workshop.level}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {workshop.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <Button
                  onClick={() => handleAddWorkshop(workshop)}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Workshop
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkshops.length === 0 && (
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No workshops match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateWorkshopPage;
