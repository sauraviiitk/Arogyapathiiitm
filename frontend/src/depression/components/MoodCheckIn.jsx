// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const moods = ["😊 Happy", "😔 Sad", "😠 Angry", "😨 Anxious", "😐 Meh"];

// export default function MoodCheckIn() {
//   const [selectedMood, setSelectedMood] = useState("");
//   const [text, setText] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     if (!selectedMood || !text.trim()) return;

//     setLoading(true);
//     setResponse("");
//     setError("");

//     try {
//       const res = await fetch("http://localhost:5000/api/mood/reflect", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mood: selectedMood, text }),
//       });

//       if (!res.ok) {
//         throw new Error(`Server responded with ${res.status}`);
//       }

//       const data = await res.json();

//       if (!data.reply) {
//         throw new Error("Invalid response format");
//       }

//       setResponse(data.reply);
//     } catch (err) {
//       console.error("❌ Error:", err.message);
//       setError("❌ Failed to get reflection. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
//       <div className="bg-white shadow-xl rounded-3xl p-8 max-w-xl w-full space-y-6">
//         <h1 className="text-2xl font-bold text-center text-indigo-700">
//           💬 Mood Check-In
//         </h1>

//         <div className="space-y-2">
//           <label className="text-gray-700 font-medium">How do you feel?</label>
//           <div className="flex flex-wrap gap-2">
//             {moods.map((mood) => (
//               <button
//                 key={mood}
//                 onClick={() => setSelectedMood(mood)}
//                 className={`px-4 py-2 rounded-full border shadow-sm transition-all ${
//                   selectedMood === mood
//                     ? "bg-indigo-200 font-semibold"
//                     : "bg-white hover:bg-indigo-100"
//                 }`}
//               >
//                 {mood}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <textarea
//             rows={5}
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Write about your day or feelings..."
//             className="w-full border p-4 rounded-xl focus:ring-2 focus:ring-indigo-400 resize-none"
//           />
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={loading || !selectedMood || !text.trim()}
//           className="bg-indigo-600 text-white px-6 py-3 rounded-xl w-full hover:bg-indigo-700 disabled:opacity-50"
//         >
//           {loading ? "Reflecting..." : "Reflect with AI"}
//         </button>

//         {error && (
//           <div className="text-red-600 font-medium bg-red-100 p-3 rounded-xl">
//             {error}
//           </div>
//         )}

//         {response && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-indigo-50 p-4 rounded-xl text-indigo-800 whitespace-pre-line mt-4"
//           >
//             {response}
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { motion } from "framer-motion";

const moods = ["😊 Happy", "😔 Sad", "😠 Angry", "😨 Anxious", "😐 Meh"];

export default function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!selectedMood || !text.trim()) return;

    setLoading(true);
    setResponse("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/mood/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: selectedMood, text }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      if (!data.reply) {
        throw new Error("Invalid response format");
      }

      setResponse(data.reply);
    } catch (err) {
      console.error("❌ Error:", err.message);
      setError("❌ Failed to get reflection. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/70 shadow-2xl rounded-3xl p-8 max-w-2xl w-full space-y-6 border border-blue-200"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700">
          💬 Mood Check-In
        </h1>

        <div className="space-y-2">
          <label className="text-gray-700 font-semibold text-lg">
            How do you feel?
          </label>
          <div className="flex flex-wrap gap-3">
            {moods.map((mood) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-5 py-2 rounded-full border transition-all duration-300 font-medium text-sm shadow-md ${
                  selectedMood === mood
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
                }`}
              >
                {mood}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write about your day or feelings..."
            className="w-full border border-blue-300 p-4 rounded-2xl focus:ring-2 focus:ring-blue-400 resize-none text-sm shadow-sm"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading || !selectedMood || !text.trim()}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl w-full text-lg font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50"
        >
          {loading ? "Reflecting..." : "Reflect with AI"}
        </motion.button>

        {error && (
          <div className="text-red-600 font-medium bg-red-100 p-3 rounded-xl shadow">
            {error}
          </div>
        )}

        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-800 whitespace-pre-line mt-4 shadow-sm"
          >
            {response}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
