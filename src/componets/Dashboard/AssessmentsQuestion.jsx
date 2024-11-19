import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save, HelpCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AssessmentsQuestion = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { workshopId } = useParams();
  const [workshop, setWorkshop] = useState(location.state?.workshop);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const universityId = auth.user._id;

  // Initialize assessment title and description from workshop data
  const [assessmentTitle, setAssessmentTitle] = useState('');
  const [assessmentDescription, setAssessmentDescription] = useState('');

  // Fetch workshop data if not available in state
  useEffect(() => {
    const fetchWorkshopData = async () => {
      if (!workshop && workshopId) {
        try {
          const response = await axios.get(`https://skillonx-website.onrender.com/workshops/${workshopId}`);
          setWorkshop(response.data.data);
          setAssessmentTitle(response.data.data.title);
          setAssessmentDescription(response.data.data.description);
        } catch (error) {
          console.error('Error fetching workshop:', error);
          setError('Failed to fetch workshop details');
        }
      } else if (workshop) {
        setAssessmentTitle(workshop.title);
        setAssessmentDescription(workshop.description);
      }
    };

    fetchWorkshopData();
  }, [workshopId, workshop]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 1
    }
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 1
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleQuestionChange = (questionId, field, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const validateAssessment = () => {
    if (!assessmentTitle.trim()) {
      throw new Error('Assessment title is required');
    }
    if (!assessmentDescription.trim()) {
      throw new Error('Assessment description is required');
    }
    
    questions.forEach((question, index) => {
      if (!question.questionText.trim()) {
        throw new Error(`Question ${index + 1} text is required`);
      }
      if (!question.correctAnswer) {
        throw new Error(`Correct answer for question ${index + 1} must be selected`);
      }
      question.options.forEach((option, optIndex) => {
        if (!option.trim()) {
          throw new Error(`Option ${optIndex + 1} for question ${index + 1} is required`);
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      validateAssessment();

      const assessmentData = {
        title: assessmentTitle,
        description: assessmentDescription,
        workshopId: workshopId, // Include workshop ID
        questions: questions.map(q => ({
          questionText: q.questionText,
          options: q.options,
          correctAnswer: parseInt(q.correctAnswer),
          marks: q.marks
        })),
        universityId
      };

      const response = await axios.post(
        'https://skillonx-website.onrender.com/add',
        assessmentData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess(true);
      setTimeout(() => {
        navigate('/university-dashboard/assessment-page');
      }, 2000);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Failed to create assessment');
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 pt-16 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create Assessment for {workshop?.title}
          </h1>
          
          {/* Assessment Details */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assessment Title
              </label>
              <input
                type="text"
                value={assessmentTitle}
                onChange={(e) => setAssessmentTitle(e.target.value)}
                className="w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter assessment title"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={assessmentDescription}
                onChange={(e) => setAssessmentDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter assessment description"
                disabled
              />
            </div>
          </div>

          {/* Display error message if any */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {/* Display success message */}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
              Assessment created successfully! Redirecting...
            </div>
          )}

          {/* Questions Section */}
          <div className="space-y-8">
            {questions.map((question, questionIndex) => (
              <div key={question.id} className="bg-gray-50 rounded-lg p-6 relative">
                <div className="absolute top-4 right-4">
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-medium text-gray-700">
                      Question {questionIndex + 1}
                    </span>
                    <input
                      type="number"
                      value={question.marks}
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>

                  <textarea
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(question.id, 'questionText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter question"
                    rows={2}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === index.toString()}
                          onChange={() => handleQuestionChange(question.id, 'correctAnswer', index.toString())}
                          className="h-4 w-4 text-blue-600"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Option ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Question Button */}
          <button
            onClick={addQuestion}
            className="mt-6 flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Question
          </button>

          {/* Submit Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                         flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Save className="h-5 w-5" />
              {loading ? 'Creating...' : 'Save Assessment'}
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Tips for creating an assessment:</h3>
              <ul className="mt-2 text-sm text-yellow-700 list-disc list-inside">
                <li>Each question must have exactly four options</li>
                <li>Select the correct answer using the radio button</li>
                <li>Questions are worth 1 mark each</li>
                <li>All fields are required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsQuestion;