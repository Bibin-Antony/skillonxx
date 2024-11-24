import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, MapPin, Pencil, GraduationCap, Calendar, Building2, Trophy, Users, BookOpen, X, Save, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../auth/AuthContext';
import userImg from '../../assets/user/avatar-1.svg'
const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
  const variants = {
    primary: "border-transparent text-white bg-teal-500 hover:bg-teal-600",
    secondary: "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700",
  }

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ label, value, onChange, ...props }) => (
  <input
    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
    value={value}
    onChange={onChange}
    {...props}
  />
);
const Notification = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-emerald-900/90' : 'bg-red-900/90';
  const borderColor = type === 'success' ? 'border-emerald-500' : 'border-red-500';
  const Icon = type === 'success' ? CheckCircle2 : AlertCircle;

  return (
    <div className="fixed top-4 right-4 z-50 animate-[slideIn_0.3s_ease-out]">
      <div className={`${bgColor} border ${borderColor} rounded-lg shadow-lg p-4 text-white max-w-md backdrop-blur-sm`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Icon size={18} className={type === 'success' ? 'text-emerald-400' : 'text-red-400'} />
            <p className="text-sm flex-1">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default function UniProfilePage() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [profileData, setProfileData] = useState({
    universityName: '',
    recognizedBy: '',
    universityAddress: '',

  });
  useEffect(() => {
    fetchProfileData();
  }, []);
  const uniId = auth.user._id
  const notificationStyles = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  const showNotification = (type, message) => {
    setNotification({ type, message });
    // Auto-hide notification after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`https://skillonx-server.onrender.com/university/profile/${uniId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setProfileData({
        universityName: data.universityName,
        recognizedBy: data.recognizedBy,
        universityAddress: data.universityAddress,
        email: data.email
      });
    } catch (error) {
      // console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);

      // Basic validation
      if (!profileData.universityName || !profileData.universityAddress || !profileData.recognizedBy) {
        throw new Error('All fields are required');
      }

      // Validate email format


      const response = await fetch(`https://skillonx-server.onrender.com/university/profile/${auth.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(profileData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedData = await response.json();
      setProfileData(updatedData);
      setIsEditing(false);
      showNotification('success', 'Profile updated successfully!');
    } catch (error) {
      showNotification('error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    fetchProfileData(); // Reset to original data from server
    setIsEditing(false);
    setError(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <style>{notificationStyles}</style>
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Link
          to="/university-dashboard"
          className="inline-flex items-center text-teal-500 hover:text-teal-400 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>

        <motion.div
          variants={itemVariants}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700"
        >
          <div className="relative pb-24 md:pb-32">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-gray-800"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end p-6">
              <div>
                {isEditing ? (
                  <Input
                    name="universityName"
                    value={profileData.universityName}
                    onChange={handleInputChange}
                    className="text-2xl font-bold mb-2"
                    placeholder="University Name"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-100 mb-2">{profileData.universityName}</h1>
                )}
                <p className="text-gray-300">Higher Education Institution</p>
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-lg mt-4 md:mt-0 bg-gray-600 flex items-center justify-center text-gray-300">
                <img src={userImg} alt="" />
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">


              {/* Contact Information */}
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-5 w-5 text-teal-500" />
                <span className="text-gray-300">{auth.user.email}</span>

              </div>

              {/* Address */}
              <div className="flex items-center space-x-2 text-sm sm:col-span-2">
                <MapPin className="h-5 w-5 text-teal-500" />
                {isEditing ? (
                  <Input
                    name="universityAddress"
                    value={profileData.universityAddress}
                    onChange={handleInputChange}
                    placeholder="Address"
                  />
                ) : (
                  <span className="text-gray-300">{profileData.universityAddress}</span>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-100">
                <BookOpen className="h-5 w-5 mr-2 text-teal-500" />
                University Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-teal-400">{auth.user.students.length}</div>
                  <div className="text-sm text-gray-400">Students</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-teal-400">{auth.user.workshops.length}</div>
                  <div className="text-sm text-gray-400">Workshops</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-teal-400">{auth.user.assessments.length}</div>
                  <div className="text-sm text-gray-400">Assessments</div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-teal-400">{auth.user.workshopRegistrations.length}</div>
                  <div className="text-sm text-gray-400">Workshop Registrations</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-100">
                <Trophy className="h-5 w-5 mr-2 text-teal-500" />
                Recognition
              </h2>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                {isEditing ? (
                  <Input
                    name="recognizedBy"
                    value={profileData.recognizedBy}
                    onChange={handleInputChange}
                    placeholder="Recognition Body"
                  />
                ) : (
                  <span className="text-gray-300">Recognized by: {profileData.recognizedBy}</span>
                )}
              </div>
            </motion.div>
            {error && (
              <div className="text-red-500 text-sm mt-2">
                {error}
              </div>
            )}
            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-100">
                <Calendar className="h-5 w-5 mr-2 text-teal-500" />
                Account Information
              </h2>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-2">
                <div className="text-sm text-gray-400">
                  Created: {new Date(auth.user.createdAt).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-400">
                  Last Updated: {new Date(auth.user.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="px-6 py-4 bg-gray-900 border-t border-gray-700 flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}