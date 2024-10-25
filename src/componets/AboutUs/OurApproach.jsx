import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
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
    <section className="py-24 relative bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Our Unique Approach
          </h2>
          <p className="text-gray-600 text-lg">
            A comprehensive methodology focused on practical skills, industry relevance, and career success
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {approaches.map((approach) => (
            <motion.div
              key={approach.id}
              layoutId={`card-${approach.id}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setActiveApproach(activeApproach === approach.id ? null : approach.id)}
            >
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <approach.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{approach.title}</h3>
                    <p className="text-blue-600 font-medium text-sm">{approach.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-600 mt-4 mb-4">{approach.description}</p>

                <AnimatePresence>
                  {activeApproach === approach.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="space-y-3 mt-4 border-t pt-4">
                        {approach.points.map((point, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-600">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center shadow-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurApproach;