import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  Users,
  FileQuestion,
  Building2,
  Briefcase,
  GraduationCap,
  Send,
  ArrowRight
} from 'lucide-react';

const QuickContactOptions = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departments = [
    {
      id: 'admissions',
      icon: GraduationCap,
      name: "Admissions",
      phone: "+91 98765-43210",
      email: "admissions@skillonx.com",
      availability: "Mon-Sat: 9 AM - 6 PM",
      queries: ["Course Information", "Admission Process", "Fee Structure", "Documentation"]
    },
    {
      id: 'training',
      icon: Users,
      name: "Training",
      phone: "+91 98765-43211",
      email: "training@skillonx.com",
      availability: "Mon-Sat: 8 AM - 8 PM",
      queries: ["Ongoing Courses", "Workshop Schedule", "Training Material", "Faculty Connect"]
    },
    {
      id: 'placements',
      icon: Briefcase,
      name: "Placements",
      phone: "+91 98765-43212",
      email: "placements@skillonx.com",
      availability: "Mon-Fri: 10 AM - 5 PM",
      queries: ["Internship Opportunities", "Job Openings", "Interview Preparation", "Company Tie-ups"]
    },
    {
      id: 'support',
      icon: MessageCircle,
      name: "Technical Support",
      phone: "+91 98765-43213",
      email: "support@skillonx.com",
      availability: "24/7 Support",
      queries: ["Technical Issues", "Portal Access", "Resource Access", "General Help"]
    }
  ];

  const quickActions = [
    {
      icon: Calendar,
      title: "Schedule a Visit",
      description: "Book a campus tour or counseling session",
      action: "Book Now",
      color: "blue"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Connect with our support team instantly",
      action: "Start Chat",
      color: "green"
    },
    {
      icon: FileQuestion,
      title: "Request Info",
      description: "Get detailed information package",
      action: "Request",
      color: "purple"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Quick Connect Options
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Choose your preferred way to reach us. We're here to help!
          </motion.p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer`}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-${action.color}-100 group-hover:bg-${action.color}-200 transition-colors`}>
                    <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </div>
                </div>
                <button className={`w-full py-3 bg-${action.color}-50 text-${action.color}-600 rounded-lg group-hover:bg-${action.color}-100 transition-colors flex items-center justify-center gap-2`}>
                  {action.action}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Department Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer
                ${selectedDepartment === dept.id ? 'ring-2 ring-blue-500' : ''}
              `}
              onClick={() => setSelectedDepartment(selectedDepartment === dept.id ? null : dept.id)}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-blue-50">
                    <dept.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">{dept.name}</h3>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{dept.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{dept.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{dept.availability}</span>
                  </div>
                </div>

                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: selectedDepartment === dept.id ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Common Queries:</h4>
                    <ul className="space-y-2">
                      {dept.queries.map((query, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <ArrowRight className="w-4 h-4 text-blue-500" />
                          <span>{query}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                <button className="w-full mt-4 py-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  Contact {dept.name}
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickContactOptions;