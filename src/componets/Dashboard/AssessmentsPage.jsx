import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import { Radio, Space } from 'antd';
import styled from 'styled-components';
import confetti from 'canvas-confetti';

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null); // Track the score percentage

  const fetchPythonTest = async () => {
    try {
      const response = await axios.get('https://skillonx-website.onrender.com/questions/python-test');
      setQuestions(response.data);
      setShowQuestions(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Failed to load questions:", error);
    }
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(updatedAnswers);
      setSelectedAnswer(null);

      // If this is the last question, calculate the score
      if (currentQuestion === questions.length - 1) {
        const correctAnswers = questions.filter(
          (question, index) => question.correctAnswer === updatedAnswers[index]
        );
        const scorePercentage = (correctAnswers.length / questions.length) * 100;
        setScore(scorePercentage);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const StyledCard = styled(motion.div)`
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;
  `;

  const Button = styled(motion.button)`
    background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%);
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 3px 5px 2px rgba(33, 203, 243, .3);

    &:hover {
      background: linear-gradient(45deg, #21CBF3 30%, #2196F3 90%);
    }

    &:disabled {
      background: #bbb;
      cursor: not-allowed;
    }
  `;

  const ProgressBar = styled.div`
    width: 100%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    margin-bottom: 20px;
    overflow: hidden;
  `;

  const Progress = styled.div`
    width: ${props => props.progress}%;
    height: 100%;
    background-color: #4CAF50;
    transition: width 0.5s ease-in-out;
  `;

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <StyledCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-white mb-6 text-center">Python Assessment</h2>

        {!showQuestions ? (
          <div className="flex justify-center">
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchPythonTest}
            >
              Start Python Test
            </Button>
          </div>
        ) : score !== null ? (
          <h3 className="text-3xl font-bold text-white text-center">
            Your Score: {score.toFixed(2)}%
          </h3>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProgressBar>
              <Progress progress={(currentQuestion + 1) / questions.length * 100} />
            </ProgressBar>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <StyledCard>
              <p className="text-xl font-medium mb-6 text-gray-800">{questions[currentQuestion].question}</p>
              <Radio.Group
                className="w-full"
                onChange={(e) => setSelectedAnswer(e.target.value)}
                value={selectedAnswer}
              >
                <Space direction="vertical" className="w-full">
                  {questions[currentQuestion].options.map((option, optIndex) => (
                    <Radio key={optIndex} value={option} className="text-lg py-3 text-gray-700">
                      {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </StyledCard>
            <div className="flex justify-between mt-6">
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                <ChevronLeftIcon className="w-5 h-5 inline-block mr-1" /> Previous
              </Button>
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={!selectedAnswer}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"} <ChevronRightIcon className="w-5 h-5 inline-block ml-1" />
              </Button>
            </div>
          </motion.div>
        )}
      </StyledCard>
    </div>
  );
};

export default TestPage;
