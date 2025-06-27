import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200 text-center px-4 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl sm:text-6xl font-extrabold text-gray-800 mb-6 leading-tight"
      >
        Welcome to ArogyaPath
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-8"
      >
        Your companion in managing mental well-being. Take the depression self-assessment and begin your personalized 21-day recovery journey.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link to="/test">
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium shadow-lg transition-all duration-300">
            Take the Depression Test
          </button>
        </Link>
      </motion.div>
    </div>
  );
}

export default Home;
