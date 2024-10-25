import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Users, 
  Building, 
  Target,
  ArrowRight,
  CheckCircle,
  MapPin
} from 'lucide-react';

const TrackCard = ({ title, description, features, buttonText, isReversed }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl"
    >
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const StatBox = ({ icon: Icon, value, label }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
    >
      <div className="flex justify-center mb-4">
        <span className="p-2 rounded-lg bg-blue-500/20">
          <Icon className="w-6 h-6 text-blue-400" />
        </span>
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </motion.div>
  );
};

const InternshipHero = () => {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Interns Placed"
    },
    {
      icon: Building,
      value: "50+",
      label: "Partner Companies"
    },
    {
      icon: Target,
      value: "90%",
      label: "Conversion Rate"
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
            <span>Launch Your Career with SkillonX</span>
          </motion.div>

          {/* Main Content */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Turn Your Skills Into<br />
              <span className="text-blue-400">A Successful Career</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 text-lg max-w-2xl mx-auto mb-16"
            >
              Choose your path to success with our industry-recognized internship programs
            </motion.p>

            {/* Stats Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {stats.map((stat, index) => (
                <StatBox key={index} {...stat} />
              ))}
            </div> */}
          </div>

          {/* Internship Tracks */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <TrackCard 
              title="Post-Course Internship Track"
              description="Complete our skill development courses and get guaranteed internship placement"
              features={[
                "3-6 months internship duration",
                "Industry expert mentorship",
                "Real project experience",
                "Job placement assistance",
                "Performance-based conversion"
              ]}
              buttonText="Explore Courses & Internships"
            />

            <TrackCard 
              title="Direct Internship Track"
              description="Already have the skills? Apply directly to our internship positions"
              features={[
                "Immediate project assignments",
                "Competitive stipend",
                "Flexible work hours",
                "Skill assessment based selection",
                "Fast-track career growth"
              ]}
              buttonText="Apply for Internship"
              isReversed
            />
          </div>

          {/* Bottom Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl mx-auto text-center"
          >
            <p className="text-gray-300 text-lg mb-4">
              Not sure which track to choose? Let our career counselors guide you!
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Schedule Free Counseling
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InternshipHero;