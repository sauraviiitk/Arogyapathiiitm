import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmotionalTimeMachine = () => {
  const [memory, setMemory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl w-full space-y-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-purple-700 text-center"
        >
          🧠 Emotional Time Machine
        </motion.h1>

        {!submitted ? (
          <>
            <p className="text-center text-gray-700 text-lg">
              Think back to a powerful moment in your past. What did it feel like? What did you learn?
            </p>

            <textarea
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
              placeholder="Describe a meaningful emotional memory..."
              className="w-full min-h-[200px] p-5 rounded-xl bg-white/60 focus:ring-4 focus:ring-purple-200 shadow-inner border border-gray-200 resize-none text-gray-800 placeholder-gray-400"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (memory.trim()) setSubmitted(true);
              }}
              className="w-full md:w-auto mx-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 block"
            >
              Reflect
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl font-semibold text-purple-700">
              🪞 Reflection Saved!
            </h2>
            <p className="text-gray-700">Your emotional memory has been recorded for reflection.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setSubmitted(false);
                setMemory('');
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl text-md shadow-md hover:bg-purple-700"
            >
              Reflect Again
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EmotionalTimeMachine;
