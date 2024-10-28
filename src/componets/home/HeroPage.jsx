import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Palette,
  Target,
} from "lucide-react";
import img1 from "../../assets/Courosal/webdev.png";
// import img2 from "../../assets/Courosal/grahicdesign.png";
import img2 from '../../assets/illustrations/graphicimg.png'
import img3 from "../../assets/Courosal/digitalmarketing.png";

const HeroPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      number: "01",
      title: "Web Development",
      subtitle: "Master Full-Stack Development",
      description:
        "Build powerful web applications from ground up. Learn modern frameworks, databases, and cloud deployment.",
      buttonText: "Explore Course",
      image: img1,
      icon: <BookOpen className="w-6 h-6" />,
      bgColor: "from-blue-600 via-blue-700 to-indigo-800",
      accentColor: "text-blue-400",
      features: ["React & Node.js", "Cloud Deployment", "Real Projects"],
    },
    {
      number: "02",
      title: "Graphic Design",
      subtitle: "Create Stunning Visuals",
      description:
        "Master industry-standard design tools and principles. Create compelling visuals for print and digital media.",
      buttonText: "Explore Course",
      image: img2,
      icon: <Palette className="w-6 h-6" />,
      bgColor: "from-purple-600 via-purple-700 to-indigo-800",
      accentColor: "text-purple-400",
      features: ["Adobe Suite", "UI/UX Design", "Portfolio Building"],
    },
    {
      number: "03",
      title: "Digital Marketing",
      subtitle: "Master Online Marketing",
      description:
        "Learn comprehensive digital marketing strategies. Excel in SEO, social media, and data-driven marketing.",
      buttonText: "Explore Course",
      image: img3,
      icon: <Target className="w-6 h-6" />,
      bgColor: " from-emerald-600 via-emerald-700 to-green-800",
      accentColor: "text-emerald-400",
      features: ["SEO Mastery", "Social Media", "Analytics"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div
      className={`relative min-h-[100vh] pt-28 overflow-hidden bg-gradient-to-br ${slides[currentSlide].bgColor} transition-all duration-700 ease-in-out flex items-center`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8 pb-14 relative z-10 ">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20 space-x-96">
          {/* Content Section */}
          <div className="lg:w-1/2 space-y-8">
            {/* Number and Title */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span
                  className={`text-5xl font-bold ${slides[currentSlide].accentColor} font-mono`}
                >
                  {slides[currentSlide].number}
                </span>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${slides[currentSlide].accentColor} bg-white/10 backdrop-blur-sm`}
                >
                  {slides[currentSlide].icon}
                </div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-2">
                  {slides[currentSlide].title}
                </h1>
                <p className={`text-xl ${slides[currentSlide].accentColor}`}>
                  {slides[currentSlide].subtitle}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300">
              {slides[currentSlide].description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3">
              {slides[currentSlide].features.map((feature, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm border border-white/20"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => window.location.href = '/courses'}
              className="group relative px-8 py-4 rounded-xl text-sm md:text-lg font-semibold"
              >
              <div className="absolute inset-0 bg-white rounded-xl transition-all duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 text-blue-900 font-semibold">
                {slides[currentSlide].buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
           </button>
          </div>

          {/* Image Section */}
          <div className=" w-10 md:w-1/2">
            <div className="">
              {/* Background decoration */}
              <div className="absolute"></div>
              <div className="relative ">
                <img
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 hidden md:block"
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                />
                <div className="absolute "></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-7 md:bottom-[-75px] left-1/2 transform -translate-x-1/2 flex items-center gap-4  ">
        
          <button
            onClick={prevSlide}
            className="p-1 md:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white border border-white/20"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Progress Indicators */}
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 md:h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-1 md:p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 text-white border border-white/20"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
