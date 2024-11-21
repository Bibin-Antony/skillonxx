import React, { useEffect } from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Pencil, GraduationCap, Calendar, Building2, Trophy, Users, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../auth/AuthContext';

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
  const variants = {
    primary: "border-transparent text-white bg-teal-500 hover:bg-teal-600",
    secondary: "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700",
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

export default function UniProfilePage() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Link 
          to="/university-dashboard" 
          className="inline-flex items-center text-teal-500 hover:text-teal-400 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
        
        <motion.div 
          variants={itemVariants} 
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700"
        >
          <div className="relative pb-24 md:pb-32">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-gray-800"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end p-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-100 mb-2">{auth.user.universityName}</h1>
                <p className="text-gray-300">Higher Education Institution</p>
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-lg mt-4 md:mt-0 bg-gray-600 flex items-center justify-center text-gray-300">
                {auth.user.universityName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-5 w-5 text-teal-500" />
                <span className="text-gray-300">{auth.user.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm sm:col-span-2">
                <MapPin className="h-5 w-5 text-teal-500" />
                <span className="text-gray-300">{auth.user.universityAddress}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-100">
                <BookOpen className="h-5 w-5 mr-2 text-teal-500" />
                University Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-teal-400">{auth.user.students.length}</div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-teal-400">{auth.user.workshops.length}</div>
                  <div className="text-sm text-gray-400">Workshops</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-teal-400">{auth.user.assessments.length}</div>
                  <div className="text-sm text-gray-400">Assessments</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-teal-400">{auth.user.workshopRegistrations.length}</div>
                  <div className="text-sm text-gray-400">Workshop Registrations</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-100">
                <Trophy className="h-5 w-5 mr-2 text-teal-500" />
                Recognition
              </h2>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <span className="text-gray-300">Recognized by: {auth.user.recognizedBy}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-100">
                <Calendar className="h-5 w-5 mr-2 text-teal-500" />
                Account Information
              </h2>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-2">
                <div className="text-sm text-gray-400">
                  Created: {new Date(auth.user.createdAt).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-400">
                  Last Updated: {new Date(auth.user.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="px-6 py-4 bg-gray-900 border-t border-gray-700 flex justify-end space-x-2">
            <Button variant="secondary">
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}