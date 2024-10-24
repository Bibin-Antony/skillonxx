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
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Path to Success</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Clear steps from application to internship completion
          </p>
        </div>

        {/* Track Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setSelectedTrack('direct')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedTrack === 'direct'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Direct Track
            </button>
            <button
              onClick={() => setSelectedTrack('postCourse')}
              className={`px-6 py-2 rounded-md transition-all ${
                selectedTrack === 'postCourse'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Post-Course Track
            </button>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden md:block" />

          {/* Steps */}
          <div className="grid md:grid-cols-2 gap-8">
            {tracks[selectedTrack].steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
              >
                <div className="bg-white rounded-xl shadow-lg h-full">
                  {/* Card Content */}
                  <div className="p-6 flex flex-col h-[200px]">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`p-3 rounded-lg flex-shrink-0 ${
                        selectedTrack === 'direct' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        <step.icon className="w-6 h-6" />
                      </span>
                      <div>
                        <span className="text-sm text-gray-500">Step {index + 1}</span>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 flex-grow">{step.description}</p>
                  </div>
                </div>

                {/* Timeline Connector */}
                <div className="absolute top-1/2 hidden md:block">
                  {index % 2 === 0 ? (
                    <div className="right-0 transform translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 rounded-full bg-white border-4 border-blue-600" />
                      <div className="w-12 h-1 bg-gray-200 absolute top-1/2 -translate-y-1/2 right-4" />
                    </div>
                  ) : (
                    <div className="left-0 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 rounded-full bg-white border-4 border-blue-600" />
                      <div className="w-12 h-1 bg-gray-200 absolute top-1/2 -translate-y-1/2 left-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationProcess;