import React from "react";
import { CheckCircle } from "lucide-react";

const DayTracker = ({ completedDays }) => {
  const totalDays = 10;

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalDays }, (_, i) => {
        const day = i + 1;
        const isCompleted = completedDays.includes(day);
        return (
          <div key={day} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                isCompleted ? "bg-green-500 text-white" : "bg-white border-gray-400"
              }`}
            >
              {isCompleted ? <CheckCircle size={18} /> : day}
            </div>
            <span className="text-xs mt-1">Day {day}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DayTracker;
