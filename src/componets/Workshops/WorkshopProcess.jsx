// src/components/Workshop/WorkshopProcess.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Calendar,
  Users,
  BookOpen,
  Award, // Changed from Certificate
  CheckCircle,
} from "lucide-react";

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
            <button className="bg-custom hover:bg-custom/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Schedule Consultation
            </button>
            <button className="border border-custom text-custom hover:bg-custom/5 px-6 py-3 rounded-lg font-semibold transition-colors">
              Download Workshop Guide
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkshopProcess;
