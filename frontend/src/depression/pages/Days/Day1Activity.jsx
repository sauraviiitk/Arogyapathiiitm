import React, { useState, useEffect } from "react";
import { useFirebase } from "../../../Context/Firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const Day1Activity = ({ onComplete }) => {
  const { user, db } = useFirebase();
  const navigate = useNavigate();

  const [wakeUpTime, setWakeUpTime] = useState("");
  const [tasks, setTasks] = useState(["", "", ""]);
  const [journal, setJournal] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  // ⏬ Load existing data on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const ref = doc(db, "Depressed-patients", user.uid, "dayProgress", "day1");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setWakeUpTime(data.wakeUpTime || "");
        setTasks(data.tasks || ["", "", ""]);
        setJournal(data.journal || "");
        setTasksCompleted(data.tasksCompleted || false);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleSave = async () => {
  if (!wakeUpTime || tasks.some(task => !task) || !journal || !tasksCompleted) {
    toast.error("Please complete all fields and mark task completion");
    return;
  }

  try {
    await setDoc(
      doc(db, "Depressed-patients", user.uid, "dayProgress", "day1"),
      {
        wakeUpTime,
        tasks,
        journal,
        tasksCompleted,
        completed: true,
        timestamp: new Date()
      },
      { merge: true }
    );
    toast.success("Day 1 completed! 🎉");
    onComplete(); // ✅ trigger re-render
  } catch (err) {
    toast.error("Error saving progress");
    console.error(err);
  }
};


  if (loading) {
    return (
      <div className="text-center text-gray-600 py-6">Loading Day 1 activity...</div>
    );
  }

  return (
    <div className="mt-6 space-y-6 bg-white rounded-xl shadow-md p-6 border border-indigo-200">
      <h2 className="text-xl font-semibold text-indigo-700">🌅 Day 1: Routine Building</h2>

      {/* Wake-up Time */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">🕘 Wake-up Time</label>
        <input
          type="time"
          value={wakeUpTime}
          onChange={(e) => setWakeUpTime(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
      </div>

      {/* Task Planner */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">✅ Plan your tasks</label>
        {tasks.map((task, i) => (
          <input
            key={i}
            type="text"
            value={task}
            onChange={(e) => {
              const updated = [...tasks];
              updated[i] = e.target.value;
              setTasks(updated);
            }}
            placeholder={`Task ${i + 1}`}
            className="w-full border rounded px-4 py-2 mb-2"
          />
        ))}
      </div>

      {/* Journal Section */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">📔 How was your day?</label>
        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          rows={4}
          placeholder="Write your reflection here..."
          className="w-full border rounded px-4 py-2"
        />
      </div>

      {/* Task Completion Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={tasksCompleted}
          onChange={(e) => setTasksCompleted(e.target.checked)}
        />
        <label>I completed all my planned tasks today</label>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded shadow-md"
      >
        💾 Save Progress
      </button>
    </div>
  );
};

export default Day1Activity;
