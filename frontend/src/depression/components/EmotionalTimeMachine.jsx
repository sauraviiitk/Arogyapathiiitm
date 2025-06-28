
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRegSmileBeam, FaRedoAlt } from 'react-icons/fa';

const EmotionalTimeMachine = () => {
  const [memory, setMemory] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const title = "🧠 Emotional Time Machine";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-200 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl w-full space-y-10"
      >
        {/* Animated Heading */}
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold text-center text-blue-900 tracking-wide"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {title.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {!submitted ? (
          <>
            <p className="text-center text-blue-800 text-md md:text-lg">
              Think back to a meaningful emotional memory. What did it feel like? What did you learn from it?
            </p>

            {/* Textarea for Reflection */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <textarea
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                rows={8}
                placeholder="Describe your emotional memory here..."
                className="w-full p-5 text-gray-800 rounded-xl shadow-inner border border-gray-300 focus:ring-4 focus:ring-blue-200 resize-none placeholder-gray-500 bg-white/80 backdrop-blur-md"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              whileHover={{
                scale: 1.05,
                backgroundColor: "#2563eb",
                boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)",
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (memory.trim()) setSubmitted(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg text-lg flex items-center justify-center gap-2 mx-auto w-fit cursor-pointer transition-all"
            >
              <FaRegSmileBeam className="text-white" />
              Reflect
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-2xl font-semibold text-blue-800">
              ✅ Reflection Saved!
            </h2>
            <p className="text-blue-700">Your emotional memory has been securely recorded.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSubmitted(false);
                setMemory('');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl text-md shadow-md hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <FaRedoAlt /> Reflect Again
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EmotionalTimeMachine;
