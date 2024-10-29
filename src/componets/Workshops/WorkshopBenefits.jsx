// src/components/Workshop/WorkshopBenefits.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Target,
  Users,
  Building,
  Briefcase,
  Code,
  BookOpen,
  Award,
  Calendar,
  Laptop,
  MessageSquare, CheckCircle, X, Mail, Phone, User
} from "lucide-react";
const WorkShopBenefitModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md transform transition-all animate-slideUp">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 opacity-10" />

          <div className="relative px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Schedule Consultation</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Fill in your details to book a consultation</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          <form className="px-6 pb-6 space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="relative">
                <User className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="text" required placeholder="Enter your name" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="email" required placeholder="Enter your email" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="relative">
                <Phone className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="tel" required placeholder="Enter your phone number" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Are you an Individual or Organization?</label>
              <select className="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white" required>
                <option value="">Select an option</option>
                <option>Individual</option>
                <option>Organization</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Book Schedule
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const BenefitCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-custom" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const StatCard = ({ value, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h4 className="text-4xl font-bold text-white mb-2">{value}</h4>
      <p className="text-white">{label}</p>
    </motion.div>
  );
};

const WorkshopBenefits = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const benefits = {
    institution: [
      {
        icon: Building,
        title: "Enhanced Academic Offerings",
        description:
          "Complement your curriculum with industry-relevant technical workshops",
      },
      {
        icon: Users,
        title: "Industry Connections",
        description:
          "Build relationships with tech companies through our partner network",
      },
      {
        icon: Award,
        title: "Improved Placement Records",
        description:
          "Better prepare students for job market with practical skills",
      },
    ],
    students: [
      {
        icon: Code,
        title: "Hands-on Experience",
        description:
          "Work on real projects using industry-standard tools and technologies",
      },
      {
        icon: Briefcase,
        title: "Career Readiness",
        description: "Gain skills that employers are actively looking for",
      },
      {
        icon: Laptop,
        title: "Project Portfolio",
        description:
          "Build impressive projects to showcase to potential employers",
      },
    ],
    faculty: [
      {
        icon: BookOpen,
        title: "Professional Development",
        description:
          "Stay updated with latest industry trends and technologies",
      },
      {
        icon: Target,
        title: "Teaching Resources",
        description: "Access modern teaching materials and methodologies",
      },
      {
        icon: GraduationCap,
        title: "Industry Alignment",
        description:
          "Bridge the gap between academia and industry requirements",
      },
    ],
  };

  const stats = [
    { value: "20+", label: "Partner Institutions" },
    { value: "50+", label: "Workshops Conducted" },
    { value: "5000+", label: "Students Trained" },
    { value: "90%", label: "Positive Feedback" },
  ];

  return (
    <div className="bg-tertiary py-16 bg-gradient-to-br from-primary via-custom to-secondary">
      <div className="container mx-auto px-4 md:w-[1300px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Workshop Benefits & Impact
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Delivering value to institutions, students, and faculty through
            industry-aligned technical training
          </p>
          Transform Your Students with Industry-Ready Skills
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div> */}

        {/* Benefits Grid */}
        <div className="space-y-16">
          {/* For Institutions */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              For Institutions
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.institution.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              For Students
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.students.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </div>

          {/* For Faculty */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              For Faculty
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.faculty.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Transform Your Institution's Technical Training
          </h3>
          <button className="bg-gradient-to-br from-primary via-custom to-blue-600 active:scale-90 transition-all duration-300 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:via-custom hover:to-primary" onClick={() => setModalVisible(true)}>
            Schedule a Free Consultation
          </button>
        </div>
      </div>
      <WorkShopBenefitModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default WorkshopBenefits;
