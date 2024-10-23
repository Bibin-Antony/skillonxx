import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  Clock, 
  Users,
  Target,
  CheckCircle,
  Award,
  Code
} from 'lucide-react';

const TrackComparison = () => {
  const [hoveredTrack, setHoveredTrack] = useState(null);

  const tracks = [
    {
      title: "Post-Course Track",
      subtitle: "For course completion students",
      icon: <GraduationCap className="w-8 h-8" />,
      features: [
        { text: "Guaranteed placement", icon: <CheckCircle className="w-5 h-5" /> },
        { text: "3-6 months duration", icon: <Clock className="w-5 h-5" /> },
        { text: "Mentorship included", icon: <Users className="w-5 h-5" /> },
        { text: "Project-based learning", icon: <Code className="w-5 h-5" /> }
      ],
      color: "blue",
      buttonText: "Start Learning Track"
    },
    {
      title: "Direct Track",
      subtitle: "For skilled candidates",
      icon: <Briefcase className="w-8 h-8" />,
      features: [
        { text: "Assessment-based selection", icon: <Target className="w-5 h-5" /> },
        { text: "3-6 months duration", icon: <Clock className="w-5 h-5" /> },
        { text: "Industry projects", icon: <Code className="w-5 h-5" /> },
        { text: "Performance-based conversion", icon: <Award className="w-5 h-5" /> }
      ],
      color: "indigo",
      buttonText: "Apply Direct Track"
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Path to Success</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the internship track that best matches your current skills and career goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {tracks.map((track, index) => (
            <motion.div
              key={track.title}
              className={`relative rounded-xl overflow-hidden shadow-lg bg-white
                ${hoveredTrack === index ? 'scale-105' : 'scale-100'}
                transition-all duration-300`}
              onHoverStart={() => setHoveredTrack(index)}
              onHoverEnd={() => setHoveredTrack(null)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div 
                className={`p-6 ${
                  track.color === 'blue' 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                    : 'bg-gradient-to-br from-indigo-500 to-indigo-600'
                } text-white`}
              >
                <div className="flex items-center gap-4 mb-4">
                  {track.icon}
                  <div>
                    <h3 className="text-2xl font-bold">{track.title}</h3>
                    <p className="text-white/80">{track.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <ul className="space-y-4 mb-6">
                  {track.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature.text}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                    >
                      <span className={`text-${track.color}-500`}>
                        {feature.icon}
                      </span>
                      <span className="text-gray-700">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold
                    ${track.color === 'blue'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-indigo-500 hover:bg-indigo-600'
                    } text-white transition-colors duration-300`}
                >
                  {track.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackComparison;