import React, { useState } from "react";
import { db } from "../../Context/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useFirebase } from "../../Context/Firebase";

const DayActivity = ({ day }) => {
  const firebase = useFirebase();
  const user = firebase?.user;
  const [mood, setMood] = useState(5);
  const [journal, setJournal] = useState("");
  const [loading, setLoading] = useState(false);
  const isDay1 = day === 1;

  const handleSubmit = async () => {
    if (!user) return alert("Please login");
    setLoading(true);
    try {
      await setDoc(
        doc(db, "patients", user.uid, "dayProgress", "day1"),
        {
          mood,
          journal,
          completed: true,
          timestamp: new Date(),
        }
      );
      alert("Day 1 Saved 🎉");
    } catch (err) {
      console.error(err);
      alert("Error saving Day 1");
    }
    setLoading(false);
  };

  if (!isDay1) return <div className="text-gray-500">Day {day} content coming soon!</div>;

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-2xl space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600 text-center">
        Day 1: Start Small, Breathe Deep
      </h2>

      <p className="italic text-gray-600 text-center">
        “Breathe. You’re doing just fine.”
      </p>

      {/* Mood Tracker */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Your Mood (0 - 😞 to 10 - 😄)</label>
        <input
          type="range"
          min={0}
          max={10}
          value={mood}
          onChange={(e) => setMood(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-center text-sm text-gray-600 mt-1">Mood: {mood}</div>
      </div>

      {/* Breathing Guide (Optional GIF/Animation) */}
      <div className="text-center">
        <p className="text-lg font-semibold mb-2">Follow this Breathing:</p>
        <img
          src="https://media.tenor.com/B8WgDE7GgYoAAAAC/breathe-relax.gif"
          alt="Breathing GIF"
          className="mx-auto w-48 h-48 rounded-xl shadow"
        />
      </div>

      {/* Journal Input */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">How are you feeling right now?</label>
        <textarea
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm"
          placeholder="Write your feelings..."
        />
      </div>

      {/* Music Play */}
      <div className="text-center">
        <p className="text-lg font-semibold mb-2">Play Calming Sound</p>
        <audio controls className="mx-auto">
          <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
      >
        {loading ? "Saving..." : "I'm Done for Today ✅"}
      </button>
    </div>
  );
};

export default DayActivity;
