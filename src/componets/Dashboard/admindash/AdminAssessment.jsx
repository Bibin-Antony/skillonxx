import React, { useState } from 'react';
import { Search, ClipboardList,ArrowLeft, Calendar, Clock, Users, School, ChevronDown, Eye, Edit, Trash, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminAssessment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUniversity, setFilterUniversity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const assessments = [
    {
      id: 1,
      title: 'Advanced Database Systems',
      university: 'Harvard University',
      department: 'Computer Science',
      createdBy: 'Prof. David Miller',
      dueDate: '2024-12-10',
      duration: '180',
      totalMarks: 100,
      submissions: 45,
      status: 'active',
      type: 'Final Exam',
      averageScore: 78
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      university: 'Stanford University',
      department: 'Data Science',
      createdBy: 'Dr. Sarah Chen',
      dueDate: '2024-12-15',
      duration: '120',
      totalMarks: 80,
      submissions: 62,
      status: 'upcoming',
      type: 'Mid-term',
      averageScore: 82
    },
    {
      id: 3,
      title: 'Quantum Physics Principles',
      university: 'MIT',
      department: 'Physics',
      createdBy: 'Prof. James Wilson',
      dueDate: '2024-12-05',
      duration: '150',
      totalMarks: 90,
      submissions: 38,
      status: 'completed',
      type: 'Quiz',
      averageScore: 75
    },
    {
      id: 4,
      title: 'Neural Networks & Deep Learning',
      university: 'Harvard University',
      department: 'Computer Science',
      createdBy: 'Dr. Emily Brown',
      dueDate: '2024-12-20',
      duration: '90',
      totalMarks: 60,
      submissions: 55,
      status: 'active',
      type: 'Assignment',
      averageScore: 85
    },
    {
      id: 5,
      title: 'Advanced Calculus',
      university: 'Princeton University',
      department: 'Mathematics',
      createdBy: 'Prof. Robert Taylor',
      dueDate: '2024-12-18',
      duration: '120',
      totalMarks: 100,
      submissions: 42,
      status: 'upcoming',
      type: 'Final Exam',
      averageScore: 0
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'upcoming':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const universities = [...new Set(assessments.map(a => a.university))];

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = 
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUniversity = filterUniversity === 'all' || assessment.university === filterUniversity;
    const matchesStatus = filterStatus === 'all' || assessment.status === filterStatus;
    
    return matchesSearch && matchesUniversity && matchesStatus;
  });

  return (
    <div className="min-h-screen pt-24 bg-gray-900 p-6">
      <Link
          to="/admin"
          className="mb-6 pl-24 inline-flex items-center text-cyan-600 hover:text-cyan-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>
      <div className="max-w-7xl mx-auto">
        {/* Header with Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-white">Assessments</h1>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-gray-100 px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <select
              value={filterUniversity}
              onChange={(e) => setFilterUniversity(e.target.value)}
              className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            >
              <option value="all">All Universities</option>
              {universities.map(uni => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Assessments List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredAssessments.map((assessment, index) => (
            <div
              key={assessment.id}
              className="bg-gray-800 rounded-lg p-6 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideIn 0.5s ease-out forwards'
              }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center group-hover:bg-teal-500/30 transition-colors duration-300">
                    <ClipboardList className="w-6 h-6 text-teal-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-300">
                        {assessment.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(assessment.status)}`}>
                        {assessment.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <School className="w-4 h-4" />
                      <span>{assessment.university}</span>
                      <span>•</span>
                      <span>{assessment.department}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-16 md:ml-0">
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400 hover:text-white">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-400 hover:text-red-400">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pl-16">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-white">Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{assessment.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{assessment.submissions} submissions</span>
                </div>
                {assessment.status !== 'upcoming' && (
                  <div className="flex items-center gap-2">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                    <span className="text-white">Avg. Score: {assessment.averageScore}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminAssessment;