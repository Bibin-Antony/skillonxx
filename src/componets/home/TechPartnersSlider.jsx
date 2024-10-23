import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Globe, Award, ChevronRight } from "lucide-react";

const partners = [
  {
    name: "Google",
    category: "Tech Giant",
    description: "Cloud & AI Partnership",
    image: "/api/placeholder/150/80?text=Google",
  },
  {
    name: "Microsoft",
    category: "Technology",
    description: "Azure Cloud Partner",
    image: "/api/placeholder/150/80?text=Microsoft",
  },
  {
    name: "Amazon Web Services",
    category: "Cloud Computing",
    description: "AWS Education Partner",
    image: "/api/placeholder/150/80?text=AWS",
  },
  {
    name: "Facebook",
    category: "Social Media",
    description: "Meta Developer Partner",
    image: "/api/placeholder/150/80?text=Meta",
  },
  {
    name: "IBM",
    category: "Enterprise",
    description: "AI Research Partner",
    image: "/api/placeholder/150/80?text=IBM",
  },
  {
    name: "Oracle",
    category: "Database",
    description: "Database Technology Partner",
    image: "/api/placeholder/150/80?text=Oracle",
  },
  {
    name: "Cisco",
    category: "Networking",
    description: "Network Security Partner",
    image: "/api/placeholder/150/80?text=Cisco",
  },
];

const TechPartnersSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, black 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Globe className="w-6 h-6 text-blue-600" />
            <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase">
              Industry Partners
            </h2>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Partnering with Industry Leaders
          </h3>
          <p className="text-gray-600">
            We collaborate with top tech companies to provide our students with
            industry-relevant skills and opportunities.
          </p>
        </div>

        {/* Partners Slider */}
        <div className="relative px-4">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* <Slider {...settings} className="partner-slider">
            {partners.map((partner, index) => (
              <div key={index} className="px-4 outline-none">
                <div className="bg-white rounded-xl p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg border border-gray-100">
                  <div className="flex flex-col items-center">
                    <div className="h-16 flex items-center justify-center mb-4">
                      <img 
                        src={partner.image}
                        alt={partner.name}
                        className="max-h-full w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <span className="text-xs text-blue-600 font-medium mb-1">
                      {partner.category}
                    </span>
                    <span className="text-sm text-gray-600">
                      {partner.description}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider> */}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
            <span>View All Partners</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Custom CSS for slider */}
      <style jsx>{`
        .partner-slider .slick-track {
          display: flex !important;
          align-items: center !important;
        }
        .partner-slider .slick-slide {
          height: inherit !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
      `}</style>
    </section>
  );
};

export default TechPartnersSlider;
