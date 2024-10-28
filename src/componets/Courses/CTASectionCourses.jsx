import React, { useState } from 'react';
import { Rocket, ArrowRight, CheckCircle, X, Calendar, Clock, User } from 'lucide-react';

const CTASectionCourses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const benefits = [
    "Guaranteed Internship Opportunities",
    "Industry-Recognized Certification",
    "1:1 Career Counseling",
    "Lifetime Access to Course Content"
  ];

  const ScheduleModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-md transform transition-all animate-slideUp">
          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Decorative header background */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 opacity-10" />

            {/* Header */}
            <div className="relative px-6 pt-6 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Create Schedule</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Fill in the data below to add a schedule</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="px-6 pb-6 space-y-5">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Schedule Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Schedule Title
                </label>
                <select 
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none bg-white"
                  style={{ 
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">Select schedule type</option>
                  <option value="consultation">Consultation Call</option>
                  <option value="interview">Technical Interview</option>
                  <option value="followup">Follow-up Meeting</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date & Time
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Schedule Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Rest of the component remains the same...
  return (
    <section className="relative overflow-hidden">
      {/* Previous content remains the same */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Previous content remains the same */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Transform Your Future with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Industry-Ready Skills
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of successful graduates who have launched their tech careers through our comprehensive training programs.
            </p>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 text-gray-200"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-xl text-white border border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Schedule Consultation
              <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      <ScheduleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default CTASectionCourses;