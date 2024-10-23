import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Calendar,
  Mail,
  Briefcase,
  PhoneCall
} from 'lucide-react';

const CTASection = () => {
  const ctaCards = [
    {
      title: "Apply Now",
      description: "Start your journey with SkillonX internships",
      icon: Briefcase,
      buttonText: "Submit Application",
      color: "blue",
      delay: 0
    },
    {
      title: "Download Guide",
      description: "Get our comprehensive internship handbook",
      icon: Download,
      buttonText: "Get Free Guide",
      color: "indigo",
      delay: 0.1
    },
    {
      title: "Schedule Assessment",
      description: "Book your technical skill assessment",
      icon: Calendar,
      buttonText: "Book Slot",
      color: "purple",
      delay: 0.2
    }
  ];

  const contactOptions = [
    {
      icon: Mail,
      text: "hr@skillonx.com",
      link: "mailto:recruitment@skillonx.com"
    },
    {
      icon: PhoneCall,
      text: "+91 9876543210",
      link: "tel:+919876543210"
    }
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Main CTA Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {ctaCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay }}
              className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-lg bg-${card.color}-500/20 flex items-center justify-center mb-4`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-300 mb-6">{card.description}</p>
              <button
                className={`w-full py-3 px-4 bg-${card.color}-600 hover:bg-${card.color}-700 rounded-lg flex items-center justify-center gap-2 transition-colors`}
              >
                {card.buttonText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Looking to Partner with Us?</h3>
              <p className="text-blue-100">Join our network of companies and access top talent</p>
            </div>
            <button className="whitespace-nowrap px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
              Request Partnership
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6">Need Help? Contact Us</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {contactOptions.map((option, index) => (
              <motion.a
                key={option.text}
                href={option.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
              >
                <option.icon className="w-5 h-5" />
                {option.text}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Career Counseling Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Not Sure Which Path to Choose?</h3>
          <p className="text-purple-100 mb-6">Book a free career counseling session with our experts</p>
          <button className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors inline-flex items-center gap-2">
            Book Career Counseling
            <Calendar className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;