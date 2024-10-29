import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Award, BookOpen, Code, MessageSquare } from 'lucide-react';
import { Link } from "react-router-dom";

const WorkshopHero = () => {
  const workshopTypes = [
    {
      icon: Code,
      title: "Technical Workshops",
      description: "Front-end, React.js, python and other technologies",
      duration: "1-3 Days",
    },
    {
      icon: MessageSquare,
      title: "Language & Communication Workshops",
      description: "Communication skills and language proficiency",
      duration: "2-5 Days",
    },
    {
      icon: Users,
      title: "Career Development Workshops",
      description: "Tailored to your institution's needs",
      duration: "Flexible",
    },
  ];

  return (
    <div className="relative pt-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 min-h-[80vh]">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />
      
      <div className="relative">
        <div className="max-w-[85vw] mx-auto px-4 pt-24 pb-16">
          {/* Left aligned content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-blue-400 mb-8"
              >
                <MapPin className="w-4 h-4" />
                <span>For Colleges & Universities</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                Transform Your Students with
                <span className="text-blue-400 block">Industry-Ready Skills</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-lg mb-8"
              >
                Expert-led workshops in Web Development, English Communication,
                and more. Custom-designed for your institution's needs.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4 mb-16"
              >
                <div className="flex gap-4 items-center justify-center flex-wrap">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors shadow-lg">
                  Schedule a Workshop
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors shadow-lg backdrop-blur-sm">
                  View Workshop Details
                </button>
              </div>

              </motion.div>
            </div>

            {/* Right aligned workshop types */}
            <div className="space-y-6">
              {workshopTypes.map((workshop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="p-3 rounded-lg bg-blue-500/20">
                      <workshop.icon className="w-6 h-6 text-blue-400" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {workshop.title}
                      </h3>
                      <p className="text-gray-300 mb-3">
                        {workshop.description}
                      </p>
                      <span className="text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                        {workshop.duration}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-gray-300">
                Now Booking Workshops for the Upcoming Academic Season!
              </p>
            </div>
            <Link to='/contactus' className="text-blue-400 hover:text-blue-300 transition-colors">
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopHero;