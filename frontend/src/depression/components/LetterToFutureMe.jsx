
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db, auth } from '../../Context/Firebase'; // Adjust the path as needed
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { FaPaperPlane } from 'react-icons/fa';

const emotionTags = ['Anxious', 'Hopeless', 'Numb', 'Optimistic', 'Lonely', 'Hopeful', 'Tired'];
const prompts = [
  "What do you hope will be different?",
  "What are you proud of right now?",
  "What’s been hard, but you’ve survived?"
];

const LetterToFutureMe = () => {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [letter, setLetter] = useState('');
  const [privacy, setPrivacy] = useState('private');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const title="💌 Letter to Future Me";
  const handleSaveLetter = async () => {
    const user = auth.currentUser;

    if (!user) return toast.error("Please login to save your letter.");
    if (!letter.trim()) return toast.error("Please write your letter.");
    if (!selectedEmotion) return toast.error("Please select how you're feeling.");

    try {
      setLoading(true);
      const letterRef = doc(db, "letters", `${user.uid}_${Date.now()}`);
      await setDoc(letterRef, {
        uid: user.uid,
        emotion: selectedEmotion,
        letter: letter.trim(),
        createdAt: serverTimestamp(),
        privacy,
      });

      toast.success("Letter saved securely!", { position: 'top-center' });
      setLetter('');
      setSelectedEmotion('');
      navigate('/Letter-history');
    } catch (error) {
      console.error("Error saving letter: ", error);
      toast.error("Failed to save letter.");
    } finally {
      setLoading(false);
    }
  };

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
          {title.split("").map((char, i) => (
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

        {/* Emotion Tags */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-blue-800">How are you feeling?</h4>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {emotionTags.map((emotion, idx) => (
              <motion.button
                key={emotion}
                onClick={() => setSelectedEmotion(emotion)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm transition-all border backdrop-blur-md shadow-md ${
                  selectedEmotion === emotion
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white/50 text-blue-900 border-blue-200 hover:bg-white/80'
                }`}
              >
                {emotion}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Prompt Section */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-blue-700">Need a prompt to start?</h4>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {prompts.map((prompt) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={prompt}
                onClick={() => setLetter(`${prompt} `)}
                className="text-sm px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-all"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Letter Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            rows={8}
            placeholder="Write your message to your future self here..."
            className="w-full p-5 text-gray-800 rounded-xl shadow-inner border border-gray-300 focus:ring-4 focus:ring-blue-200 resize-none placeholder-gray-500 bg-white/80 backdrop-blur-md"
          />
        </motion.div>

        {/* Save Button */}
        <motion.div
          whileHover={{
            scale: 1.05,
            backgroundColor: "#2563eb",
            boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSaveLetter}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg text-lg flex items-center justify-center gap-2 mx-auto w-fit cursor-pointer transition-all"
        >
          <FaPaperPlane className="text-white" />
          Save Letter
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LetterToFutureMe;

