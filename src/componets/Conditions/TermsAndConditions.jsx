import React from 'react';
import { ScrollText, Shield, UserCheck, Book, AlertCircle } from 'lucide-react';

export default function TermsAndConditions() {
  const sections = [
    {
      icon: <ScrollText className="w-6 h-6" />,
      title: "1. Agreement to Terms",
      content: `By accessing and using SkillonX's website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.`
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "2. Intellectual Property",
      content: `All content on SkillonX, including but not limited to text, graphics, logos, images, video material, and course content, is the property of SkillonX or its content creators and protected by international copyright laws. Users may not reproduce, distribute, or create derivative works without explicit permission.`
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "3. User Accounts",
      content: [
        "Users must be at least 13 years old to create an account",
        "You are responsible for maintaining the confidentiality of your account",
        "You must provide accurate and complete information when creating an account",
        "You are responsible for all activities that occur under your account",
        "SkillonX reserves the right to terminate accounts that violate these terms"
      ]
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: "4. Course Content and Services",
      content: [
        "Course access is limited to registered users",
        "Course materials may not be shared, distributed, or reproduced without permission",
        "SkillonX reserves the right to modify or discontinue courses",
        "Completion certificates are issued based on meeting course requirements",
        "Course ratings and reviews must be honest and based on actual experience"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "5. Payment and Refunds",
      content: [
        "All payments are processed securely through our payment partners",
        "Course fees are non-refundable after 7 days of purchase",
        "Refund requests within 7 days must meet our refund policy criteria",
        "SkillonX reserves the right to modify course pricing",
        "Promotional offers cannot be combined unless explicitly stated"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 mb-8">
            Last updated: November 4, 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-8">
          {/* Introduction */}
          <div className="prose max-w-none">
            <p className="text-gray-600">
              Welcome to SkillonX. These terms and conditions outline the rules and regulations
              for the use of our website and services. By accessing this website, we assume
              you accept these terms and conditions in full.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <div className="ml-13 pl-8 border-l-2 border-gray-200">
                  {Array.isArray(section.content) ? (
                    <ul className="space-y-2 text-gray-600">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">{section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>Email: support@skillonx.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: [Your Business Address]</li>
            </ul>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              By using SkillonX, you acknowledge that you have read, understood, and agree to
              be bound by these Terms and Conditions. SkillonX reserves the right to modify
              these terms at any time without notice. Continued use of the platform following
              any changes constitutes acceptance of the modified terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

