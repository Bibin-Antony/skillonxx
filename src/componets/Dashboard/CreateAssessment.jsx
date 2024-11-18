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
    console.log(auth.user)
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 pt-20 min-h-screen bg-gray-300">
      {/* Back Button */}
      <Link
        to="/university-dashboard"
        className="mb-6 pl-24 inline-flex items-center text-blue-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            {/* <h1 className="text-2xl font-bold text-gray-800">Create Assessment</h1> */}
            <p className="text-gray-600 mt-1">Manage your university's assessments</p>
          </div>
          {/* <Link
            to="create-assessment"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Assessment
          </Link> */}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Active Assessments</h2>

          {assessments.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No assessments created yet</p>
            </div>
          ) : (
            <div className="space-y-8">
              {assessments.map((assessment) => (
                <div
                  key={assessment._id}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Assessment Header */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{assessment.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{assessment.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {assessment.questions.length} Questions
                    </div>
                  </div>

                  {/* All Questions */}
                  <div className="space-y-6">
                    {assessment.questions.map((question, index) => (
                      <div key={index} className="bg-white p-4 rounded-md border border-gray-100">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-gray-700 font-medium mb-4">
                              {question.questionText}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {question.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`p-3 rounded-md flex items-center gap-2 ${question.correctAnswer === optIndex
                                      ? 'bg-green-50 border border-green-100'
                                      : 'bg-gray-50 border border-gray-100'
                                    }`}
                                >
                                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm border ${question.correctAnswer === optIndex
                                      ? 'border-green-500 text-green-600'
                                      : 'border-gray-300 text-gray-500'
                                    }`}>
                                    {String.fromCharCode(65 + optIndex)}
                                  </span>
                                  <span className={`flex-1 text-sm ${question.correctAnswer === optIndex
                                      ? 'text-green-700'
                                      : 'text-gray-600'
                                    }`}>
                                    {option}
                                  </span>
                                  {question.correctAnswer === optIndex && (
                                    <CheckCircle className="w-4 h-4 text-green-500" />
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