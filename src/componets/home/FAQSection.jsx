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
import axios from "axios";
const faqs = [
  {
    category: "About SkillonX",
    icon: Zap,
    items: [
      {
        question: "What is SkillonX?",
        answer: "SkillonX is a premier skill development institute based in Bogadi, Mysore. We specialize in providing hands-on training in web development, graphics, and digital marketing for students, graduates, and professionals looking to upskill. Our unique approach combines theoretical knowledge with practical projects and guaranteed internship opportunities.",
        tag: "Company Overview",
      },
      {
        question: "What makes SkillonX different?",
        answer: "What sets us apart is our three-pillar approach to learning: comprehensive course content, hands-on industry-standard projects, and a compulsory 3-6 month internship with our partner companies. This ensures our students gain real-world experience and are job-ready upon completion.",
        tag: "Our Advantage",
      },
    ],
  },
  {
    category: "Courses & Training",
    icon: Book,
    items: [
      {
        question: "What courses do you offer?",
        answer: "We offer specialized courses in: Web Development (including front-end and full-stack development), Graphics Design, UI/UX Design, and Digital Marketing. Each course includes at least two industry-standard projects, such as developing your own component library in our web development course.",
        tag: "Course Catalog",
      },
      {
        question: "Do you offer courses for college students?",
        answer: "Yes! We conduct specialized workshops and training programs directly at universities and colleges. These programs cover web development, graphics, digital marketing, and more, tailored to meet the specific needs of college students.",
        tag: "College Programs",
      },
    ],
  },
  {
    category: "Internship & Projects",
    icon: Users,
    items: [
      {
        question: "Tell me about the internship program",
        answer: "Every student who completes our course is guaranteed a 3-6 month internship with our partner companies. This internship provides invaluable real-world project experience and often leads to job opportunities. During the internship, students work on actual industry projects under professional guidance.",
        tag: "Internships",
      },
      {
        question: "What kind of projects will I work on?",
        answer: "During your course, you'll complete at least two industry-standard projects. For example, web development students create their own component library, UI/UX students work on real product designs, and digital marketing students develop comprehensive marketing campaigns. These projects form a strong portfolio for your job applications.",
        tag: "Projects",
      },
    ],
  },
  {
    category: "Career Support",
    icon: Star,
    items: [
      {
        question: "What career support do you provide?",
        answer: "Our career support includes resume building, interview preparation, and direct connections with industry partners through our internship program. The combination of our course completion certificate, project portfolio, and internship experience gives our students a significant advantage in the job market.",
        tag: "Career Services",
      },
      {
        question: "How does the placement process work?",
        answer: "After completing both the course and internship, students receive support in finding full-time positions. Our strong industry connections and the practical experience gained through our program make our students attractive candidates for employers.",
        tag: "Placements",
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
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const prodUrl = "https://skillonx-website.onrender.com"

  const handleNotFoundQuestion = async () => {
    try {
      await axios.post("https://skillonx-website.onrender.com/questions-not-found", { question: searchTerm });
      setNotFoundMessage("Your question has been submitted.");
    } catch (error) {
      setNotFoundMessage("There was an error submitting your question.");
    }
  };
  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

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

        {/* FAQ Categories or No Results Message */}
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((category, index) => (
            <FAQCategory key={index} {...category} />
          ))
        ) : (
          <div className="text-center text-white mt-12">
            <p className="text-lg">No questions found matching your search.</p>
            <button
              onClick={handleNotFoundQuestion}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
            >
              Submit Question
            </button>
            {notFoundMessage && <p className="mt-2">{notFoundMessage}</p>}
          </div>
        )}
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
