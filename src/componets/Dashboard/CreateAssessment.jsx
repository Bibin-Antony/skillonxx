import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const CreateAssessment = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const universityId = auth.user._id;

  useEffect(() => {
    console.log(auth.user);
  }, [auth.user]);

  useEffect(() => {
    fetchAssesments();
  }, [auth.user]);

  const fetchAssesments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://skillonx-server.onrender.com/assessments/university/${universityId}`);
      const { data } = await response.json();
      console.log('Fetched assessment:', data);
      setAssessments(data);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 pt-20 min-h-screen bg-gray-900 text-gray-100">
      {/* Back Button */}
      <Link
        to="/university-dashboard"
        className="mb-6 pl-24 inline-flex items-center text-teal-500 hover:text-teal-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <p className="text-gray-400 mt-1">Manage your university's assessments</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-100">Your Active Assessments</h2>

          {assessments.length === 0 ? (
            <div className="text-center py-8 bg-gray-900 rounded-lg border border-gray-700">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-400">No assessments created yet</p>
            </div>
          ) : (
            <div className="space-y-8">
              {assessments.map((assessment) => (
                <div
                  key={assessment._id}
                  className="bg-gray-900 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  {/* Assessment Header */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">{assessment.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{assessment.description}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      <BookOpen className="w-4 h-4 mr-2 text-teal-500" />
                      {assessment.questions.length} Questions
                    </div>
                  </div>

                  {/* All Questions */}
                  <div className="space-y-6">
                    {assessment.questions.map((question, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-md border border-gray-700">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 bg-teal-900/50 text-teal-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-gray-200 font-medium mb-4">
                              {question.questionText}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {question.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`p-3 rounded-md flex items-center gap-2 ${
                                    question.correctAnswer === optIndex
                                      ? 'bg-teal-900/30 border border-teal-700'
                                      : 'bg-gray-900 border border-gray-700'
                                  }`}
                                >
                                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm border ${
                                    question.correctAnswer === optIndex
                                      ? 'border-teal-500 text-teal-400'
                                      : 'border-gray-600 text-gray-400'
                                  }`}>
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  <span className={`flex-1 text-sm ${
                                    question.correctAnswer === optIndex
                                      ? 'text-teal-300'
                                      : 'text-gray-300'
                                  }`}>
                                    {option}
                                  </span>
                                  {question.correctAnswer === optIndex && (
                                    <CheckCircle className="w-4 h-4 text-teal-500" />
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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

export default CreateAssessment;