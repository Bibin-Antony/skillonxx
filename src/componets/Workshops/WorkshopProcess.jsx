// src/components/Workshop/WorkshopProcess.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { MessageSquare, Calendar, Users, BookOpen, Award, CheckCircle, X, Mail, Phone, User } from "lucide-react";

import Lottie from 'lottie-react';
import wait from '../../assets/lottiejson/wait.json'
import complete from '../../assets/lottiejson/complete.json'
const ConsultationModal = ({ isVisible, onClose }) => {
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
    const devUral = "http://localhost:5000"

    const consultationData = { name, email, phone, type };

    try {
      let res = await axios.post("https://skillonx-server.onrender.com/workshop/consultation", consultationData);
      // console.log("form submitted", res.data)
      setFormState("success")
      setTimeout(() => {
        setFormState("idle")
        onClose();
      }, 2000)
    } catch (error) {
      // console.error("Error scheduling consultation:", error);
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


const ProcessStep = ({ icon: Icon, title, description, step, isLast }) => {
  return (
    <div className="relative flex items-start gap-4 md:gap-6">
      {/* Step Number and Line */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-custom text-white flex items-center justify-center text-xl font-bold">
          {step}
        </div>
        {!isLast && (
          <div className="w-px h-full bg-primary/20 absolute top-12 left-6 -translate-x-1/2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="w-6 h-6 text-custom" />
          <h3 className="text-xl font-bold text-font">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const WorkshopProcess = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const steps = [
    {
      icon: MessageSquare,
      title: "Initial Consultation",
      description:
        "Schedule a call with our team to discuss your institution's specific needs, student profile, and desired outcomes.",
    },
    {
      icon: Calendar,
      title: "Workshop Planning",
      description:
        "Choose workshop dates, customize content based on your requirements, and finalize the delivery mode (on-campus/online/hybrid).",
    },
    {
      icon: Users,
      title: "Batch Organization",
      description:
        "Organize student batches, setup necessary infrastructure, and receive pre-workshop materials.",
    },
    {
      icon: BookOpen,
      title: "Workshop Delivery",
      description:
        "Expert-led interactive sessions with hands-on projects, real-time doubt clearing, and progress tracking.",
    },
    {
      icon: Award, // Changed from Certificate
      title: "Assessment & Certification",
      description:
        "Student evaluation, performance reports, and certificates of completion for participants.",
    },
    {
      icon: CheckCircle,
      title: "Post-Workshop Support",
      description:
        "Access to workshop materials, follow-up sessions, and continued support for student projects.",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-font mb-4">
            How Our Workshops Work
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simple, structured process to bring industry-standard technical
            training to your institution
          </p>
        </div>

        {/* Process Steps */}
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <ProcessStep
                icon={step.icon}
                title={step.title}
                description={step.description}
                step={index + 1}
                isLast={index === steps.length - 1}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <h3 className="text-xl font-bold text-font mb-4">
            Ready to bring expert-led workshops to your institution?
          </h3>
          <div className="flex justify-center gap-4">
            <button className="bg-custom hover:bg-custom/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors" onClick={() => setModalVisible(true)}>
              Schedule Consultation
            </button>
            <button className="border border-custom text-custom hover:bg-custom/5 px-6 py-3 rounded-lg font-semibold transition-colors">
              Download Workshop Guide
            </button>
          </div>
        </motion.div>
      </div>
      <ConsultationModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default WorkshopProcess;
