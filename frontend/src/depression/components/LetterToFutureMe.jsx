import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db, auth } from '../../Context/Firebase'; // Adjust the path as needed
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 max-w-4xl w-full space-y-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 text-center">
          💌 Letter to Future Me
        </h2>

        {/* Emotion Tags */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">How are you feeling?</h4>
          <div className="flex flex-wrap gap-3">
            {emotionTags.map((emotion) => (
              <button
                key={emotion}
                onClick={() => setSelectedEmotion(emotion)}
                className={`px-4 py-2 rounded-xl border text-sm transition-all ${
                  selectedEmotion === emotion
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {emotion}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Suggestion */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">Need a prompt?</h4>
          <div className="flex flex-wrap gap-3">
            {prompts.map((prompt) => (
              <motion.button
                whileTap={{ scale: 0.97 }}
                key={prompt}
                onClick={() => setLetter(`${prompt} `)}
                className="text-sm px-4 py-2 bg-purple-100 text-purple-800 rounded-xl hover:bg-purple-200 transition"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Letter Editor */}
        <div>
          <textarea
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            rows={8}
            placeholder="Write your message to your future self here..."
            className="w-full p-5 text-gray-800 rounded-xl shadow-inner border border-gray-300 focus:ring-4 focus:ring-indigo-200 resize-none placeholder-gray-500"
          />
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          onClick={handleSaveLetter}
          className={`w-full ${
            loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white font-semibold py-3 px-6 rounded-xl shadow-md text-lg`}
        >
          {loading ? "Saving..." : "Save Letter"}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LetterToFutureMe;
