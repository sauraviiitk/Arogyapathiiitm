import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../Context/Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { FiArrowRight, FiCheck, FiRotateCw, FiCalendar } from 'react-icons/fi';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const questions = [
  "How often do you struggle with maintaining a daily routine?",
  "Do you find it difficult to engage in physical activity or exercise?",
  "How often do you neglect self-care activities (showering, grooming, etc.)?",
  "Do you have trouble maintaining social connections with friends/family?",
  "How often do you avoid going outside or getting sunlight?",
  "Do you struggle with negative thought patterns about yourself?",
  "How often do you skip meals or eat unhealthy foods?",
  "Do you have difficulty practicing relaxation or mindfulness?",
  "How often do you abandon hobbies or activities you used to enjoy?",
  "Do you struggle with maintaining a regular sleep schedule?"
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
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const handleAnswer = async (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = value;
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setSubmitted(true);
      const total = newAnswers.reduce((a, b) => a + b, 0);
      await saveScoreToFirebase(total);

    }
  };

  const getLevel = (total) => {
    if (total <= 10) return "Mild";
    if (total <= 20) return "Moderate";
    return "Severe";
  };

  const getLevelColor = (total) => {
    if (total <= 10) return "text-green-600";
    if (total <= 20) return "text-yellow-600";
    return "text-red-600";
  };

  const getLevelBgColor = (total) => {
    if (total <= 10) return "bg-green-100";
    if (total <= 20) return "bg-yellow-100";
    return "bg-red-100";
  };

  const saveScoreToFirebase = async (totalScore) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "Score-Depression", user.uid);
        await updateDoc(docRef, {
          score: totalScore,
          completedAt: new Date(),
          level: getLevel(totalScore),
          status: "completed"
        });
        console.log("✅ Score updated in Firebase");
      } catch (error) {
        console.error("❌ Error saving score:", error);
      }
    }
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Confetti celebration */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Progress bar at top */}
        <div className="w-full h-2 bg-gray-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full ${submitted ? 'bg-green-500' : 'bg-indigo-500'}`}
          />
        </div>

        <div className="p-6 md:p-10 relative">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="space-y-8 flex flex-col"
              >
                <div className="text-center">
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800 mb-3">
                    Question {currentQ + 1} of {questions.length}
                  </span>
                  <motion.h2
                    layout
                    className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight"
                  >
                    {questions[currentQ]}
                  </motion.h2>
                </div>

                <div className="grid gap-3">
                  {options.map((text, index) => (
                    <motion.button
                      key={index}
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleAnswer(index + 1)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        answers[currentQ] === index + 1
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-indigo-300 bg-white text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                          answers[currentQ] === index + 1
                            ? 'bg-indigo-500 text-white'
                            : 'bg-gray-100 text-transparent'
                        }`}>
                          <FiCheck size={14} />
                        </div>
                        <span className="font-medium">{text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)}
                    disabled={currentQ === 0}
                    className={`px-4 py-2 rounded-lg ${currentQ === 0 ? 'text-gray-400' : 'text-indigo-600 hover:bg-indigo-50'}`}
                  >
                    Back
                  </button>
                  <span className="text-sm text-gray-500">
                    {currentQ + 1}/{questions.length}
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-8"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-full ${getLevelBgColor(totalScore)} flex items-center justify-center mb-4`}>
                    <span className={`text-3xl font-bold ${getLevelColor(totalScore)}`}>
                      {totalScore}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {getLevel(totalScore)} Depression
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    {totalScore <= 10 
                      ? "Your symptoms are mild. Consider self-care strategies and monitor your mood."
                      : totalScore <= 20
                      ? "Your symptoms are moderate. Professional help may be beneficial."
                      : "Your symptoms are severe. We strongly recommend seeking professional help."}
                  </p>
                </div>

                <div className="grid gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/relief-plan')}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <FiCalendar size={18} />
                    Start 10-Day Relief Plan
                    <FiArrowRight size={18} />
                  </motion.button>

                  <button
                    onClick={() => {
                      setAnswers([]);
                      setCurrentQ(0);
                      setSubmitted(false);
                    }}
                    className="w-full text-indigo-600 font-medium py-3 px-6 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
                  >
                    <FiRotateCw size={16} />
                    Retake Test
                  </button>
                </div>

                {totalScore >= 15 && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200 text-left">
                    <h4 className="font-bold text-red-700 mb-2">Important Notice</h4>
                    <p className="text-red-600 text-sm">
                      Based on your score, we recommend speaking with a mental health professional. 
                      You're not alone, and help is available.
                    </p>
                    <button 
                      onClick={() => navigate('/resources')}
                      className="mt-3 text-sm font-medium text-red-700 hover:underline"
                    >
                      View local resources →
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default DepressionTest;