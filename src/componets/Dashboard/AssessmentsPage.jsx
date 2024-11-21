import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import { Radio, Space, Modal, Spin } from 'antd';
import styled from 'styled-components';
import confetti from 'canvas-confetti';
import { useNavigate, useBeforeUnload } from 'react-router-dom';

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Styled components remain the same...
  const StyledCard = styled(motion.div)`
    background: #1f2937;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    margin-bottom: 2rem;
    border: 1px solid #374151;
    color: #f3f4f6;
  `;

  const Button = styled(motion.button)`
    background: #14b8a6;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 3px 5px 2px rgba(20, 184, 166, 0.3);

    &:hover {
      background: #0d9488;
    }

    &:disabled {
      background: #374151;
      cursor: not-allowed;
    }
  `;

  const ProgressBar = styled.div`
    width: 100%;
    height: 10px;
    background-color: #374151;
    border-radius: 5px;
    margin-bottom: 20px;
    overflow: hidden;
  `;

  const Progress = styled.div`
    width: ${props => props.progress}%;
    height: 100%;
    background-color: #14b8a6;
    transition: width 0.5s ease-in-out;
  `;

  // Navigation handling remains the same...
  useBeforeUnload(
    useCallback((event) => {
      if (showQuestions && score === null) {
        event.preventDefault();
        return true;
      }
    }, [showQuestions, score])
  );

  useEffect(() => {
    const handleBeforeNavigate = (e) => {
      if (showQuestions && score === null) {
        e.preventDefault();
        setIsModalVisible(true);
      }
    };

    window.addEventListener('popstate', handleBeforeNavigate);
    return () => {
      window.removeEventListener('popstate', handleBeforeNavigate);
    };
  }, [showQuestions, score]);

  useEffect(() => {
    if (showQuestions && score === null) {
      window.history.pushState(null, '', window.location.pathname);
    }
  }, [showQuestions, score]);

  const handleLeaveTest = () => {
    setIsModalVisible(false);
    navigate(-1);
  };

  const handleCancelLeave = () => {
    setIsModalVisible(false);
  };

  const fetchPythonTest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://skillonx-server.onrender.com/questions/python-test');
      if (response.data && response.data.length > 0) {
        setQuestions(response.data);
        setShowQuestions(true);
      } else {
        throw new Error('No questions received from the server');
      }
    } catch (error) {
      console.error("Failed to load questions:", error);
      setError(error.message || 'Failed to load questions. Please try again.');
      setShowQuestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(updatedAnswers);
      setSelectedAnswer(null);

      if (currentQuestion === questions.length - 1) {
        const correctAnswers = questions.filter(
          (question, index) => question.correctAnswer === updatedAnswers[index]
        );
        const scorePercentage = (correctAnswers.length / questions.length) * 100;
        setScore(scorePercentage);
        
        if (scorePercentage >= 70) {
          confetti({
            particleCount: 200,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#14b8a6', '#f3f4f6', '#1f2937']
          });
        }
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const radioStyle = {
    '.ant-radio-wrapper': {
      color: '#f3f4f6',
    },
    '.ant-radio-checked .ant-radio-inner': {
      borderColor: '#14b8a6',
      backgroundColor: '#14b8a6',
    },
    '.ant-radio:hover .ant-radio-inner': {
      borderColor: '#14b8a6',
    },
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-900 p-8">
      <Modal
        title="Leave Test?"
        open={isModalVisible}
        onOk={handleLeaveTest}
        onCancel={handleCancelLeave}
        okText="Leave"
        cancelText="Stay"
        okButtonProps={{ 
          style: { background: '#ef4444', borderColor: '#ef4444' }
        }}
        cancelButtonProps={{
          style: { background: '#14b8a6', borderColor: '#14b8a6', color: 'white' }
        }}
        styles={{
          content: {
            background: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '2rem',
          },
          header: { color: '#f3f4f6', border: 'none' },
          body: { color: '#f3f4f6' },
          footer: { border: 'none' },
        }}
      >
        <p>Are you sure you want to leave the test? Your progress will be lost.</p>
      </Modal>

      <StyledCard>
        <h2 className="text-4xl font-bold text-gray-100 mb-6 text-center">Python Assessment</h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Spin size="large" />
            <p className="mt-4 text-gray-300">Loading questions...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={fetchPythonTest}>
              Try Again
            </Button>
          </div>
        ) : !showQuestions ? (
          <div className="flex justify-center">
            <Button onClick={fetchPythonTest}>
              Start Python Test
            </Button>
          </div>
        ) : score !== null ? (
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-100 mb-4">
              Your Score: {score.toFixed(2)}%
            </h3>
            {score >= 70 ? (
              <div className="text-teal-400 text-xl space-y-4">
                <p>🎉 Congratulations! You've passed the assessment!</p>
                <p>You're eligible for the internship program.</p>
              </div>
            ) : (
              <div className="text-gray-300 text-xl space-y-4">
                <p>Thank you for completing the assessment.</p>
                <p className="text-teal-400">Our team will contact you soon with further information.</p>
              </div>
            )}
          </div>
        ) : questions.length > 0 ? (
          <div>
            <ProgressBar>
              <Progress progress={(currentQuestion + 1) / questions.length * 100} />
            </ProgressBar>
            <h3 className="text-2xl font-semibold text-gray-100 mb-4 text-center">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <StyledCard style={{ background: '#111827' }}>
              <p className="text-xl font-medium mb-6 text-gray-100">
                {questions[currentQuestion].question}
              </p>
              <Radio.Group
                className="w-full"
                onChange={(e) => setSelectedAnswer(e.target.value)}
                value={selectedAnswer}
                style={radioStyle}
              >
                <Space direction="vertical" className="w-full">
                  {questions[currentQuestion].options.map((option, optIndex) => (
                    <Radio 
                      key={optIndex} 
                      value={option} 
                      className="text-lg py-3 text-gray-300 hover:text-gray-100"
                    >
                      {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </StyledCard>
            <div className="flex justify-between mt-6">
              <Button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                <ChevronLeftIcon className="w-5 h-5 inline-block mr-1" /> Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"} 
                <ChevronRightIcon className="w-5 h-5 inline-block ml-1" />
              </Button>
            </div>
          </div>
        ) : null}
      </StyledCard>
    </div>
  );
};

export default TestPage;