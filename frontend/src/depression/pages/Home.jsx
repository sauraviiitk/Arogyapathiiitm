import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { db, auth } from '../../Context/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Home() {
  const navigate = useNavigate();

  const ChangeDatabase = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, "Score-Depression", user.uid);
        await setDoc(docRef, {
          uid: user.uid,
          email: user.email,
          startedAt: new Date(),
          score: null,
          status: "started",
          name:user.displayName,
        });
        console.log("✅ Score-Depression entry created");
        console.log(user)
        navigate("/test");
      } catch (error) {
        console.error("Error writing document: ", error);
        toast.error("Something went wrong. Try again.");
      }
    } else {
      toast.error("Please login first to start the test.");
      navigate("/auth/patient");
    }
  };

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
        Your companion in managing mental well-being. Take the depression self-assessment and begin your personalized 10-day recovery journey.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <button
          onClick={ChangeDatabase}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-medium shadow-lg transition-all duration-300"
        >
          Take the Depression Test
        </button>
      </motion.div>
    </div>
  );
}

export default Home;
