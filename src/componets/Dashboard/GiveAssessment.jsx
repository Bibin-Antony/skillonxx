import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Clock, ArrowLeft, CheckCircle, AlertCircle, FileQuestion } from 'lucide-react';
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
  const [universityName, setUniversityName] = useState('');

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await fetch(`https://skillonx-server.onrender.com/assessments/get-assessment/${stuId}`, {
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
          setError(`No pending assessments from ${data.universityName || 'your university'}`);
          setUniversityName(data.universityName || 'your university');
        } else if (data.assessment) {
          setAssessments(data.assessment);
          setUniversityName(data.universityName || 'your university');
        } else {
          setError(`No assessments available from ${data.universityName || 'your university'}`);
          setUniversityName(data.universityName || 'your university');
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

      const response = await fetch(`https://skillonx-server.onrender.com/student/submit/${stuId}`, {
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

  //     const response = await fetch('https://skillonx-server.onrender.com/assessments/submit', {
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
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  // Return a custom message when no assessments are found
  if (error || assessments.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/student-dashboard')}
            className="mb-6 flex items-center text-teal-500 hover:text-teal-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700"
          >
            <FileQuestion className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h2 className="text-2xl font-bold mb-4 text-gray-100">No Assessments Available</h2>
            <div className="space-y-2">
              <p className="text-gray-400">
                {error || `There are currently no assessments available from ${universityName}.`}
              </p>
              <p className="text-teal-400 text-sm">
                Please check back later for new assessments.
              </p>
            </div>
            <button
              onClick={() => navigate('/student-dashboard')}
              className="mt-6 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 
                       transition-colors duration-200 inline-flex items-center gap-2"
            >
              Return to Dashboard
              <ArrowLeft className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }
  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Assessment Results</h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-300">
                Obtained Marks: <span className="font-bold text-teal-500">{results.obtainedMarks}</span>
              </p>
              <p className="text-lg text-gray-300">
                Total Marks: <span className="font-bold text-gray-100">{results.totalMarks}</span>
              </p>
              <p className="text-lg text-gray-300">
                Percentage: <span className="font-bold text-teal-500">{results.percentage}%</span>
              </p>
            </div>
            <button
              onClick={() => navigate('/student-dashboard')}
              className="mt-8 bg-teal-500 text-white py-3 px-6 rounded-md hover:bg-teal-600 
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
    <div className="min-h-screen bg-gray-900 pt-16 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/student-dashboard')}
          className="mb-6 flex items-center text-teal-500 hover:text-teal-400 transition-colors duration-200"
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
              className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6"
            >
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}

          {assessments.map((assessment) => (
            <motion.div
              key={assessment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700"
            >
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-100 mb-2">{assessment.title}</h1>
                <p className="text-gray-400 mb-4">{assessment.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1 text-teal-500" />
                    {assessment.questions.length} Questions
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-teal-500" />
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
                    className="bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-700"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <span className="flex-shrink-0 bg-teal-500/20 text-teal-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                        {qIndex + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-100 font-medium">{question.questionText}</p>
                        <div className="text-sm text-gray-400 mt-1">Marks: {question.marks}</div>
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
                              ? 'bg-teal-500/10 border-teal-500/50 shadow-md'
                              : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm border
                              ${selectedAnswers[`${assessment._id}-${qIndex}`] === optIndex
                                ? 'border-teal-500 text-teal-500'
                                : 'border-gray-600 text-gray-400'}`}>
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="flex-1 text-gray-300">{option}</span>
                            {selectedAnswers[`${assessment._id}-${qIndex}`] === optIndex && (
                              <CheckCircle className="w-5 h-5 text-teal-500" />
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
                  className={`w-full bg-teal-500 text-white py-3 px-4 rounded-md hover:bg-teal-600 
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