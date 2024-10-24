import React from "react";
import {
  BookOpen,
  Play,
  Code,
  Award,
  Users,
  Coffee,
  Network,
  Briefcase,
  ArrowRight,
  ChevronRight,
  Laptop,
  Hexagon,
  Database,
  Settings,
} from "lucide-react";

const steps = [
  {
    title: "Explore Tech Courses",
    description:
      "Browse our diverse range of cutting-edge tech courses and programs. Find the perfect path for your career goals.",
    icon: BookOpen,
    color: "from-blue-400 to-blue-600",
    highlight: "300+ Courses Available",
  },
  {
    title: "Start Learning",
    description:
      "Access expert-led lessons and structured learning paths. Learn at your own pace with interactive content.",
    icon: Play,
    color: "from-purple-400 to-purple-600",
    highlight: "Expert-Led Content",
  },
  {
    title: "Code and Build",
    description:
      "Work on real-world projects and build a professional portfolio. Practice with hands-on coding assignments.",
    icon: Code,
    color: "from-emerald-400 to-emerald-600",
    highlight: "50+ Real Projects",
  },
  {
    title: "Earn Certifications",
    description:
      "Complete assessments and earn recognized certificates. Validate your skills with industry-standard certifications.",
    icon: Award,
    color: "from-yellow-400 to-yellow-600",
    highlight: "Recognized Certificates",
  },
  {
    title: "Join Tech Community",
    description:
      "Connect with peers, participate in hackathons, and join tech forums. Build your professional network.",
    icon: Users,
    color: "from-pink-400 to-pink-600",
    highlight: "10K+ Community Members",
  },
  {
    title: "Get Real Experience",
    description:
      "Apply your skills in a guaranteed 3-month internship. Work on real projects with industry partners.",
    icon: Coffee,
    color: "from-cyan-400 to-cyan-600",
    highlight: "Guaranteed Internship",
  },
  {
    title: "Career Support",
    description:
      "Receive personalized mentorship and job search assistance. Attend exclusive industry networking events.",
    icon: Network,
    color: "from-indigo-400 to-indigo-600",
    highlight: "1:1 Career Mentoring",
  },
  {
    title: "Launch Your Career",
    description:
      "Transform your career with your new skills and experience. Join our successful alumni network.",
    icon: Briefcase,
    color: "from-rose-400 to-rose-600",
    highlight: "90% Placement Rate",
  },
];

const BackgroundElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Gradient Orbs */}
    <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
    <div className="absolute top-20 left-1/2 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl" />
    <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

    {/* Tech Pattern */}
    <div className="absolute inset-0 opacity-[0.03]">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="grid grid-cols-6 gap-8">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="relative h-20">
              <div className="absolute inset-0 border border-gray-900/10" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Floating Tech Icons */}
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
        {i % 4 === 0 ? (
          <Laptop className="w-8 h-8 text-blue-200/20" />
        ) : i % 4 === 1 ? (
          <Hexagon className="w-8 h-8 text-purple-200/20" />
        ) : i % 4 === 2 ? (
          <Database className="w-8 h-8 text-green-200/20" />
        ) : (
          <Settings className="w-8 h-8 text-pink-200/20" />
        )}
      </div>
    ))}
  </div>
);

const StepCard = ({ step, index, isLast }) => (
  <div className="group relative h-full">
    {/* Connector Lines */}
    {!isLast && index % 4 !== 3 && (
      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0">
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    )}

    {/* Card */}
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-x-2 border border-gray-100/50">
      {/* Step Number */}
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
        {index + 1}
      </div>

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} p-3 mb-6 flex-shrink-0 relative group-hover:scale-110 transition-transform duration-300`}
      >
        <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <step.icon className="w-full h-full text-white relative z-10" />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{step.description}</p>

        {/* Highlight */}
        <div className="mt-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-sm font-medium text-blue-600 border border-blue-100/50">
            {step.highlight}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
      {/* <BackgroundElements /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl transform rotate-6" />
          <h2 className="relative text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white bg-clip-text">
            Your Journey to Tech Success
          </h2>
          <p className="relative text-white text-lg">
            Follow our proven pathway to transform your career in technology,
            supported every step of the way.
          </p>
        </div>
        {/* <div className="absolute -top-0 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-0 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-0 left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="inline-block p-[2px] rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600">
              <button className="group relative px-8 py-4 bg-white rounded-2xl text-lg font-semibold transition-all duration-300 hover:bg-transparent">
                <span className="relative bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:text-white flex items-center gap-2">
                  Begin Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>

          <p className="mt-4 text-white relative">
            Join 10,000+ students who have transformed their careers with
            SkillonX
          </p>
        </div>
      </div>

      {/* Animation Keyframes */}
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

export default HowItWorks;
