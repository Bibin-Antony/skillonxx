// components/NotificationSystem.js
import React, { useState, useEffect } from 'react';
import { Bell, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../auth/AuthContext';
import { authService } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
const NotificationModal = ({ isOpen, onClose, notifications, onClearAll }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end">
      <div className="bg-white w-full max-w-md h-screen">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Workshop Registrations</h2>
          <div className="flex gap-2">
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            )}
            <button onClick={onClose}>
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-64px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-gray-500">
              <Bell className="h-12 w-12 mb-2 opacity-50" />
              <p>No new registrations</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notif, index) => (
                <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{notif.studentName}</p>
                      <p className="text-sm text-gray-600">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(auth.user._id)
    // Fetch notifications when component mounts
    fetchNotifications();
  }, []);
  const uniId = auth.user._id
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`https://skillonx-server.onrender.com/university/workshop-registrations/${uniId}`, {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data.registrations);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await fetch(`https://skillonx-server.onrender.com/university/clear-notifications/${uniId}`, {
        method: 'POST',
        credentials: 'include'
      });
      setNotifications([]);
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-gray-900"
      >
        <Bell className="h-6 w-6" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
      <NotificationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        notifications={notifications}
        onClearAll={clearAllNotifications}
      />
    </>
  );
};

export default NotificationButton;