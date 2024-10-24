import React from "react";
import {
  Clock,
  Globe,
  Laptop,
  Code,
  Users,
  Briefcase,
  Award,
  Zap,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Gem,
  Shield,
  Target,
} from "lucide-react";

const benefits = [
  {
    title: "Flexible Learning",
    description:
      "Master tech skills at your own pace, with 24/7 access to course content and personalized learning paths.",
    icon: Clock,
    color: "from-blue-400 to-blue-600",
    highlight: "Learn at Your Pace",
    stat: "24/7 Access",
  },
  {
    title: "Global Network",
    description:
      "Join a vibrant community of learners from 150+ countries, sharing knowledge and opportunities.",
    icon: Globe,
    color: "from-purple-400 to-purple-600",
    highlight: "Global Community",
    stat: "150+ Countries",
  },
  {
    title: "Learn Anywhere",
    description:
      "Access courses on any device with our adaptive learning platform and offline content support.",
    icon: Laptop,
    color: "from-emerald-400 to-emerald-600",
    highlight: "Multi-device Access",
    stat: "Any Device",
  },
  {
    title: "Industry-led Curriculum",
    description:
      "Learn from curriculum designed by tech leaders from top companies, updated quarterly.",
    icon: Code,
    color: "from-yellow-400 to-yellow-600",
    highlight: "Expert Designed",
    stat: "Quarterly Updates",
  },
  {
    title: "Interactive Projects",
    description:
      "Build your portfolio with 100+ hands-on projects and real-world collaborative challenges.",
    icon: Users,
    color: "from-pink-400 to-pink-600",
    highlight: "Hands-on Learning",
    stat: "100+ Projects",
  },
  {
    title: "Career Advancement",
    description:
      "85% of our graduates report career growth within 6 months of completing their courses.",
    icon: Briefcase,
    color: "from-cyan-400 to-cyan-600",
    highlight: "Career Growth",
    stat: "85% Success Rate",
  },
  {
    title: "Recognized Certifications",
    description:
      "Earn certificates valued by top tech companies, with blockchain-verified credentials.",
    icon: Award,
    color: "from-indigo-400 to-indigo-600",
    highlight: "Verified Credentials",
    stat: "Industry Recognized",
  },
  {
    title: "Cutting-edge Technologies",
    description:
      "Stay ahead with courses on emerging tech, from AI and blockchain to cloud computing.",
    icon: Zap,
    color: "from-rose-400 to-rose-600",
    highlight: "Latest Tech",
    stat: "Monthly New Courses",
  },
];


const BenefitCard = ({ benefit, index }) => (
  <div className="group relative ">
    {/* Card */}
    <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-blue-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100/50">
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} p-3 mb-6 flex-shrink-0 relative group-hover:scale-110 transition-transform duration-300`}
      >
        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <benefit.icon className="w-full h-full text-white relative z-10" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300">
          {benefit.title}
        </h3>
        <p className="text-gray-600">{benefit.description}</p>

        {/* Stats Badge */}
        <div className="flex items-center justify-between pt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-sm font-medium text-blue-600 border border-blue-100/50">
            {benefit.stat}
          </span>
          <span className="text-sm font-medium text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
            {benefit.highlight}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const BenefitsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-blue-200 to-white">


      <div className="relative z-10 max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl transform -rotate-3" />
          <h2 className="relative text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Why Choose SkillonX
          </h2>
          <p className="relative text-gray-600 text-lg">
            Join thousands of successful graduates who transformed their careers
            through our comprehensive learning platform
          </p>
        </div>
       

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer ">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center relative ">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="inline-block p-[2px] rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
              <button className="group relative px-8 py-4 bg-white rounded-2xl text-lg font-semibold transition-all duration-300 hover:bg-transparent">
                <span className="relative bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:text-white flex items-center gap-2">
                  Start Learning Today
                  <ArrowRight className="w-5 h-5 text-purple-600 group-hover:text-white group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>

          <p className="mt-4 text-gray-500 relative">
            Join our professionals advancing their careers with SkillonX
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        .animate-float {
          animation: float 10s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;
