import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  MessageCircle,
  Calendar,
  HeadphonesIcon,
  ArrowRight
} from 'lucide-react';

const ContactHero = () => {
  const quickContacts = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+91 9876543210",
      subInfo: "Mon-Sat, 9:00 AM - 6:00 PM",
      action: "Call Now",
      link: "tel:+919876543210",
      color: "blue"
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "info@skillonx.com",
      subInfo: "We reply within 24 hours",
      action: "Send Email",
      link: "mailto:info@skillonx.com",
      color: "indigo"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "Bogadi, Mysore",
      subInfo: "Karnataka, India",
      action: "Get Directions",
      link: "#directions",
      color: "purple"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      info: "Chat with Support",
      subInfo: "Available 24/7",
      action: "Start Chat",
      link: "#chat",
      color: "rose"
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-[80vh] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Hero Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
          >
            <HeadphonesIcon className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm">24/7 Support Available</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Get in Touch with Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto mb-8"
          >
            Have questions? We're here to help. Contact our team for inquiries about courses, 
            workshops, or career opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2 transition-colors">
              Book Consultation
              <Calendar className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center gap-2 transition-colors backdrop-blur">
              Request Callback
              <Phone className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickContacts.map((contact, index) => (
            <motion.a
              key={contact.title}
              href={contact.link}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-${contact.color}-500/20`}>
                  <contact.icon className={`w-6 h-6 text-${contact.color}-400`} />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">{contact.title}</h3>
                  <p className="text-white font-medium mb-1">{contact.info}</p>
                  <p className="text-gray-400 text-sm mb-4">{contact.subInfo}</p>
                  <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="text-sm font-medium">{contact.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactHero;