import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

// 21-Day Tracker Data (extend as needed)
const dayActivities = {
  1: {
    title: "Start Small, Breathe Deep",
    quote: "Breathe. You’re doing just fine.",
    tasks: [
      "Take 3 deep breaths",
      "Play calming music",
      "Journal how you are feeling today",
    ],
  },
  2: {
    title: "Express Yourself",
    quote: "Feelings are just visitors. Let them come and go.",
    tasks: [
      "Draw your current mood",
      "Listen to a soothing bhajan",
      "Write 3 thoughts you had today",
    ],
  },
  3: {
    title: "Healing Sounds",
    quote: "Music washes away from the soul the dust of everyday life.",
    tasks: [
      "Listen to rain or forest sound",
      "Light yoga stretch",
      "Mood check-in (0-10)",
    ],
  },
  // You can add more up to 21...
};

const totalDays = 21;

const ReliefPage = () => {
  const [activeDay, setActiveDay] = useState(1); // default Day 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 flex flex-col items-center">
      {/* Curved Path with Dots */}
      <div className="w-full overflow-x-auto mb-8 scrollbar-hide">
        <svg viewBox="0 0 1200 250" className="w-[1200px] h-[200px] mx-auto">
          <path
            d="M 50 200 Q 300 50 600 200 Q 900 350 1150 100"
            stroke="#d1d5db"
            strokeWidth="4"
            fill="none"
          />
          {[...Array(totalDays)].map((_, index) => {
            const x = 50 + (index * (1100 / (totalDays - 1)));
            const y = 200 - Math.sin((index / (totalDays - 1)) * Math.PI) * 150;
            const isActive = index + 1 === activeDay;
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="12"
                  fill={isActive ? "#6366f1" : "#a1a1aa"}
                  className="cursor-pointer transition-all"
                  onClick={() => setActiveDay(index + 1)}
                />
                <text
                  x={x}
                  y={y + 30}
                  fontSize="12"
                  textAnchor="middle"
                  fill="#4b5563"
                >
                  Day {index + 1}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Day Activity Card */}
      <motion.div
        key={activeDay}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-2xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-indigo-600 text-center">
          {dayActivities[activeDay]?.title || "Activity for Today"}
        </h2>
        <p className="italic text-gray-600 text-center">
          “{dayActivities[activeDay]?.quote || "Stay strong, stay hopeful."}”
        </p>
        <ul className="space-y-3">
          {dayActivities[activeDay]?.tasks?.map((task, idx) => (
            <li
              key={idx}
              className="flex items-start text-gray-700 bg-indigo-50 px-4 py-2 rounded-xl"
            >
              <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-1" />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default ReliefPage;
