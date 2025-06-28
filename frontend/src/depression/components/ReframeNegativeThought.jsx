// import { useState } from "react";

// export default function ReframeThought({ onBack }) {
//   const [thought, setThought] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleReframe = async () => {
//     if (!thought.trim()) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("http://localhost:5000/api/reframe", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ thought })
//       });

//       const data = await res.json();

//       if (data.error) {
//         setError(data.error);
//       } else {
//         setResult(data);
//       }
//     } catch (err) {
//       setError("Failed to connect to the AI service.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
//       {/* <button
//         onClick={onBack}
//         className="mb-4 text-indigo-600 hover:underline"
//       >
//         ← Back to Dashboard
//       </button> */}
//       <h1 className="text-2xl font-bold text-indigo-700 mb-4">
//         Reframe a Negative Thought
//       </h1>
//       <p className="text-gray-700 mb-4">
//         Write a negative thought below, and receive a gentle reframe from the AI.
//       </p>
//       <textarea
//         className="w-full min-h-[120px] p-3 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
//         placeholder="E.g., I always mess things up..."
//         value={thought}
//         onChange={(e) => setThought(e.target.value)}
//       />
//       <button
//         onClick={handleReframe}
//         className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
//         disabled={loading || !thought.trim()}
//       >
//         {loading ? "Thinking..." : "Reframe Thought"}
//       </button>

//       {error && <p className="mt-4 text-red-500">{error}</p>}

//       {result && (
//         <div className="mt-6 bg-gray-100 p-4 rounded-lg">
//           <h2 className="text-lg font-semibold text-indigo-700 mb-2">AI Response</h2>
//           <p><strong>Reframe:</strong> {result.reframe}</p>
//           <p className="mt-2"><strong>Distortion:</strong> {result.distortion}</p>
//           <p className="mt-2"><strong>CBT Tip:</strong> {result.tip}</p>
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function ReframeThought({ onBack }) {
//   const [thought, setThought] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleReframe = async () => {
//     if (!thought.trim()) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("http://localhost:5000/api/reframe", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ thought })
//       });
//       const data = await res.json();
//       if (data.error) {
//         setError(data.error);
//       } else {
//         setResult(data);
//       }
//     } catch (err) {
//       setError("Failed to connect to the AI service.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-10 px-5 flex items-center justify-center">
//       <motion.div
//         className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-2xl"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         {/* Optional Back Button */}
//         {/* <button
//           onClick={onBack}
//           className="mb-4 text-blue-700 hover:underline text-sm"
//         >
//           ← Back to Dashboard
//         </button> */}

//         <h1 className="text-3xl font-bold text-blue-800 mb-3 text-center">
//           Reframe a Negative Thought
//         </h1>
//         <p className="text-gray-700 text-center mb-6">
//           Write a negative thought below. Our AI will gently reframe it using CBT techniques 💡
//         </p>

//         {/* Input Box */}
//         <textarea
//           className="w-full min-h-[140px] p-4 border border-blue-300 rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm"
//           placeholder="E.g., I always mess things up..."
//           value={thought}
//           onChange={(e) => setThought(e.target.value)}
//         />

//         {/* Button */}
//         <motion.button
//           onClick={handleReframe}
//           whileTap={{ scale: 0.95 }}
//           className="mt-5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
//           disabled={loading || !thought.trim()}
//         >
//           {loading ? "Thinking..." : "💭 Reframe Thought"}
//         </motion.button>

//         {/* Error Message */}
//         {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

//         {/* AI Result Section */}
//         {result && (
//           <motion.div
//             className="mt-8 bg-blue-50 p-5 rounded-2xl border border-blue-200 shadow-inner"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <h2 className="text-xl font-semibold text-blue-800 mb-3">🤖 AI Response</h2>
//             <div className="text-sm space-y-3 text-gray-800">
//               <p><span className="font-medium text-blue-700">Reframe:</span> {result.reframe}</p>
//               <p><span className="font-medium text-blue-700">Distortion:</span> {result.distortion}</p>
//               <p><span className="font-medium text-blue-700">CBT Tip:</span> {result.tip}</p>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
import { useState } from "react";
import { motion } from "framer-motion";

export default function ReframeThought({ onBack }) {
  const [thought, setThought] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReframe = async () => {
    if (!thought.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/reframe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thought })
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to connect to the AI service.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-10 px-5 flex items-center justify-center">
      <motion.div
        className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Round Image from Public Folder */}
        <motion.img
          src="/images/negative.png"
          alt="Reframe Thought"
          className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-blue-200 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />

        <h1 className="text-3xl font-bold text-blue-800 mb-3 text-center">
          Reframe a Negative Thought
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Write a negative thought below. Our AI will gently reframe it using CBT techniques 💡
        </p>

        <textarea
          className="w-full min-h-[140px] p-4 border border-blue-300 rounded-xl bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm"
          placeholder="E.g., I always mess things up..."
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />

        <motion.button
          onClick={handleReframe}
          whileTap={{ scale: 0.95 }}
          className="mt-5 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
          disabled={loading || !thought.trim()}
        >
          {loading ? "Thinking..." : "💭 Reframe Thought"}
        </motion.button>

        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}

        {result && (
          <motion.div
            className="mt-8 bg-blue-50 p-5 rounded-2xl border border-blue-200 shadow-inner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold text-blue-800 mb-3">🤖 AI Response</h2>
            <div className="text-sm space-y-3 text-gray-800">
              <p><span className="font-medium text-blue-700">Reframe:</span> {result.reframe}</p>
              <p><span className="font-medium text-blue-700">Distortion:</span> {result.distortion}</p>
              <p><span className="font-medium text-blue-700">CBT Tip:</span> {result.tip}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
