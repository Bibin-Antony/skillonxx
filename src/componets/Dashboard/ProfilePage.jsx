import React from 'react'
import { ArrowLeft, Mail, Phone, MapPin, Pencil, Briefcase, Calendar, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  const variants = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
  }
  
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function EnhancedProfilePage() {
  const userData = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
    education: [
      { degree: "Bachelor of Science in Computer Science", school: "Tech University", year: "2018-2022" },
      { degree: "High School Diploma", school: "Anytown High School", year: "2014-2018" },
    ],
    skills: ["React", "JavaScript", "Node.js", "Python", "UI/UX Design"],
    avatar: "https://i.pravatar.cc/300",
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-500 to-blue-800 py-12 px-4 sm:px-6 lg:px-8">
      
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
      <Link to="/university-dashboard"  className="inline-flex items-center text-blue-200 hover:text-blue-300 mb-6 transition-colors duration-200">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
        
        <motion.div variants={itemVariants} className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg">
          
          <div className="relative pb-24 md:pb-32">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 bg-opacity-20 backdrop-blur-lg"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end p-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{userData.name}</h1>
                <p className="text-blue-100">Student</p>
              </div>
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg mt-4 md:mt-0"
              />
            </div>
          </div>
          <div className="p-6 space-y-6">
            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{userData.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>{userData.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm sm:col-span-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{userData.address}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
                Education
              </h2>
              <ul className="space-y-2">
                {userData.education.map((edu, index) => (
                  <motion.li
                    key={index}
                    className="bg-gray-50 p-3 rounded-md shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="font-medium">{edu.degree}</div>
                    <div className="text-sm text-gray-600">{edu.school}</div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {edu.year}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-500" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
            <Button variant="secondary">
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
