import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  Users, 
  Target, 
  Briefcase,
  Lightbulb,
  GraduationCap,
  LineChart,
  MessageCircle,
  CheckCircle
} from 'lucide-react';

const OurApproach = () => {
  const [activeApproach, setActiveApproach] = useState(null);

  const approaches = [
    {
      id: 1,
      icon: BookOpen,
      title: "Practical Learning Methodology",
      subtitle: "Learn by Doing",
      description: "Our hands-on approach ensures students learn through real-world projects and industry scenarios.",
      points: [
        "Project-based learning modules",
        "Industry-standard tools and practices",
        "Real-world case studies",
        "Interactive coding sessions"
      ],
      color: "blue"
    },
    {
      id: 2,
      icon: Users,
      title: "Industry-Aligned Curriculum",
      subtitle: "Stay Current with Market",
      description: "Curriculum designed and updated regularly with input from industry experts and partners.",
      points: [
        "Regular curriculum updates",
        "Industry expert reviews",
        "Technology trend alignment",
        "Skill gap analysis integration"
      ],
      color: "indigo"
    },
    {
      id: 3,
      icon: Target,
      title: "Personalized Mentorship",
      subtitle: "Individual Attention",
      description: "One-on-one guidance from industry professionals to ensure optimal learning outcomes.",
      points: [
        "Dedicated mentor assignment",
        "Weekly progress tracking",
        "Personalized feedback",
        "Career path guidance"
      ],
      color: "purple"
    },
    {
      id: 4,
      icon: Briefcase,
      title: "Career Development Focus",
      subtitle: "Beyond Technical Skills",
      description: "Comprehensive approach to prepare students for successful careers in the industry.",
      points: [
        "Interview preparation",
        "Resume building workshops",
        "Soft skills training",
        "Industry networking events"
      ],
      color: "rose"
    }
  ];

  const features = [
    {
      icon: Lightbulb,
      title: "Interactive Learning",
      description: "Engaging sessions with real-time feedback"
    },
    {
      icon: GraduationCap,
      title: "Certified Programs",
      description: "Industry-recognized certifications"
    },
    {
      icon: LineChart,
      title: "Progress Tracking",
      description: "Regular assessments and evaluations"
    },
    {
      icon: MessageCircle,
      title: "24/7 Support",
      description: "Continuous assistance and guidance"
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:32px]" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            Our Unique Approach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            A comprehensive methodology focused on practical skills, industry relevance, and career success
          </motion.p>
        </div>

        {/* Main Approach Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer
                ${activeApproach === approach.id ? 'ring-2 ring-blue-500' : ''}
              `}
              onClick={() => setActiveApproach(activeApproach === approach.id ? null : approach.id)}
            >
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-${approach.color}-100`}>
                    <approach.icon className={`w-6 h-6 text-${approach.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{approach.title}</h3>
                    <p className={`text-${approach.color}-600 font-medium text-sm`}>{approach.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 mt-4 mb-4">{approach.description}</p>

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: activeApproach === approach.id ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-3 mt-4 border-t pt-4">
                    {approach.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className={`w-5 h-5 text-${approach.color}-500`} />
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurApproach;