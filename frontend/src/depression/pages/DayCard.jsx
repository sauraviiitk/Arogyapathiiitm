import React, { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "../../Context/Firebase";
import { toast } from "react-toastify";

const DayCard = ({ task, completed, setCompletedDays ,isLocked,score}) => {
  const { db, user } = useFirebase();
  const [input, setInput] = useState("");

  const handleComplete = async () => {
    if (!input.trim()) {
      toast.warning("Please fill in the reflection before submitting.");
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
    setInput(""); // Clear input after completion
  };

  return (
    <div className="border p-4 rounded-xl shadow-md bg-white">
  <div className="flex justify-between items-center">
    <h2 className="text-xl font-semibold">
      Day {task.day}: {task.title}
    </h2>
    {score !== null && (
      <span className="text-sm text-blue-600 font-medium">
        Your Depression Score: {score}
      </span>
    )}
  </div>

  <p className="mt-2 text-gray-600">{task.description}</p>

  {isLocked && !completed ? (
    <p className="mt-3 text-red-500">🔒 Complete previous days to unlock this task.</p>
  ) : !completed ? (
    <>
      <textarea
        placeholder="Reflect on your task here..."
        className="w-full mt-3 p-2 border rounded-md"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleComplete}
      >
        Mark as Completed
      </button>
    </>
  ) : (
    <p className="text-green-600 font-medium mt-3">✓ Task Completed</p>
  )}
</div>


  );
};

export default DayCard;
