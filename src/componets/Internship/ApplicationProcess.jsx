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
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

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
        <VerticalTimeline lineColor="rgba(96, 165, 250, 0.2)">
          {tracks[selectedTrack].steps.map((step, index) => (
            <VerticalTimelineElement
              key={step.title}
              contentStyle={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
                borderRadius: "12px",
              }}
              contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.05)" }}
              iconStyle={{
                background: "rgba(96, 165, 250, 0.2)",
                color: "#1D4ED8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "22px",
                paddingRight:"22px",
                borderRadius: "50%",
              }}
              icon={<step.icon className="text-blue-400 w-8 h-8" />}
            >
              <div className="p-4">
                <span className='text-gray-400'>Step {index+1}</span>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default ApplicationProcess;
