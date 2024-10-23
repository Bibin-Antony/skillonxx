// src/components/Workshop/WorkshopListing.jsx
import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  Users,
  Clock,
  Grid,
  List,
  Filter,
  Building,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Filter Component
const WorkshopFilter = ({ label, options, value, onChange }) => {
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

// Workshop Card Component
const WorkshopCard = ({ workshop, isListView }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${
        isListView ? "flex" : "flex flex-col"
      }`}
    >
      <img
        src={workshop.image}
        alt={workshop.title}
        className={`object-cover ${isListView ? "w-1/3" : "w-full h-52"}`}
      />
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="bg-primary/10 text-custom px-3 py-1 rounded-full text-sm">
            {workshop.category}
          </span>
          <span className="bg-secondary/20 text-font px-3 py-1 rounded-full text-sm">
            {workshop.level}
          </span>
        </div>

        <h3 className="font-bold text-xl mb-2 text-font">{workshop.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{workshop.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{workshop.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{workshop.batchSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            <span>{workshop.mode}</span>
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          <button className="flex-1 bg-custom text-white active:scale-90 transition-all duration-300 px-8 py-3 rounded-lg font-semibold hover:bg-gradient-to-br hover:from-custom hover:via-primary">
            Schedule Now
          </button>
          <button className="flex-1 bg-custom text-white active:scale-90 transition-all duration-300 px-8 py-3 rounded-lg font-semibold hover:bg-gradient-to-br hover:from-custom hover:via-primary">
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
const WorkshopListing = () => {
  // States for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [mode, setMode] = useState("");
  const [level, setLevel] = useState("");
  const [isListView, setIsListView] = useState(false);

  // Filter Options
  const filterOptions = {
    categories: [
      "Web Development",
      "React.js",
      "Frontend Development",
      "UI/UX Design",
      "English Communication",
      "Technical Writing",
      "Career Development",
      "Git & Version Control",
    ],
    durations: ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days", "Custom"],
    modes: ["On Campus", "Online Live", "Hybrid"],
    levels: ["Beginner", "Intermediate", "Advanced"],
  };

  // Sample Workshop Data
  const workshops = [
    {
      id: 1,
      title: "Modern Web Development Fundamentals",
      description:
        "A comprehensive workshop covering HTML5, CSS3, and JavaScript basics. Students will build responsive websites and learn modern web development practices.",
      image: "/api/placeholder/400/300?text=Web+Development",
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
      image: "/api/placeholder/400/300?text=React+Development",
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
      image: "/api/placeholder/400/300?text=English+Communication",
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
      image: "/api/placeholder/400/300?text=UI+UX+Design",
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
      image: "/api/placeholder/400/300?text=JavaScript",
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
      image: "/api/placeholder/400/300?text=Git+Workshop",
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
      image: "/api/placeholder/400/300?text=Technical+Writing",
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
      image: "/api/placeholder/400/300?text=Career+Development",
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
      image: "/api/placeholder/400/300?text=Full+Stack",
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
      image: "/api/placeholder/400/300?text=Responsive+Design",
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

  // Filter workshops based on search and filters
  const filteredWorkshops = workshops.filter((workshop) => {
    return (
      workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === "" || workshop.category === category) &&
      (duration === "" || workshop.duration === duration) &&
      (mode === "" || workshop.mode === mode) &&
      (level === "" || workshop.level === level)
    );
  });

  return (
    <div className="min-h-screen bg-tertiary py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-font mb-2">
          College Workshops
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Transform your students with industry-relevant skills
        </p>

        {/* Search and Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search workshops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 bg-gradient-to-tr transition-all duration-200 from-custom to-primary active:scale-90 text-white px-6 py-2 rounded-lg hover:bg-primary/90"
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
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <WorkshopFilter
                  label="Category"
                  options={filterOptions.categories}
                  value={category}
                  onChange={setCategory}
                />
                <WorkshopFilter
                  label="Duration"
                  options={filterOptions.durations}
                  value={duration}
                  onChange={setDuration}
                />
                <WorkshopFilter
                  label="Mode"
                  options={filterOptions.modes}
                  value={mode}
                  onChange={setMode}
                />
                <WorkshopFilter
                  label="Level"
                  options={filterOptions.levels}
                  value={level}
                  onChange={setLevel}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Toggle and Results Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-font">
            Available Workshops ({filteredWorkshops.length})
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsListView(false)}
              className={`p-2 rounded-lg ${
                !isListView ? "bg-custom text-white" : "bg-gray-200"
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsListView(true)}
              className={`p-2 rounded-lg ${
                isListView ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Workshop Cards */}
        <motion.div
          layout
          className={`grid gap-6 ${
            isListView
              ? "grid-cols-1"
              : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {filteredWorkshops.map((workshop) => (
            <WorkshopCard
              key={workshop.id}
              workshop={workshop}
              isListView={isListView}
            />
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredWorkshops.length === 0 && (
          <div className="text-center text-gray-600 mt-12">
            <p className="text-lg">
              No workshops found matching your criteria.
            </p>
            <p className="mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopListing;
