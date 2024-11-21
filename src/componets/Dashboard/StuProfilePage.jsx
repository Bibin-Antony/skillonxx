import React, { useEffect, useState } from 'react'
import { ArrowLeft, Mail, Phone, MapPin, Pencil, Briefcase, Calendar, User, Check, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../auth/AuthContext'
import { authService } from '../../services/authServices'
import userImg from '../../assets/user/avatar-1.svg'

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
  const variants = {
    primary: "border-transparent text-white bg-teal-500 hover:bg-teal-600",
    secondary: "border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700",
    danger: "border-transparent text-white bg-red-600 hover:bg-red-700",
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

export default function StuProfilePage() {
  const [userData, setUserData] = useState(null)
  const [editedData, setEditedData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [saveStatus, setSaveStatus] = useState(null) // 'success' or 'error'
  const navigate = useNavigate()
  const { auth } = useAuth()

  useEffect(() => {
    const stuId = auth.user._id
    const fetchStudentData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://skillonx-server.onrender.com/student/profile/${stuId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch student data')
        }
        const data = await response.json()
        setUserData(data.data)
        setEditedData(data.data) // Initialize editedData with current data
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStudentData()
  }, [auth.user._id])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData({ ...userData })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData(userData)
    setSaveStatus(null)
  }

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      // Handle nested objects (e.g., 'address.doorNumber')
      const [parent, child] = field.split('.')
      setEditedData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setEditedData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSaveChanges = async () => {
    const stuId = auth.user._id
    try {
      const updatedFields = {
        firstName: editedData.firstName,
        lastName: editedData.lastName,
        email: editedData.email,
        phone: editedData.phone,
        address: editedData.address
      }
      const response = await fetch(`https://skillonx-server.onrender.com/student/profile/${stuId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      })

      // if (!response.ok) {
      //   throw new Error('Failed to save changes')
      // }

      const updatedData = await response.json()

      // Preserve the original education details when updating the state
      setUserData({
        ...updatedData.data,
        universityName: userData.universityName,
        currentEducation: userData.currentEducation,
        passingYear: userData.passingYear
      })
      setIsEditing(false)
      setSaveStatus('success')

      setTimeout(() => setSaveStatus(null), 3000)
    } catch (err) {
      console.error('Error saving changes:', err)
      setSaveStatus('error')
      // Reset save status after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-900/50 text-red-300 border border-red-500 p-4 rounded-lg">
            Error: {error}
          </div>
        </div>
      </div>
    )
  }

  if (!userData) return null;

  const displayData = isEditing ? editedData : userData;

  return (
    <div className="min-h-screen pt-24 bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Link to="/student-dashboard" className="inline-flex items-center text-teal-500 hover:text-teal-400 mb-6 transition-colors duration-200">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>

        {saveStatus === 'success' && (
          <div className="mb-4 bg-teal-900/50 text-teal-300 border border-teal-500 p-4 rounded-lg">
            Profile updated successfully!
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="mb-4 bg-red-900/50 text-red-300 border border-red-500 p-4 rounded-lg">
            Failed to update profile. Please try again.
          </div>
        )}

        <motion.div variants={itemVariants} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700">
          <div className="relative pb-24 md:pb-32">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-gray-800"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end p-6">
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={displayData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-gray-700 text-gray-100 rounded px-2 py-1"
                    />
                    <input
                      type="text"
                      value={displayData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-gray-700 text-gray-100 rounded px-2 py-1 ml-2"
                    />
                  </div>
                ) : (
                  <h1 className="text-2xl font-bold text-gray-100 mb-2">
                    {displayData.firstName} {displayData.lastName}
                  </h1>
                )}
                <p className="text-gray-300">Student</p>
              </div>
              <img
                src={userImg}
                alt={displayData.firstName}
                className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-lg mt-4 md:mt-0"
              />
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-5 w-5 text-teal-500" />
                {isEditing ? (
                  <input
                    type="email"
                    value={displayData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-gray-700 text-gray-100 rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span className="text-gray-300">{displayData.email}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-5 w-5 text-teal-500" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={displayData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-gray-700 text-gray-100 rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span className="text-gray-300">{displayData.phone}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm sm:col-span-2">
                <MapPin className="h-5 w-5 text-teal-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={displayData.address.doorNumber}
                    onChange={(e) => handleInputChange('address.doorNumber', e.target.value)}
                    className="bg-gray-700 text-gray-100 rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span className="text-gray-300">{displayData.address.doorNumber}</span>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-lg font-semibold mb-2 flex items-center text-gray-100">
                <Briefcase className="h-5 w-5 mr-2 text-teal-500" />
                Education Details
              </h2>
              <div className="bg-gray-900 p-4 rounded-md shadow-sm border border-gray-700">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-100">
                      <Briefcase className="h-5 w-5 mr-2 text-teal-500" />
                      {displayData.universityName}
                    </h3>
                    <div className="font-medium text-gray-300">
                      {displayData.currentEducation}
                    </div>
                    <div className="text-sm text-gray-400 flex items-center mt-1">
                      <Calendar className="h-4 w-4 mr-1 text-teal-500" />
                      Passing Year: {displayData.passingYear}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="px-6 py-4 bg-gray-900 border-t border-gray-700 flex justify-end space-x-2">
            {isEditing ? (
              <>
                <Button variant="danger" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={handleEdit}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}