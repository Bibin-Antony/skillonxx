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
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const stuId = auth.user._id;

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch(`https://skillonx-website.onrender.com/assessments/get-assessment/${stuId}`, {
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
        console.log(data)

        if (data.message === 'All assessments have been submitted') {
          setError(data.message);
        } else if (data.assessment) {
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
  const calculateScore = (assessment, userAnswers) => {
    let obtainedMarks = 0;
    let totalMarks = 0;
    let questionScores = [];

    assessment.questions.forEach((question, index) => {
      totalMarks += question.marks;
      const userAnswer = userAnswers[`${assessment._id}-${index}`];
      
      const questionScore = {
        questionNumber: index + 1,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        marks: question.marks,
        scored: userAnswer === question.correctAnswer ? question.marks : 0
      };
      
      questionScores.push(questionScore);
      
      if (userAnswer === question.correctAnswer) {
        obtainedMarks += question.marks;
      }
    });

    console.log('\nDetailed Scoring Breakdown:', questionScores);

    return {
      obtainedMarks,
      totalMarks,
      percentage: ((obtainedMarks / totalMarks) * 100).toFixed(2),
      questionScores
    };
  };
  const handleSubmitAssessment = async (assessmentId) => {
    // ... (previous validation code remains the same)
  
    setSubmitting(true);
    try {
      const currentAssessment = assessments.find(a => a._id === assessmentId);
      
      // Debug logging for answers comparison
      console.log('\n=== Assessment Submission Debug Info ===');
      
      // Format answers according to schema
      const answers = Object.entries(selectedAnswers)
        .filter(([key]) => key.startsWith(assessmentId))
        .map(([key, value]) => ({
          questionIndex: parseInt(key.split('-')[1]),
          selectedOption: value
        }));
  
      console.log('\n1. Formatted Answers:', answers);
  
      // Calculate score
      const score = calculateScore(currentAssessment, selectedAnswers);
      console.log('\n2. Calculated Score:', score);
  
      // Format submission payload according to schema
      const submissionPayload = {
        assessmentId,
        status: 'submitted',
        answers,
        score: {
          obtainedMarks: parseFloat(score.obtainedMarks),
          totalMarks: parseFloat(score.totalMarks),
          percentage: parseFloat(score.percentage)
        }
      };
  
      console.log('\n3. Submission Payload:', submissionPayload);
  
      const response = await fetch(`https://skillonx-website.onrender.com/student/submit/${stuId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(submissionPayload)
      });
  
      // if (!response.ok) {
      //   throw new Error('Failed to submit assessment');
      // }
  
      const responseData = await response.json();
      console.log('\n4. Server Response:', responseData);
  
      setResults(score);
      setShowResults(true);
  
    } catch (err) {
      console.error('\nSubmission Error:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
      console.log('\n=== End of Assessment Submission Debug Info ===\n');
    }
  };
  
  // const handleSubmitAssessment = async (assessmentId) => {
  //   setSubmitting(true);
  //   try {
  //     const answers = Object.entries(selectedAnswers)
  //       .filter(([key]) => key.startsWith(assessmentId))
  //       .map(([key, value]) => ({
  //         questionIndex: parseInt(key.split('-')[1]),
  //         selectedOption: value
  //       }));

  //     const response = await fetch('http://localhost:5000/assessments/submit', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({
  //         assessmentId,
  //         studentId: stuId,
  //         answers
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to submit assessment');
  //     }

  //     navigate('/student-dashboard', { state: { message: 'Assessment submitted successfully!' } });
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Assessment Results</h2>
            <div className="space-y-4">
              <p className="text-lg">
                Obtained Marks: <span className="font-bold text-blue-600">{results.obtainedMarks}</span>
              </p>
              <p className="text-lg">
                Total Marks: <span className="font-bold">{results.totalMarks}</span>
              </p>
              <p className="text-lg">
                Percentage: <span className="font-bold text-blue-600">{results.percentage}%</span>
              </p>
            </div>
            <button
              onClick={() => navigate('/student-dashboard')}
              className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 
                       transition-colors duration-200"
            >
              Return to Dashboard
            </button>
          </motion.div>
        </div>
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
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <p className="text-red-600">{error}</p>
            </motion.div>
          )}

          {assessments.map((assessment) => (
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
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GiveAssessment;