import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Palette,
  ChartBar,
  Globe,
  Server,
  Lock,
  Cpu,
} from "lucide-react";

const categories = [
  {
    name: "Web Development",
    icon: <Globe className="w-12 h-12" />,
    courses: "50+ Courses",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "Data Science",
    icon: <ChartBar className="w-12 h-12" />,
    courses: "30+ Courses",
    gradient: "from-purple-400 to-purple-600",
  },
  {
    name: "UI/UX Design",
    icon: <Palette className="w-12 h-12" />,
    courses: "40+ Courses",
    gradient: "from-pink-400 to-pink-600",
  },
  {
    name: "Mobile App Dev",
    icon: <Cpu className="w-12 h-12" />,
    courses: "35+ Courses",
    gradient: "from-green-400 to-green-600",
  },
  {
    name: "Machine Learning",
    icon: <Database className="w-12 h-12" />,
    courses: "45+ Courses",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    name: "Cloud Computing",
    icon: <Server className="w-12 h-12" />,
    courses: "25+ Courses",
    gradient: "from-cyan-400 to-cyan-600",
  },
  {
    name: "Cybersecurity",
    icon: <Lock className="w-12 h-12" />,
    courses: "20+ Courses",
    gradient: "from-red-400 to-red-600",
  },
  {
    name: "DevOps",
    icon: <Code className="w-12 h-12" />,
    courses: "15+ Courses",
    gradient: "from-indigo-400 to-indigo-600",
  },
];

const CustomButton = ({ children, onClick, className = "" }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative group overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      <span className="relative">{children}</span>
    </motion.button>
  );
};

const BrowseCategories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
            Explore Tech Skills by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of cutting-edge tech courses
            designed to elevate your skills.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-300" />
              <div
                className={`relative h-full bg-gradient-to-br ${category.gradient} p-8 rounded-2xl shadow-lg backdrop-blur-sm transform transition-all duration-300`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="text-white transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {category.name}
                  </h3>
                  <p className="text-white/90 font-medium">
                    {category.courses}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to start your learning journey? Explore all our tech
            categories.
          </p>
          <CustomButton
            onClick={() => console.log("View All Categories clicked")}
            className="shadow-blue-500/30 hover:shadow-blue-500/40"
          >
            View All Categories
          </CustomButton>
        </motion.div>
      </div>
    </section>
  );
};

export default BrowseCategories;
