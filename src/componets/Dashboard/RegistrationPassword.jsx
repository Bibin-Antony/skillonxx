import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Lock, X } from 'lucide-react';
import { motion } from 'framer-motion';

const RegistrationPassword = ({ workshop, onClose, stuId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('password'); // 'password' or 'confirmation'
  const devUrl = 'http://localhost:5000';
  const prodUrl = 'https://skillonx-server.onrender.com';
  const handlePasswordVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://skillonx-server.onrender.com/workshops/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workshopId: workshop._id,
          password: password
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Invalid password');
      }

      setStep('confirmation');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://skillonx-server.onrender.com/student/register-workshop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workshopId: workshop._id,
          studentId: stuId,
          workshopTitle: workshop.title,
          workshopDate: workshop.startDate,
          location: workshop.location,
          workshopPassword: password
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 text-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-100">Workshop Registration</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-4"
          >
            <div className="mb-4 text-teal-400">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-100 mb-2">Registration Successful!</h3>
            <p className="text-gray-400">You have been registered for the workshop.</p>
          </motion.div>
        ) : (
          <>
            {step === 'password' ? (
              <div>
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-100 mb-2">{workshop.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">Please enter the workshop password to continue registration.</p>

                  {error && (
                    <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="password"
                      placeholder="Enter workshop password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePasswordVerification}
                  disabled={loading || !password}
                  className={`w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-200 ${(loading || !password) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {loading ? 'Verifying...' : 'Continue'}
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-100">{workshop.title}</h3>
                    <p className="text-sm text-gray-400">{workshop.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {new Date(workshop.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">{workshop.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{workshop.location}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-300 rounded">
                    <p>{error}</p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep('password')}
                    className="flex-1 py-2 px-4 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleRegistration}
                    disabled={loading}
                    className={`flex-1 py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    {loading ? 'Registering...' : 'Confirm Registration'}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationPassword;