import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Twitter,
  Github,
  Users,
  Star,
  Award,
  MessageCircle,
} from "lucide-react";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    image: "/api/placeholder/150/150?text=AJ",
    linkedin: "https://linkedin.com/in/alexjohnson",
    twitter: "https://twitter.com/alexjohnson",
    github: "https://github.com/alexjohnson",
  },
  {
    name: "Samantha Lee",
    role: "Chief Technology Officer",
    image: "/api/placeholder/150/150?text=SL",
    linkedin: "https://linkedin.com/in/samanthalee",
    twitter: "https://twitter.com/samanthalee",
    github: "https://github.com/samanthalee",
  },
  {
    name: "Michael Chen",
    role: "Head of Curriculum",
    image: "/api/placeholder/150/150?text=MC",
    linkedin: "https://linkedin.com/in/michaelchen",
    twitter: "https://twitter.com/michaelchen",
    github: "https://github.com/michaelchen",
  },
  {
    name: "Emily Rodriguez",
    role: "Lead UX/UI Instructor",
    image: "/api/placeholder/150/150?text=ER",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    twitter: "https://twitter.com/emilyrodriguez",
    github: "https://github.com/emilyrodriguez",
  },
  {
    name: "David Kim",
    role: "Full Stack Development Lead",
    image: "/api/placeholder/150/150?text=DK",
    linkedin: "https://linkedin.com/in/davidkim",
    twitter: "https://twitter.com/davidkim",
    github: "https://github.com/davidkim",
  },
  {
    name: "Sarah Patel",
    role: "Career Services Director",
    image: "/api/placeholder/150/150?text=SP",
    linkedin: "https://linkedin.com/in/sarahpatel",
    twitter: "https://twitter.com/sarahpatel",
    github: "https://github.com/sarahpatel",
  },
];

const BackgroundElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

    <div className="absolute inset-0 opacity-[0.02]">
      <div className="grid grid-cols-8 h-full">
        {[...Array(32)].map((_, i) => (
          <div key={i} className="border-r border-b border-gray-900/10" />
        ))}
      </div>
    </div>

    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${i * 1.5}s`,
        }}
      >
        {[Users, Star, Award, MessageCircle][i % 4] &&
          React.createElement([Users, Star, Award, MessageCircle][i % 4], {
            className: "w-6 h-6 text-blue-200/20",
          })}
      </div>
    ))}
  </div>
);

const TeamMember = ({ member }) => {
  return (
    <div className="group relative flex-shrink-0 w-64">
      <div className="h-[280px] relative bg-white backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 flex flex-col items-center h-full">
          <div className="relative w-24 h-24 mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={member.image}
              alt={member.name}
              className="relative w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>

          <h3 className="text-lg font-bold text-gray-800 mb-2 text-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-blue-600 font-medium mb-6 text-center">
            {member.role}
          </p>

          <div className="flex justify-center space-x-3 mt-auto">
            <a
              href={member.linkedin}
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <Linkedin size={16} />
              </div>
            </a>
            <a
              href={member.twitter}
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                <Twitter size={16} />
              </div>
            </a>
            <a
              href={member.github}
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <div className="p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                <Github size={16} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurTeamSection = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const itemWidth = 280; // card width (256px) + gap (24px)
    const scrollSpeed = 1;
    let scrollPos = 0;
    let requestId;

    const scroll = () => {
      if (isHovered) {
        requestId = requestAnimationFrame(scroll);
        return;
      }

      scrollPos += scrollSpeed;

      // Reset scroll position when reaching the end of original items
      if (scrollPos >= itemWidth * teamMembers.length) {
        scrollPos = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft = scrollPos;
      }

      requestId = requestAnimationFrame(scroll);
    };

    requestId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [isHovered]);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
      <BackgroundElements />

      {/* Added animated blob elements */}
      <div className="absolute -top-0 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -top-0 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-0 left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl transform -rotate-3" />
          <h2 className="relative text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white bg-clip-text">
            Meet Our Expert Team
          </h2>
          <p className="relative text-white text-lg">
            Learn from industry leaders with decades of combined experience
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden py-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Original items */}
            {teamMembers.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
            {/* Cloned items for smooth infinite scroll */}
            {teamMembers.map((member, index) => (
              <TeamMember key={`clone-${index}`} member={member} />
            ))}
          </div>
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

export default OurTeamSection;
