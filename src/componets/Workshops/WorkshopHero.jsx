import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Code, MessageSquare, Users, GraduationCap, X, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios'

import Lottie from 'lottie-react';
import wait from '../../assets/lottiejson/wait.json'
import complete from '../../assets/lottiejson/complete.json'
// Workshop Enrollment Modal Component remains unchanged
const WorkshopEnrollmentModal = ({ isVisible, onClose }) => {
  const [university, setUniversity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workshopType, setWorkshopType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [error, setError] = useState("");
  const [formState,setFormState] = useState("idle")
  const resetForm = () => {
    setUniversity("");
    setEmail("");
    setPhone("");
    
    setWorkshopType("");
    setPreferredDate("");
    setBatchSize("");

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

    if (!university || !email || !phone || !workshopType || !preferredDate || !batchSize) {
      setError("All fields are required");
      return;
    }
    setFormState("submitting")
    const enrollmentData = {
      university,
      email,
      phone,
      workshopType,
      preferredDate,
      batchSize,
    };
    const prodUrl = "https://skillonx-website.onrender.com"
    const devUrl = "http://localhost:5000"
    try {
      const response = await axios.post("https://skillonx-website.onrender.com/workshop", enrollmentData);
      console.log("Workshop Enrollment Successful:", response.data);
      setFormState("success")
      setTimeout(()=>{
        setFormState("idle")
        onClose();
      },2000)
    } catch (error) {
      console.error("Error enrolling in workshop:", error);
      setError("An error occurred while enrolling. Please try again.");
      setFormState("idle")
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md transform transition-all animate-slideUp">
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 opacity-10" />
          {formState==="submitting"&&(
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-50">
            <div className="w-48 h-48">
              <Lottie animationData={wait} loop />
            </div>
            <p className="text-lg font-medium text-gray-700 mt-4">Submitting your enrollment...</p>
          </div>
          )}
          {formState==="success"&&(
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
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Schedule a Workshop Enrollment</h3>
                  <p className="text-sm text-gray-500 mt-0.5">Fill in your details to enroll</p>
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
              <label className="block text-sm font-medium text-gray-700">University/Organization</label>
              <div className="relative">
                <User className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="text" required placeholder="Enter name" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={university}
                  onChange={(e) => { setUniversity(e.target.value); setError(""); }} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="email" required placeholder="Enter your email" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute inset-y-0 left-0 top-2 h-8 w-8 text-gray-400 pl-3 pointer-events-none" />
                <input type="tel" required placeholder="Enter your phone number" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(""); }} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Type of Workshop</label>
              <select className="w-full pl-4 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white"  value={workshopType}
                onChange={(e) => { setWorkshopType(e.target.value); setError(""); }}
               >
                <option value="">Select a workshop</option>
                <option>Web Development</option>
                <option>React.js</option>
                <option>Frontend Development</option>
                <option>UI/UX Design</option>
                <option>English Communication</option>
                <option>Technical Writing</option>
                <option>Career Development</option>
                <option>Git & Version Control</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
              <input type="date" className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={preferredDate}
                onChange={(e) => { setPreferredDate(e.target.value); setError(""); }} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Batch Size</label>
              <input type="number" required placeholder="Enter batch size" className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" value={batchSize}
                onChange={(e) => { setBatchSize(e.target.value); setError(""); }} />
            </div>

            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                Schedule Workshop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Hero Component
const WorkshopHero = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const workshopTypes = [
    {
      icon: Code,
      title: "Technical Workshops",
      description: "Front-end, React.js, python and other technologies",
      duration: "1-3 Days",
    },
    {
      icon: MessageSquare,
      title: "Language & Communication Workshops",
      description: "Communication skills and language proficiency",
      duration: "2-5 Days",
    },
    {
      icon: Users,
      title: "Career Development Workshops",
      description: "Tailored to your institution's needs",
      duration: "Flexible",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-950 to-blue-900 pt-5 md:pt-16 md:max-h-[85vh]">
      <div className="relative max-w-[85vw] mx-auto px-4 py-16">
        {/* For Colleges & Universities Tag */}
        \

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
            <div className="flex items-center gap-2 text-blue-300 ">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">For Colleges & Universities</span>
        </div>
              <motion.h1 className="text-xl md:text-5xl font-bold text-white leading-tight">
                Transform Your Students with{" "}
                <span className="block text-blue-400">Industry-Ready Skills</span>
              </motion.h1>
              <motion.p className="md:text-lg text-gray-300">
                Expert-led workshops in Web Development, English Communication, and more. Custom-designed for your institution's needs.
              </motion.p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setModalVisible(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white  px-6 py-3 rounded-lg transition-colors"
              >
                Schedule a Workshop
              </button>
              <button className="bg-blue-800/30 hover:bg-blue-800/50 text-white px-6 py-3 rounded-lg transition-colors">
                View Workshop Details
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {workshopTypes.map((workshop, index) => (
              <div key={index} className="bg-blue-800/20 hover:bg-blue-800/30 p-6 rounded-2xl transition-all">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <workshop.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{workshop.title}</h3>
                    <p className="text-gray-300">{workshop.description}</p>
                    <span className="inline-block text-sm bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                      {workshop.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WorkshopEnrollmentModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} />
    </div>
  );
};

export default WorkshopHero;