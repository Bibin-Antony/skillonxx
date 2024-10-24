// src/components/Workshop/WorkshopHero.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaCode, FaUsers, FaBook } from "react-icons/fa";

const WorkshopHero = () => {
  const workshopTypes = [
    {
      icon: <FaCode className="text-2xl" />,
      title: "Technical Workshops",
      description: "Front-end, React.js, python and other technologies",
      duration: "1-3 Days",
    },
    {
      icon: <FaBook className="text-2xl" />,
      title: "Language & Communication Workshops",
      description: "Communication skills and language proficiency",
      duration: "2-5 Days",
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Career Development Workshops",
      description: "Tailored to your institution's needs",
      duration: "Flexible",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-custom to-secondary">
      {/* Main Hero Section */}
      <div className="container mx-auto px-4 pt-44 pb-44">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-white space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-tertiary"
            >
              <FaUniversity className="text-xl" />
              <span className="text-lg">For Colleges & Universities</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              Transform Your Students with Industry-Ready Skills
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-tertiary"
            >
              Expert-led workshops in Web Development, English Communication,
              and more. Custom-designed for your institution's needs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-cta hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors shadow-lg">
                Schedule a Workshop
              </button>
              <button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg transition-colors shadow-lg">
                View Workshop Details
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 pt-6"
            >
              <div>
                <h3 className="text-3xl font-bold">20+</h3>
                <p className="text-tertiary">Partner Institutions</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">5000+</h3>
                <p className="text-tertiary">Students Trained</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="text-tertiary">Workshops Conducted</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Workshop Cards */}
          <div className="grid gap-6">
            {workshopTypes.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * (index + 1) }}
                className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 border border-white border-opacity-20"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white bg-opacity-20 rounded-lg text-white">
                    {workshop.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold mb-1">
                      {workshop.title}
                    </h3>
                    <p className="text-tertiary mb-2">{workshop.description}</p>
                    <span className="text-white text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      {workshop.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Workshop Alert */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border-t border-white border-opacity-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-white">
                Now Booking Workshops for the Upcoming Academic Season!
              </p>
            </div>
            <button className="text-white hover:text-tertiary transition-colors">
              Contact Us →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopHero;
