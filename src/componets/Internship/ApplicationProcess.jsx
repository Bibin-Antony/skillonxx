import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Target,
  Users,
  Code,
  CheckCircle,
  UserPlus,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  UserCheck
} from 'lucide-react';

const ApplicationProcess = () => {
  const [selectedTrack, setSelectedTrack] = useState('direct');

  const tracks = {
    direct: {
      title: "Direct Track Process",
      steps: [
        {
          icon: FileText,
          title: "Online Application",
          description: "Submit your application with resume and portfolio. Our team will review your credentials and experience."
        },
        {
          icon: Target,
          title: "Skill Assessment",
          description: "Complete our technical assessment to showcase your abilities. Tests are designed to evaluate practical knowledge."
        },
        {
          icon: Users,
          title: "Technical Interview",
          description: "Discussion with our technical team about your expertise. Share your past projects and technical background."
        },
        {
          icon: Code,
          title: "Project Assignment",
          description: "Work on a small project to demonstrate practical skills. Show us your problem-solving approach."
        },
        {
          icon: CheckCircle,
          title: "Final Selection",
          description: "Review of your performance and fit for the role. We evaluate overall compatibility with our team."
        },
        {
          icon: UserPlus,
          title: "Onboarding",
          description: "Welcome to the team! Start your internship journey with orientation and team introduction."
        }
      ]
    },
    postCourse: {
      title: "Post-Course Track Process",
      steps: [
        {
          icon: GraduationCap,
          title: "Course Completion",
          description: "Successfully complete your chosen SkillonX course. Master the required skills for your career path."
        },
        {
          icon: ClipboardCheck,
          title: "Performance Review",
          description: "Evaluation of your course projects and assignments. We assess your growth and learning outcomes."
        },
        {
          icon: Users,
          title: "Company Matching",
          description: "Match with companies based on skills and interests. Find the perfect fit for your career goals."
        },
        {
          icon: BookOpen,
          title: "Interview Preparation",
          description: "Guided preparation for company interviews. Get ready to showcase your skills effectively."
        },
        {
          icon: UserCheck,
          title: "Internship Placement",
          description: "Secure placement with one of our partner companies. Begin your professional journey with confidence."
        },
        {
          icon: Target,
          title: "Regular Evaluations",
          description: "Ongoing performance tracking and feedback. Ensure continuous growth and improvement."
        }
      ]
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-16 px-4">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4 text-white"
          >
            Your Path to <span className="text-blue-400">Success</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Clear steps from application to internship completion
          </motion.p>
        </div>

        {/* Track Toggle */}
        <div className="flex justify-center mb-12">
          <motion.div 
            className="bg-white/5 backdrop-blur-sm p-1 rounded-lg inline-flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={() => setSelectedTrack('direct')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedTrack === 'direct'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Direct Track
            </button>
            <button
              onClick={() => setSelectedTrack('postCourse')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedTrack === 'postCourse'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Post-Course Track
            </button>
          </motion.div>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Center Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-400/20 hidden md:block" />

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {tracks[selectedTrack].steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
              >
                {/* Timeline Dot and Connector Line */}
              

                {/* Content Card */}
                <motion.div 
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-6 flex flex-col h-[200px]">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                        <step.icon className="w-6 h-6" />
                      </span>
                      <div>
                        <span className="text-sm text-gray-400">Step {index + 1}</span>
                        <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProcess;