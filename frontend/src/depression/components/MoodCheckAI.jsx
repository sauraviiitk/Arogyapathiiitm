import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const emojiScale = [
  "😭", "😢", "😟", "😕", "😐",
  "🙂", "😊", "😀", "😄", "🤩"
];

const moodTags = [
  "Sleep", "Social", "Work", "Weather", "Health", "Food", "Relationships", "Alone", "Creative"
];

const MoodCheckAI = () => {
  const [mood, setMood] = useState(null);
  const [reason, setReason] = useState("");
  const [need, setNeed] = useState("");
  const [tags, setTags] = useState([]);
  const [showReflection, setShowReflection] = useState(false);

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSaveMood = async () => {
    if (mood === null) {
      toast.error("Please rate your mood.");
      return;
    }

    // Replace this with save to Firebase
    toast.success("Mood check-in saved!");

    // Simulate AI reflection
    setShowReflection(true);
  };

  const renderAIReflection = () => {
    return (
      <motion.div
        className="bg-green-50 p-4 rounded-xl border border-green-200 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="font-semibold text-green-700 mb-2">🌿 AI Insight</h3>
        <p className="text-gray-700">
          "You've marked 'Sleep' and 'Work' often when your mood is low. Try a wind-down ritual at night and set lighter tasks for stressful days."
        </p>

        <div className="mt-4 text-green-800 italic">
          🌞 “You’re showing up. That’s enough for today.”
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <motion.h1
        className="text-3xl font-bold text-green-700"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Mood Check-in + AI Reflection
      </motion.h1>

      {/* Emoji Scale */}
      <div>
        <label className="font-semibold text-gray-700">How are you feeling today?</label>
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          {emojiScale.map((emoji, index) => (
            <button
              key={index}
              onClick={() => setMood(index + 1)}
              className={`text-3xl hover:scale-110 transition ${
                mood === index + 1 ? "ring-2 ring-green-400 rounded-full" : ""
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        {mood !== null && (
          <p className="mt-2 text-sm text-gray-600">Mood rating: {mood}/10</p>
        )}
      </div>

      {/* Prompt Inputs */}
      <div>
        <label className="block font-semibold text-gray-700 mt-4">What’s contributing to this mood?</label>
        <textarea
          className="w-full p-3 mt-2 border rounded-lg"
          rows={3}
          placeholder="e.g., I didn’t sleep well and have a tough meeting ahead."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <label className="block font-semibold text-gray-700 mt-4">One thing I need today is…</label>
        <input
          type="text"
          className="w-full p-2 mt-2 border rounded-lg"
          placeholder="e.g., Time to rest, reassurance, or focus"
          value={need}
          onChange={(e) => setNeed(e.target.value)}
        />
      </div>

      {/* Mood Tags */}
      <div>
        <label className="block font-semibold text-gray-700 mt-4 mb-2">What’s affecting your mood?</label>
        <div className="flex flex-wrap gap-2">
          {moodTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                tags.includes(tag)
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700"
              } hover:bg-green-100 transition`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveMood}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Save Mood
        </motion.button>
      </div>

      {/* AI Reflection */}
      {showReflection && renderAIReflection()}
    </div>
  );
};

export default MoodCheckAI;
