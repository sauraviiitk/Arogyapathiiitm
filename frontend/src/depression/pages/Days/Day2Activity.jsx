import React, { useEffect, useState } from "react";
import { useFirebase } from "../../../Context/Firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Day2Activity = ({ onComplete }) => {
  const { user, db } = useFirebase();
  const [journal, setJournal] = useState("");
  const [videoWatched, setVideoWatched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
  console.log("Day 2 rendering...");
  }, []);
  const handleSubmit = async () => {
    if (!user || !journal.trim()) return alert("Please complete all tasks.");
    const ref = doc(db, "Depressed-patients", user.uid, "dayProgress", "day2");
    await setDoc(ref, {
      journal,
      videoWatched,
      completed: true,
      timestamp: serverTimestamp(),
    });
    setSubmitted(true);
    onComplete(); // 🔄 Trigger refresh
  };

  if (submitted) {
    return (
      <div className="mt-6 text-green-600 font-semibold">
        ✅ Day 2 activities submitted successfully!
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <div>
        <label className="block mb-1 text-gray-700 font-medium">
          📝 Journal: Write your thoughts
        </label>
        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          rows={4}
          className="w-full p-3 border rounded-lg"
          placeholder="Write here..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={videoWatched}
          onChange={(e) => setVideoWatched(e.target.checked)}
        />
        <label className="text-gray-700">🎥 I watched a motivational video</label>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Submit Day 2
      </button>
    </div>
  );
};

export default Day2Activity;
