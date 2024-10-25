import React from "react";
import {
  Code,
  Database,
  Palette,
  ChartBar,
  Globe,
  Server,
  Lock,
  Cpu,
} from "lucide-react";

const categories = [
  {
    name: "Web Development",
    icon: <Globe className="w-6 h-6" />,
    courses: "50+ Courses",
  },
  {
    name: "Data Science",
    icon: <ChartBar className="w-6 h-6" />,
    courses: "30+ Courses",
  },
  {
    name: "UI/UX Design",
    icon: <Palette className="w-6 h-6" />,
    courses: "40+ Courses",
  },
  {
    name: "Mobile App Dev",
    icon: <Cpu className="w-6 h-6" />,
    courses: "35+ Courses",
  },
  {
    name: "Machine Learning",
    icon: <Database className="w-6 h-6" />,
    courses: "45+ Courses",
  },
  {
    name: "Cloud Computing",
    icon: <Server className="w-6 h-6" />,
    courses: "25+ Courses",
  },
  {
    name: "Cybersecurity",
    icon: <Lock className="w-6 h-6" />,
    courses: "20+ Courses",
  },
  {
    name: "DevOps",
    icon: <Code className="w-6 h-6" />,
    courses: "15+ Courses",
  },
];

const BrowseCategories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Explore Tech Skills by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of cutting-edge tech courses
            designed to elevate your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.courses}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;