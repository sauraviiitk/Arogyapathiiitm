// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";

// const emojiScale = [
//   "😭", "😢", "😟", "😕", "😐",
//   "🙂", "😊", "😀", "😄", "🤩"
// ];

// const moodTags = [
//   "Sleep", "Social", "Work", "Weather", "Health", "Food", "Relationships", "Alone", "Creative"
// ];

// const MoodCheckAI = () => {
//   const [mood, setMood] = useState(null);
//   const [reason, setReason] = useState("");
//   const [need, setNeed] = useState("");
//   const [tags, setTags] = useState([]);
//   const [showReflection, setShowReflection] = useState(false);

//   const toggleTag = (tag) => {
//     setTags((prev) =>
//       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//     );
//   };

//   const handleSaveMood = async () => {
//     if (mood === null) {
//       toast.error("Please rate your mood.");
//       return;
//     }

//     // Replace this with save to Firebase
//     toast.success("Mood check-in saved!");

//     // Simulate AI reflection
//     setShowReflection(true);
//   };

//   const renderAIReflection = () => {
//     return (
//       <motion.div
//         className="bg-green-50 p-4 rounded-xl border border-green-200 mt-6"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h3 className="font-semibold text-green-700 mb-2">🌿 AI Insight</h3>
//         <p className="text-gray-700">
//           "You've marked 'Sleep' and 'Work' often when your mood is low. Try a wind-down ritual at night and set lighter tasks for stressful days."
//         </p>

//         <div className="mt-4 text-green-800 italic">
//           🌞 “You’re showing up. That’s enough for today.”
//         </div>
//       </motion.div>
//     );
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//       <motion.h1
//         className="text-3xl font-bold text-green-700"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         Mood Check-in + AI Reflection
//       </motion.h1>

//       {/* Emoji Scale */}
//       <div>
//         <label className="font-semibold text-gray-700">How are you feeling today?</label>
//         <div className="flex items-center gap-3 mt-3 flex-wrap">
//           {emojiScale.map((emoji, index) => (
//             <button
//               key={index}
//               onClick={() => setMood(index + 1)}
//               className={`text-3xl hover:scale-110 transition ${
//                 mood === index + 1 ? "ring-2 ring-green-400 rounded-full" : ""
//               }`}
//             >
//               {emoji}
//             </button>
//           ))}
//         </div>
//         {mood !== null && (
//           <p className="mt-2 text-sm text-gray-600">Mood rating: {mood}/10</p>
//         )}
//       </div>

//       {/* Prompt Inputs */}
//       <div>
//         <label className="block font-semibold text-gray-700 mt-4">What’s contributing to this mood?</label>
//         <textarea
//           className="w-full p-3 mt-2 border rounded-lg"
//           rows={3}
//           placeholder="e.g., I didn’t sleep well and have a tough meeting ahead."
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//         />

//         <label className="block font-semibold text-gray-700 mt-4">One thing I need today is…</label>
//         <input
//           type="text"
//           className="w-full p-2 mt-2 border rounded-lg"
//           placeholder="e.g., Time to rest, reassurance, or focus"
//           value={need}
//           onChange={(e) => setNeed(e.target.value)}
//         />
//       </div>

//       {/* Mood Tags */}
//       <div>
//         <label className="block font-semibold text-gray-700 mt-4 mb-2">What’s affecting your mood?</label>
//         <div className="flex flex-wrap gap-2">
//           {moodTags.map((tag) => (
//             <button
//               key={tag}
//               onClick={() => toggleTag(tag)}
//               className={`px-3 py-1 rounded-full border ${
//                 tags.includes(tag)
//                   ? "bg-green-600 text-white"
//                   : "bg-white text-gray-700"
//               } hover:bg-green-100 transition`}
//             >
//               {tag}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="pt-4">
//         <motion.button
//           whileTap={{ scale: 0.95 }}
//           onClick={handleSaveMood}
//           className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
//         >
//           Save Mood
//         </motion.button>
//       </div>

//       {/* AI Reflection */}
//       {showReflection && renderAIReflection()}
//     </div>
//   );
// };

// export default MoodCheckAI;
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

    toast.success("Mood check-in saved!");
    setShowReflection(true);
  };

  const renderAIReflection = () => (
    <motion.div
      className="bg-blue-100/70 border border-blue-300 rounded-xl p-5 shadow-md mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-blue-800 font-semibold mb-2">🤖 AI Insight</h3>
      <p className="text-gray-700 text-sm">
        "You've marked 'Sleep' and 'Work' often when your mood is low. Try a wind-down ritual at night and set lighter tasks for stressful days."
      </p>
      <div className="mt-4 text-blue-900 italic text-sm">
        🌈 “You’re showing up. That’s enough for today.”
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 py-10 px-5">
      <motion.div
        className="bg-white/70 backdrop-blur-xl max-w-3xl mx-auto rounded-3xl p-8 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold text-blue-800 text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Mood Check-In 💬 + AI Reflection
        </motion.h1>

        {/* Emoji Rating */}
        <div className="mb-6">
          <label className="block font-medium text-gray-800 mb-2">
            How are you feeling today?
          </label>
          <div className="flex flex-wrap gap-3 justify-center">
            {emojiScale.map((emoji, index) => (
              <motion.button
                key={index}
                onClick={() => setMood(index + 1)}
                whileHover={{ scale: 1.15 }}
                className={`text-3xl transition duration-200 ${
                  mood === index + 1 ? "ring-2 ring-blue-400 rounded-full" : ""
                }`}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
          {mood && (
            <p className="mt-2 text-sm text-gray-600 text-center">
              Mood rating: {mood}/10
            </p>
          )}
        </div>

        {/* Reason Input */}
        <div className="mb-6">
          <label className="block font-medium text-gray-800 mb-2">
            What’s contributing to this mood?
          </label>
          <textarea
            className="w-full p-3 rounded-xl border border-blue-200 bg-white/90 focus:ring-2 focus:ring-blue-400 text-sm"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g., I didn’t sleep well and have a tough meeting ahead."
          />
        </div>

        {/* Need Input */}
        <div className="mb-6">
          <label className="block font-medium text-gray-800 mb-2">
            One thing I need today is…
          </label>
          <input
            type="text"
            className="w-full p-3 rounded-xl border border-blue-200 bg-white/90 focus:ring-2 focus:ring-blue-400 text-sm"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="e.g., Time to rest, reassurance, or focus"
          />
        </div>

        {/* Mood Tags */}
        <div className="mb-6">
          <label className="block font-medium text-gray-800 mb-2">
            What’s affecting your mood?
          </label>
          <div className="flex flex-wrap gap-2">
            {moodTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => toggleTag(tag)}
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  tags.includes(tag)
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSaveMood}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
          >
            Save Mood ✅
          </motion.button>
        </div>

        {/* AI Result */}
        {showReflection && renderAIReflection()}
      </motion.div>
    </div>
  );
};

export default MoodCheckAI;
