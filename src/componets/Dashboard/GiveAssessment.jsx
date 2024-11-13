import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GiveAssessment = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const stuId = auth.user._id;

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/assessments/get-assessment/${stuId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Assessment not found');
        }

        const data = await response.json();

        if (data.status === 'success' && data.assessment.length === 0) {
          setError('No assessments available. Please ensure you are registered for workshops.');
        } else {
          setAssessments(data.assessment);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (auth.user) {
      fetchAssessments();
    }
  }, [auth.user, stuId]);

  const handleOptionSelect = (assessmentId, questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [`${assessmentId}-${questionIndex}`]: optionIndex
    }));
  };

  const handleSubmitAssessment = async (assessmentId) => {
    setSubmitting(true);
    try {
      const answers = Object.entries(selectedAnswers)
        .filter(([key]) => key.startsWith(assessmentId))
        .map(([key, value]) => ({
          questionIndex: parseInt(key.split('-')[1]),
          selectedOption: value
        }));

      const response = await fetch('http://localhost:5000/assessments/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          assessmentId,
          studentId: stuId,
          answers
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      navigate('/student-dashboard', { state: { message: 'Assessment submitted successfully!' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/student-dashboard')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </motion.button>

        <AnimatePresence>
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => navigate('/student-dashboard')}
                className="text-blue-600 hover:underline transition-colors duration-200"
              >
                Return to Dashboard
              </button>
            </motion.div>
          ) : (
            assessments.map((assessment) => (
              <motion.div
                key={assessment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-6 mb-6"
              >
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{assessment.title}</h1>
                  <p className="text-gray-600 mb-4">{assessment.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {assessment.questions.length} Questions
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Total Marks: {assessment.questions.reduce((total, q) => total + q.marks, 0)}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {assessment.questions.map((question, qIndex) => (
                    <motion.div 
                      key={qIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: qIndex * 0.1 }}
                      className="bg-gray-50 rounded-lg p-6 shadow-sm"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <span className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                          {qIndex + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium">{question.questionText}</p>
                          <div className="text-sm text-gray-500 mt-1">Marks: {question.marks}</div>
                        </div>
                      </div>

                      <div className="space-y-3 ml-11">
                        {question.options.map((option, optIndex) => (
                          <motion.div 
                            key={optIndex}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleOptionSelect(assessment._id, qIndex, optIndex)}
                            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200
                              ${selectedAnswers[`${assessment._id}-${qIndex}`] === optIndex 
                                ? 'bg-blue-50 border-blue-300 shadow-md' 
                                : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm border
                                ${selectedAnswers[`${assessment._id}-${qIndex}`] === optIndex
                                  ? 'border-blue-500 text-blue-500'
                                  : 'border-gray-300 text-gray-500'}`}>
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span className="flex-1">{option}</span>
                              {selectedAnswers[`${assessment._id}-${qIndex}`] === optIndex && (
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => handleSubmitAssessment(assessment._id)}
                    disabled={submitting}
                    className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 
                             transition-colors duration-200 flex items-center justify-center gap-2
                             ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Assessment
                        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GiveAssessment;