// src/components/Internship/InternshipHero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Users, 
  Building, 
  Target,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const TrackCard = ({ title, description, features, buttonText, isReversed }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl font-bold text-font mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const StatBox = ({ icon: Icon, value, label }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h4 className="text-2xl font-bold text-white mb-1">{value}</h4>
      <p className="text-white/80">{label}</p>
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
    <div className="relative bg-gradient-to-br from-primary via-custom to-secondary pt-24 pb-16">
      {/* Main Content */}
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full w-fit mx-auto mb-6"
          >
            <Rocket className="w-5 h-5" />
            <span>Launch Your Career with SkillonX</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Turn Your Skills Into A <br />
            Successful Career
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Choose your path to success with our industry-recognized internship programs
          </motion.p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            {stats.map((stat, index) => (
              <StatBox key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Internship Tracks */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
          className="mt-16 bg-white/10 border border-white/20 rounded-xl p-6 max-w-3xl mx-auto text-center"
        >
          <p className="text-white text-lg mb-4">
            Not sure which track to choose? Let our career counselors guide you!
          </p>
          <button className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-lg font-semibold transition-colors">
            Schedule Free Counseling
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default InternshipHero;