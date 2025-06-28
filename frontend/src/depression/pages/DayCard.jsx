// import React, { useState } from "react";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { useFirebase } from "../../Context/Firebase";
// import { toast } from "react-toastify";

// const DayCard = ({ task, completed, setCompletedDays ,isLocked,score}) => {
//   const { db, user } = useFirebase();
//   const [input, setInput] = useState("");

//   const handleComplete = async () => {
//     if (!input.trim()) {
//       toast.warning("Please fill in the reflection before submitting.");
//       return;
//     }

//     const ref = doc(db, "Depressed-patients", user.uid, "dayProgress", `day${task.day}`);
//     await setDoc(ref, {
//       completed: true,
//       reflection: input,
//       timestamp: serverTimestamp(),
//     });
//     toast.success(`Day ${task.day} completed!`);
//     setCompletedDays((prev) => [...prev, task.day]);
//     setInput(""); // Clear input after completion
//   };

//   return (
//     <div className="border p-4 rounded-xl shadow-md bg-white">
//   <div className="flex justify-between items-center">
//     <h2 className="text-xl font-semibold">
//       Day {task.day}: {task.title}
//     </h2>
//     {score !== null && (
//       <span className="text-sm text-blue-600 font-medium">
//         Your Depression Score: {score}
//       </span>
//     )}
//   </div>

//   <p className="mt-2 text-gray-600">{task.description}</p>

//   {isLocked && !completed ? (
//     <p className="mt-3 text-red-500">🔒 Complete previous days to unlock this task.</p>
//   ) : !completed ? (
//     <>
//       <textarea
//         placeholder="Reflect on your task here..."
//         className="w-full mt-3 p-2 border rounded-md"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button
//         className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={handleComplete}
//       >
//         Mark as Completed
//       </button>
//     </>
//   ) : (
//     <p className="text-green-600 font-medium mt-3">✓ Task Completed</p>
//   )}
// </div>


//   );
// };

// export default DayCard;
// import React, { useState } from "react";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { useFirebase } from "../../Context/Firebase";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const DayCard = ({ task, completed, setCompletedDays, isLocked, score }) => {
//   const { db, user } = useFirebase();
//   const [input, setInput] = useState("");

//   const handleComplete = async () => {
//     if (!input.trim()) {
//       toast.warning("Please fill in the reflection before submitting.");
//       return;
//     }

//     const ref = doc(db, "Depressed-patients", user.uid, "dayProgress", `day${task.day}`);
//     await setDoc(ref, {
//       completed: true,
//       reflection: input,
//       timestamp: serverTimestamp(),
//     });
//     toast.success(`Day ${task.day} completed!`);
//     setCompletedDays((prev) => [...prev, task.day]);
//     setInput("");
//   };

//   return (
//     <motion.div
//       className="bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6 rounded-3xl shadow-xl transition-all"
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       whileHover={{ scale: 1.03 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//     >
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="text-xl md:text-2xl font-bold text-blue-800">
//           Day {task.day}: {task.title}
//         </h2>
//         {score !== null && (
//           <span className="text-sm text-blue-700 font-semibold bg-white/60 px-3 py-1 rounded-full shadow">
//             Your Score: {score}
//           </span>
//         )}
//       </div>

//       <p className="text-gray-700 mt-2 text-sm md:text-base">{task.description}</p>

//       {isLocked && !completed ? (
//         <motion.p
//           className="mt-4 text-red-500 text-sm"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           🔒 Complete previous days to unlock this task.
//         </motion.p>
//       ) : !completed ? (
//         <>
//           <motion.textarea
//             placeholder="Reflect on your task here..."
//             className="w-full mt-4 p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           />
//           <motion.button
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-colors duration-300"
//             onClick={handleComplete}
//             whileTap={{ scale: 0.95 }}
//           >
//             Mark as Completed
//           </motion.button>
//         </>
//       ) : (
//         <motion.p
//           className="text-green-600 font-medium mt-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           ✓ Task Completed
//         </motion.p>
//       )}
//     </motion.div>
//   );
// };

// export default DayCard;
import React, { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "../../Context/Firebase";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const DayCard = ({ task, completed, setCompletedDays, isLocked, score }) => {
  const { db, user } = useFirebase();
  const [input, setInput] = useState("");

  const handleComplete = async () => {
    if (!input.trim()) {
      toast.warning("Please write a short reflection before submitting.");
      return;
    }

    const ref = doc(db, "Depressed-patients", user.uid, "dayProgress", `day${task.day}`);
    await setDoc(ref, {
      completed: true,
      reflection: input,
      timestamp: serverTimestamp(),
    });

    toast.success(`Day ${task.day} completed!`);
    setCompletedDays((prev) => [...prev, task.day]);
    setInput("");
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 rounded-3xl shadow-2xl w-full max-w-xl mx-auto transition-all"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-blue-900">
          Day {task.day}: {task.title}
        </h2>
        {score !== null && (
          <span className="text-xs md:text-sm text-blue-700 font-medium bg-white/60 px-3 py-1 rounded-full shadow-md">
            Score: {score}
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-4">{task.description}</p>

      {isLocked && !completed ? (
        <motion.p
          className="text-red-500 font-medium text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🔒 Please complete previous days to unlock.
        </motion.p>
      ) : !completed ? (
        <>
          <motion.textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Reflect here..."
            className="w-full mt-3 p-3 border border-blue-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />

          <motion.button
            onClick={handleComplete}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold tracking-wide hover:brightness-110"
          >
            ✅ Mark as Completed
          </motion.button>
        </>
      ) : (
        <motion.p
          className="text-green-600 font-semibold mt-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🎉 You have completed this task!
        </motion.p>
      )}
    </motion.div>
  );
};

export default DayCard;


