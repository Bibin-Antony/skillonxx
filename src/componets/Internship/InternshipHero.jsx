import React, { useState } from "react";
import { motion } from 'framer-motion';
import {
  Rocket,
  Users,
  Building,
  Target,
  ArrowRight,
  CheckCircle,
  MapPin,
  MessageSquare, X, Mail, Phone, User,
  Calendar

} from 'lucide-react';
import axios from "axios";
import Lottie from 'lottie-react';
import wait from '../../assets/lottiejson/wait.json'
import complete from '../../assets/lottiejson/complete.json'
const InternShipModal = ({ isVisible, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formState, setFormState] = useState("idle")
  // const [type, setType] = useState("");
  const [error, setError] = useState("");
  if (!isVisible) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError("Please fill out all required fields.");
      return;
    }
    setFormState("submitting")
    const consultationData = { name, email, phone };
    const prodUrl = "https://skillonx-server.onrender.com"
    const devUrl = "https://skillonx-server.onrender.com"
    try {
      let res = await axios.post(`${prodUrl}/workshop/consultation`, consultationData);
      console.log("form submitted", res.data)
      setFormState("success")
      setTimeout(() => {
        setFormState("idle")
        onClose()
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
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50">
              <div className="w-48 h-48">
                <Lottie animationData={wait} loop />
              </div>
              <p className="text-lg font-medium text-gray-700 mt-4">Submitting your enrollment...</p>
            </div>
          )}
          {formState === "success" && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center
            z-50">
              <div className="w-48 h-48">
                <Lottie animationData={complete} loop={false} />
              </div>
              <p className="text-lg font-medium text-gray-700 mt-4">Your enrollment was
                successful!</p>
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
                <input type="email" required placeholder="Enter your email" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <div className="relative">
                <Phone className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="tel" required placeholder="Enter your phone number" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={phone}
                  onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>



            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Schedule Counselling
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
const TrackCard = ({ title, description, features, buttonText, isReversed }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-xl"
    >
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-300">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const StatBox = ({ icon: Icon, value, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
    >
      <div className="flex justify-center mb-4">
        <span className="p-2 rounded-lg bg-blue-500/20">
          <Icon className="w-6 h-6 text-blue-400" />
        </span>
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </motion.div>
  );
};

const InternshipHero = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Interns Placed"
    },
    {
      icon: Building,
      value: "50+",
      label: "Partner Companies"
    },
    {
      icon: Target,
      value: "90%",
      label: "Conversion Rate"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 min-h-[80vh]">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px]" />

      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
          {/* Location Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-blue-400 mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span>Launch Your Career with SkillonX</span>
          </motion.div>

          {/* Main Content */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Turn Your Skills Into<br />
              <span className="text-blue-400">A Successful Career</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 text-lg max-w-2xl mx-auto mb-16"
            >
              Choose your path to success with our industry-recognized internship programs
            </motion.p>


          </div>

          {/* Internship Tracks */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <TrackCard
              title="Post-Course Internship Track"
              description="Complete our skill development courses and get guaranteed internship placement"
              features={[
                "3-6 months internship duration",
                "Industry expert mentorship",
                "Real project experience",
                "Job placement assistance",
                "Performance-based conversion"
              ]}
              buttonText="Explore Courses & Internships"
            />

            <TrackCard
              title="Direct Internship Track"
              description="Already have the skills? Apply directly to our internship positions"
              features={[
                "Immediate project assignments",
                "Competitive stipend",
                "Flexible work hours",
                "Skill assessment based selection",
                "Fast-track career growth"
              ]}
              buttonText="Apply for Internship"
              isReversed
            />
          </div>

          {/* Bottom Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl mx-auto text-center"
          >
            <p className="text-gray-300 text-lg mb-4">
              Not sure which track to choose? Let our career counselors guide you!
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors" onClick={() => setModalVisible(true)}>
              Schedule Free Counseling
            </button>
          </motion.div>
        </div>
      </div>
      <InternShipModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />

    </div>
  );
};

export default InternshipHero;