// src/components/Workshop/WorkshopBenefits.jsx
import React from "react";
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
  Laptop,
} from "lucide-react";

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
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Workshop Benefits & Impact
          </h2>
          <p className="text-white max-w-2xl mx-auto">
            Delivering value to institutions, students, and faculty through
            industry-aligned technical training
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

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
          <button className="bg-gradient-to-br from-primary via-custom to-blue-600 active:scale-90 transition-all duration-300 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:via-custom hover:to-primary">
            Schedule a Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopBenefits;
