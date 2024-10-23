import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Users,
  MessageCircle,
  Heart,
  Award,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Full Stack Developer",
    company: "Google",
    image: "/api/placeholder/150/150",
    quote:
      "SkillonX's web development bootcamp was a game-changer for my career. The hands-on projects and expert instructors helped me land my dream job within months of graduating.",
    rating: 5,
    achievement: "3x Salary Increase",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Data Scientist",
    company: "Microsoft",
    image: "/api/placeholder/150/150",
    quote:
      "The data science course on SkillonX is top-notch. The curriculum is comprehensive and up-to-date with industry standards. It gave me the skills to transition into a data-driven role.",
    rating: 5,
    achievement: "Career Transition",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX/UI Designer",
    company: "Apple",
    image: "/api/placeholder/150/150",
    quote:
      "SkillonX's design courses are incredible. I've improved my UX skills, learned the latest design tools, and even started freelancing - all thanks to what I've learned here!",
    rating: 5,
    achievement: "Freelance Success",
  },
];

const TestimonialCard = ({ testimonial, isActive }) => (
  <div
    className={`relative h-full transform transition-all duration-500 ${
      isActive ? "scale-100 opacity-100" : "scale-95 opacity-50"
    }`}
  >
    {/* Card Background with Gradient */}
    <div className="relative h-full bg-white backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Quote Icon */}
      <div className="absolute -top-0 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
        <Quote className="w-4 h-4 text-white" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          {/* Image with Gradient Border */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-sm opacity-50" />
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="relative w-20 h-20 rounded-full object-cover border-2 border-white"
            />
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-lg text-gray-800">
              {testimonial.name}
            </h3>
            <p className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-medium">
              {testimonial.role}
            </p>
            <p className="text-sm text-gray-600">{testimonial.company}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill={i < testimonial.rating ? "currentColor" : "none"}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-600 leading-relaxed mb-6">
          "{testimonial.quote}"
        </p>

        {/* Achievement Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-sm font-medium text-blue-600 border border-blue-100/50">
          <Award className="w-4 h-4 mr-2" />
          {testimonial.achievement}
        </div>
      </div>
    </div>
  </div>
);

const FloatingElement = ({ Icon, className }) => (
  <div
    className={`absolute animate-float ${className}`}
    style={{
      animationDelay: `${Math.random() * 2}s`,
    }}
  >
    <Icon className="w-6 h-6 text-blue-200/30" />
  </div>
);

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-800" />

      {/* Blob Elements */}
      <div className="absolute top-1/4 left-0 w-36 h-36 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/4 right-0 w-36 h-36 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-20 w-36 h-36 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      {/* Floating Icons */}
      <FloatingElement Icon={Users} className="top-1/4 left-1/4" />
      <FloatingElement Icon={MessageCircle} className="top-1/3 right-1/4" />
      <FloatingElement Icon={Heart} className="bottom-1/4 left-1/3" />
      <FloatingElement Icon={Star} className="top-1/2 right-1/3" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            <Users className="w-4 h-4 mr-2" />
            Join 50,000+ Successful Graduates
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white bg-clip-text">
            Success Stories from Our Students
          </h2>
          <p className="text-white text-lg">
            Discover how our students transformed their careers through SkillonX
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative px-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200/50 group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200/50 group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
          </button>

          {/* Testimonials */}
          <div className="overflow-hidden">
            <div
              className="flex transition-all duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={index === currentIndex}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`group relative p-2 transition-transform duration-200 hover:scale-110 ${
                index === currentIndex ? "scale-110" : ""
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gray-300 group-hover:bg-gray-400"
                }`}
              />
            </button>
          ))}
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
        @keyframes blob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
