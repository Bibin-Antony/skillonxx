import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Briefcase, 
  Code, 
  Pencil, 
  Clock, 
  MapPin, 
  DollarSign,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

const CurrentOpenings = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJob, setExpandedJob] = useState(null);

  const categories = [
    { id: 'all', label: 'All Positions', icon: Briefcase },
    { id: 'technical', label: 'Technical', icon: Code },
    { id: 'non-technical', label: 'Non-Technical', icon: Pencil }
  ];

  const jobs = [
    {
      id: 1,
      title: 'Frontend Development Intern',
      category: 'technical',
      location: 'Mysore',
      type: 'Full-time',
      duration: '6 months',
      // stipend: '₹15,000 - ₹25,000',
      description: 'Join our dynamic team as a Frontend Development Intern and work on exciting projects using modern web technologies.',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
      responsibilities: [
        'Develop responsive web applications',
        'Collaborate with design team',
        'Write clean, maintainable code',
        'Participate in code reviews'
      ]
    },
    {
      id: 2,
      title: 'UI/UX Design Intern',
      category: 'technical',
      location: 'Mysore',
      type: 'Full-time',
      duration: '6 months',
      // stipend: '₹12,000 - ₹20,000',
      description: 'Create engaging user interfaces and enhance user experiences for our web and mobile applications.',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      responsibilities: [
        'Design user interfaces',
        'Create wireframes and prototypes',
        'Conduct user research',
        'Collaborate with development team'
      ]
    },
    {
      id: 3,
      title: 'Content Writing Intern',
      category: 'non-technical',
      location: 'Mysore',
      type: 'Full-time',
      duration: '3 months',
      // stipend: '₹10,000 - ₹15,000',
      description: 'Join our content team to create engaging and informative content for our digital platforms.',
      skills: ['Content Writing', 'SEO', 'Research', 'Editing'],
      responsibilities: [
        'Write engaging content',
        'Optimize for SEO',
        'Research industry topics',
        'Edit and proofread content'
      ]
    }
    // Add more job listings as needed
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Current Openings</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our team and kickstart your career with hands-on experience
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by role or skill..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* Job Header */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.duration}
                      </span>
                      {/* <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.stipend}
                      </span> */}
                    </div>
                  </div>
                  <button className="p-2">
                    {expandedJob === job.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedJob === job.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t"
                >
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{job.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentOpenings;