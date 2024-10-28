import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Building2, Globe, Award, Users, Briefcase, Code, LineChart, Target } from 'lucide-react';

const partners = [
  {
    name: "TechCorp Solutions",
    type: "Technology Partner",
    image: "/api/placeholder/150/150?text=TC",
    specialization: "Enterprise Software",
    studentsHired: "45+",
    projectsCompleted: "15+",
    website: "https://techcorp.com",
    location: "Bangalore"
  },
  {
    name: "DesignMaster Studios",
    type: "Design Partner",
    image: "/api/placeholder/150/150?text=DM",
    specialization: "UI/UX Design",
    studentsHired: "30+",
    projectsCompleted: "12+",
    website: "https://designmaster.com",
    location: "Mumbai"
  },
  {
    name: "CloudTech Systems",
    type: "Cloud Solutions",
    image: "/api/placeholder/150/150?text=CS",
    specialization: "Cloud Architecture",
    studentsHired: "40+",
    projectsCompleted: "18+",
    website: "https://cloudtech.com",
    location: "Hyderabad"
  },
  {
    name: "Digital Marketing Pro",
    type: "Marketing Partner",
    image: "/api/placeholder/150/150?text=DM",
    specialization: "Digital Marketing",
    studentsHired: "35+",
    projectsCompleted: "20+",
    website: "https://dmpro.com",
    location: "Delhi"
  },
  {
    name: "DataSmart Analytics",
    type: "Analytics Partner",
    image: "/api/placeholder/150/150?text=DA",
    specialization: "Data Science",
    studentsHired: "25+",
    projectsCompleted: "10+",
    website: "https://datasmart.com",
    location: "Pune"
  },
  {
    name: "SecureNet Solutions",
    type: "Security Partner",
    image: "/api/placeholder/150/150?text=SN",
    specialization: "Cybersecurity",
    studentsHired: "20+",
    projectsCompleted: "8+",
    website: "https://securenet.com",
    location: "Chennai"
  }
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
          animationDelay: `${i * 1.5}s`
        }}
      >
        {[Building2, Globe, Award, Target][i % 4] && React.createElement([Building2, Globe, Award, Target][i % 4], {
          className: "w-6 h-6 text-blue-200/20"
        })}
      </div>
    ))}
  </div>
);

const PartnerCard = ({ partner }) => {
  return (
    <div className="group relative flex-shrink-0 w-64">
      <div className="h-[280px] relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 flex flex-col items-center h-full">
          <div className="relative w-24 h-24 mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={partner.image} 
              alt={partner.name} 
              className="relative w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 text-center group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-300">
            {partner.name}
          </h3>
          <p className="text-blue-600 font-medium mb-4 text-center">{partner.type}</p>
          <div className="flex flex-col items-center gap-2 mt-auto">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">{partner.studentsHired} Students Hired</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">{partner.projectsCompleted} Projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessPartnersSection = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  let scrollInterval;

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const itemWidth = 280; // Width of each card including margin
    const scrollSpeed = 1; // Speed at which the auto-scroll moves

    // Automatic scrolling function
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovered) { // Scroll only if not hovered
          scrollContainer.scrollLeft += scrollSpeed;
          if (scrollContainer.scrollLeft >= itemWidth * partners.length) {
            scrollContainer.scrollLeft = 0; // Reset scroll when reaching the end
          }
        }
      }, 20); // Smooth auto-scroll with interval
    };

    // Start automatic scrolling
    startAutoScroll();

    return () => clearInterval(scrollInterval); // Cleanup on component unmount
  }, [isHovered]);

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <BackgroundElements />
      <div className="absolute -top-0 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -top-0 -right-10 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-0 left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl transform -rotate-3" />
          <h2 className="relative text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Our Business Partners
          </h2>
          <p className="relative text-gray-600 text-lg">
            Collaborating with industry leaders to provide real-world experience and opportunities
          </p>
        </div>

        <div 
          className="relative overflow-x-scroll hide-scrollbar"
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex gap-6 py-4">
            {partners.map((partner, index) => (
              <PartnerCard key={index} partner={partner} />
            ))}
            {partners.map((partner, index) => (
              <PartnerCard key={`clone-${index}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
         .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
       
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 10s infinite ease-in-out;
        }
        @keyframes blob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
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

export default BusinessPartnersSection;