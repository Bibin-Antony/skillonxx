import React from 'react';
import { Rocket, ArrowRight, CheckCircle } from 'lucide-react';

const CTASectionCourses = () => {
  const benefits = [
    "Guaranteed Internship Opportunities",
    "Industry-Recognized Certification",
    "1:1 Career Counseling",
    "Lifetime Access to Course Content"
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
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
      </div>
    </section>
  );
};

export default CTASectionCourses;