import React from "react";

const DayActivity = ({ day }) => {
  if (day !== 1) return <div className="text-gray-500">Day {day} content coming soon!</div>;

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-2xl space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600 text-center">
        Day 1: Start Small, Breathe Deep
      </h2>

      <p className="italic text-gray-600 text-center">
        “Breathe. You’re doing just fine.”
      </p>

      <div className="text-center">
        <p className="text-lg font-semibold mb-2">Follow this Breathing:</p>
        <img
          src="https://media.tenor.com/B8WgDE7GgYoAAAAC/breathe-relax.gif"
          alt="Breathing GIF"
          className="mx-auto w-48 h-48 rounded-xl shadow"
        />
      </div>
    </div>
  );
};

export default DayActivity;
