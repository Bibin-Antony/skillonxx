import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap, Target, Users, Building, Briefcase,
  Code, BookOpen, Award, Calendar, Laptop, MessageSquare,
  CheckCircle, X, Mail, Phone, User, ArrowRight
} from "lucide-react";
import axios from "axios";

import Lottie from 'lottie-react';
import wait from '../../assets/lottiejson/wait.json'
import complete from '../../assets/lottiejson/complete.json'
// Modal component remains same as before
const WorkShopBenefitModal = ({ isVisible, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [formState, setFormState] = useState("idle")
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setType("");
    setError("");
    setFormState("idle");
  };
  useEffect(() => {
    if (!isVisible) {
      resetForm();
    }
  }, [isVisible]);
  if (!isVisible) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !type) {
      setError("Please fill out all required fields.");
      return;
    }
    setFormState("submitting")
    const consultationData = { name, email, phone, type };
    const devUrl = "https://skillonx-server.onrender.com"
    try {
      let res = await axios.post("https://skillonx-server.onrender.com/workshop/consultation", consultationData);
      console.log("form submitted", res.data)
      setFormState("success")
      setTimeout(() => {
        setFormState("idle")
        onClose();
      }, 2000)
    } catch (error) {
      console.error("Error scheduling consultation:", error);
      setError("An error occurred. Please try again.");
      setFormState("idle")
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md transform transition-all animate-slideUp">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 opacity-10" />
          {formState === "submitting" && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50 rounded-2xl">
              <div className="w-48 h-48 flex items-center justify-center">
                <Lottie
                  animationData={wait}
                  loop
                  className="w-full h-full"
                />
              </div>
              <p className="text-lg font-medium text-gray-700 mt-4">Submitting your enrollment...</p>
            </div>
          )}

          {formState === "success" && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50 rounded-2xl">
              <div className="w-48 h-48 flex items-center justify-center">
                <Lottie
                  animationData={complete}
                  loop={false}
                  className="w-full h-full"
                />
              </div>
              <p className="text-lg font-medium text-gray-700 mt-4">Your enrollment was successful!</p>
            </div>
          )}
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

          <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <div className="relative">
                <User className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="text" required placeholder="Enter your name" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="email" placeholder="Enter your email" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="relative">
                <Phone className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Are you an Individual or Organization?</label>
              <select className="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white" value={type}
                onChange={(e) => setType(e.target.value)}>
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

const BenefitCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl transform group-hover:scale-105 transition-all duration-300" />
      <div className="relative bg-blue-950/40 backdrop-blur-sm border border-blue-800/30 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl" />

        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
            {title}
          </h3>

          <p className="text-blue-100/70">
            {description}
          </p>

          <div className="mt-6 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm font-semibold">Learn more</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ value, label, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl transform group-hover:scale-105 transition-all duration-300" />
      <div className="relative bg-blue-950/40 backdrop-blur-sm border border-blue-800/30 p-6 rounded-xl text-center">
        <h4 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
          {value}
        </h4>
        <p className="text-blue-100/70 font-medium">{label}</p>
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ children, subtitle }) => (
  <div className="relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
    <h3 className="relative text-2xl font-bold text-white mb-2 text-center">
      {children}
    </h3>
    {subtitle && (
      <p className="text-blue-100/70 text-center max-w-lg mx-auto text-sm">
        {subtitle}
      </p>
    )}
  </div>
);

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



  return (
    <div className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 md:max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-sm">
            Benefits & Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Transforming Education Through
            <span className="block mt-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Industry-Ready Training
            </span>
          </h2>
          <p className="text-blue-100/70 max-w-2xl mx-auto text-lg">
            Empowering institutions, students, and faculty with cutting-edge technical education
          </p>
        </motion.div>



        {/* Benefits Grid */}
        <div className="space-y-24">
          {/* For Institutions */}
          <div>
            <SectionTitle subtitle="Enhance your academic offerings and improve student outcomes">
              For Institutions
            </SectionTitle>
            <div className="grid md:grid-cols-3 gap-6 mt-12 cursor-pointer">
              {benefits.institution.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} index={index} />
              ))}
            </div>
          </div>

          {/* For Students */}
          <div>
            <SectionTitle subtitle="Build practical skills and prepare for your career">
              For Students
            </SectionTitle>
            <div className="grid md:grid-cols-3 gap-6 mt-12 cursor-pointer">
              {benefits.students.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} index={index} />
              ))}
            </div>
          </div>

          {/* For Faculty */}
          <div>
            <SectionTitle subtitle="Stay updated with industry trends and enhance teaching methods">
              For Faculty
            </SectionTitle>
            <div className="grid md:grid-cols-3 gap-6 mt-12 cursor-pointer">
              {benefits.faculty.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 blur-xl opacity-30" />
            <button
              onClick={() => setModalVisible(true)}
              className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl font-semibold text-white hover:shadow-xl hover:shadow-blue-500/20 transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Schedule a Free Consultation
            </button>
          </div>
        </motion.div>
      </div>

      <WorkShopBenefitModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default WorkshopBenefits;