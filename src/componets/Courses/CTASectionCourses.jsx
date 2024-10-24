import React from 'react';
import { Rocket, Users, Trophy, ArrowRight, CheckCircle, Star } from 'lucide-react';

const CTASectionCourses = () => {
  const stats = [
    { number: "10K+", label: "Active Students", icon: <Users className="w-6 h-6" /> },
    { number: "95%", label: "Success Rate", icon: <Trophy className="w-6 h-6" /> },
    { number: "50+", label: "Expert Mentors", icon: <Star className="w-6 h-6" /> }
  ];

  const benefits = [
    "Guaranteed Internship Opportunities",
    "Industry-Recognized Certification",
    "1:1 Career Counseling",
    "Lifetime Access to Course Content"
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Animated background dots */}
      <div className="absolute inset-0" style={{ opacity: 0.1 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Transform Your Future with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Industry-Ready Skills
                </span>
              </h2>
              <p className="text-xl text-gray-300">
                Join thousands of successful graduates who have launched their tech careers through our comprehensive training programs.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 text-gray-200"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur group-hover:blur-lg transition-all duration-300"></div>
                <span className="relative flex items-center justify-center gap-2 text-white">
                  Get Started Now
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
              
              <button className="px-8 py-4 rounded-xl text-white border border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                Schedule Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="grid gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-lg text-white">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-gray-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Testimonial Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex-shrink-0">
                  <img 
                    src="/api/placeholder/48/48" 
                    alt="Student" 
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-300 italic">
                    "The course completely transformed my career. I went from zero coding knowledge to landing a job at a top tech company."
                  </p>
                  <div className="mt-2 text-white font-semibold">
                    Sarah Johnson
                    <span className="text-gray-400 font-normal ml-2">
                      Full Stack Developer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASectionCourses;