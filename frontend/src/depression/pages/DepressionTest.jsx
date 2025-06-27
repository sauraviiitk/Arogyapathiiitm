// Enhanced DepressionTest Component with advanced UI using Tailwind + Framer Motion

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const questions = [
  "I feel sad or down most of the day.",
  "I have lost interest in activities I once enjoyed.",
  "I feel tired or have little energy.",
  "I have trouble sleeping or sleep too much.",
  "I have a poor appetite or am overeating.",
  "I feel worthless or guilty.",
  "I have difficulty concentrating.",
  "I move or speak more slowly or feel restless.",
  "I feel hopeless about the future.",
  "I have thoughts of self-harm or death."
];

const options = [
  "Not at all",
  "Several days",
  "More than half the days",
  "Nearly every day"
];

function DepressionTest() {
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = value;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setSubmitted(true);
    }
  };

  const getLevel = (total) => {
    if (total <= 10) return "Mild Depression";
    if (total <= 20) return "Moderate Depression";
    return "Severe Depression";
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="space-y-8 flex flex-col"
            >
              <motion.h2
                layout
                className="text-3xl font-bold text-center text-indigo-700"
              >
                Question {currentQ + 1} of {questions.length}
              </motion.h2>
              <motion.p
                className="text-xl text-gray-800 font-medium text-center"
              >
                {questions[currentQ]}
              </motion.p>
              <div className="flex flex-col gap-4">
                {options.map((text, index) => (
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    key={index}
                    onClick={() => handleAnswer(index + 1)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 text-lg"
                  >
                    {text}
                  </motion.button>
                ))}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-indigo-500"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-6 flex flex-col"
            >
              <h3 className="text-3xl font-bold text-gray-800">Your Score: {totalScore}</h3>
              <p className="text-xl text-gray-700">
                Depression Level: <span className="font-semibold text-indigo-700">{getLevel(totalScore)}</span>
              </p>
              <div className="flex flex-col gap-4 items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setAnswers([]);
                    setCurrentQ(0);
                    setSubmitted(false);
                  }}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-indigo-700"
                >
                  Retake Test
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate('/relief-plan')}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl text-lg shadow-md hover:bg-green-700"
                >
                  Try our 21-Day Depression Relief Plan
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DepressionTest;
