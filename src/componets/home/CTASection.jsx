import React from "react";
import {
  ArrowRight,
  Code,
  Sparkles,
  Star,
  Trophy,
  Rocket,
  Globe,
  Users,
  Zap,
  Award,
} from "lucide-react";

const BackgroundElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gradient Orbs */}
    <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />

    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-[0.03]">
      <div className="h-full w-full">
        <div className="grid grid-cols-6 h-full">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="border-r border-b border-gray-900/10" />
          ))}
        </div>
      </div>
    </div>

    {/* Floating Icons */}
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animation: `float ${10 + Math.random() * 5}s infinite ease-in-out ${
            Math.random() * 5
          }s`,
        }}
      >
        {[Star, Trophy, Globe, Rocket, Users, Zap, Award, Sparkles][i] &&
          React.createElement(
            [Star, Trophy, Globe, Rocket, Users, Zap, Award, Sparkles][i],
            {
              className: "w-6 h-6 text-blue-200/30",
            }
          )}
      </div>
    ))}
  </div>
);

const Stats = () => (
  <div className="flex justify-center gap-8 mb-12">
    {[
      { label: "Active Students", value: "50K+" },
      { label: "Course Completion", value: "92%" },
      { label: "Career Transition", value: "85%" },
    ].map((stat, index) => (
      <div
        key={index}
        className="text-center px-6 py-3 bg-white/50 backdrop-blur-sm rounded-xl border border-blue-100/50"
      >
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          {stat.value}
        </div>
        <div className="text-sm text-gray-600">{stat.label}</div>
      </div>
    ))}
  </div>
);

const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-blue-50 via-white/50 to-purple-50">
      {/* <BackgroundElements /> */}

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl transform -rotate-3" />
            <h2 className="relative text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Transform Your Tech Career
            </h2>
            <p className="relative text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful graduates who've launched their tech
              careers through our comprehensive learning platform. Master
              in-demand skills with expert guidance.
            </p>
          </div>

          {/* Stats */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            {/* Primary CTA */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200" />
              <a
                href="/signup"
                className="relative flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg font-semibold text-white transform hover:scale-[1.02] transition-all duration-200"
              >
                <span className="flex items-center gap-2">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </a>
            </div>

            {/* Secondary CTA */}
            <a
              href="/courses"
              className="group relative px-8 py-4 bg-white rounded-full text-lg font-semibold transition-all duration-200 hover:shadow-lg border border-blue-100"
            >
              <span className="relative bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                Explore Tech Courses
                <Code className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
              </span>
            </a>
          </div>

          {/* Trust Badges */}
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

export default CTASection;
