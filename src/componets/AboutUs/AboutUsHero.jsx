import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Heart, 
  Users, 
  Award,
  Calendar,
  BookOpen,
  MapPin
} from 'lucide-react';

const AboutUsHero = () => {
  const stats = [
    {
      icon: Calendar,
      number: "5+",
      label: "Years of Excellence"
    },
    {
      icon: Users,
      number: "1000+",
      label: "Students Trained"
    },
    {
      icon: BookOpen,
      number: "20+",
      label: "Training Programs"
    },
    {
      icon: Award,
      number: "50+",
      label: "Industry Partners"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Empowering students with practical skills for real-world success"
    },
    {
      icon: Heart,
      title: "Our Vision",
      description: "Becoming the bridge between education and industry"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 min-h-[80vh]">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />
      
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
          {/* Location Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-blue-400 mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span>Bogadi, Mysore, Karnataka</span>
          </motion.div>

          {/* Main Content */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Bridging the Gap Between<br />
              <span className="text-blue-400">Education and Industry</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 text-lg max-w-2xl mx-auto mb-8"
            >
              SkillonX is dedicated to transforming education through practical learning, 
              industry collaboration, and career-focused training programs that prepare 
              students for real-world success.
            </motion.p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="p-3 rounded-lg bg-blue-500/20">
                    <value.icon className="w-6 h-6 text-blue-400" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default AboutUsHero;