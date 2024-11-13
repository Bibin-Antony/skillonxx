import React, { useState } from 'react';
import { Plus, Search, Calendar, Users, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
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

const CreateWorkshopPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [showSuccess, setShowSuccess] = useState(false);
  const universityId = auth.user._id; // Replace with actual university ID
  console.log(universityId) // Replace with actual university ID

  const categories = ['All', ...new Set(workshops.map(w => w.category))];
  const levels = ['All', ...new Set(workshops.map(w => w.level))];

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || workshop.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || workshop.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleAddWorkshop = async (workshop) => {
    try {
      const response = await fetch('http://localhost:5000/workshops/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workshop,
          universityId
        })
      });

      if (response.ok) {
        setShowSuccess(true);
        console.log("added the workshop")
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

   
  return (
    <div className="p-6 pt-20 min-h-screen bg-gray-300">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-green-800">Workshop successfully added to your university!</span>
          </div>
        )}

        {/* Back Button */}
        <Link
          to="/university-dashboard/workshops-page"
          className="mb-6  inline-flex items-center text-blue-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workshop Management
        </Link>

        {/* Search and Filters */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Workshop</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search workshops..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Workshop Grid with fixed width container */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map((workshop) => ( // Changed from filteredWorkshops to workshops to test
              <div 
                key={workshop.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow w-full"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{workshop.title}</h3>
                    <span className="inline-block px-2 py-1 text-sm text-blue-600 bg-blue-50 rounded-full mt-1">
                      {workshop.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {workshop.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {workshop.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {workshop.batchSize}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {workshop.mode}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {workshop.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleAddWorkshop(workshop)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add Workshop
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Display when no workshops match filters */}
          {workshops.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No workshops available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWorkshopPage;
