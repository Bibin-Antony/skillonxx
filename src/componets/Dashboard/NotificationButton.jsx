import React, { useState, useEffect } from 'react';
import { Bell, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../auth/AuthContext';
import { authService } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const NotificationModal = ({ isOpen, onClose, notifications, onClearAll }) => {
  if (!isOpen) return null;

  const modalVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="bg-gray-900 w-full max-w-md h-screen border-l border-gray-700"
        >
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-100">Workshop Registrations</h2>
            <div className="flex gap-2 items-center">
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-300" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-64px)] hide-scrollbar">
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center p-8 text-gray-400"
              >
                <Bell className="h-12 w-12 mb-2 opacity-50" />
                <p>No new registrations</p>
              </motion.div>
            ) : (
              <div className="divide-y divide-gray-700">
                {notifications.map((notif, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-teal-900/50 flex items-center justify-center border border-teal-700">
                        <User className="h-6 w-6 text-teal-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-200">{notif.studentName}</p>
                        <p className="text-sm text-gray-400">
                          registered for workshop: {notif.workshopTitle}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notif.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Style for hiding scrollbar */}
      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const uniId = auth.user._id;
  const token = localStorage.getItem('token');
  // console.log(uniId)
  useEffect(() => {
    if (uniId) {
      fetchNotifications();
    }
  }, [uniId]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `https://skillonx-server.onrender.com/university/workshop-registrations/${uniId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.registrations) {
        setNotifications(response.data.registrations);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error.response || error);
      // Optionally handle 401 unauthorized
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  const clearAllNotifications = async () => {
    try {
      await axios.post(
        `https://skillonx-server.onrender.com/university/clear-notifications/${uniId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error.response || error);
      // Optionally handle 401 unauthorized

    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-300 hover:text-gray-100 transition-colors"
      >
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
          >
            {notifications.length}
          </motion.span>
        )}
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <NotificationModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            notifications={notifications}
            onClearAll={clearAllNotifications}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NotificationButton;