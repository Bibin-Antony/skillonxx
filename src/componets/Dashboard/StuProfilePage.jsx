import React, { useEffect, useState } from 'react'
import { ArrowLeft, Mail, Phone, MapPin, Pencil, Briefcase, Calendar, User, Check, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../auth/AuthContext'
import { authService } from '../../services/authServices'
import userImg from '../../assets/user/avatar-1.svg'

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  const variants = {
    primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700",
    secondary: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
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
        const response = await fetch(`https://skillonx-website.onrender.com/student/profile/${stuId}`) 
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
      const response = await fetch(`https://skillonx-website.onrender.com/student/profile/${stuId}`, {
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
      <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-500 to-blue-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          Loading profile...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-500 to-blue-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            Error: {error}
          </div>
        </div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  const displayData = isEditing ? editedData : userData

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-500 to-blue-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Link to="/university-dashboard" className="inline-flex items-center text-blue-200 hover:text-blue-300 mb-6 transition-colors duration-200">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
        
        {saveStatus === 'success' && (
          <div className="mb-4 bg-green-100 text-green-700 p-4 rounded-lg">
            Profile updated successfully!
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="mb-4 bg-red-100 text-red-700 p-4 rounded-lg">
            Failed to update profile. Please try again.
          </div>
        )}
        
        <motion.div variants={itemVariants} className="bg-white bg-opacity-30 backdrop-blur-lg rounded-lg overflow-hidden shadow-lg">
          <div className="relative pb-24 md:pb-32">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 bg-opacity-20 backdrop-blur-lg"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end p-6">
              <div>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={displayData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-white bg-opacity-90 rounded px-2 py-1 text-gray-800"
                    />
                    <input
                      type="text"
                      value={displayData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-white bg-opacity-90 rounded px-2 py-1 text-gray-800 ml-2"
                    />
                  </div>
                ) : (
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {displayData.firstName} {displayData.lastName}
                  </h1>
                )}
                <p className="text-blue-100">Student</p>
              </div>
              <img 
                src={userImg}
                alt={displayData.firstName}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg mt-4 md:mt-0"
              />
            </div>
          </div>
          <div className="p-6 space-y-6">
            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-5 w-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="email"
                    value={displayData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span>{displayData.email}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-5 w-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="tel"
                    value={displayData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span>{displayData.phone}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm sm:col-span-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                {isEditing ? (
                  <input
                    type="text"
                    value={displayData.address.doorNumber}
                    onChange={(e) => handleInputChange('address.doorNumber', e.target.value)}
                    className="bg-white rounded px-2 py-1 flex-1"
                  />
                ) : (
                  <span>{displayData.address.doorNumber}</span>
                )}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
  <h2 className="text-lg font-semibold mb-2 flex items-center">
    <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
    Education Details
  </h2>
  <div className="bg-gray-50 p-4 rounded-md shadow-sm">
    <div className="grid gap-4">
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
          {/* Read-only university name */}
          {displayData.universityName}
        </h3>
        <div className="font-medium">
          {/* Read-only current education */}
          {displayData.currentEducation}
        </div>
        <div className="text-sm text-gray-500 flex items-center mt-1">
          <Calendar className="h-4 w-4 mr-1" />
          Passing Year: {' '}
          {/* Read-only passing year */}
          {displayData.passingYear}
        </div>
      </div>
    </div>
  </div>
</motion.div>
          </div>
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-2">
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