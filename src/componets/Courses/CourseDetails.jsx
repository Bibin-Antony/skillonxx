import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Clock, Users, MapPin, Calendar, CheckCircle,
  BookOpen, Target, GraduationCap, Code,
  ChevronDown, ChevronUp, ArrowRight
} from 'lucide-react';

// Course data
const courseData = {
  'web-fundamentals': {
    type: "Web Development",
    level: "Beginner",
    title: "Modern Web Development Fundamentals",
    description: "A comprehensive workshop covering HTML5, CSS3, and JavaScript basics. Students will build responsive websites and learn modern web development practices.",
    duration: "3 Days",
    students: "30-40 students",
    location: "On Campus",
    image: "/path-to-web-dev-image.jpg",
    highlights: [
      "Hands-on learning with real projects",
      "Industry-standard tools and practices",
      "Interactive coding sessions",
      "Take-home exercises and feedback",
      "Certificate of completion",
      "6 months access to course materials"
    ],
    curriculum: [
      {
        week: 1,
        title: "HTML5 Fundamentals",
        topics: [
          "Introduction to HTML5 and Web Standards",
          "Document Structure and Semantic Elements",
          "Forms and Input Elements",
          "Media Elements and Embedding Content",
          "Practical Exercise: Building a Semantic Webpage"
        ]
      },
      // Other curriculum weeks...
    ]
  },
  // Other courses like react-advanced, business-english...
};

const CourseDetails = () => {
  const { courseId } = useParams(); // Get course ID from URL
  const [activeSection, setActiveSection] = useState('curriculum');
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Get course data based on courseId
  const course = courseData[courseId];

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
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm font-medium">{course.type}</span>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm font-medium">{course.level}</span>
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
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>{course.location}</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors">
                Schedule Now
              </button>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
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

      {/* Curriculum and Other Sections */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex gap-8 mb-12 border-b border-gray-200">
          {[
            { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
            { id: 'objectives', label: 'Learning Objectives', icon: Target },
            { id: 'requirements', label: 'Requirements', icon: CheckCircle },
            { id: 'faq', label: 'FAQ', icon: GraduationCap }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-2 px-4 py-4 font-medium transition-colors border-b-2 ${
                activeSection === id 
                  ? 'border-blue-500 text-blue-500' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {activeSection === 'curriculum' && (
          <div className="space-y-6">
            {course.curriculum.map((week, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-medium text-blue-500 mb-2">Week {week.week}</div>
                      <h3 className="text-xl font-semibold text-gray-900">{week.title}</h3>
                    </div>
                    <Code className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="mt-4 space-y-2">
                    {week.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center gap-2 text-gray-600">
                        <ArrowRight className="w-4 h-4 text-blue-500" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Render other sections like 'objectives', 'requirements', and 'faq' here similarly */}
      </div>
    </div>
  );
};

export default CourseDetails;
