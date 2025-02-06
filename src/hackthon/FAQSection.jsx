// src/components/FAQSection.jsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who can participate in OpenHack 2025?",
      answer: "OpenHack 2025 is open to Engineering Students, MBA Students, Postgraduate and Undergraduate students who are passionate about AI and ML technologies."
    },
    {
      question: "What is the team size requirement?",
      answer: "Teams should consist of 2-4 members. All team members should be from eligible educational backgrounds."
    },
    {
      question: "Is there a registration fee?",
      answer: "No, participation in OpenHack 2025 is completely free of charge."
    },
    {
      question: "Will travel be reimbursed?",
      answer: "Yes, teams will be reimbursed up to INR 4,000 per team for travel expenses, equivalent to a sleeper class train ticket on Indian Railways."
    },
    {
      question: "What should the project proposal include?",
      answer: "Your proposal should include a problem statement, proposed solution, technical architecture, and potential impact. Detailed guidelines will be provided after registration."
    },
    {
      question: "When will the problem statements be released?",
      answer: "Problem statements will be disclosed on February 10th, 2025."
    },
    {
      question: "Do I need prior hackathon experience?",
      answer: "No, prior hackathon experience is not required. We welcome participants of all experience levels who are enthusiastic about technology and innovation."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Didn't find what you're looking for?
        </p>
        <a 
          href="mailto:support@openhack2025.com"
          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center mt-2"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default FAQSection;