import React from "react";
import { Sparkles, Code, Rocket, Brain, Target } from "lucide-react";

const CreativeCourseHero = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center relative px-4 overflow-hidden pt-16 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">

      {/* Main content */}
      <div className="text-center max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Floating accent elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Header text */}
        <div className="flex flex-wrap justify-center gap-4 text-2xl md:text-4xl font-bold">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg transform hover:scale-105 transition-all duration-300 border-t border-r  border-4 border-blue-600 shadow-blue-600 cursor-pointer">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Master
            </span>
          </div>
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg transform hover:scale-105 transition-all duration-300 border-t border-l border-r border-4 border-purple-600 shadow-purple-600 cursor-pointer">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              tech skills
            </span>
          </div>
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg transform hover:scale-105 transition-all duration-300 border-t border-l border-blue-600 border-4 shadow-blue-600 cursor-pointer">
            <span className="bg-gradient-to-r from-pink-600 to-blue-600 text-transparent bg-clip-text">
              transform
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-gray-700 text-xl mx-auto max-w-[85vw] leading-relaxed bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center">
  Embark on a journey of innovation and excellence. Our expert led courses are designed to elevate your skills and accelerate your career growth.
  <span className="block mt-2 text-blue-600 font-semibold">
    Your future in tech starts here.
  </span>
</p>

        {/* CTA Button */}
        <div className="relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <Sparkles className="w-6 h-6 text-purple-500 animate-bounce" />
          </div>
          <button className="group relative px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur group-hover:blur-lg transition-all duration-300"></div>
            <span className="relative bg-white text-white rounded-full px-10 py-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 border border-purple-100 hover:border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
              Explore Courses
              <Rocket className="w-5 h-5 inline-block group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 px-2 pb-8">
  {[
    { icon: <Code className="w-4 h-4 md:w-6 md:h-6" />, text: "Industry-Ready Skills" },
    { icon: <Brain className="w-4 h-4 md:w-6 md:h-6" />, text: "Expert Mentorship" },
    { icon: <Target className="w-4 h-4 md:w-6 md:h-6" />, text: "Career Growth" },
  ].map((feature, index) => (
    <div
      key={index}
      className="flex items-center gap-1.5 md:gap-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-4 md:px-4 py-4 md:py-2 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <span className="text-blue-600">{feature.icon}</span>
      <span className="text-gray-700 font-medium text-sm md:text-base">{feature.text}</span>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default CreativeCourseHero;
