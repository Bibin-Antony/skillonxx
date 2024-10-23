import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  HelpCircle,
  Book,
  Zap,
  Users,
  Settings,
  Star,
} from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    icon: Zap,
    items: [
      {
        question: "What is SkillonX?",
        answer:
          "SkillonX is an online platform dedicated to providing accessible, high-quality education in various tech skills. We connect learners worldwide with industry experts and experienced instructors, offering a range of courses on programming, data science, web development, and more.",
        tag: "Platform Overview",
      },
      {
        question: "How do I sign up for SkillonX?",
        answer:
          "Signing up for SkillonX is easy! Click the 'Get Started' button at the top of the page, fill in your details, and choose a learning plan that suits your goals. Once registered, you'll have immediate access to our extensive library of tech courses.",
        tag: "Registration",
      },
    ],
  },
  {
    category: "Courses & Learning",
    icon: Book,
    items: [
      {
        question: "What types of courses are available?",
        answer:
          "SkillonX offers a diverse range of courses covering various tech topics. These include Web Development, Data Science, Machine Learning, UX/UI Design, Cloud Computing, and more. We have courses suitable for beginners to advanced learners in each field.",
        tag: "Course Catalog",
      },
      {
        question: "Can I interact with instructors and other students?",
        answer:
          "Absolutely! SkillonX fosters a vibrant learning community. We provide interactive features such as live Q&A sessions with instructors, discussion forums for each course, and a messaging system to connect with mentors and fellow students, enhancing your learning experience.",
        tag: "Community",
      },
    ],
  },
  {
    category: "Pricing & Plans",
    icon: Star,
    items: [
      {
        question: "How does the subscription model work?",
        answer:
          "We offer various subscription plans to accommodate different learning needs and budgets. All plans provide access to our full library of recorded courses. Higher-tier plans include additional benefits like live coding sessions, one-on-one mentorship, and special certification options.",
        tag: "Subscription",
      },
      {
        question: "Is there a mobile app available?",
        answer:
          "Yes, SkillonX has a mobile app for both iOS and Android devices. You can download it from the App Store or Google Play Store to access your courses on the go.",
        tag: "Mobile Access",
      },
    ],
  },
];

const FAQSearch = ({ onSearch }) => (
  <div className="relative max-w-2xl mx-auto mb-12">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl" />
    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-lg p-2">
      <div className="flex items-center">
        <Search className="w-5 h-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search your question..."
          className="w-full px-4 py-3 text-gray-700 bg-transparent outline-none"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  </div>
);

const FAQItem = ({ question, answer, tag, isOpen, onToggle }) => (
  <div className="group">
    <div
      className={`border-b border-gray-100 transition-colors duration-300 ${
        isOpen ? "bg-blue-50/50" : "hover:bg-gray-50/50"
      }`}
    >
      <button
        className="flex justify-between items-center w-full text-left p-6"
        onClick={onToggle}
      >
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              {question}
            </span>
          </div>
          {tag && (
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100/50 text-xs font-medium text-blue-600">
              {tag}
            </span>
          )}
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-blue-600 rotate-180"
              : "bg-gray-100 group-hover:bg-blue-100"
          }`}
        >
          <ChevronDown
            className={`w-5 h-5 transition-colors duration-300 ${
              isOpen ? "text-white" : "text-gray-500 group-hover:text-blue-600"
            }`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-6 pt-0 text-gray-600">{answer}</div>
      </div>
    </div>
  </div>
);

const FAQCategory = ({ category, icon: Icon, items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{category}</h3>
      </div>
      <div className="bg-white backdrop-blur-sm rounded-2xl border border-gray-100/50 shadow-lg overflow-hidden">
        {items.map((item, index) => (
          <FAQItem
            key={index}
            {...item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

const FloatingElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

    {[MessageCircle, HelpCircle, Settings, Users].map((Icon, index) => (
      <div
        key={index}
        className="absolute animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${index * 1.5}s`,
        }}
      >
        <Icon className="w-6 h-6 text-blue-200/30" />
      </div>
    ))}
  </div>
);

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="relative py-24 bg-gradient-to-r overflow-hidden from-blue-600 via-blue-700 to-indigo-800">
      <FloatingElements />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Got Questions? We've Got Answers
          </div>
          <h2 className="text-4xl font-bold mb-6 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-white text-lg">
            Find answers to common questions about SkillonX's learning platform
          </p>
        </div>

        {/* Search */}
        <FAQSearch onSearch={setSearchTerm} />

        {/* FAQ Categories */}
        {faqs.map((category, index) => (
          <FAQCategory key={index} {...category} />
        ))}
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
      `}</style>
    </section>
  );
};

export default FAQSection;
