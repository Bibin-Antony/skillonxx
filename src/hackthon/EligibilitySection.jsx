import React from "react";
import { Check, Users, BookOpen, Award } from "lucide-react";

const eligibilityData = {
  categories: [
    {
      title: "Engineering Students",
      description: "Currently enrolled in any engineering discipline",
      icon: <Users className="w-6 h-6" aria-label="Engineering Icon" />,
    },
    {
      title: "MBA Students",
      description: "Pursuing Master of Business Administration",
      icon: <BookOpen className="w-6 h-6" aria-label="MBA Icon" />,
    },
    {
      title: "Postgraduate",
      description: "Masters or PhD students in relevant fields",
      icon: <Award className="w-6 h-6" aria-label="Postgraduate Icon" />,
    },
  ],
  requirements: [
    "Valid college/university ID",
    "Team size of 2-4 members",
    "At least one team member with programming experience",
    "All team members must be currently enrolled students",
  ],
};

const EligibilitySection = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
        Eligibility Criteria
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eligibilityData.categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-blue-500 mb-4">{category.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {category.title}
            </h3>
            <p className="text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Additional Requirements
        </h3>
        <div className="space-y-3">
          {eligibilityData.requirements.map((requirement, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-500" aria-label="Check Icon" />
              <span className="text-gray-700">{requirement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EligibilitySection;
